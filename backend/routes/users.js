// routes/users.js
const express = require('express');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { uploadProfilePicture } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Retrieve the current authenticated user's information
router.get('/me', ensureAuthenticated, userController.getCurrentUser);

// Search for users based on a keyword
router.get('/search', userController.searchUsers);

// Delete the current user's account
router.delete('/delete', ensureAuthenticated, userController.deleteAccount);

// Update the user's profile picture
router.post(
  '/profile-picture',
  ensureAuthenticated,
  uploadProfilePicture.single('profilePicture'),
  userController.updateProfilePicture
);

module.exports = router;
