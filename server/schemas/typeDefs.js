const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
    friends: [User]!
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    addFriend(friendId: String!): User
    removeFriend(friendId: String!): User
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
    
`