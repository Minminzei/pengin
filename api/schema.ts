import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
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
    link: String
  }
  input UserInput {
    id: ID!
    name: String!
    image: String!
    location: String!
    comment: String
  }
  input ImageInput {
    uri: String!
    mimeType: String!
  }
  type UploadedImage {
    uri: String!
  }
  type Mutation {
    saveUser(input: UserInput): User!
    uploadImage(input: ImageInput): UploadedImage!
  }
`);

export default schema;