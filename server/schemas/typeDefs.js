const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]!
    friends: [User]!
  }

  type Post {
    _id: ID
    postTitle: String
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
    pregnancyTrackers: [PregnancyTracker]
    pregnancyTracker(trackerId: ID!): PregnancyTracker
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, postTitle: String): Post
    addComment(postId: ID!, commentText: String!): Post
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addPregnancyTracker(stage: Stage!, dueDate: String, birthDate: String): PregnancyTracker
    updatePregnancyTracker(trackerId: ID!, stage: Stage, dueDate: String, birthDate: String): PregnancyTracker
    removePregnancyTracker(trackerId: ID!): PregnancyTracker
  }
    
`

module.exports = typeDefs;

//_id is the id of the pregnancy tracker - userId is the id of the user associated with that pregnancy tracker
// for the add/updatePregnancyTracker mutation:  since we're creating a pregnancy tracker for the currently logged-in user, 
//we don't need to pass userId as an argument. You can retrieve it from the context.user. in the resolver (same as commentAuthor)
// friendId is just the user id of the friend