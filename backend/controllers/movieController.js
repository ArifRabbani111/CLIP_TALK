const tmdbApi = require('../config/tmdb');
const Movie = require('../models/Movie');

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Private
const searchMovies = async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query }
    });

    // Format results for frontend
    const movies = response.data.results.map(movie => ({
      tmdbId: movie.id,
      title: movie.title,
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
      genre: movie.genre_ids || [],
      description: movie.overview || 'No description available'
    }));

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies' });
  }
};

// @desc    Get movie details
// @route   GET /api/movies/:id
// @access  Private
const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if movie exists in our database
    let movie = await Movie.findOne({ tmdbId: id });
    
    if (movie) {
      return res.json(movie);
    }

    // Fetch from TMDb if not in DB
    const response = await tmdbApi.get(`/movie/${id}`);
    const tmdbMovie = response.data;
    
    // Create new movie document
    movie = new Movie({
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      poster: tmdbMovie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      releaseYear: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 'Unknown',
      genre: tmdbMovie.genres ? tmdbMovie.genres.map(g => g.name) : [],
      description: tmdbMovie.overview || 'No description available'
    });
    
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie details' });
  }
};

module.exports = {
  searchMovies,
  getMovieDetails
};