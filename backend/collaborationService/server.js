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

const roomConnected = {};

io.on('connection', (socket) => {
    socket.on('join', ({ roomNo, user }) => {
        socket.join(roomNo);
        const clients = io.sockets.adapter.rooms.get(roomNo);
        console.log(`[ROOM JOIN] Room no: ${roomNo}, user: ${user}`);
        if (clients.size == 2 && roomConnected[roomNo] === undefined) {
            io.to(roomNo).emit('chat_join', { message: `Both parties have been connected!` });
            roomConnected[roomNo] = true;
        }
    });

    socket.on('room', (room) => {
        console.log(room);
    });

    socket.on("disconnecting", () => {
        const rooms = socket.rooms;
        for (const room of rooms) {
            io.to(room).emit('user_dc', { message: `Your partner has disconnected!` });
        }
    });

    // chat 
    socket.on('chat_send_message', ({ roomNo, message }) => {
        console.log(message);
        socket.to(roomNo).emit('chat_new_message', { message });
    });
});
