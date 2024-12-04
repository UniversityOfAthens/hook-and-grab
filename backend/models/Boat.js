// models/Boat.js
const { getDatabaseConnection } = require('../config/database');

class Boat {
  /**
   * Creates a new boat listing in the database.
   * @param {Object} boatData - Data for the boat to be created.
   * @param {Function} callback - Callback function to handle the response.
   */
  static create(boatData, callback) {
    const { ownerId, title, description, pricePerDay, location, images, datePosted } = boatData;
    const db = getDatabaseConnection();

    db.run(
      `
      INSERT INTO boats 
      (ownerId, title, description, pricePerDay, location, images, datePosted)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [ownerId, title, description, pricePerDay, location, images.join(';'), datePosted],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null, { id: this.lastID, title });
      }
    );
  }

  /**
   * Retrieves all boat listings from the database.
   * @param {Function} callback - Callback function to handle the response.
   */
  static getAll(callback) {
    const db = getDatabaseConnection();
    db.all('SELECT * FROM boats', [], (err, boats) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, boats);
    });
  }

  /**
   * Retrieves a specific boat listing by its ID.
   * @param {number} id - The ID of the boat to retrieve.
   * @param {Function} callback - Callback function to handle the response.
   */
  static getById(id, callback) {
    const db = getDatabaseConnection();
    db.get('SELECT * FROM boats WHERE id = ?', [id], (err, boat) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, boat);
    });
  }

  /**
   * Deletes a boat listing from the database by its ID.
   * @param {number} id - The ID of the boat to delete.
   * @param {Function} callback - Callback function to handle the response.
   */
  static deleteById(id, callback) {
    const db = getDatabaseConnection();
    db.run('DELETE FROM boats WHERE id = ?', [id], function (err) {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = Boat;
