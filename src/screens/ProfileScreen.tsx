import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';
import Loading from '@components/Loading';
import { Button, Card } from 'react-native-elements';
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql
} from 'react-relay/hooks';
import { userId } from '@constants/Debug';
import {
  ProfileScreenQuery as ProfileScreenType,
} from '../__generated__/ProfileScreenQuery.graphql';
const ProfileScreenQuery = graphql`
  query ProfileScreenQuery($id: ID!) {
    user(id: $id) {
      id
      name
      image
      location
      comment
    }
  }
`;

function ScreenContent(props: {
  onPress: Function;
  queryReference: any;
}) : JSX.Element {
  const { user } = usePreloadedQuery<ProfileScreenType>(ProfileScreenQuery, props.queryReference);
  return (
    <View>
      <Card>
        <View>
          <View style={styles.imageWrapper}>
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: user.image }}
            />
          </View>
          <Card.Title h1>{user.name}</Card.Title>
          <View style={styles.body}>
            <Text>{user.location}</Text>
            <Text>{user.comment}</Text>
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

export default function ProfileScreen({ navigation }: any) : JSX.Element {
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader<ProfileScreenType>(ProfileScreenQuery);
  React.useEffect(() => {
    loadQuery({ id: userId });
    return () => {
      disposeQuery();
    };
  }, [loadQuery]);
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        {queryReference && (
          <ScreenContent
            onPress={() => navigation.navigate('ProfileEdit')}
            queryReference={queryReference}
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
