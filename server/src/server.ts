import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/api/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { getUserFromToken } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const user = getUserFromToken(token); // Reuse JWT logic
      return { user };
    },
  })
);

// Static assets for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
