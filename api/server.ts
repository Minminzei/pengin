import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import 'dotenv/config';
import schema from './schema';
import resolvers from './resolvers'

const app = express();
app.use(express.json({ limit: '10mb' })) ;
app.use(express.static(`${__dirname}/uploads`));
console.log(`${__dirname}/uploads`);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.set('port', process.env.API_PORT);
app.set('hostname', process.env.API_HOST);

app.listen(process.env.API_PORT, () => {
  console.log(`connected http://${app.get('hostname')}:${app.get('port')}`);
});
