// models/User.js

const bcrypt = require('bcrypt');
const { getDatabaseConnection } = require('../config/database');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

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
    } = userData;

    // Set default profile picture
    const profilePicture = '/uploads/profiles/default.jpg';

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
          phone,
          profilePicture,
        ],
        function (err) {
          if (err) {
            db.close();
            return callback(err);
          }
          const userId = this.lastID;
          // After inserting, retrieve the user including the base64-encoded profile picture
          User.findById(userId, (err, user) => {
            db.close();
            if (err) {
              return callback(err);
            }
            return callback(null, user);
          });
        }
      );
    });
  }

  /**
   * Searches for users based on a keyword (username only).
   * @param {string} keyword - Keyword to search in username.
   * @param {Function} callback - Callback function to handle the response.
   */
  static search(keyword, callback) {
    const db = getDatabaseConnection();

    let query = 'SELECT id, username, firstName, lastName, email, profilePicture FROM users WHERE 1=1';
    const params = [];

    if (keyword) {
      query += ' AND username LIKE ?';
      const searchKeyword = `%${keyword}%`;
      params.push(searchKeyword);
    }

    db.all(query, params, (err, users) => {
      if (err) {
        db.close();
        return callback(err);
      }

      if (!users || users.length === 0) {
        db.close();
        return callback(null, []);
      }

      // For each user, read and encode the profile picture
      let processedUsers = 0;
      const usersWithImages = [];

      users.forEach((user) => {
        const profilePicturePath = path.join(__dirname, '..', user.profilePicture);
        fs.readFile(profilePicturePath, (err, data) => {
          if (err) {
            user.profilePicture = null;
          } else {
            const mimeType = mime.lookup(profilePicturePath) || 'application/octet-stream';
            user.profilePicture = {
              filename: path.basename(user.profilePicture),
              data: data.toString('base64'),
              mimeType: mimeType,
            };
          }

          usersWithImages.push(user);
          processedUsers++;

          if (processedUsers === users.length) {
            db.close();
            return callback(null, usersWithImages);
          }
        });
      });
    });
  }

  /**
   * Finds a user by their username, including base64-encoded profile picture.
   * @param {string} username - The username to search for.
   * @param {Function} callback - Callback function to handle the response.
   */
  static findByUsername(username, callback) {
    const db = getDatabaseConnection();
    db.get(
      'SELECT id, username, email, firstName, lastName, dateOfBirth, phone, profilePicture FROM users WHERE username = ?',
      [username],
      (err, user) => {
        db.close();
        if (err) {
          return callback(err);
        }
        if (user) {
          // Read and encode the profile picture
          const profilePicturePath = path.join(__dirname, '..', user.profilePicture);
          fs.readFile(profilePicturePath, (err, data) => {
            if (err) {
              user.profilePicture = null;
            } else {
              const mimeType = mime.lookup(profilePicturePath) || 'application/octet-stream';
              user.profilePicture = {
                filename: path.basename(user.profilePicture),
                data: data.toString('base64'),
                mimeType: mimeType,
              };
            }
            return callback(null, user);
          });
        } else {
          return callback(null, null);
        }
      }
    );
  }

  /**
   * Finds a user by their ID, including base64-encoded profile picture.
   * @param {number} id - The ID of the user.
   * @param {Function} callback - Callback function to handle the response.
   */
  static findById(id, callback) {
    const db = getDatabaseConnection();
    db.get(
      'SELECT id, username, email, firstName, lastName, dateOfBirth, phone, profilePicture FROM users WHERE id = ?',
      [id],
      (err, user) => {
        db.close();
        if (err) {
          return callback(err);
        }
        if (user) {
          // Read and encode the profile picture
          const profilePicturePath = path.join(__dirname, '..', user.profilePicture);
          fs.readFile(profilePicturePath, (err, data) => {
            if (err) {
              // If there's an error reading the profile picture, set it to null
              user.profilePicture = null;
            } else {
              const mimeType = mime.lookup(profilePicturePath) || 'application/octet-stream';
              user.profilePicture = {
                filename: path.basename(user.profilePicture),
                data: data.toString('base64'),
                mimeType: mimeType,
              };
            }
            return callback(null, user);
          });
        } else {
          return callback(null, null);
        }
      }
    );
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

  /**
   * Updates the user's profile picture and returns the updated user with base64-encoded profile picture.
   * @param {number} id - The ID of the user.
   * @param {string} profilePicture - The new profile picture path.
   * @param {Function} callback - Callback function to handle the response.
   */
  static updateProfilePicture(id, profilePicture, callback) {
    const db = getDatabaseConnection();
    db.run(
      'UPDATE users SET profilePicture = ? WHERE id = ?',
      [profilePicture, id],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        // After updating, retrieve the user including the base64-encoded profile picture
        User.findById(id, (err, user) => {
          if (err) {
            return callback(err);
          }
          return callback(null, user);
        });
      }
    );
  }
}

module.exports = User;
