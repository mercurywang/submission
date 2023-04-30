const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      const byAuthor = args?.author;
      const byGenre = args?.genre;
      if (!byAuthor && !byGenre) {
        return await Book.find({});
      }

      if (byAuthor && !byGenre) {
        return await Book.find({ author: byAuthor });
      }

      if (!byAuthor && byGenre) {
        return await Book.find({ genres: byGenre });
      }

      if (byAuthor && byGenre) {
        return await Book.find({ genres: byGenre, author: byAuthor });
      }
    },
    allAuthors: async () => {
      const books = await Book.find({});
      return (await Author.find({})).map(({ name, born }) => ({
        name,
        bookCount: books.filter((book) => book.author === name).length || 0,
        born
      }));
    },
    me: (_root, _args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (_root, args) => {
      const book = new Book({ ...args });

      return book.save().catch((error) => {
        throw new GraphQLError('Creating the book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      });
    },
    addAuthor: async (_root, args) => {
      const author = new Author({ name: args.name });

      return author.save().catch((error) => {
        throw new GraphQLError('Creating the author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      });
    },
    editAuthor: async (_root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Updating the author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      return author;
    },
    createUser: async (_root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      });
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
};

module.exports = resolvers;
