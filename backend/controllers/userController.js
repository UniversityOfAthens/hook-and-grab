// controllers/userController.js
const User = require('../models/User');

// Retrieve the current authenticated user's information
exports.getCurrentUser = (req, res) => {
  if (req.user) {
    // Fetch the user including the profile picture
    User.findById(req.user.id, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving user data.' });
      }
      res.json({ user });
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Update the user's profile picture
exports.updateProfilePicture = (req, res) => {
  const userId = req.user.id;
  const profilePicturePath = req.file ? `/uploads/profiles/${req.file.filename}` : null;

  User.updateProfilePicture(userId, profilePicturePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile picture.' });
    }

    // Fetch the updated user data
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving user data.' });
      }
      res.json({ message: 'Profile picture updated successfully.', user });
    });
  });
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

// Search for users based on a keyword (only username)
exports.searchUsers = (req, res) => {
  const keyword = req.query.keyword;

  User.search(keyword, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching users.' });
    }
    res.json({ users });
  });
};
