// models/Booking.js
const { getDatabaseConnection } = require('../config/database');

class Booking {
  // Create a new booking entry in the database
  static create(bookingData, callback) {
    const { boatId, renterId, startDate, endDate, status } = bookingData;
    const db = getDatabaseConnection();

    db.run(
      `
      INSERT INTO bookings 
      (boatId, renterId, startDate, endDate, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [boatId, renterId, startDate, endDate, status],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null, { id: this.lastID });
      }
    );
  }

  // Retrieve all bookings for a specific boat
  static getByBoatId(boatId, callback) {
    const db = getDatabaseConnection();
    db.all('SELECT * FROM bookings WHERE boatId = ?', [boatId], (err, bookings) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, bookings);
    });
  }

  // Retrieve a booking by its ID
  static getById(id, callback) {
    const db = getDatabaseConnection();
    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, booking) => {
      db.close();
      if (err) {
        return callback(err);
      }
      return callback(null, booking);
    });
  }

  // Update the status of a booking
  static updateStatus(id, status, callback) {
    const db = getDatabaseConnection();
    db.run(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id],
      function (err) {
        db.close();
        if (err) {
          return callback(err);
        }
        return callback(null);
      }
    );
  }
}

module.exports = Booking;
