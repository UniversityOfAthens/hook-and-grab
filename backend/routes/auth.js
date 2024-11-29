const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Logout Route
router.post('/logout', authController.logout);

module.exports = router;
