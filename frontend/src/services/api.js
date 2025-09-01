import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Set auth token for every request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// Auth APIs
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const googleSignIn = (accessToken) => API.post('/auth/google', { accessToken });

// Movie APIs
export const searchMovies = (query) => API.get(`/movies/search?query=${query}`);
export const getMovieDetails = (id) => API.get(`/movies/${id}`);

// Review APIs
export const createReview = (reviewData) => API.post('/reviews', reviewData);
export const getMovieReviews = (movieId) => API.get(`/reviews/movie/${movieId}`);
export const getActivityFeed = () => API.get('/reviews/feed');
export const getUserReviews = (userId) => API.get(`/reviews/user/${userId}`);

// User APIs
export const getUserProfile = (id) => API.get(`/users/${id}`);
export const updateUserProfile = (id, formData) => API.patch(`/users/${id}`, formData);
export const connectAccount = (id, platform, token) => API.patch(`/users/${id}/connect`, { platform, token });

// Comment APIs
export const createComment = (commentData) => API.post('/comments', commentData);
export const getReviewComments = (reviewId) => API.get(`/comments/review/${reviewId}`);

export default API;