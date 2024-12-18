const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());

const clients = [];
const rooms = [];

io.on("connection", (socket) => {
    clients.push(socket);
    socket.on("createRoom", (socket) => {
        // socket.join(`room-${rooms.length}`);
        rooms.push(`rooms-${rooms.length}`);
        console.log(rooms)
    });
}); 

app.get("/test", (req, res) => {
    res.send({ some: "text" });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
