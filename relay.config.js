// relay.config.js
module.exports = {
  src: './src/',
  schema: './api/schema.graphql',
  exclude: ['./src/__generated__/**'],
  artifactDirectory: './src/__generated__/',
}