const {
  questionsForPlayers,
  distributeQuestions,
} = require("../utils/questionsUtils");
const { Room } = require("../Room");

module.exports = (socket) => {
  socket.on("startGame", (roomCode, callback) => {
    try {
      const room = Room.get(roomCode);
      if (!room) {
        callback(false);
      }
      const playerIds = room.players.map((p) => p.id);

      // update gameState
      room.gameState = "qna";
      socket.to(roomCode).emit("gameState", "qna");

      const questions = questionsForPlayers(room.players.length);
      room.questionBank = questions;

      const assignment = distributeQuestions(questions, playerIds);
      playerIds.forEach((id) =>
        socket.to(id).emit("gameQuestions", assignment[id])
      );

      callback(true);
    } catch (error) {
      console.log("error", error);
      callback(false);
    }
  });

  socket.on("submitAnswers", ({ roomCode, answers }) => {
    const room = Room.get(roomCode);
    const player = room.getPlayer(socket.id);
    player.answers = answers;

    // check if every player has submitted their answers
    if (room.players.every((p) => p.answers && p.answers.length == 2)) {
      // update gameState
      room.gameState = "voting";
      socket.to(roomCode).emit("gameState", "voting");

      let votingInfo = [];
      Object.entries(room.questionBank).forEach((entry) => {
        let answers = new Set();
        room.players.map((p) =>
          p.answers.map((a) => {
            if (a.questionId == entry[0]) {
              answers.add({
                playerId: p.id,
                answer: a.answer,
              });
            }
          })
        );

        votingInfo.push({
          questionId: entry[0],
          question: entry[1],
          answers: Array.from(answers),
        });
      });
      socket.to(roomCode).emit("voting", votingInfo);
    }
  });

  // socket.on("disconnect", () => {
  //   console.log("Player disconnected:", socket.id);
  //   delete assignment[socket.id];
  //   delete index[socket.id];
  // });
};
