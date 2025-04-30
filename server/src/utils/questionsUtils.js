const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prompts.json");
const data = fs.readFileSync(filePath, "utf-8");

let questions = JSON.parse(data);

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
  shuffle,
};
