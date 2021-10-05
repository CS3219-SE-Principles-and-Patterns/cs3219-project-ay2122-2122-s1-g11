const express = require("express");
const socket = require("socket.io");
const cors = require('cors');
const app = express();

app.use(express());
app.use(cors());

const matchQueue = [];

const server = app.listen(5000, () => {
    console.log("Socket.io running on port 5000!");
});


