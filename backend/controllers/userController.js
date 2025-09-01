const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is updating their own profile
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      bio: updatedUser.bio,
      connectedAccounts: updatedUser.connectedAccounts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Connect external account
// @route   PUT /api/users/:id/connect
// @access  Private
const connectAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is connecting their own account
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const { platform, token } = req.body;
    
    if (!platform || !token) {
      return res.status(400).json({ message: 'Platform and token are required' });
    }
    
    if (['goodreads', 'netflix', 'amazon'].includes(platform)) {
      user.connectedAccounts[platform] = token;
      await user.save();
      
      res.json({
        message: `${platform} account connected successfully`,
        connectedAccounts: user.connectedAccounts
      });
    } else {
      res.status(400).json({ message: 'Invalid platform' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  connectAccount
};