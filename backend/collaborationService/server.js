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
        origin: "http://ddf9af43-default-frontendi-3e1f-1481156825.ap-southeast-1.elb.amazonaws.com/",
        methods: ["GET", "POST"]
    }
});

const roomCodeTexts = {};
const roomChatTexts = {};

const getParticipantsInRoom = (roomNo) => {
    return io.sockets.adapter.rooms.get(roomNo);
};

const emitMessageToRoom = (socket, roomNo, editorText) => {
    socket.to(roomNo).emit('message', { roomNo, editorText });
};

io.on('connection', (socket) => {
    socket.on('join', roomNo => {
        socket.join(roomNo);
        
        // if there is cached code text from previous session, and there remains people inside the room,
        // restore cached text
        if (roomCodeTexts[roomNo] && getParticipantsInRoom(roomNo).size > 1) {
            console.log(roomCodeTexts[roomNo]);
            socket.emit('message', { editorText: roomCodeTexts[roomNo] });
        } else { // else start from clean slate
            delete roomCodeTexts[roomNo];
        }

        // if there is cached chat text from previous session, and there remains people inside the room,
        // restore cached text
        if (roomChatTexts[roomNo] && getParticipantsInRoom(roomNo).size > 1) {
            console.log(roomChatTexts[roomNo]);
            socket.emit('message', { editorText: roomChatTexts[roomNo] });
        } else { // else start from clean slate
            delete roomChatTexts[roomNo];
        }
    });

    socket.on('keyup', ({ roomNo, editorText }) => {
        emitMessageToRoom(socket, roomNo, editorText);
        roomCodeTexts[roomNo] = editorText;
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
