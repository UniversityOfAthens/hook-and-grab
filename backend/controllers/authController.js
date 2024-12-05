// controllers/authController.js
const passport = require('passport');
const User = require('../models/User');
const { validateRegistration } = require('../validations/userValidation');

// Handle user registration
exports.register = (req, res) => {
  // Validate registration data
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // Prepare user data
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone,
    profilePicture: null, // Will be set to default in the model
  };

  // Create the user
  User.create(userData, (err, user) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }
      return res.status(500).json({ message: 'Error creating user.' });
    }

    // Fetch the full user data with profile picture
    User.findById(user.id, (err, fullUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving user data.' });
      }

      // Log the user in
      req.login(fullUser, (err) => {
        if (err) return res.status(500).json({ message: 'Error logging in after registration.' });

        // Return user data
        return res.status(201).json({
          message: 'User created and logged in successfully.',
          user: fullUser,
        });
      });
    });
  });
};

// Handle user login
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    // Fetch the full user data with profile picture
    User.findById(user.id, (err, fullUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving user data.' });
      }

      req.login(fullUser, (err) => {
        if (err) return next(err);

        // Return user data
        return res.json({ message: 'Logged in successfully.', user: fullUser });
      });
    });
  })(req, res, next);
};

// Handle user logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully.' });
  });
};
