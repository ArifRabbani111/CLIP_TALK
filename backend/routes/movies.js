const express = require('express');
const router = express.Router();
const { searchMovies, getMovieDetails } = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.get('/search', auth, searchMovies);
router.get('/:id', auth, getMovieDetails);

module.exports = router;