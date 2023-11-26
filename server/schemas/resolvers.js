const { User, Book } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const book = await Book.create(args);
      return book;
    },
    createVote: async (parent, { _id, userNum }) => {
      const vote = await Book.findOneAndUpdate(
        { _id },
        { $inc: { [`user${userNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    saveBook: async (parent, args) => {
      const save = await Book.save(args);
      return book;
    },
    removeBook: async (parent, { _id, userNum }) => {
      const deleting = await Book.findOneAndDelete(
        { _id },
        { $inc: { [`user${userNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    // login: async (parent, args) => {
    //   const login = await Book.delete(args);
    //   return book;
    // },
    // addUser: async (parent, { _id, userNum }) => {
    //   const addUser = await Book.findOneAndDelete(
    //     { _id },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
