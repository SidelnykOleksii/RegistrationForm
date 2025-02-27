const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./database.db");

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyParser.json());

db.run(
  `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      email TEXT UNIQUE, 
      password TEXT,
      gender TEXT
    )`
);

app.post("/register", (req, res) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Всі поля обов'язкові" });
  }

  // Перевіряємо, чи є вже юзер із таким email
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.log("Помилка пошуку користувача:", err.message);
      return res.status(500).json({ error: "Помилка сервера" });
    }

    if (user) {
      console.warn(`Email вже зайнятий: ${email}`);
      return res
        .status(409)
        .json({ error: "Користувач з таким email вже існує" });
    }

    console.log(`Додаємо користувача: ${name} ${email}`);

    // Якщо такого юзера ще немає, додаємо його в базу
    db.run(
      "INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)",
      [name, email, password, gender],
      function (err) {
        if (err) {
          console.error("Помилка при додаванні користувача:", err.message);
          return res.status(500).json({ error: err.message });
        }
        console.log(`Користувач доданий! ID: ${this.lastID}`);
        res.status(201).json({
          message: "Користувач успішно зареєстрований!",
          id: this.lastID,
        });
      }
    );
  });
});

app.get("/users", (req, res) => {
  db.all(`SELECT name, email, gender FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.delete("/users/:email", (req, res) => {
  const email = req.params.email;

  db.run(`DELETE FROM users WHERE email = ?`, [email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Користувача не знайдено" });
    }
    res.json({ message: "Користувач успішно видалений" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
