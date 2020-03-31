import 'module-alias/register';

import dotenv from 'dotenv';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server';

import initDB from './models/init';
import schema from './schema';
import resolvers from './resolvers';
import { checkEnv } from './util';
import { authenticateToken } from './models/users';

dotenv.config();
checkEnv('DB_NAME');
checkEnv('DB_ADDRESS');
checkEnv('APP_SECRET');

const server = new ApolloServer({
  context: async ({ req }) => {
    const userData = await authenticateToken(req.headers.authorization ?? '');
    return userData;
  },
  typeDefs: schema,
  resolvers,
  validationRules: [depthLimit(5)],
});

initDB()
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
