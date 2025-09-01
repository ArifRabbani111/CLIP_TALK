import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getMovieReviews, createReview } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ReviewForm from '../Reviews/ReviewForm';
import ReviewList from '../Reviews/ReviewList';

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewAdded, setReviewAdded] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieRes = await getMovieDetails(id);
        setMovie(movieRes.data);
        
        const reviewsRes = await getMovieReviews(movieRes.data._id);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, reviewAdded]);

  const handleReviewAdded = () => {
    setReviewAdded(!reviewAdded);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-letterboxd-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/search" className="text-letterboxd-accent hover:underline">
          &larr; Back to Search
        </Link>
      </div>
      
      {movie && (
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-400 mb-4">{movie.releaseYear}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
              <p className="text-gray-300">{movie.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre, index) => (
                  <span key={index} className="bg-letterboxd-light text-gray-300 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Add Your Review</h2>
        {user ? (
          <ReviewForm movieId={movie?._id} onReviewAdded={handleReviewAdded} />
        ) : (
          <div className="bg-letterboxd-light p-6 rounded-lg text-center">
            <p className="text-gray-300 mb-4">You need to be logged in to write a review.</p>
            <Link to="/login" className="bg-letterboxd-accent text-black px-4 py-2 rounded font-medium hover:bg-opacity-90">
              Login
            </Link>
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <div className="bg-letterboxd-light p-6 rounded-lg text-center">
            <p className="text-gray-300">No reviews yet. Be the first to review this movie!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;