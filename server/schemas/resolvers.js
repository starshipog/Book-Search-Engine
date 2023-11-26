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


    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
