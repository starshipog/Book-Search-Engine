const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },


  Mutation: {

    saveBook: async (parent, { _id, userNum }) => {
      const save = await User.findOneAndUpdate(
        {_id},
        {$inc: { [`user${userNum}_books`]: 1 } },
        {new: true}
      );
      return book;
    },
    removeBook: async (parent, { _id, userNum }) => {
      const deleting = await Book.findOneAndDelete(
        { _id },
        { $inc: { [`user${userNum}_books`]: 1 } },
        { new: true }
      );
      return book;
    },


    addUser: async (parent, args) => {
      const user = await User.create(args);
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
