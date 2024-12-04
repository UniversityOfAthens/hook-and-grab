// controllers/productController.js
const Product = require('../models/Product');

// Create a new product listing
exports.createProduct = (req, res) => {
  const productData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    isFree: req.body.isFree,
    isOpenToTrade: req.body.isOpenToTrade,
    images: req.files ? req.files.map((file) => `/uploads/products/${file.filename}`) : [],
    datePosted: new Date().toISOString(),
    sellerId: req.user.id,
  };

  // Save the product to the database
  Product.create(productData, (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating product.' });
    }
    res.status(201).json({ message: 'Product posted successfully.', product });
  });
};

// Retrieve all products
exports.getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products.' });
    }
    res.json({ products });
  });
};

// Retrieve a product by its ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  Product.getById(productId, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ product });
  });
};

// Delete a product by its ID
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.deleteById(productId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting product.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  });
};

// Search for products based on filters
exports.searchProducts = (req, res) => {
  const filters = {
    keyword: req.query.keyword,
    minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
    maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null,
    isFree: req.query.isFree !== undefined ? req.query.isFree === 'true' : undefined,
    isOpenToTrade: req.query.isOpenToTrade !== undefined ? req.query.isOpenToTrade === 'true' : undefined,
    // Add more filters if needed
  };

  // Perform the search with the provided filters
  Product.search(filters, (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching products.' });
    }
    res.json({ products });
  });
};
