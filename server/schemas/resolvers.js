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

    saveBook: async (parent, { bookType }, context ) => {
      console.log(bookType)
      console.log(context)
      const save = await User.findOneAndUpdate(
        { _id: context.user._id },
        {$push: { savedBooks: bookType } },
        {new: true}
      );
      return save;
    },
    removeBook: async (parent, { bookType }, context ) => {
      const deleting = await Book.findOneAndDelete(
        { _id: context.user._id },
        {$push: { savedBooks: bookType } },
        {new: true}
      );
      return deleting;
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
