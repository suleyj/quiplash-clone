const {
  questionsForPlayers,
  distributeQuestions,
} = require("../utils/questionsUtils");
const { Room } = require("../Room");

module.exports = (socket, io) => {
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

      // update gameState
      room.gameState = "voting";
      io.to(roomCode).emit("gameState", "voting");

      room.players.forEach((player) => {
        io.to(player.id).emit("voting", votingInfo);
      });
    }
  });

  socket.on("sendVotes", ({ roomCode, votes }) => {
    const room = Room.get(roomCode);
    votes.map((vote) => {
      console.log(vote);
      // Find the player who has answered the question
      let player = room.players.find((player) => {
        // Find the answer in the player's answers list
        return player.answers.find((answer) => {
          // Check if the answer matches the questionId and the vote's answer
          return (
            answer.questionId === vote.questionId &&
            answer.answer === vote.answer
          );
        });
      });

      console.log(player);

      if (player) {
        // Find the correct answer object that matches the questionId and answer
        let answer = player.answers.find(
          (answer) =>
            answer.questionId === vote.questionId &&
            answer.answer === vote.answer
        );

        console.log(answer);

        if (answer) {
          // Add the socket.id to the answer's votes array
          answer.votes.push(socket.id);

          // Increase the player's score by 100
          player.score += 100;
        }
      }
    });

    room.players.forEach((player) => console.log(player.answers.votes));

    // update gameState
    // room.gameState = "voting";
    // io.to(roomCode).emit("gameState", "results");
  });

  // socket.on("disconnect", () => {
  //   console.log("Player disconnected:", socket.id);
  //   delete assignment[socket.id];
  //   delete index[socket.id];
  // });
};
