// controllers/productController.js
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

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
    sellerId: req.body.sellerId || req.user.id, // Use sellerId from request body or fallback to req.user.id
  };

  // Save the product to the database
  Product.create(productData, (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating product.' });
    }
    res.status(201).json({ message: 'Product posted successfully.', product });
  });
};

// Retrieve all products with pagination
exports.getAllProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Number of products to return
  const offset = parseInt(req.query.offset) || 0; // Offset for pagination

  Product.getAll(limit, offset, (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products.' });
    }

    // Include images as base64-encoded data with MIME types
    const productsWithImages = products.map((product) => {
      const images = product.images ? product.images.split(';') : [];
      const imageDataArray = images.map((imagePath) => {
        const absolutePath = path.join(__dirname, '..', imagePath);
        try {
          const imageData = fs.readFileSync(absolutePath);
          const mimeType = mime.lookup(absolutePath) || 'application/octet-stream';
          return {
            filename: path.basename(imagePath),
            data: imageData.toString('base64'),
            mimeType: mimeType,
          };
        } catch (err) {
          console.error('Error reading image:', err);
          return null;
        }
      });

      return { ...product, images: imageDataArray };
    });

    res.json({ products: productsWithImages });
  });
};

// Retrieve a product by its ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  Product.getById(productId, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Include images as base64-encoded data with MIME types
    const images = product.images ? product.images.split(';') : [];
    const imageDataArray = images.map((imagePath) => {
      const absolutePath = path.join(__dirname, '..', imagePath);
      try {
        const imageData = fs.readFileSync(absolutePath);
        const mimeType = mime.lookup(absolutePath) || 'application/octet-stream';
        return {
          filename: path.basename(imagePath),
          data: imageData.toString('base64'),
          mimeType: mimeType,
        };
      } catch (err) {
        console.error('Error reading image:', err);
        return null;
      }
    });

    res.json({ product: { ...product, images: imageDataArray } });
  });
};

// Delete a product by its ID (only the seller can delete)
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  Product.getById(productId, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if the current user is the seller of the product
    if (product.sellerId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You cannot delete this product.' });
    }

    Product.deleteById(productId, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting product.' });
      }
      res.json({ message: 'Product deleted successfully.' });
    });
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
  };

  // Perform the search with the provided filters
  Product.search(filters, (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error searching products.' });
    }

    // Include images as base64-encoded data with MIME types
    const productsWithImages = products.map((product) => {
      const images = product.images ? product.images.split(';') : [];
      const imageDataArray = images.map((imagePath) => {
        const absolutePath = path.join(__dirname, '..', imagePath);
        try {
          const imageData = fs.readFileSync(absolutePath);
          const mimeType = mime.lookup(absolutePath) || 'application/octet-stream';
          return {
            filename: path.basename(imagePath),
            data: imageData.toString('base64'),
            mimeType: mimeType,
          };
        } catch (err) {
          console.error('Error reading image:', err);
          return null;
        }
      });

      return { ...product, images: imageDataArray };
    });

    res.json({ products: productsWithImages });
  });
};
