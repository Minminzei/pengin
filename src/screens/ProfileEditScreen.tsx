import React, { Suspense, useState } from 'react';
import {
  StyleSheet, TextInput, Alert,
} from 'react-native';
import Colors from '@constants/Colors';
import { Text, View, Loading, KeyboardAvoidingView } from '@components';
import { Button, Card } from 'react-native-elements';
import { userId } from '@constants/Debug';
import Message from '@lib/message';
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql,
  useMutation,
} from 'react-relay/hooks';
import {
  ProfileEditScreenQuery as ProfileScreenType,
} from '@__generated__/ProfileEditScreenQuery.graphql';
import {
  ProfileEditScreenMutation as ProfileMutationType,
  UserInput,
} from '@__generated__/ProfileEditScreenMutation.graphql';
import { replace } from '@navigation/navigator';
import { initialRouteName } from '@navigation/types'
import FilePicker from '@components/FilePicker';
;
const ProfileEditScreenQuery = graphql`
  query ProfileEditScreenQuery($id: ID!) {
    user(id: $id) {
      id
      name
      image
      location
      comment
    }
  }
`;

const ProfileEditScreenMutation = graphql`
  mutation ProfileEditScreenMutation($input: UserInput) {
    saveUser(input: $input) {
      id
      name
      image
      location
      comment
    }
  }
`;

function ScreenContent(props: {
  queryReference: any;
  onComplete: Function;
}) : JSX.Element {

  const [loading, setLoading] = useState<boolean>(false);
  const { user } = usePreloadedQuery<ProfileScreenType>(ProfileEditScreenQuery, props.queryReference);
  const [commit] = useMutation<ProfileMutationType>(ProfileEditScreenMutation);
  const [data, setUser] = useState(user);
  function save() : void {
    setLoading(true);
    commit({
      variables: {
        input: {
          id: data.id,
          name: data.name,
          location: data.location || '',
          comment: data.comment,
        } as UserInput,
      },
      onCompleted() {
        props.onComplete();
      },
      onError(error: Error) {
        setLoading(false);
      }
    });
  }

  function update(input: any) : void {
    setUser({
      ...data,
      ...input,
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
              value={data.name}
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
              value={data.location || ''}
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
              value={data.comment || ''}
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
            onPress={() => save()}
            loading={loading}
          />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}

export default function ProfileEditScreen() : JSX.Element {
  const { set } = Message();
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader<ProfileScreenType>(ProfileEditScreenQuery);
  React.useEffect(() => {
    loadQuery({ id: userId });
    return () => {
      disposeQuery();
    };
  }, [loadQuery]);
  function completeEdit() : void {
    set({
      type: 'toast',
      message: '保存しました',
    });
    replace(initialRouteName, { screen: 'Profile' });
  }
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        {queryReference && (
          <ScreenContent
            queryReference={queryReference}
            onComplete={completeEdit}
          />
        )}
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
