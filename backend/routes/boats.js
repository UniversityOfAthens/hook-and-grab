// routes/boats.js
const express = require('express');
const boatController = require('../controllers/boatController');
const bookingController = require('../controllers/bookingController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { uploadBoatImages } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Retrieve all boat listings
router.get('/', boatController.getAllBoats);

// Retrieve a specific boat listing by ID
router.get('/:id', boatController.getBoatById);

// Create a new boat listing (authenticated users only)
router.post(
  '/',
  ensureAuthenticated,
  uploadBoatImages.array('images', 5),
  boatController.createBoat
);

// Delete a boat listing by ID (authenticated users only)
router.delete('/:id', ensureAuthenticated, boatController.deleteBoat);

// Booking routes under /boats/:boatId/bookings
router.post('/:boatId/bookings', ensureAuthenticated, bookingController.createBooking);
router.get('/:boatId/bookings', ensureAuthenticated, bookingController.getBookingsByBoatOwner);
router.put(
  '/:boatId/bookings/:bookingId/status',
  ensureAuthenticated,
  bookingController.updateBookingStatus
);

module.exports = router;
