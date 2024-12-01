const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

module.exports = router;