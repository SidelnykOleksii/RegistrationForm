const db = require("../../config/db.js");
exports.registerUser = (req, res) => {
  const { name, email, password, gender } = req.body;

  // Check if user already exists
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Insert new user
    db.run(
      "INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)",
      [name, email, password, gender],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User created", id: this.lastID });
      }
    );
  });
};

exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      // Return an error if there is an issue with the database query
      return res.status(500).json({ error: err.message });
    }
    // Return the array of user objects
    res.json(rows);
  });
};


exports.deleteUser = (req, res) => {
  const { email } = req.params;
  console.log(`Attempting to delete user with email: ${email}`);

  // Delete the user from the database
  db.run("DELETE FROM users WHERE email = ?", [email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Return a success message if the deletion is successful
    res.json({ message: "User deleted" });
  });
};
