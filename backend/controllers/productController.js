const Product = require('../models/Product');

exports.createProduct = (req, res) => {
  const { name, image, description, price } = req.body;
  const userId = req.user ? req.user.id : null; // Set userId to null if the user is not authenticated

  Product.create(name, image, description, price, userId, (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating product.' });
    }
    return res.status(201).json({ message: 'Product created successfully.', product });
  });
};

exports.getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products.' });
    }
    return res.json(products);
  });
};