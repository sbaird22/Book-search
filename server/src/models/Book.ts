import mongoose, { Schema, Document } from 'mongoose';

// Define the Book interface for TypeScript
export interface IBook extends Document {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
}

// Define the schema
const bookSchema = new Schema<IBook>({
    bookId: {
    type: String,
    required: true,
    unique: true,
    },
    authors: [
    {
        type: String,
    },
    ],
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
});

// Export the model
export const Book = mongoose.model<IBook>('Book', bookSchema);
