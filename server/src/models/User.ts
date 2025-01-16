import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

// Define the User interface for TypeScript
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: Array<{
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
    }>;
    isCorrectPassword: (password: string) => Promise<boolean>;
}

// Define the schema
const userSchema = new Schema<IUser>({
    username: {
    type: String,
    required: true,
    unique: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    },
    bookCount: {
    type: Number,
    default: 0,
    },
    savedBooks: [
        {
        bookId: {
        type: String,
        required: true,
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
        },
    ],
});

// Hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare the provided password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

// Export the model
export const User = mongoose.model<IUser>('User', userSchema);
