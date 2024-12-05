// middlewares/uploadMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Added fs module

// Storage configuration for Profile Pictures
const profileStorage = multer.diskStorage({
  // Set the destination folder for profile pictures
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../uploads/profiles');
    // Ensure the directory exists
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Define the filename format for profile pictures
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Storage configuration for Product Images
const productStorage = multer.diskStorage({
  // Set the destination folder for product images
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../uploads/products');
    // Ensure the directory exists
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Define the filename format for product images
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Storage configuration for Boat Images
const boatStorage = multer.diskStorage({
  // Set the destination folder for boat images
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../uploads/boats');
    // Ensure the directory exists
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Define the filename format for boat images
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter to allow only JPEG and PNG images
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
}

// Middleware for uploading profile pictures
const uploadProfilePicture = multer({
  storage: profileStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

// Middleware for uploading product images
const uploadProductImages = multer({
  storage: productStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB per image
  fileFilter: fileFilter,
});

// Middleware for uploading boat images
const uploadBoatImages = multer({
  storage: boatStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB per image
  fileFilter: fileFilter,
});

// Export the upload middlewares for use in routes
module.exports = {
  uploadProfilePicture,
  uploadProductImages,
  uploadBoatImages,
};
