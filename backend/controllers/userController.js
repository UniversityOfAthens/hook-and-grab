const User = require('../models/User');

exports.getCurrentUser = (req, res) => {
  res.json({ user: req.user });
};

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
