const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prompts.json");
const data = fs.readFileSync(filePath, "utf-8");

let questions = JSON.parse(data);

const questionsForPlayers = (n) => {
  if (numPlayers > questions.length) {
    throw new Error("Not enough questions for the number of players.");
  }
  return questions.slice(0, numPlayers);
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
};
