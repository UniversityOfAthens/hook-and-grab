const passport = require('passport');
const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.create(username, password, (err, user) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
      return res.status(500).json({ message: 'Error creating user.' });
    }
    return res.status(201).json({ message: 'User created successfully.', user });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in successfully.', user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully.' });
  });
};
