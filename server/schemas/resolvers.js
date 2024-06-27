const { User, Post, PregnancyTracker } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        
        // query to get an array of all the users and their associated posts and friends arrays
        // users: [User]
        users: async () => {
            try {
                return await User.find().populate('posts').populate('friends')

            } catch (error) {
                console.error("Server Error fetching users:", error)
            }
        },
        // query to get a single user object by their username and their associated posts and friends arrays
        // user(username: String!): User
        user: async (parent, { username }) => {
            try {
                return await User.findOne({ username }).populate('posts').populate('friends')

            } catch (error) {
                console.error("Server Error fetching user:", error)
            }
        },
        // query to get an array of all the posts of a specific user
        // posts(username: String): [Post]
        posts: async (parent, { username }) => {
            const params = username ? { username } : {}
            try {
                return await Post.find(params).sort({ createdAt: -1 })
                
            } catch (error) {
                console.error("Server Error fetching users posts:", error)
            }
        },
        // query to get a single post object based on its _id
        // post(postId: ID!): Post
        post: async (parent, { postId }) => {
            try {
                return await Post.findOne({ _id: postId })

            } catch (error) {
                console.error("Server Error fetching single post:", error)
            }
        },
        // query to get an array of all pregnancy trackers and each associated user
        // pregnancyTrackers: [PregnancyTracker]
        pregnancyTrackers: async () => {
            try {
                return await PregnancyTracker.find().populate('userId')

            } catch (error) {
                console.error("Server Error fetching pregnancy trackers:", error)
            }
        },
        // query to get a single pregnancy tracker object and the associated user
        // pregnancyTracker(trackerId: ID!): PregnancyTracker
        pregnancyTracker: async (parent, { trackerId }) => {
            try {
                return await PregnancyTracker.findOne({ _id: trackerId }).populate('userId')

            } catch (error) {
                console.error("Server Error fetching user's preganacy tracker:", error)
            }
        },
        // query to get the current logged-in user based on the context's user _id
        // me: User
        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    return User.findOne({ _id: context.user._id }).populate('thoughts');

                } catch(error) {
                    console.error("Server Error fetching me/loggedin user:", error);
                }
            }
            throw AuthenticationError;
        }

    },

    Mutation: {
        // mutation to sign up and create a jwt. returns user object and jwt
        // addUser(username: String!, email: String!, password: String!): Auth
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user)
                return { token, user }
            } catch(error) {
                console.error("Server Error creating user:", error)
            }
        },        
        // mutation to login(authenticate existing user) and create a jwt. returns user object and jwt
        // login(email: String!, password: String!): Auth
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({ email })

                if (!user) { 
                    throw AuthenticationError; 
                }

                const correctPw = await user.isCorrectPassword(password)

                if (!correctPw) { 
                    throw AuthenticationError;
                }

                const token = signToken(user)

                return { token, user }
            } catch(error) {
                console.error("Server Error loggin in user:", error)
            }
        },
        // mutation to create a post and update a specfic user's "posts" array with that created post (only if logged in)
        // addPost(postText: String!): Post
        addPost: async (parent, { postText }, context) => {
            if (context.user) {
                try {
                    const post = await Post.create({ 
                        postText,
                        postAuthor: context.user.username,
                    })
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { posts: post._id } }
                    )
                
                    return post  // may need to remove
                } catch(error) {
                    console.error("Server Error adding post to user:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to update a specific post's "comments" array with that comment passed in (only if logged in)
        // addComment(postId: ID!, commentText: String!): Post
        addComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                try {
                    return await Post.findOneAndUpdate(
                        { _id: postId },
                        {
                          $addToSet: {
                            comments: { commentText, commentAuthor: context.user.username },
                          },
                        },
                        {
                          new: true
                        }
                      );
                } catch(error) {
                    console.error("Server Error adding comment to post:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to update a user by adding another user to their "friends" array (only if logged in)
        // addFriend(username: ID!): User
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                try {
                   return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { friends: friendId } },  
                        { new: true }
                    ) 

                } catch(error) {
                    console.error("Server Error adding friend to user:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to create a pregnancy tracker (the associated user wil be the user currently logged in)
        // addPregnancyTracker(stage: Stage!, dueDate: String, birthDate: String): PregnancyTracker
        addPregnancyTracker: async (parent, { stage, dueDate, birthDate }, context) => {
            if (context.user) {
                try {
                    return await PregnancyTracker.create({
                        userId: context.user._id,
                        stage,
                        dueDate,
                        birthDate
                    })
                } catch(error) {
                    console.error("Server Error creating pregnancy tracker:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to update a single existing pregnancy tracker, by the _id of the pregnancy
        // updatePregnancyTracker(trackerId: ID!, stage: Stage, dueDate: String, birthDate: String): PregnancyTracker
        updatePregnancyTracker: async (parent, { trackerId, stage, dueDate, birthDate }, context) => {
            if (context.user) {
                try {
                    return await PregnancyTracker.findOneAndUpdate(
                        { 
                            _id: trackerId,
                            userId:  context.user._id 
                        },                                      // find one where _id = pregtracker's id AND userId = loggedin user's id  - so users can only update their own pregTracker
                        { $set: { stage, dueDate, birthDate } },  
                        { new: true }
                    ) 
                } catch(error) {
                    console.error("Server Error updating pregnancy tracker:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to delete a single preganancy tracker by the tracker's _id
        // removePregnancyTracker(trackerId: ID!): PregnancyTracker
        removePregnancyTracker: async (parent, { trackerId }, context) => {
            if (context.user) {
                try {
                    return await PregnancyTracker.findOneAndDelete({ 
                        _id: trackerId,
                        userId: context.user._id 
                    })                                                 // delete one where _id = pregtracker's id AND userId = loggedin user's id - so users can only delete their own pregTracker
                } catch(error) {
                    console.error("Server Error deleting pregnancy tracker:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to update a user by removing another user from their "friends" array (only if logged in)
        // removeFriend(friendId: ID!): User
        removeFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                try {
                    return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: {friends: friendId} },  // removes the friend's _id from the user's friends array
                        { new: true }
                    )
                } catch {
                    console.error("Server Error removing friend from user:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to delete a post and update a specific user by removing the deleted post from their "posts" array (only if logged in)
        // removePost(postId: ID!): Post
        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                try {
                    const post = await Post.findOneAndDelete({
                        _id: postId,
                        postAuthor: context.user.username,
                      });
              
                    await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                    );
            
                    return post;
                
                } catch(error) {
                    console.error("Server Error removing post from user:", error)
                }
            }
            throw AuthenticationError;
        },
        // mutation to update a Post by removing a comment from its "comments array" (only if logged in)
        // removeComment(postId: ID!, commentId: ID!): Post
        removeComment: async (parent, { postId, commentId }, context) => {
            if (context.user) {
                try {
                    return Post.findOneAndUpdate(
                        { _id: postId },
                        {
                        $pull: {
                            comments: {
                            _id: commentId,
                            commentAuthor: context.user.username,
                            },
                        },
                        },
                        { new: true }
                    );
                
                } catch(error) {
                    console.error("Server Error removing comment from post:", error)
                }
            }
            throw AuthenticationError;
        },   
    }
}

module.exports = resolvers;
