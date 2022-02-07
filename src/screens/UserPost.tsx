import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@components/Themed';
import {
  useFragment,
  graphql
} from 'react-relay/hooks';
import { UserPost_user$key } from '../__generated__/UserPost_user.graphql';
import Color from '@constants/Colors';
import * as Linking from 'expo-linking';

interface Props {
  user: UserPost_user$key;
}

export default function UserPost(props:Props) : JSX.Element {
  const { posts } = useFragment(
    graphql`
      fragment UserPost_user on User {
        posts {
          id
          title
          link
        }
      }
    `,
    props.user,
  );
  return (
    <View style={styles.container}>
      {posts?.map(row => (
        <View
          style={styles.item}
          key={`post-${row.id}`}
        >
          <Text>{row.title}</Text>
          <Pressable
            onPress={() => Linking.openURL(row.link)}
          >
            <Text style={styles.link}>詳細</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.black3,
  },
  item: {
    padding: 8,
    marginBottom: 8,
    borderStyle: 'solid',
    borderColor: Color.white1,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  link: {
    fontSize: 13,
    color: Color.blue1,
  },
});
