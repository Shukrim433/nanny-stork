const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Post', 'posts');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      console.log('Creating post:', postSeeds[i]); // Debugging line
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        { $addToSet: { posts: _id } },
        { new: true } // Return the updated document
      );
      if (!user) {
        console.error(`No user found for username: ${postAuthor}`);
      }
    }
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});