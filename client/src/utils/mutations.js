import { gql } from '@apollo/client';

// login(email: String!, password: String!): Auth
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

export const ADD_POST = gql`
  mutation addPost($postText: String!, $postTitle: String!) {
    addPost(postText: $postText, postTitle: $postTitle) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

