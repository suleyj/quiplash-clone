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
        console.error("Error in startGame event: ", error);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("submitAnswer", ({ playerId, answer }) => {
      try {
        const playerQuestion = assignment[playerId];
        const currentIndex = index[playerId];

        if (playerQuestion && currentIndex < 2) {
          const currentQuestion = playerQuestion[currentIndex];

          answers[playerId].push({
            question: currentQuestion,
            answer,
          });

          index[playerId]++;

          if (index[playerId] < 2) {
            const nextQuestion = playerQuestion[currentIndex];
            socket.emit("nextQuestion", { question: nextQuestion });
          } else {
            socket.emit("awaitingOthers", {
              message:
                "You've answered all your questions. Waiting for other players.",
            });
          }

          const allPlayersFinished = Object.keys(index).every(
            (id) => index[id] >= 2
          );

          if (allPlayersFinished) {
            io.emit("allAnswersSubmitted", { answers });
          }
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
