const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    thoughts: [Thought]!
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

  type PregnancyTracker {
    _id: ID
    userId: ID
    stage: Stage
    dueDate: String
    birthDate: String
    }

  enum Stage {
    pregnancy
    postpartum
}

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
    pregnancyTracker: [PregnancyTracker]
    pregnancyTrackers(userId: ID!): [PregnancyTracker]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addPregnancyTracker(userId: ID!, stage: Stage!, dueDate: String, birthDate: String): PregnancyTracker
    updatePregnancyTracker(id: ID!, userId: ID, stage: Stage, dueDate: String, birthDate: String): PregnancyTracker
    removePregnancyTracker(_id: ID!): PregnancyTracker
  }
    
`