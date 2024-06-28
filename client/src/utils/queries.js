import { gql } from '@apollo/client';


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
    }
  }
`;

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
      createdAt
    }
  }
`;