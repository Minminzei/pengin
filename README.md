セットアップ
----
#### このレポジトリについて
React Native/ Expo/ Typescript/ React Navigation/ Recoil/ GraphQL + React Relayを使ったシステム開発の調査用に作ったサンプルです。
- `Recoil` (https://recoiljs.org/docs/introduction/installation)
- `React Navigation` (https://reactnavigation.org/docs/getting-started)
- `React Relay` (https://relay.dev/docs/)
- `GrapQL` (https://graphql.org/learn/)
#### build(初回のみ)
```
# cocoapodsを取得
sudo gem install cocoapods
pod setup

# git clone
git clone git@github.com:Minminzei/pengin.git

# 必要なパッケージを取得
cd pengin
yarn
cd ios
pod install
```
#### 起動
```
# serverを起動
yarn server

# iosシュミレーターで起動
yarn ios
```

Stateをどう管理するか？
-----
React Nativeで管理するStateは３つ。[参考記事](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)
|    種別       | 概要          | 管理方法          |
|------------------|--------------------|--------------------|
| サーバーデータ | APIリクエストで取得したデータのキャッシュ | GraphQL + React Relay|
| Global State | コンポーネント間で共有したいState。インターネットのオン/オフやトーストメッセージなど。 | Recoil |
| Local State | 各コンポーネント内で使うState | React Hook |

GraphQLとReact Relayを使ったAPI/ State管理
-----
### GraphQLとは？
宣言的なリクエスト(declarative data fetching)を実装するためのクエリ言語。使用するすべてのAPIの仕様とやり取りするデータの型を定義することで
1. over-fetchやunder-fetchを防ぐ。
1. backendとfrontendの分離が可能になる。

### Schema
使用するリクエストとデータの定義書。特定の言語への依存を避けるためSDL(Schema Definition Language)を使って記述する(Ex. PHP, JS etc..)。ここで宣言されていないAPI通信やデータを使おうとするとエラーが出る。[schema.graphql](/./api/schema.graphql)
```
# ./api/schema.graphql
# APIの仕様
schema {
  query: Query
}
type Query {
  users: [User!]
  user(id:ID!): User!
}
## データの型
type User {
  id: ID!
  name: String!
  image: String!
  location: String
  comment: String
  posts: [Post!]
}
type Post {
  id: ID!
  title: String!
  published: Boolean
  link: String!
}
```
特定のユーザーを取得したい場合のリクエストとレスポンス結果。
```
# リクエスト
query {
  user(id: "22-aa") {
    id
    name
    image
    posts {
      title
    }
  }
}
# レスポンス結果
{
  user: {
    id: "22-aa",
    name: "ゲスト",
    image: "https://example.com/userimage.jpg",
    posts: [
      {
        title: 'GraphQLについての調査結果',
      },
    ],
  }
}
```
存在しないAPIやデータを使おうとするとコンパイル時にエラーになる
```
query {
  users {
    id
    name
    friends
  }
}
--> [ERROR] ✖︎ The type `User` has no field `friends`.
```
### ReactRelayとは？
GraphQLをReactで実装するためのフレームワーク

#### ComponentとGraphQLの関連付け
コンポーネントごとに必要なデータを宣言し、コンポーネントの役割を明確にする。使用するデータが更新されたらレンダリングが発火する。[ProfileScreen.tsx](/./src/screens/ProfileScreen.tsx)
```
# ./src/screens/ProfileScreen.tsx
# 使用したいAPIとデータを宣言
query ProfileScreenQuery($id: ID!) {
  user(id: $id) {
    id
    name
    image
    location
    comment
  }
}
# StateとComponentの関連付け。userが更新されたらScreenContentが再レンダリングされる。
function ScreenContent(props) {
  const { user } = usePreloadedQuery<ProfileScreenType>(ProfileScreenQuery, props.queryReference);
```
`ProfileEditScreen.tsx`で`type User(ID:2の森岡)`を更新するとこのUserを使用している`ProfileEditScreen`, `ProfileScreen`, `UsersScreen`が再レンダリングされる。

### キャッシュ管理
データ単位でキャッシュを管理してくれる。例えば`UsersScreen.tsx`で`type User(ID:2の森岡)`を取得しているので、`ProfileScreen`や`ProfileEditScreen`ではキャッシュからデータを取得する。
```
# UsersScreenでID:2のUserを含むユーザー一覧を取得している
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
      published
      link
    }
  }
}
# そのためProfileScreenでID:2のUserを取得する場合、キャッシュからデータが取得される。
query ProfileScreenQuery($id: ID!) {
  user(id: $id) {
    id
    name
    image
    location
    comment
  }
}
```
#### QueryとFragmentについて
概念を整理中...。
```
# UsersScreen.tsx
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
# UserPost.tsx
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
```
