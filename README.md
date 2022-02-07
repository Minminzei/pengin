# Recoil Sample

#### このレポジトリについて
- 概要
  - React NativeのState管理としてRecoilを調査用リポジトリです
- ゴール
  - Recoil/ React Navigation/ GraphQL + React Relayのアーキテクチャを考える

:zap:Document
---
- `Recoil` (https://recoiljs.org/docs/introduction/installation)
- `React Navigation` (https://reactnavigation.org/docs/getting-started)
- `React Relay` (https://relay.dev/docs/)

#### build(初回のみ)
```
# cocoapodsを取得
sudo gem install cocoapods
pod setup
```

```
# git clone
git clone git@github.com:Minminzei/pengin.git
```

```
# 必要なパッケージを取得してjson serverを起動
cd pengin
yarn
cd ios
pod install
cd ../
yarn server
```
xcodeでプロジェクトをbuildする
1. xcodeを起動して、open a project or fileで `pengin/ios`を開く
2. simulatorにプロジェクトをinstallする
![xcode](https://user-images.githubusercontent.com/3320542/151898522-3287b691-8e4e-47c3-82a5-c14fe4458012.jpg)

#### start(2回目以降)
```
# json serverを起動
yarn server

# iosシュミレーターで起動
yarn ios

# GraphiQLにアクセス
http://localhost:4000/graphql
```


GraphQLとは？
-----
宣言的なリクエスト(declarative data fetching)を実装するためのクエリ言語。
- 可能なクエリとやり取りされるデータの型を宣言するので実行結果が可視化される
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
