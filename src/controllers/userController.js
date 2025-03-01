const db = require("../../config/db.js");

exports.registerUser = (req, res) => {
  const { name, email, password, gender } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) return res.status(409).json({ error: "User already exists" });

    db.run(
      "INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)",
      [name, email, password, gender],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User created", id: this.lastID });
      }
    );
  });
};

exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.deleteUser = (req, res) => {
  const { email } = req.params;
  console.log(`Attempting to delete user with email: ${email}`);

  db.run("DELETE FROM users WHERE email = ?", [email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
};
