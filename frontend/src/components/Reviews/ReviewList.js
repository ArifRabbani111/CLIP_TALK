import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;