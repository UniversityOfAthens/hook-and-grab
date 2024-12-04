// controllers/bookingController.js
const Booking = require('../models/Booking');
const Boat = require('../models/Boat');

// Create a new booking
exports.createBooking = (req, res) => {
  const { boatId, startDate, endDate } = req.body;
  const renterId = req.user.id;

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
};

// Get all bookings for boats owned by the current user
exports.getBookingsByBoatOwner = (req, res) => {
  const ownerId = req.user.id;

  // Retrieve boats owned by the user
  Boat.getAll((err, boats) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching boats.' });
    }

    // Filter boats to only include those owned by the user
    const ownerBoats = boats.filter((boat) => boat.ownerId === ownerId);

    if (ownerBoats.length === 0) {
      return res.json({ bookings: [] });
    }

    const boatIds = ownerBoats.map((boat) => boat.id);

    // Fetch bookings for the owner's boats
    const db = require('../config/database').getDatabaseConnection();
    const placeholders = boatIds.map(() => '?').join(',');
    db.all(
      `SELECT * FROM bookings WHERE boatId IN (${placeholders})`,
      boatIds,
      (err, bookings) => {
        db.close();
        if (err) {
          return res.status(500).json({ message: 'Error fetching bookings.' });
        }
        res.json({ bookings });
      }
    );
  });
};

// Update the status of a booking (approve or reject)
exports.updateBookingStatus = (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body; // Status can be 'approved' or 'rejected'

  // Validate the status value
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  // Update the booking status in the database
  Booking.updateStatus(bookingId, status, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating booking status.' });
    }
    res.json({ message: 'Booking status updated.' });
  });
};

// Get all bookings made by the current user (renter)
exports.getBookingsByRenter = (req, res) => {
  const renterId = req.user.id;

  const db = require('../config/database').getDatabaseConnection();
  db.all('SELECT * FROM bookings WHERE renterId = ?', [renterId], (err, bookings) => {
    db.close();
    if (err) {
      return res.status(500).json({ message: 'Error fetching bookings.' });
    }
    res.json({ bookings });
  });
};
