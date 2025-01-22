import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks';

// Log the MongoDB URI for debugging
console.log('MongoDB URI:', MONGODB_URI);

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB fails to connect
    });

export default mongoose.connection;
