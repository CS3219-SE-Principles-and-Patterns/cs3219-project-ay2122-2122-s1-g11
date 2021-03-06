// Setup
const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/authJwt");

const app = express();
app.use(bodyParser.json());

// dotenv
require("dotenv").config();

// Cors to fix the CORS policy: No 'Access-Control-Allow-Origin' error so that we can fetch from frontend
const cors = require("cors");

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Request-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Request-Method", "GET, POST, PUT, DELETE");
    next();
});

if (process.env.NODE_ENV !== "test") {
    // Protect all routes with JWT auth
    app.use((req, res, next) => verifyToken(req, res, next));
}

//Routes
const questionRoutes = require("./routes/questions");

app.use("/question", questionRoutes);

module.exports = app;
