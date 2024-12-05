// controllers/boatController.js
const Boat = require('../models/Boat');
const fs = require('fs');
const path = require('path');

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

// Fetch boat listings with pagination
exports.getAllBoats = (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Number of boats to return
  const offset = parseInt(req.query.offset) || 0; // Offset for pagination

  Boat.getAll(limit, offset, (err, boats) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching boats.' });
    }

    // Include images as binary data
    const boatsWithImages = boats.map((boat) => {
      const images = boat.images ? boat.images.split(';') : [];
      const imageDataArray = images.map((imagePath) => {
        const absolutePath = path.join(__dirname, '..', imagePath);
        try {
          const imageData = fs.readFileSync(absolutePath);
          return {
            filename: path.basename(imagePath),
            data: imageData.toString('base64'),
          };
        } catch (err) {
          console.error('Error reading image:', err);
          return null;
        }
      });

      return { ...boat, images: imageDataArray };
    });

    res.json({ boats: boatsWithImages });
  });
};

// Fetch a single boat listing by its ID
exports.getBoatById = (req, res) => {
  const boatId = req.params.id; // ID of the boat to fetch
  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }

    // Include images as binary data
    const images = boat.images ? boat.images.split(';') : [];
    const imageDataArray = images.map((imagePath) => {
      const absolutePath = path.join(__dirname, '..', imagePath);
      try {
        const imageData = fs.readFileSync(absolutePath);
        return {
          filename: path.basename(imagePath),
          data: imageData.toString('base64'),
        };
      } catch (err) {
        console.error('Error reading image:', err);
        return null;
      }
    });

    res.json({ boat: { ...boat, images: imageDataArray } });
  });
};

// Delete a boat listing by its ID (only the owner can delete)
exports.deleteBoat = (req, res) => {
  const boatId = req.params.id; // ID of the boat to delete
  const userId = req.user.id; // ID of the requesting user

  Boat.getById(boatId, (err, boat) => {
    if (err || !boat) {
      return res.status(404).json({ message: 'Boat not found.' });
    }

    // Check if the current user is the owner of the boat
    if (boat.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You cannot delete this boat.' });
    }

    Boat.deleteById(boatId, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting boat.' });
      }
      res.json({ message: 'Boat deleted successfully.' });
    });
  });
};
