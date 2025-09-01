const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        return done(null, user);
      }
      
      // Create new user
      user = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value,
        password: 'google_oauth' // Placeholder password
      });
      
      await user.save();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

// Google auth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);

// Regular auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getUserProfile);

module.exports = router;