import React, { useState } from 'react';
import CommentSection from '../CommentSection';
import { ChatAlt2Icon } from '@heroicons/react/outline';

const ReviewItem = ({ review }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="card p-6 mb-6 animate-fade-in">
      <div className="flex items-start mb-4">
        <img 
          src={review.userId.profilePicture} 
          alt={review.userId.username} 
          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-letterboxd-border"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-letterboxd-text-bright font-semibold text-lg">{review.userId.username}</h3>
              <div className="flex items-center mt-1">
                <div className="flex mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-letterboxd-border'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-letterboxd-text text-sm">
                  {new Date(review.watchedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {review.reviewText && (
        <div className="mb-6 pl-16">
          <p className="text-letterboxd-text leading-relaxed">{review.reviewText}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center pt-4 border-t border-letterboxd-border">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <span>{showComments ? 'Hide Comments' : 'Show Comments'}</span>
        </button>
        
        {review.movieId && (
          <div className="flex items-center">
            <img 
              src={review.movieId.poster} 
              alt={review.movieId.title} 
              className="h-10 w-10 object-cover mr-2 rounded"
            />
            <span className="text-letterboxd-text text-sm">{review.movieId.title} ({review.movieId.releaseYear})</span>
          </div>
        )}
      </div>
      
      {showComments && (
        <div className="mt-6 pt-6 border-t border-letterboxd-border animate-slide-up">
          <CommentSection reviewId={review._id} />
        </div>
      )}
    </div>
  );
};

export default ReviewItem;