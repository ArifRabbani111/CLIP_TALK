import React, { useState, useEffect } from 'react';
import { createComment, getReviewComments } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CommentSection = ({ reviewId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getReviewComments(reviewId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [reviewId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const { data } = await createComment({
        reviewId,
        text: newComment
      });
      setComments([data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="text-white font-semibold mb-4">Comments</h4>
      
      {user && (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-letterboxd text-white rounded p-3 border border-gray-700 mb-2"
            rows="2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-letterboxd-accent text-black px-4 py-1 rounded text-sm font-medium hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="flex">
              <img 
                src={comment.userId.profilePicture} 
                alt={comment.userId.username} 
                className="h-8 w-8 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <div className="bg-letterboxd p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h5 className="text-white font-medium">{comment.userId.username}</h5>
                    <span className="text-gray-500 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;