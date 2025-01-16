import { User } from '../models/User'; // User Mongoose model (to be created)
import { Book } from '../models/Book'; // Book Mongoose model (to be created)

export const resolvers = {
    Query: {
        me: async (parent: any, args: any, context: any) => {
            const user = context.user;
                if (!user) {
                throw new Error('You are not authenticated!');
                }
                return await User.findById(user._id).populate('savedBooks');
            },
    },

    Mutation: {
        login: async (parent: any, { email, password }: any) => {
      // Login logic here
        },
        addUser: async (parent: any, { username, email, password }: any) => {
      // User creation logic here
        },
        saveBook: async (parent: any, { bookData }: any, context: any) => {
      // Save book logic here
        },
        removeBook: async (parent: any, { bookId }: any, context: any) => {
      // Remove book logic here
        },
    },
};
