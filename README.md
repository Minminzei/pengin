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
