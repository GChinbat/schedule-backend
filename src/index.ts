import 'module-alias/register';

import dotenv from 'dotenv';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server';

import initDB from './models/init';
import schema from './schema';
import resolvers from './resolvers';

dotenv.config();
if (!process.env.DB_NAME) {
  throw Error(
    'Did not find DB_NAME environment variable. Did you set it in .env file?',
  );
}
if (!process.env.DB_ADDRESS) {
  throw Error(
    'Did not find DB_ADDRESS environment variable. Did you set it in .env file?',
  );
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  validationRules: [depthLimit(5)],
});

initDB()
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
