const express = require("express");
const questions = require("../controller/question.controller");

const router = express.Router();

router.get("/get-question", questions);

module.exports = router;
