// config/database.js
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbDir = path.resolve(__dirname, '../database'); // Define the database directory path

// Check if the 'database' directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true }); // Create the directory if it doesn't exist
}

const dbPath = path.resolve(__dirname, '../database/db.sqlite'); // Path to the SQLite database file

function initializeDatabase() {
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    // Create Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        firstName TEXT,
        lastName TEXT,
        dateOfBirth TEXT,
        phone TEXT,
        profilePicture TEXT
      )
    `);

    // Create Products Table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        price REAL,
        isFree INTEGER,
        isOpenToTrade INTEGER,
        images TEXT,
        datePosted TEXT,
        sellerId INTEGER,
        FOREIGN KEY (sellerId) REFERENCES users(id)
      )
    `);

    // Create Boats Table
    db.run(`
      CREATE TABLE IF NOT EXISTS boats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ownerId INTEGER,
        title TEXT,
        description TEXT,
        pricePerDay REAL,
        location TEXT,
        images TEXT,
        datePosted TEXT,
        FOREIGN KEY (ownerId) REFERENCES users(id)
      )
    `);

    // Create Bookings Table
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boatId INTEGER,
        renterId INTEGER,
        startDate TEXT,
        endDate TEXT,
        status TEXT,
        FOREIGN KEY (boatId) REFERENCES boats(id),
        FOREIGN KEY (renterId) REFERENCES users(id)
      )
    `);
  });

  db.close();
}

function getDatabaseConnection() {
  return new sqlite3.Database(dbPath);
}

module.exports = {
  initializeDatabase,
  getDatabaseConnection,
};
