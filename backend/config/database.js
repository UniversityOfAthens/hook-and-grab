const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../db.sqlite');

function initializeDatabase() {
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        profileImage BLOB
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        description TEXT,
        price REAL,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
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
