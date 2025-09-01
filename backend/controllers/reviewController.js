const Review = require('../models/Review');
const Movie = require('../models/Movie');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { movieId, rating, reviewText, watchedDate } = req.body;
  
  if (!movieId || !rating) {
    return res.status(400).json({ message: 'Movie ID and rating are required' });
  }
  
  try {
    // Check if movie exists
    const movie = await Movie.findById(movieId);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({
      userId: req.user._id,
      movieId
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }
    
    // Create new review
    const review = new Review({
      userId: req.user._id,
      movieId,
      rating,
      reviewText: reviewText || '',
      watchedDate: watchedDate || Date.now()
    });
    
    await review.save();
    
    // Populate user info for response
    await review.populate('userId', 'username profilePicture');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get reviews for a movie
// @route   GET /api/reviews/movie/:movieId
// @access  Private
const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get activity feed
// @route   GET /api/reviews/feed
// @access  Private
const getActivityFeed = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'username profilePicture')
      .populate('movieId', 'title poster releaseYear')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user reviews
// @route   GET /api/reviews/user/:userId
// @access  Private
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .populate('movieId', 'title poster releaseYear')
      .sort({ watchedDate: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReview,
  getMovieReviews,
  getActivityFeed,
  getUserReviews
};