// models/User.js
const bcrypt = require('bcrypt');
const { getDatabaseConnection } = require('../config/database');

class User {
  /**
   * Creates a new user in the database with hashed password.
   * @param {Object} userData - Data of the user to be created.
   * @param {Function} callback - Callback function to handle the response.
   */
  static create(userData, callback) {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      dateOfBirth,
      phone,
      profilePicture,
    } = userData;
    const db = getDatabaseConnection();

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        db.close();
        return callback(err);
      }
      // Insert the new user into the database
      db.run(
        `
        INSERT INTO users 
        (username, password, email, firstName, lastName, dateOfBirth, phone, profilePicture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          username,
          hash,
          email,
          firstName,
          lastName,
          dateOfBirth,
          phone || null,
          profilePicture || null,
        ],
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

  /**
   * Searches for users based on a keyword.
   * @param {string} keyword - Keyword to search in username, firstName, or lastName.
   * @param {Function} callback - Callback function to handle the response.
   */
static search(keyword, callback) {
  const db = getDatabaseConnection();

  let query = 'SELECT id, username, firstName, lastName, email, profilePicture FROM users WHERE 1=1';
  const params = [];

  if (keyword) {
    query += ' AND (username LIKE ? OR firstName LIKE ? OR lastName LIKE ?)';
    const searchKeyword = `%${keyword}%`;
    params.push(searchKeyword, searchKeyword, searchKeyword);
  }

  db.all(query, params, (err, users) => {
    db.close();
    if (err) {
      return callback(err);
    }
    return callback(null, users);
  });
}

  /**
   * Finds a user by their username.
   * @param {string} username - The username to search for.
   * @param {Function} callback - Callback function to handle the response.
   */
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

  /**
   * Deletes a user from the database by their ID.
   * @param {number} id - The ID of the user to delete.
   * @param {Function} callback - Callback function to handle the response.
   */
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
