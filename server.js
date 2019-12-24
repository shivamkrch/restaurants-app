const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// On database connection
mongoose.connection.on("connected", () => {
  console.log(`Connected to database ${config.database}`);
});

// On database connection error
mongoose.connection.on("error", err => {
  console.log(`Database error: ${config.database}`, err.name);
});

const app = express();

const users = require("./routes/users");
const restaurants = require("./routes/restaurants");

// Port Number
const port = 4500;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/restaurants", restaurants);

// Index Route
app.get("/", (req, res) => {
  res.send("Home page");
});

// Start Server
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
