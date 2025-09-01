import React, { useState } from 'react';
import { createReview } from '../../services/api';
import { StarIcon } from '@heroicons/react/solid';

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [watchedDate, setWatchedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setSubmitting(true);
    try {
      await createReview({ 
        movieId, 
        rating, 
        reviewText,
        watchedDate
      });
      onReviewAdded();
      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 mb-8">
      <h3 className="text-xl font-bold text-letterboxd-text-bright mb-6">Add Your Review</h3>
      
      <div className="mb-6">
        <label className="block text-letterboxd-text mb-3">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl focus:outline-none"
            >
              <StarIcon 
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating) 
                    ? 'text-yellow-400' 
                    : 'text-letterboxd-border'
                } transition-colors duration-200`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-letterboxd-text mb-2">Date Watched</label>
        <input
          type="date"
          value={watchedDate}
          onChange={(e) => setWatchedDate(e.target.value)}
          className="input"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-letterboxd-text mb-2">Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="input min-h-[120px] resize-none"
          placeholder="Share your thoughts about this movie..."
        />
      </div>
      
      <button
        type="submit"
        disabled={submitting || rating === 0}
        className={`btn btn-primary w-full flex items-center justify-center ${
          (submitting || rating === 0) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {submitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-letterboxd" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
};

export default ReviewForm;