const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// @desc    Create a comment
// @route   POST /api/comments
// @access  Private
router.post('/', auth, async (req, res) => {
  const { reviewId, text } = req.body;
  
  if (!reviewId || !text) {
    return res.status(400).json({ message: 'Review ID and text are required' });
  }
  
  try {
    const comment = new Comment({
      reviewId,
      userId: req.user._id,
      text
    });
    
    await comment.save();
    
    // Populate user info for response
    await comment.populate('userId', 'username profilePicture');
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get comments for a review
// @route   GET /api/comments/review/:reviewId
// @access  Private
router.get('/review/:reviewId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ reviewId: req.params.reviewId })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;