import { gql } from "@apollo/client";

// user(username: String!): User
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        postAuthor
        postCategory
        createdAt
      }
      friends {
        _id
        username
        email
      }
      tracker {
      _id
      stage
      dueDate
      birthDate
      }
      savedPosts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
      }
      friends {
        _id
        username
        email
      }
    }
  }
`;

// searchPosts(query: String!): [Post]
export const SEARCH_POSTS = gql`
  query searchPosts($query: String!) {
    searchPosts(query: $query) {
       _id
      postTitle
      postText
      postAuthor
      postCategory
      createdAt
    }
  }
`
// searchCategories(category: String) : [Post]
export const SEARCH_CATEGORIES = gql`
  query searchCategories($category: String) {
    searchCategories(category: $category) {
       _id
      postTitle
      postText
      postAuthor
      postCategory
      createdAt
    }
  }
`

// post(postId: ID!): Post
export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      postCategory
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// pregnancyTracker(trackerId: ID!): PregnancyTracker
export const QUERY_PREGNANCY_TRACKER = gql`
  query getPregnancyTracker($trackerId: ID!) {
    pregnancyTracker(trackerId: $trackerId) {
      _id
      userId
      stage
      dueDate
      birthDate
    }
  }
`

// getPosts - name of the query
// posts - name of resolver function to fetch an array of all posts
// {} - what is returned by this query (an array of post objects)
export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postTitle
      postText
      postAuthor
      postCategory
      createdAt
    }
  }
`;