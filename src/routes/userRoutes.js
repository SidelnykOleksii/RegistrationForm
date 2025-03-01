const express = require("express");
const { registerUser, getUsers, deleteUser } = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getUsers);
router.delete("/users/:email", deleteUser);

module.exports = router;