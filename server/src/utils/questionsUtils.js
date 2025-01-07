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
};

const questionsForPlayers = (numPlayers) => {
  if (numPlayers > questions.length) {
    throw new Error("Not enough questions for the number of players.");
  }

  const shuffledQuestions = shuffle([...questions]);
  return shuffledQuestions.slice(0, numPlayers);
};

const distributeQuestions = (pool, ids) => {
  const assignment = {};

  ids.forEach((id, i) => {
    assignment[id] = [pool[i], pool[(i + 1) % pool.length]];
  });

  return assignment;
};

module.exports = {
  questionsForPlayers,
  distributeQuestions,
  shuffle,
};
