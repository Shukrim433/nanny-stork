const { User, Post, PregnancyTracker } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // query to get an array of all the users and their associated posts and friends arrays
    // users: [User]
    users: async () => {
      try {
        return await User.find().populate("posts").populate("friends").populate('tracker');
      } catch (error) {
        console.error("Server Error fetching users:", error);
      }
    },
    // query to get a single user object by their username and their associated posts and friends arrays
    // user(username: String!): User
    user: async (parent, { username }) => {
        console.log(username, "username in resolver")
      try {
        return await User.findOne({ username })
          .populate("posts")
          .populate("friends").populate('tracker');
      } catch (error) {
        console.error("Server Error fetching user:", error);
      }
    },
    // searchCategories(category: String) : [Post]
    searchCategories: async (parent, { category }) => {
      try {
        Post.find({postCategory: category})
      } catch(error) {
        console.error("Server Error fetching posts by category:", error);
      }
    },
    // searchPosts(query: String!): [Post]
    searchPosts:  async (parent, { query }) => {
      try {
        return Post.find({
          $or: [
            { postTitle: { $regex: query, $options: 'i' } },
             { postCategory: { $regex: query, $options: 'i' } },  
            { postAuthor: { $regex: query, $options: 'i' } }
          ]
        })
      } catch(error) {
        console.error("Server Error fetching searchPosts:", error);
      }
    },

    // query to get an array of all the posts of a specific user (or if no username is passed into this resolver it will just get all posts by all users = "{}" empty filter)
    // posts(username: String): [Post]
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      try {
        return await Post.find(params).sort({ createdAt: -1 });
      } catch (error) {
        console.error("Server Error fetching users posts:", error);
      }
    },
    // query to get a single post object based on its _id
    // post(postId: ID!): Post
    post: async (parent, { postId }) => {
      try {
        return await Post.findOne({ _id: postId });
      } catch (error) {
        console.error("Server Error fetching single post:", error);
      }
    },
    // query to get an array of all pregnancy trackers and each associated user
    // pregnancyTrackers: [PregnancyTracker]
    pregnancyTrackers: async () => {
      try {
        return await PregnancyTracker.find().populate("userId");
      } catch (error) {
        console.error("Server Error fetching pregnancy trackers:", error);
      }
    },
    // query to get a single pregnancy tracker object and the associated user
    // pregnancyTracker(trackerId: ID!): PregnancyTracker
    pregnancyTracker: async (parent, { trackerId }) => {
      try {
        return await PregnancyTracker.findOne({ _id: trackerId }).populate(
          "userId"
        );
      } catch (error) {
        console.error("Server Error fetching user's preganacy tracker:", error);
      }
    },
    // query to get the current logged-in user based on the context's user _id
    // me: User
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          return User.findOne({ _id: context.user._id })
            .populate("posts")
            .populate("friends");
        } catch (error) {
          console.error("Server Error fetching me/loggedin user:", error);
        }
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // mutation to sign up and create a jwt. returns user object and jwt
    // addUser(username: String!, email: String!, password: String!): Auth
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Server Error creating user:", error);
      }
    },
    // mutation to login(authenticate existing user) and create a jwt. returns user object and jwt
    // login(email: String!, password: String!): Auth
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error("Server Error loggin in user:", error);
      }
    },
    // mutation to create a post and update a specfic user's "posts" array with that created post (only if logged in)
    // addPost(postText: String!, postTitle: String): Post
    addPost: async (parent, { postText, postTitle }, context) => {
      if (context.user) {
        try {
          const post = await Post.create({
            postTitle,
            postText,
            postAuthor: context.user.username,
          });
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { posts: post._id } }
          );

          return post; // may need to remove
        } catch (error) {
          console.error("Server Error adding post to user:", error);
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
              new: true,
            }
          );
        } catch (error) {
          console.error("Server Error adding comment to post:", error);
        }
      }
      throw AuthenticationError;
    },
    // mutation to update a user by adding another user to their "friends" array (only if logged in)
    // addFriend(username: ID!): User
    addFriend: async (parent, { friendName }, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to perform this action');
        }
        try {
          const friend = await User.findOne({ username: friendName });
          if (!friend) {
            throw new Error('Friend not found');
          }
          // Add the friend's _id to the current user's friends array
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friend._id } }, // Add friend's _id as users is an array of objects
            { new: true }
          ).populate('friends'); // Populate the friends field to match the expected return type
      
          if (!updatedUser) {
            throw new Error('User not found after update');
          }
      
          return updatedUser;
        } catch (error) {
          console.error("Server Error adding friend to user:", error);
          throw new Error('Error adding friend');
        }
      },
    // mutation to create a pregnancy tracker (the associated user wil be the user currently logged in)
    // addPregnancyTracker(stage: Stage!, dueDate: String, birthDate: String): PregnancyTracker
    addPregnancyTracker: async (
      parent,
      { stage, dueDate, birthDate },
      context
    ) => {
      console.log(stage, dueDate, birthDate, "client data");
      console.log(context.user, context?.user?._id, "user data");

      if (context?.user) {
        try {
          const pregnancyTrackerData = await PregnancyTracker.create({
            userId: context?.user?._id,
            stage,
            dueDate: dueDate || "",
            birthDate: birthDate || "",
          });

          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { tracker: pregnancyTrackerData._id } }
          );

          return pregnancyTrackerData;
        } catch (error) {
          console.error("Server Error creating pregnancy tracker:", error);
        }
      }

      throw AuthenticationError;
    },
    
    // mutation to update a single existing pregnancy tracker, 
    // updatePregnancyTracker(trackerId: ID!, stage: Stage, dueDate: String, birthDate: String): PregnancyTracker
    updatePregnancyTracker: async ( parent, { trackerId, stage, dueDate, birthDate }, context ) => {
        console.log(trackerId, stage, dueDate, birthDate, "passed to update resolver")
      if (context.user) {
        try {
            const updateFields = {}
            if (stage !== undefined) updateFields.stage = stage
            if (dueDate !== undefined) updateFields.dueDate = dueDate
            if (birthDate !== undefined) updateFields.birthDate = birthDate

            const updatedTracker = await PregnancyTracker.findOneAndUpdate(
            {
              _id: trackerId,
              userId: context.user._id,
            }, // find one where _id = pregtracker's id AND userId = loggedin user's id  - so users can only update their own pregTracker
            { $set: updateFields },
            { new: true }
          );
          return updatedTracker

        } catch (error) {
          console.error("Server Error updating pregnancy tracker:", error);
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
            userId: context.user._id,
          }); // delete one where _id = pregtracker's id AND userId = loggedin user's id - so users can only delete their own pregTracker
        } catch (error) {
          console.error("Server Error deleting pregnancy tracker:", error);
        }
      }
      throw AuthenticationError;
    },
    // mutation to update a user by removing another user from their "friends" array (only if logged in)
    // removeFriend(friendId: ID!): User
    
 removeFriend: async (parent, { friendName }, context) => { // copied from addFriend with the change of pull instead of addToSet
    if (!context.user) {
      throw new AuthenticationError('You must be logged in to perform this action');
    }
    try {
      const friend = await User.findOne({ username: friendName });
      if (!friend) {
        throw new Error('Friend not found');
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { friends: friend._id } }, // Remove by friend's _id
        { new: true }
      ).populate('friends'); 
  
      if (!updatedUser) {
        throw new Error('User not found after update');
      }
  
      return updatedUser;
    } catch (error) {
      console.error("Server Error removing friend from user:", error);
      throw new Error('Error removing friend');
    }
  },
    // mutation to delete a post and update a specific user by removing the deleted post from their "posts" array (only if logged in)
    // removePost(postId: ID!): User
    removePost: async (parent, { postId }, context) => {
      console.log(postId, "resolver")
      if (context.user) {
        try {
          const post = await Post.findOneAndDelete({
            _id: postId,
            postAuthor: context.user.username,
          });

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { posts: post._id } }
          );

          return user;
        } catch (error) {
          console.error("Server Error removing post from user:", error);
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
        } catch (error) {
          console.error("Server Error removing comment from post:", error);
        }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
