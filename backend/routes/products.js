// routes/products.js
const express = require('express');
const productController = require('../controllers/productController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { uploadProductImages } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Retrieve all product listings
router.get('/', productController.getAllProducts);

// Search for products with optional filters
router.get('/search', productController.searchProducts);

// Retrieve a specific product by ID
router.get('/:id', productController.getProductById);

// Create a new product listing (authenticated users only)
router.post(
  '/',
  ensureAuthenticated,
  uploadProductImages.array('images', 5), // Limit to 5 images
  productController.createProduct
);

// Delete a product by ID (authenticated users only)
router.delete('/:id', ensureAuthenticated, productController.deleteProduct);

module.exports = router;
