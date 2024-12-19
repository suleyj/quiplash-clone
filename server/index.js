const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "*",
    },
});

app.use(cors());

const clients = [];
const rooms = [];

const generateHexCode = (size) => {
    let result = [];
    let hexRef = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];

    for (let n = 0; n < size; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join("").toUpperCase();
};

const getRoomCode = () => {
    const codeLength = 5;
    let code;
    do {
        code = generateHexCode(codeLength);
    } while (rooms.includes(code));
    return code;
};

io.on("connection", (socket) => {
    clients.push(socket);
    console.log(`${socket.id} connected`);

    socket.on("createRoom", (callback) => {
        const roomCode = getRoomCode();
        socket.join(roomCode);
        rooms.push(roomCode);
        callback(roomCode);
    });

    socket.on("joinRoom", (roomCode, callback) => {
        if (!rooms.includes(roomCode)) return callback(false);
        socket.join(roomCode);
        callback(true);
    });

    socket.on('sendMsg', (msg) => {
        io.to(rooms[0]).emit('receiveMsg', msg);
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
        const index = clients.indexOf(socket);
        clients.splice(index, 1);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
