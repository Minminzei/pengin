import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as _ from 'lodash';
import Color from '@constants/Colors';
import { View } from '@components/Themed';
import { Button } from 'react-native-elements';

type extensionType = 'jpeg' | 'jpg' | 'png';

export const mimeTypeMap = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
}

export class ImageFile {
  uri: string;
  mimeType: string;
  constructor(params: {
    uri: string;
    mimeType: string;
  }) {
    this.uri = params.uri;
    this.mimeType = params.mimeType;
  }
}

interface Props {
  onChange: (e:ImageFile) => void;
  onError: (e:string) => void;
}

function pickerForMobile(props: Props) {
  const [processing, setProcessing] = useState<boolean>(false);
  useEffect(() => {
    async function pick() : Promise<void> {
      try {
        if (!processing) {
          return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: Platform.OS === 'ios',
          aspect: [1, 1],
          base64: true,
          skipProcessing: true,
        });
        if (res.cancelled) {
          return;
        }
        const re = /(?:\.([^.]+))?$/i;
        const extensions =  re.exec(res.uri);
        if (!extensions) {
          throw new Error('ファイル形式を読み取れませんでした');
        }
        const extension = _.head(extensions[1].split('?'));
        if (!extension) {
          throw new Error('このファイル拡張子はサポートしていません');
        }
        const index = extension.toLocaleLowerCase();
        if (Object.keys(mimeTypeMap).indexOf(index) === -1) {
          throw new Error('このファイル拡張子はサポートしていません');
        }
        const mimeType = mimeTypeMap[index as extensionType];

        const { uri } = await ImageManipulator.manipulateAsync(
          res.uri,
          [
            {
              resize: {
                width: 200,
                height: 200,
              },
            },
          ],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
          },
        );
        const base64Encoding = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        props.onChange(new ImageFile({
          uri: `data:${mimeType};base64,${base64Encoding}`,
          mimeType,
        }));
      } catch (e) {
        throw e;
      }
    }
    try {
      if (processing) {
        pick();
      }
    } catch (e:any) {
      props.onError(e.message);
    } finally {
      setProcessing(false);
    }
  }, [processing])

  return (
    <View style={styles.wrapper}>
      <Button
       loading={processing}
        title="画像を選択"
        onPress={() => setProcessing(true)}
        style={styles.button}
      />
    </View>
  );
}

function pickerForWeb(props: Props) {
  const [processing, setProcessing] = useState<boolean>(false);

  async function onChangeFile(e:React.ChangeEvent<HTMLInputElement>) : Promise<void> {
    try {
      const file = e.target.files?.item(0);
      if (!file) {
        return;
      }
      setProcessing(true);

      if (!file.name) {
        throw new Error('選択されたファイルにファイル名がありません。このファイルはアップできません');
      }
      if (Object.values(mimeTypeMap).indexOf(file.type) === -1) {
        throw new Error(`${Object.keys(mimeTypeMap).join(' ')}のいずれかのファイルを選択してください`);
      }

      const uri = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(_.toString(reader.result));
        };
      });
      props.onChange(new ImageFile({
        uri,
        mimeType: file.type,
      }));
    } catch (e:any) {
      props.onError(e.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <label htmlFor="layout-camera-picker">
      <View style={styles.wrapper}>
        <Button
          loading={processing}
          title="画像を選択"
          style={styles.button}
        />
      </View>
      <input
        type="file"
        onChange={onChangeFile}
        style={{ opacity: 0, height: 10 }}
        id="layout-camera-picker"
      />
    </label>
  );
}

export default function FilePicker(props:Props) {
  if (Platform.OS === 'web') {
    return pickerForWeb(props);
  }
  return pickerForMobile(props);
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 170,
    backgroundColor: Color.primary,
  },
});