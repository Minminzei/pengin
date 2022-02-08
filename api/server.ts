import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers'

const app = express();

app.use('/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.set('port', 4000);
app.set('hostname', 'localhost');

app.listen(4000, () => {
  console.log(`connected http://${app.get('hostname')}:${app.get('port')}`);
});
