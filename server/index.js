const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("a user connected");
});

app.get("/test", (req, res) => {
    res.send({ some: "text" });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
