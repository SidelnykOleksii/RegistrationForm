const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }
    console.log("Connected to the SQLite database.")
});

db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        name TEXT, 
        email TEXT UNIQUE, 
        password TEXT,
        gender TEXT
      )`
  );

// Перевірка що після запуску сервера є конект до БД і БД щось повертає
//   db.all("SELECT * FROM users", [], (err, rows) => {
//     if (err) {
//       console.error("Error fetching users:", err.message); // Лог помилки
//       return;
//     }
//     console.log("Fetched users:", rows); // Лог отриманих користувачів
//   });

  module.exports = db;