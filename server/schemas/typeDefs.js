const typeDefs = `
  type Query {
    me(id: ID!): User
    books: [Book]
  }

  type Mutation {
  login(email: String!, password: String!): Auth
  addUser(name: String!, email: String!, password: String!): Auth

  createBook(profileId: ID!, skill: String!): Profile
  createVote(profileId: ID!): Profile
  
  saveBook(profileId: ID!, skill: String!): Profile
  removeBook(profileId: ID!): Profile

}






type User {
  _id: ID
  name: String
  email: String
  bookCount: Int
  savedBooks: [Book]!
}


type books {
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

