const express = require('express');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get Current User
router.get('/me', ensureAuthenticated, userController.getCurrentUser);

// Delete Account
router.delete('/delete', ensureAuthenticated, userController.deleteAccount);

module.exports = router;
