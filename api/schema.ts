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
    published: Boolean!
    link: String
  }
  input UserInput {
    id: ID!
    name: String!
    location: String!
    comment: String
  }
  type Mutation {
    saveUser(input: UserInput): User!
  }
`);

export default schema;