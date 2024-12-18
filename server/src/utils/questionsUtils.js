const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prompts.json");
const data = fs.readFileSync(filePath, "utf-8");

let questions = JSON.parse(data);
let index = 0;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getNextQuestion = () => {
  if (index >= questions.length) {
    shuffle(questions);
    index = 0;
  }
  return questions[index++];
};

module.exports = {
  getNextQuestion,
};
