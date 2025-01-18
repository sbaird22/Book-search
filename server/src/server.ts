import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import db from './config/connection';
import typeDefs from './schemas/typeDefs'; // GraphQL schema
import { resolvers } from './schemas/resolvers'; // GraphQL resolvers
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// JWT-based authentication
const getUserFromToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET_KEY || 'defaultsecret';
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

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
      const user = getUserFromToken(token);
      return { user };
    },
  })
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
