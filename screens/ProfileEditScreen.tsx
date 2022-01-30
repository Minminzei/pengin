import React, { Suspense, useState } from 'react';
import {
  StyleSheet, TextInput, ScrollView, Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View, Loading, KeyboardAvoidingView } from '../components';
import { Button, Card } from 'react-native-elements';
import Profile, { User } from '../recoil/profile';

function ScreenContent() : JSX.Element {
  const { get, save, profile } = Profile();
  const [loading, setLoading] = useState<boolean>(false);
  if (!profile) {
    throw get();
  }
  const [user, setUserData] = useState<User>(profile);

  async function saveProf() : Promise<void> {
    try {
      setLoading(true);
      await save(user);
      Alert.alert('保存しました');
    } catch (e:any) {
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  function update(data: any) : void {
    setUserData({
      ...user,
      ...data,
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Card>
        <View>
          <View style={styles.imageWrapper}>
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: user.image }}
            />
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text>名前を入力してください</Text>
            </View>
            <TextInput
              editable
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(name) => update({ name })}
              value={user.name}
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              style={styles.form}
              allowFontScaling={false}
              placeholder='名前を入力してください'
            />
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text>住まいを入力してください</Text>
            </View>
            <TextInput
              editable
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(location) => update({ location })}
              value={user.location}
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              style={styles.form}
              allowFontScaling={false}
              placeholder='住まいを入力してください'
            />
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text>コメントを入力してください</Text>
            </View>
            <TextInput
              editable
              numberOfLines={5}
              maxLength={300}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(comment) => update({ comment })}
              value={user.comment}
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              style={[styles.form, styles.textFiled]}
              allowFontScaling={false}
              placeholder='コメントを入力してください'
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="保存する"
            onPress={() => saveProf()}
            loading={loading}
          />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}

export default function UserScreen() : JSX.Element {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        <ScreenContent />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    padding: 24,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  body: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  button: {
    marginTop: 8,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  label: {
    minHeight: 26,
    paddingLeft: 8,
    paddingRight: 8,
  },
  form: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.black3,
    borderRadius: 4,
    height: 32,
    backgroundColor: Colors.white1,
    fontSize: 14,
    lineHeight: 20,
  },
  textFiled: {
    height: 100,
  },
});
