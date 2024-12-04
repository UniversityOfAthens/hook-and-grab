// controllers/authController.js
const passport = require('passport');
const User = require('../models/User');
const { validateRegistration } = require('../validations/userValidation');
const { sanitizeUser } = require('../utils/helpers');

// Handle user registration
exports.register = (req, res) => {
  // Validate the incoming registration data
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).json({ errors }); // Return validation errors if any
  }

  // Prepare user data for creation
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone,
    profilePicture: req.body.profilePicture, // Optional: defaults if not provided
  };

  // Create the user in the database
  User.create(userData, (err, user) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }
      return res.status(500).json({ message: 'Error creating user.' });
    }
    return res.status(201).json({ message: 'User created successfully.', user });
  });
};

// Handle user login
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    req.login(user, (err) => {
      if (err) return next(err);
	  const safeUser = sanitizeUser(user);
      return res.json({ message: 'Logged in successfully.', user: safeUser });
    });
  })(req, res, next);
};

// Handle user logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully.' });
  });
};
