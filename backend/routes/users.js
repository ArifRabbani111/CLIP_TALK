const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  connectAccount 
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id', auth, getUserProfile);
router.put('/:id', auth, updateUserProfile);
router.put('/:id/connect', auth, connectAccount);

module.exports = router;