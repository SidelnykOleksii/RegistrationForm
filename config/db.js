// Open database file
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    // Handle errors
    console.error("Error opening database:", err.message);
    return;
  }
  // Confirm database connection
  console.log("Connected to the SQLite database.");
});

// Create table if it doesn't already exist
db.run(
  `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        name TEXT, 
        email TEXT UNIQUE, 
        password TEXT,
        gender TEXT
      )`
);

/**
 * Export database object
 * @type {sqlite3.Database}
 */
module.exports = db;
