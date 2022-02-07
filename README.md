このレポジトリについて
----
React Native/ Expo/ Typescript/ React Navigation/ Recoil/ GraphQL/ React Relayを使ったシステム開発の調査用に作ったサンプルです。正確な仕様は公式を見てください。
- `Recoil` (https://recoiljs.org/docs/introduction/getting-started)
- `React Navigation` (https://reactnavigation.org/docs/getting-started)
- `React Relay` (https://relay.dev/docs/)
- `GraphQL` (https://graphql.org/learn/)

セットアップ
----
#### 初回のみ
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
React Nativeで管理するStateは３つ。[(参考記事)](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)
|    種別       | 概要          | 管理方法          |
|------------------|--------------------|--------------------|
| サーバーデータ | APIリクエストで取得したデータのキャッシュ | GraphQL + React Relay|
| Global State | コンポーネント間で共有したいState。ネット接続のオン/オフやトーストメッセージなど。 | Recoil |
| Local State | 各コンポーネント内で使うState | React Hook |

GraphQLとReact Relayを使ったAPI/ State管理
-----
### GraphQLとは？
宣言的なリクエスト(declarative data fetching)を実装するためのクエリ言語。使用するすべてのAPIの仕様とやり取りするデータの型を定義することで
1. over/under fetchを防ぎ、バグを予防する。
1. backendとfrontendを分離し、開発が楽になる。

### Schema
使用するリクエストとデータの定義書。特定言語への依存を避けるためSDL(Schema Definition Language)を使って記述する。ここで宣言されていないAPI通信やデータを使おうとするとエラーが出る。公式ドキュメントは[こちら](https://graphql.org/learn/schema/)
```
# ./schema.graphql
# APIの仕様。エンドポイントにusersを渡すとUserの配列が返ってくる。
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
  user(id: "1") {
    id
    name
    posts {
      title
    }
  }
}
# レスポンス結果
{
  user: {
    id: "1",
    name: "本田 大志",
    posts: [
      { title: 'SPA, SSR, SSGって結局なんなんだっけ？' },
      { title: '「3種類」で管理するReactのState戦略' },
    ],
  }
}
```
存在しないAPIやデータを使おうとするとコンパイル時にエラーになる
```
# type Queryに存在しないAPIを呼び出す
query {
  findUserByName(name: "ゲスト") {
    id
    name
  }
}
---> [ERROR] ✖︎ The type `Query` has no field `findUserByName`.

# type Userに存在しないデータのfieldをリクエスト
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
GraphQLをReactで実装するためのフレームワーク。主にComponentとGraphQLの関連付けとキャッシュの管理を行う。

### ComponentとGraphQLの関連付け
コンポーネントごとに必要なAPIとデータを宣言し、コンポーネントの役割を明確にする。使用するデータが更新されたらレンダリングが発火する。
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
余談：`ProfileEditScreen`で`type User(ID:2の森岡)`を更新すると、このUserを使用している`ProfileEditScreen`, `ProfileScreen`, `UsersScreen`が再レンダリングされる。

### キャッシュ管理
データ単位でキャッシュを管理してくれる。例えば`UsersScreen`で`type User(ID:2の森岡)`を取得しているので、同じデータを使う`ProfileScreen`や`ProfileEditScreen`ではキャッシュからデータを取得する。
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
### QueryとFragmentについて
説明文を整理中...。
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

ハマりポイント
---
ハマったポイントを再現確認＆列挙中。。追々更新していきます。
#### idにintは使えない
```
# schema.graphql
type User {
  id: Int!
  name: String!
}
# UsersScreen.tsx
query UsersScreenQuery {
  users {
    id
    name
  }
}
---> Invariant Violation: RelayResponseNormalizer: Expected id of elements of field `users` to be strings.
```
#### idはすべてのデータにおいてユニークでないとエラーになる
```
users: {
  id: '1', <--- これと
  name: 'ゲスト',
  posts: [
    {
      id: '1', <--- これが一緒だと以下のエラーが出る
      title: '投稿タイトル',
    },
  ],
}
Warning: RelayResponseNormalizer: Invalid record `1`. Expected __typename to be consistent, but the record was assigned conflicting types `User` and `Post`. The GraphQL server likely violated the globally unique id requirement by returning the same id for different objects.
```
#### Queryでフラグメントを使用することを宣言していないと、子コンポーネントで使用できない。
```
# src/screens/UserScreen.tsx
# ...UserPost_userを宣言しないと、FragmentRefs<"UserPost_user">が生成されず、
# <UserPost />でUserScreenQueryのFragmentが使用できない。
query UserScreenQuery($id: ID!) {
  user(id: $id) {
    id
    name
    ...UserPost_user
  }
}
```
#### graphqlのQuery名は命名ルールを守らないとコンパイルエラーになる
```
# src/screens/UsersScreen.tsx
query UsersQuery {
  users {
    id
    name
  }
}
---> [ERROR] ✖︎ Queries in graphql tags must start with the module name ('UsersScreen') and end with 'Query'. Got 'UsersQuery' instead.
```