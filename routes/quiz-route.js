const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz-model");
const Question = require("../models/question-model");

router.post("/createQuiz", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newQuiz = new Quiz({ title, description });
    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: "Quiz creation failed." });
  }
});

router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve quizzes" });
  }
});

router.get("/quizzes/:quizId/questions", async (req, res) => {
  try {
    const { quizId } = req.params;

    console.log(quizId);

    // Find the quiz by ID to ensure it exists
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Find questions associated with the quiz
    const questions = await Question.find({ quiz: quizId });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve questions" });
    console.log(error);
  }
});

router.delete("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Check if the quiz with the given ID exists
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // If the quiz exists, delete it
    await Quiz.findByIdAndRemove(quizId);

    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: "Quiz deletion failed" });
  }
});

module.exports = router;
