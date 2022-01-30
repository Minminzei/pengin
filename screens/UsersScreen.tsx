import React, { Suspense } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from '../components/Themed';
import Loading from '../components/Loading';
import { Button, Card } from 'react-native-elements';
import { useRecoilValue } from 'recoil';
import { users } from '../recoil/users';

function UserList(props: {
  navigate: ((id: number) => void),
}) : JSX.Element {
  const list = useRecoilValue(users);

  return (
    <View style={styles.cards}>
      <FlatList
        data={list}
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
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['red', 'pink'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
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
          navigate={(id: number) => navigation.navigate('User', { id })}
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
