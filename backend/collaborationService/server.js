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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const roomTexts = {};

const getParticipantsInRoom = (roomNo) => {
    return io.sockets.adapter.rooms.get(roomNo);
};

const emitMessageToRoom = (socket, roomNo, editorText) => {
    socket.to(roomNo).emit('message', { roomNo, editorText });
};

io.on('connection', (socket) => {
    socket.on('join', roomNo => {
        socket.join(roomNo);
        
        // if there is cached text from previous session, and there remains people inside the room,
        // restore cached text
        if (roomTexts[roomNo] && getParticipantsInRoom(roomNo).size > 1) {
            console.log(roomTexts[roomNo]);
            socket.emit('message', { editorText: roomTexts[roomNo] });
        } else { // else start from clean slate
            delete roomTexts[roomNo];
        }
    });

    socket.on('keyup', ({ roomNo, editorText }) => {
        emitMessageToRoom(socket, roomNo, editorText);
        roomTexts[roomNo] = editorText;
    });

    socket.on('room', (room) => {
        console.log(room);
    });
});