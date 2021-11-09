const express = require("express");
const socket = require("socket.io");
const cors = require('cors');
const app = express();

app.use(express());
app.use(cors());

const server = app.listen(5000, () => {
    console.log("Socket.io running on port 5000!");
});

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join', roomNo => {
        socket.join(roomNo);
    });

    socket.on('room', (room) => {
        console.log(room);
    });

    // chat 
    socket.on('chat_send_message', ({ roomNo, message }) => {
        console.log(message);
        socket.to(roomNo).emit('chat_new_message', { message });
    });
});
