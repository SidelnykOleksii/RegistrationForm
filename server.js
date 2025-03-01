const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyParser.json());
app.use("/api", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
