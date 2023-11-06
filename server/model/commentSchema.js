const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to a User schema (if you have one)
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
  replies: [commentSchema], // Nested replies using the same schema
});

// Create a Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
