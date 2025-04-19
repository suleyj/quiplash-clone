const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prompts.json");
const data = fs.readFileSync(filePath, "utf-8");

let questions = JSON.parse(data);

const questionsForPlayers = (numPlayers) => {
  if (numPlayers > questions.length) {
    throw new Error("Not enough questions for the number of players.");
  }

  const questionsObj = {};
  questions.slice(0, numPlayers).forEach((q, i) => (questionsObj[i] = q));
  return questionsObj;
};

const distributeQuestions = (pool, ids) => {
  const assignment = {};

  ids.forEach((id, i) => {
    const q1 = { id: i, question: pool[i] };
    const q2 = {
      id: (i + 1) % Object.keys(pool).length,
      question: pool[(i + 1) % Object.keys(pool).length],
    };
    assignment[id] = [q1, q2];
  });

  return assignment;
};

module.exports = {
  questionsForPlayers,
  distributeQuestions,
};
