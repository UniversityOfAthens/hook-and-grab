const { getDatabaseConnection } = require('../config/database');

class Product {
  static create(name, image, description, price, userId, callback) {
    const db = getDatabaseConnection();
    db.run(
      'INSERT INTO products (name, image, description, price, user_id) VALUES (?, ?, ?, ?, ?)',
      [name, image, description, price, userId],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null, { id: this.lastID, name, image, description, price, userId });
      }
    );
  }

  static getAll(callback) {
    const db = getDatabaseConnection();
    db.all('SELECT * FROM products', (err, rows) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, rows);
    });
  }

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