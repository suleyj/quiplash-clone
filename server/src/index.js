const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  questionsForPlayers,
  distributeQuestions,
} = require("./utils/questionsUtils");
const { error } = require("node:console");

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

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
    rooms.push({
      host: socket.id,
      gameState: "Lobby",
      code: roomCode,
      players: [],
      question: [],
      assignedQuestions: [],
      answers: [],
      round: 1,
      start: false,
    });
    console.log(rooms);

    callback(roomCode);
  });

  socket.on("joinRoom", ({ roomCode, playerName }, callback) => {
    if (!rooms.some((room) => room.code === roomCode)) {
      return callback(false);
    }
    socket.join(roomCode);
    const currRoom = rooms.find((room) => room.code === roomCode);
    currRoom.players.push({ playerId: socket.id, name: playerName, score: 0 });
    io.to(roomCode).emit(
      "playerList",
      currRoom.players.map((p) => p.name)
    );
    callback(true);
  });

  socket.on("startGame", (roomCode, callback) => {
    const currRoom = rooms.find((room) => room.code === roomCode);
    if (!currRoom) {
      callback("Invalid room code", false);
    }

    const questions = questionsForPlayers(currRoom.players.length);

    currRoom.questions = questions;

    for (let i = 0; i < questions.length; i++) {
      currRoom.assignedQuestions.push({
        playerName: currRoom.players[i].name,
        questionId: i,
      });
      currRoom.assignedQuestions.push({
        playerName: currRoom.players[i].name,
        questionId: (i + 1) % questions.length,
      });
    }

    console.log(currRoom.assignedQuestions);

    currRoom.gameState = "qna";

    io.to(roomCode).emit("gameState", currRoom.gameState);

    for (let i = 0; i < currRoom.players.length; i++) {
      const player = currRoom.players[i];

      const q1 = currRoom.assignedQuestions.find(
        (assignedQuestion) => assignedQuestion.playerName === player.name
      )?.questionId;

      if (q1 !== undefined) {
        io.to(player.playerId).emit("receiveQuestions", currRoom.questions[q1]);
      }
    }

    callback(null, true);
  });

  socket.on("disconnect", () => {
    //TODO: remove player from room on disconnect
    console.log(`${socket.id} disconnected`);
    const index = clients.indexOf(socket);
    clients.splice(index, 1);
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
