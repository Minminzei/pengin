概要＆起動
----
#### このレポジトリについて
Recoil/ React Navigation/ GraphQL + React Relay/ Typescriptを使ったシステム開発の調査用に作ったサンプルです。
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
Reactで管理するStateは３つ。
|    State       | 概要          | 管理方法          |
|------------------|--------------------|--------------------|
| サーバーデータ | APIリクエストで取得したデータのキャッシュ | GraphQL + React Relay|
| Global State | コンポーネントを跨いで共有したいState。インターネットのオン/オフやトーストメッセージなど。 | Recoil |
| Local State | 各コンポーネント内で使うState | React Hook |
[参考URL](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)

GraphQL/ React Relay
-----
### GraphQLとは？
宣言的なリクエスト(declarative data fetching)を実装するためのクエリ言語。
- 使用するすべての①APIの仕様と②やり取りするデータの型を定義することで実行結果を明確化する
- over-fetchやunder-fetchを防ぐ。
- backendとfrontendの分離が可能になる。

### Schema
リクエストの仕様と、やり取りされるデータを定義する。SDL(Schema Definition Language)を使って記述することで、特定の言語依存を避ける(Ex. PHP, JS etc..)。ここで宣言されていない通信やデータを使おうとするとエラーが出る。
```
# schema.graphql
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
特定のユーザーを取得したい場合のリクエストとリクエスト結果。
```
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
---
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
存在しないAPIやデータを使おうとするとエラーになる
```
query {
  user(name: "ゲスト") {
    id
    name
    image
  }
}
```

ReactRelayとは
-----
GraphQLをReactで実装するためのフレームワーク
#### データとComponentの関連付け（GlobalStateの管理）
 - コンポーネントごとに必要なデータを宣言し、コンポーネントの役割を明確にする。
 - サブスクライブしたデータが更新されたら再レンダリングが行われる。

#### キャッシュ
 - サーバーから取得したデータのキャッシュ管理を行う。

ReactRelayのキー概念
-----
#### Schema
GraphQLで使うAPIの仕様とデータの型を宣言したもの。SDL(Schema Definition Language)で定義。
https://graphql.org/learn/schema/
```
# schema.graphql
## APIの仕様。エンドポイントにusersを渡すと、[User!]というデータが返ってくる
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

#### Query
サーバーから取得したデータ。コンポーネントごとに使いたいAPIとデータの型を宣言＆サブスクライブする。usersが更新されると再レンダリングが発火する。
```
# 記述例：エンドポイントにusersを指定すると、以下のデータが返ってくる
# UsersScreenComponent.tsx
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
        published
        link
      }
    }
  }
`;
```

#### Fragment
Queryの中からコンポーネントごとに必要なデータ。コンポーネントごとに、どのQueryのどんなデータを使いたいかを宣言＆サブスクライブする。
```
# UserPostComponent.tsx
const data = useFragment(
  graphql`
    fragment UserPostComponent_users on Users {
      name
      posts: {
        title
      }
  `,
  props.user,
);
```
