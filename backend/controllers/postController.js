const Post = require('../models/Post');
const imagekit = require('../services/imagekit');

const normalizePost = (post, currentUserId = null) => {
  const likes = post.likes || [];
  const comments = post.comments || [];
  const likedByMe = currentUserId
    ? likes.some((like) => like.userId.toString() === currentUserId.toString())
    : false;

  return {
    id: post._id,
    userId: post.userId?.toString(),
    username: post.username,
    text: post.text,
    imageUrl: post.imageUrl,
    likes: likes.map((like) => ({
      userId: like.userId?.toString(),
      username: like.username,
      likedAt: like.likedAt,
    })),
    comments: comments.map((comment) => ({
      id: comment._id,
      commenterUserId: comment.commenterUserId?.toString(),
      commenterUsername: comment.commenterUsername,
      commentText: comment.commentText,
      createdAt: comment.createdAt,
    })),
    likeCount: likes.length,
    commentCount: comments.length,
    likedByMe,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

const uploadToImageKit = async (file) => {
  if (!file) return '';

 const uploadedFile = await imagekit.files.upload({
    file: file.buffer.toString('base64'),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: 'mini-social-post-app',
    useUniqueFileName: true,
  });

  return uploadedFile.url || '';
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const normalized = posts.map((post) => normalizePost(post, req.user?.id));
    return res.json({ posts: normalized });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ message: 'Server error fetching posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const { text = '' } = req.body;
    const trimmedText = text.trim();
    const imageUrl = req.file
      ? await uploadToImageKit(req.file)
      : (req.body.imageUrl || '').trim();

    if (!trimmedText && !imageUrl) {
      return res.status(400).json({ message: 'Post must include text, image, or both' });
    }

    const post = await Post.create({
      userId: req.user.id,
      username: req.user.name,
      text: trimmedText,
      imageUrl,
      likes: [],
      comments: [],
    });

    return res.status(201).json({
      message: 'Post created successfully',
      post: normalizePost(post, req.user.id),
    });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({ message: 'Server error creating post' });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingIndex = post.likes.findIndex(
      (like) => like.userId.toString() === req.user.id.toString()
    );

    if (existingIndex >= 0) {
      post.likes.splice(existingIndex, 1);
    } else {
      post.likes.push({
        userId: req.user.id,
        username: req.user.name,
        likedAt: new Date(),
      });
    }

    await post.save();
    return res.json({
      message: 'Post like updated',
      post: normalizePost(post, req.user.id),
    });
  } catch (error) {
    console.error('Like post error:', error);
    return res.status(500).json({ message: 'Server error updating like' });
  }
};

const commentPost = async (req, res) => {
  try {
    const { commentText } = req.body;

    if (!commentText || !commentText.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      commenterUserId: req.user.id,
      commenterUsername: req.user.name,
      commentText: commentText.trim(),
      createdAt: new Date(),
    });

    await post.save();

    return res.status(201).json({
      message: 'Comment added successfully',
      post: normalizePost(post, req.user.id),
    });
  } catch (error) {
    console.error('Comment post error:', error);
    return res.status(500).json({ message: 'Server error adding comment' });
  }
};

module.exports = { getPosts, createPost, likePost, commentPost };
