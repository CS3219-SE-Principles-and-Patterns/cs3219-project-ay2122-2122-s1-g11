// Connect to Database
const knex = require("knex");

//env
require("dotenv").config();

var environment = process.env.NODE_ENV || "development";
var config = require("./knexfile.js")[environment];

const database = knex(config);

module.exports = database;
