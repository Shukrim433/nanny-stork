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

//addUser(username: String!, email: String!, password: String!): Auth
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

// addPregnancyTracker(stage: Stage!, dueDate: String, birthDate: String): PregnancyTracker
export const ADD_PREGNANCY_TRACKER =gql`
  mutation addPregnancyTracker($stage: Stage!, $dueDate: String!, $birthDate: String!) {
    addPregnancyTracker(stage: $stage, dueDate: $dueDate, birthDate: $birthDate) {
      _id
      userId
      stage
      dueDate
      birthDate
    }
  }
`;

// addPost(postText: String!, postTitle: String): Post
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

// addComment(postId: ID!, commentText: String!): Post
export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation AddFriend($friendName: String!) {
  addFriend(friendName: $friendName) {
    _id
    friends {
      _id
      username
    }
  }
}
`;

export const REMOVE_FRIEND = gql`
`