// routes/bookings.js
const express = require('express');
const bookingController = require('../controllers/bookingController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new booking request (authenticated users only)
router.post('/', ensureAuthenticated, bookingController.createBooking);

// Retrieve all bookings for boats owned by the current user
router.get('/owner', ensureAuthenticated, bookingController.getBookingsByBoatOwner);

// Retrieve all bookings made by the current user (renter)
router.get('/renter', ensureAuthenticated, bookingController.getBookingsByRenter);

// Update the status of a booking request (authenticated users only)
router.put('/:id/status', ensureAuthenticated, bookingController.updateBookingStatus);

module.exports = router;
