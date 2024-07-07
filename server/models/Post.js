const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PostSchema = new Schema({
  postTitle: {
    type: String,
    required: true,
    trim: true,
  },
  postText: {
    type: String,
    required: "You need to leave a thought!",
    minlength: 1,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  postCategory: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = model("Post", PostSchema);

module.exports = Post;
