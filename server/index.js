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
        rooms.push({ code: roomCode, players: [] });
        callback(roomCode);
    });

    socket.on("joinRoom", (roomCode, callback) => {
        if (!rooms.some((room) => room.code === roomCode)) {
            return callback(false);
        }
        socket.join(roomCode);
        callback(true);

        // add new player to the room's player list
        const currRoom = rooms.find((room) => room.code === roomCode);
        currRoom.players.push(socket.id);
        rooms.map((room) => {
            if (room.code === roomCode) {
                room = currRoom;
            }
        });

        // send the updated player list to all clients in the room
        io.to(roomCode).emit("playerList", currRoom.players);
    });

    socket.on("disconnect", () => {
        //TODO: remove player from room on disconnect
        console.log(`${socket.id} disconnected`);
        const index = clients.indexOf(socket);
        clients.splice(index, 1);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
