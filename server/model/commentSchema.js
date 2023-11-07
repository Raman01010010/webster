const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  postId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post', // Reference to a User schema (if you have one)
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_w', // Reference to a User schema (if you have one)
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who upvoted the comment
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who downvoted the comment
  }],
  //replies: [commentSchema], // Nested replies using the same schema
});

// Create a Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
