const typeDefs = `
  type Query {
    me(id: ID!): User
    books: [Book]
  }

  type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth


  saveBook(bookType: String!): User
  removeBook(bookId: ID!): User

}



type Profile {
  _id: ID
  name: String
  email: String
  # There is now a field to store the user's password
  password: String
  books: [String]!
}


type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]!
}


type Book {
  bookId: ID
  authors: [String]!
  description: String
  title: String
  image: String!
  link: String
  books: [Book]
}

type Auth {
  token: ID!
  user: User
}
`;

module.exports = typeDefs;

