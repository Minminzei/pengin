import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Loading from '../components/Loading';
import { Card } from 'react-native-elements';
import {
  usePreloadedQuery,
  useQueryLoader,
  graphql
} from 'react-relay/hooks';
import { UserScreenQuery as UserScreenType } from '../__generated__/UserScreenQuery.graphql';
import UserPost from './UserPost';

const UserScreenQuery = graphql`
  query UserScreenQuery($id: ID!) {
    user(id: $id) {
      id
      name
      image
      location
      comment
      ...UserPost_user
    }
  }
`;

function ScreenContent(props: {
  id: any;
  queryReference: any;
}) : JSX.Element {
  const data = usePreloadedQuery<UserScreenType>(UserScreenQuery, props.queryReference);
  const { user } = data;
  return (
    <View style={styles.container}>
      <Card>
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
        <UserPost user={user} />
      </Card>
    </View>
  );
}

export default function UserScreen({ route }: any) : JSX.Element {
  const { params } = route;
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader(UserScreenQuery);
  React.useEffect(() => {
    loadQuery({ id: params.id });
    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery, params.id]);
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        {queryReference && <ScreenContent
          id={params.id as number}
          queryReference={queryReference}
        />}
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
