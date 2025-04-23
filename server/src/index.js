require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Room, getRoomCode } = require("./Room");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;
app.use(cors());

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("createRoom", (callback) => {
    const roomCode = getRoomCode();
    Room.add(roomCode, socket.id);
    socket.join(roomCode);

    callback(roomCode);
  });

  socket.on("joinRoom", ({ roomCode, playerName }, callback) => {
    const currRoom = Room.get(roomCode);
    if (!roomCode) {
      return callback(false);
    }

    socket.join(roomCode);
    currRoom.addPlayer({
      id: socket.id,
      name: playerName,
      questions: {},
      answers: {},
      score: 0,
    });

    io.to(roomCode).emit(
      "playerList",
      currRoom.players.map((p) => p.name)
    );

    callback(true);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    Room.disconnect(socket.id);
  });

  require("./sockets/questions.socket")(socket, io);
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
