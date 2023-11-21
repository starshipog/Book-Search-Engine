const typeDefs = `
type Query {
    me(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    // FIX
    // saveBook(profileId: ID!, skill: String!): Profile
    // removeBook(profileId: ID!): Profile
  }

  type User {
    _id: ID
    name: String
    email: String
    bookCount: Integer
    savedBooks: [Book]!
  }

  type Book {
    //  (Not the _id, 
    // but the book's id value returned from Google's Book API.)
    // FIX
    bookId: ID
    authors: [String]!
    descripion: String
    title: String
    image: // FIX
    link: // FIX
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
