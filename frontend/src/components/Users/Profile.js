import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getUserReviews } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ReviewItem from '../Reviews/ReviewItem';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = id || currentUser._id;
        setIsOwnProfile(!id || id === currentUser._id);
        
        const userRes = await getUserProfile(userId);
        setUser(userRes.data);
        
        const reviewsRes = await getUserReviews(userId);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [id, currentUser]);

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
      {user && (
        <>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="flex-shrink-0">
              <img 
                src={user.profilePicture} 
                alt={user.username} 
                className="h-32 w-32 rounded-full object-cover border-4 border-letterboxd-accent"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-4">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              
              {user.bio && (
                <div className="bg-letterboxd-light p-4 rounded-lg mb-4">
                  <p className="text-gray-300">{user.bio}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {user.connectedAccounts.goodreads && (
                  <span className="bg-letterboxd-accent text-black px-3 py-1 rounded-full text-sm">
                    Goodreads
                  </span>
                )}
                {user.connectedAccounts.netflix && (
                  <span className="bg-letterboxd-accent text-black px-3 py-1 rounded-full text-sm">
                    Netflix
                  </span>
                )}
                {user.connectedAccounts.amazon && (
                  <span className="bg-letterboxd-accent text-black px-3 py-1 rounded-full text-sm">
                    Amazon
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {isOwnProfile ? 'Your Reviews' : `${user.username}'s Reviews`}
            </h2>
            
            {reviews.length > 0 ? (
              <div>
                {reviews.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <div className="bg-letterboxd-light p-8 rounded-lg text-center">
                <p className="text-gray-300">
                  {isOwnProfile 
                    ? "You haven't reviewed any movies yet." 
                    : `${user.username} hasn't reviewed any movies yet.`}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;