const {
  questionsForPlayers,
  distributeQuestions,
} = require("../utils/questionsUtils");

const assignment = {};
const index = {};
const answers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Player connected: ", socket.id);

    socket.on("startGame", ({ numPlayers, playerIds }) => {
      try {
        const questions = questionsForPlayers(numPlayers);
        Object.assign(assignment, distributeQuestions(questions, playerIds));
        playerIds.forEach((id) => {
          index[id] = 0;
          answers[id] = [];
        });
        io.emit("gameQuestions", { questions });
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("submitAnswer", ({ playerId, answer }) => {
      try {
        const playerQuestion = assignment[playerId];
        const currentIndex = index[playerId];

        if (playerQuestion && playerQuestion.length > 0) {
          const nextQuestion = playerQuestion[currentIndex];

          if (!answer[playerId]) {
            answers[playerId] = [];
          }
          index[playerId]++;
          socket.emit("newQuestion", { question: nextQuestion });
        } else {
          socket.emit("gameOver", { message: "No more questions left." });
        }
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
      delete assignment[socket.id];
      delete index[socket.id];
    });
  });
};
