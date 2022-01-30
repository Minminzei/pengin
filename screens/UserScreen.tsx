import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Loading from '../components/Loading';
import { Card } from 'react-native-elements';
import { user } from '../recoil/users';
import { useRecoilValue } from 'recoil';

function ScreenContent(props: {
  id: number;
}) : JSX.Element {
  const data = useRecoilValue(user(props.id));
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.imageWrapper}>
          <Card.Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: data.image }}
          />
        </View>
        <Card.Title h1>{data.name}</Card.Title>
        <View style={styles.body}>
          <Text>{data.location}</Text>
          <Text>{data.comment}</Text>
        </View>
      </Card>
    </View>
  );
}

export default function UserScreen({ route }: any) : JSX.Element {
  const { params } = route;
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        <ScreenContent
          id={params.id as number}
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
