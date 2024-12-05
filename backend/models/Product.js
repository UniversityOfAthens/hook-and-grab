// models/Product.js
const { getDatabaseConnection } = require('../config/database');

class Product {
  // Create a new product listing
  static create(productData, callback) {
    const {
      title,
      description,
      price,
      isFree,
      isOpenToTrade,
      images,
      datePosted,
      sellerId,
    } = productData;
    const db = getDatabaseConnection();

    db.run(
      `
      INSERT INTO products 
      (title, description, price, isFree, isOpenToTrade, images, datePosted, sellerId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        price || null,
        isFree ? 1 : 0,
        isOpenToTrade ? 1 : 0,
        images ? images.join(';') : null,
        datePosted,
        sellerId,
      ],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null, { id: this.lastID, title });
      }
    );
  }

  // Retrieve products with pagination
  static getAll(limit, offset, callback) {
    const db = getDatabaseConnection();
    db.all(
      'SELECT * FROM products ORDER BY datePosted DESC LIMIT ? OFFSET ?',
      [limit, offset],
      (err, products) => {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null, products);
      }
    );
  }

  // Search for products based on filters
  static search(filters, callback) {
    const db = getDatabaseConnection();

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Search by keyword in title
    if (filters.keyword) {
      query += ' AND title LIKE ?';
      const keyword = `%${filters.keyword}%`;
      params.push(keyword);
    }

    // Filter by price range
    if (filters.minPrice) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    // Filter by isFree
    if (filters.isFree !== undefined) {
      query += ' AND isFree = ?';
      params.push(filters.isFree ? 1 : 0);
    }

    // Filter by isOpenToTrade
    if (filters.isOpenToTrade !== undefined) {
      query += ' AND isOpenToTrade = ?';
      params.push(filters.isOpenToTrade ? 1 : 0);
    }

    db.all(query, params, (err, products) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, products);
    });
  }

  // Retrieve a product by its ID
  static getById(id, callback) {
    const db = getDatabaseConnection();
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, product);
    });
  }

  // Delete a product by its ID
  static deleteById(id, callback) {
    const db = getDatabaseConnection();
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = Product;
