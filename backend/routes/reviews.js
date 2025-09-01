const express = require('express');
const router = express.Router();
const { 
  createReview, 
  getMovieReviews, 
  getActivityFeed,
  getUserReviews
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.post('/', auth, createReview);
router.get('/movie/:movieId', auth, getMovieReviews);
router.get('/feed', auth, getActivityFeed);
router.get('/user/:userId', auth, getUserReviews);

module.exports = router;