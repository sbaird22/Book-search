import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

// Export the connection
export default mongoose.connection;
