require("dotenv").config();

// Imports
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();

// Web server config
const PORT = process.env.PORT || 8080;
const db = require("./db");

// Initialize middleware
app.use(helmet());
app.use(xss());
app.use(express.static("dist"));
app.use(express.json({ extended: false, limit: "10kb" }));

// Routes
app.get("/", (req, res) => {
  res.render("index.html");
});

app.use("/menu", require("./routes/menu"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/orders", require("./routes/orders"));

app.get("/*", (req, res) => {
  res.send("You went to a route we have not yet handled");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
