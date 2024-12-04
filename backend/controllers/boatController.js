// controllers/boatController.js
const Boat = require('../models/Boat');

// Handle creating a new boat listing
exports.createBoat = (req, res) => {
  const boatData = {
    ownerId: req.user.id, // The ID of the logged-in user creating the boat
    title: req.body.title, // Title of the boat listing
    description: req.body.description, // Description of the boat
    pricePerDay: req.body.pricePerDay, // Rental price per day
    location: req.body.location, // Location of the boat
    images: req.files ? req.files.map((file) => `/uploads/boats/${file.filename}`) : [], // Uploaded images
    datePosted: new Date().toISOString(), // Timestamp of when the listing was created
  };

  // Create the boat in the database
  Boat.create(boatData, (err, boat) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating boat listing.' });
    }
    res.status(201).json({ message: 'Boat listed successfully.', boat });
  });
};

// Fetch all boat listings
exports.getAllBoats = (req, res) => {
  Boat.getAll((err, boats) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching boats.' });
    }
    res.json({ boats });
  });
};

// Fetch a single boat listing by its ID
exports.getBoatById = (req, res) => {
  const boatId = req.params.id; // ID of the boat to fetch
  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }
    res.json({ boat });
  });
};

// Delete a boat listing by its ID
exports.deleteBoat = (req, res) => {
  const boatId = req.params.id; // ID of the boat to delete
  Boat.deleteById(boatId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting boat.' });
    }
    res.json({ message: 'Boat deleted successfully.' });
  });
};
