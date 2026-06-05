const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    likedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    commenterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    commenterUsername: {
      type: String,
      required: true,
      trim: true,
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      default: '',
      trim: true,
      maxlength: 5000,
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model('Post', postSchema);
