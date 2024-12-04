// controllers/userController.js
const User = require('../models/User');
const path = require('path');
const { sanitizeUser } = require('../utils/helpers');

// Retrieve the current authenticated user's information (remove password field first since it's sensitive)
exports.getCurrentUser = (req, res) => {
  const safeUser = sanitizeUser(req.user);
  if (safeUser) {
    res.json({ user: safeUser });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Delete the current user's account and log them out
exports.deleteAccount = (req, res) => {
  const userId = req.user.id;
  User.deleteById(userId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user.' });
    }
    req.logout(() => {
      res.json({ message: 'Account deleted successfully.' });
    });
  });
};

// Search for users based on a keyword
exports.searchUsers = (req, res) => {
  const keyword = req.query.keyword;

  User.search(keyword, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching users.' });
    }
    // Sanitize each user object
    const safeUsers = users.map((user) => sanitizeUser(user));
    res.json({ users: safeUsers });
  });
};

// Update the user's profile picture
exports.updateProfilePicture = (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.file ? `/uploads/profiles/${req.file.filename}` : null;

  User.updateProfilePicture(userId, profilePicture, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile picture.' });
    }
    res.json({ message: 'Profile picture updated successfully.', profilePicture });
  });
};
