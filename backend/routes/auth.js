// routes/auth.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Authenticate a user and log them in
router.post('/login', authController.login);

// Log out the current user
router.post('/logout', authController.logout);

module.exports = router;
