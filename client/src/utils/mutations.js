import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

// HOW TO WRITE MUTATIONS FOR SAVE_BOOK? is it similar to this one for ADD_SKILL?
// try it and see

export const SAVE_BOOK = gql`
  mutation saveBook($bookType: BookInput!) {
    saveBook(bookType: $bookType) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }`;


export const REMOVE_BOOK = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      username
      books
    }
  }
`;
