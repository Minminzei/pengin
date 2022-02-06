import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Loading from '../components/Loading';
import { Button, Card } from 'react-native-elements';
import Profile from '../recoil/profile';

function ScreenContent(props:{
  onPress: Function;
}) : JSX.Element {
  const { get, profile } = Profile();
  if (!profile) {
    throw get();
  }
  return (
    <View>
      <Card>
        <View>
          <View style={styles.imageWrapper}>
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: profile.image }}
            />
          </View>
          <Card.Title h1>{profile.name}</Card.Title>
          <View style={styles.body}>
            <Text>{profile.location}</Text>
            <Text>{profile.comment}</Text>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="プロフィール編集"
            onPress={() => props.onPress()}
          />
        </View>
      </Card>
    </View>
  );
}

export default function UserScreen({ navigation }: any) : JSX.Element {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        <ScreenContent
          onPress={() => navigation.navigate('ProfileEdit')}
        />
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
  form: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderRadius: 4,
    height: 32,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
});
