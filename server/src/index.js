const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const questionsRoute = require("./routes/questions.route");

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

io.on("connection", (socket) => {
  clients.push(socket);
  socket.on("createRoom", (socket) => {
    // socket.join(`room-${rooms.length}`);
    rooms.push(`rooms-${rooms.length}`);
    console.log(rooms);
  });
});

app.use("/api/question", questionsRoute);

app.get("/test", (req, res) => {
  res.send({ some: "text" });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});