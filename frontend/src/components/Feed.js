import React, { useState, useEffect } from 'react';
import { getActivityFeed } from '../services/api';
import ReviewItem from './Reviews/ReviewItem';

const Feed = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const { data } = await getActivityFeed();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

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
      <h1 className="text-3xl font-bold text-white mb-8">Recent Activity</h1>
      
      {reviews.length === 0 ? (
        <div className="bg-letterboxd-light p-8 rounded-lg text-center">
          <p className="text-gray-300">No recent activity. Start watching and reviewing movies!</p>
        </div>
      ) : (
        <div>
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;