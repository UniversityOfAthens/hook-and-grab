// controllers/bookingController.js
const Booking = require('../models/Booking');
const Boat = require('../models/Boat');

// Create a new booking
exports.createBooking = (req, res) => {
  const boatId = req.params.boatId;
  const { startDate, endDate } = req.body;
  const renterId = req.user.id;

  // Check if the boat exists
  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }

    // Check for availability of the boat for the selected dates
    Booking.getByBoatId(boatId, (err, bookings) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking availability.' });
      }

      // Ensure the boat is not already booked for the requested dates
      const isAvailable = bookings.every((booking) => {
        return (
          new Date(endDate) < new Date(booking.startDate) ||
          new Date(startDate) > new Date(booking.endDate)
        );
      });

      if (!isAvailable) {
        return res.status(400).json({ message: 'Boat is not available for the selected dates.' });
      }

      const bookingData = {
        boatId,
        renterId,
        startDate,
        endDate,
        status: 'pending', // Booking status can be 'pending', 'approved', or 'rejected'
      };

      // Create the booking entry in the database
      Booking.create(bookingData, (err, booking) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating booking.' });
        }
        res.status(201).json({ message: 'Booking request submitted.', booking });
      });
    });
  });
};

// Get all bookings for a specific boat (boat owner)
exports.getBookingsByBoatOwner = (req, res) => {
  const ownerId = req.user.id;
  const boatId = req.params.boatId;

  // Check if the boat exists and belongs to the owner
  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }

    if (boat.ownerId !== ownerId) {
      return res.status(403).json({ message: 'Forbidden: You do not own this boat.' });
    }

    // Fetch bookings for the boat
    Booking.getByBoatId(boatId, (err, bookings) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching bookings.' });
      }
      res.json({ bookings });
    });
  });
};

// Update the status of a booking (approve or reject)
exports.updateBookingStatus = (req, res) => {
  const ownerId = req.user.id;
  const boatId = req.params.boatId;
  const bookingId = req.params.bookingId;
  const { status } = req.body; // Status can be 'approved' or 'rejected'

  // Validate the status value
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  // Check if the boat exists and belongs to the owner
  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }

    if (boat.ownerId !== ownerId) {
      return res.status(403).json({ message: 'Forbidden: You do not own this boat.' });
    }

    // Update the booking status in the database
    Booking.updateStatus(bookingId, status, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating booking status.' });
      }
      res.json({ message: 'Booking status updated.' });
    });
  });
};

// Retrieve bookings made by the renter (optional)
exports.getBookingsByRenter = (req, res) => {
  const renterId = req.user.id;

  Booking.getByRenterId(renterId, (err, bookings) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching bookings.' });
    }
    res.json({ bookings });
  });
};
