import React, { Suspense } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Text } from '../components/Themed';
import Loading from '../components/Loading';
import { Button, Card } from 'react-native-elements';
import {
  loadQuery,
  usePreloadedQuery,
  graphql,
} from 'react-relay/hooks';
import { UsersScreenQuery as UserScreenType } from '../__generated__/UsersScreenQuery.graphql';
import RelayEnvironment from '../RelayEnvironment';

const UsersScreenQuery = graphql`
  query UsersScreenQuery {
    users {
      id
      name
      image
      location
      comment
      posts {
        id
        title
        link
      }
    }
  }
`;

const preloadedQuery = loadQuery<UserScreenType>(RelayEnvironment, UsersScreenQuery, {});

function UserList(props: {
  navigate: ((id: string) => void);
}) : JSX.Element {
  const { users } = usePreloadedQuery(UsersScreenQuery, preloadedQuery);
  return (
    <View style={styles.cards}>
      <FlatList
        data={users}
        renderItem={({ item:user }) => (
          <Card key={user.id}>
            <View style={styles.item}>
              <Card.Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: user.image }}
              />
              <View style={styles.body}>
                <Text style={styles.name}>{user.name}</Text>
              </View>
            </View>
            <Button
              title="詳細"
              onPress={() => props.navigate(user.id)}
            />
          </Card>
        )}
      />
    </View>
  );
}

export default function UsersScreen({ navigation }: any) : JSX.Element {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading size="large" />}>
        <UserList
          navigate={(id: string) => navigation.navigate('User', { id })}
        />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cards: {
    flex: 1,
  },
  card: {
    flex: 1,
  },
  body: {
    paddingTop: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
});
