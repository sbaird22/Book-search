import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import GraphQL schema and resolvers
import { typeDefs } from './schemas/typeDefs'; // To be created
import { resolvers } from './schemas/resolvers'; // To be created

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {

});

mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB');
});

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

(async () => {
    await server.start();
    app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
        const token = req.headers.authorization || '';
        return { token }; // Pass the token to the resolvers
        },
        })
    );

  // Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
})();
