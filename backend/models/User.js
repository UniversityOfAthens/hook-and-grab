const bcrypt = require('bcrypt');
const fs = require('fs');
const { getDatabaseConnection } = require('../config/database');

class User {
  static create(username, password, callback) {
    const db = getDatabaseConnection();
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        db.close();
        return callback(err);
      }
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hash],
        function (err) {
          db.close();
          if (err) {
            return callback(err);
          }
          return callback(null, { id: this.lastID, username });
        }
      );
    });
  }

  static findByUsername(username, callback) {
    const db = getDatabaseConnection();
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, user);
    });
  }

  static deleteById(id, callback) {
    const db = getDatabaseConnection();
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = User;
