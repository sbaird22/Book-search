import express from 'express';
import path from 'node:path';
import mongoose from 'mongoose';
import routes from './routes/api/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { getUserFromToken } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;
//app.listen(3001, () => console.log(`Server running on port 3001`));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/googlebooks';

console.log('Server setup starting...'); // Debug log 1

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log('Middleware added...'); // Debug log 2

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log('Apollo Server initializing...'); // Debug log 3

await server.start();
console.log('Apollo Server started...'); // Debug log 4

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

console.log('GraphQL middleware added...'); // Debug log 5

// Static assets for production
if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: Serving static files...'); // Debug log 6
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);
console.log('Routes added...'); // Debug log 7

// MongoDB connection setup
console.log('Connecting to MongoDB...'); // Debug log 10

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully'); // Debug log 8

  // Start the server only after DB connection is established
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});

console.log('Server setup complete, waiting for DB connection...'); // Debug log 9