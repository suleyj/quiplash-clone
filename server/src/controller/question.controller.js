const { getNextQuestion } = require("../utils/questionsUtils");

const questions = async (req, res) => {
  try {
    const question = getNextQuestion();
    res.status(200).json(question);
  } catch (error) {
    console.error("Error in question:", error);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

module.exports = questions;
