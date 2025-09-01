const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  connectedAccounts: {
    goodreads: { type: String, default: '' },
    netflix: { type: String, default: '' },
    amazon: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);