const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getPosts,
  createPost,
  likePost,
  commentPost,
} = require('../controllers/postController');

const router = express.Router();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', getPosts);
router.post('/', authMiddleware, upload.single('image'), createPost);
router.put('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, commentPost);

module.exports = router;
