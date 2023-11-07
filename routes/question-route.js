const express = require("express");
const router = express.Router();
const Question = require("../models/question-model");
const Quiz = require("../models/quiz-model");

router.post("/create", async (req, res) => {
  try {
    const { text, options, correctOptionIndex, quizId } = req.body;

    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    const newQuestion = new Question({
      text,
      options,
      correctOptionIndex,
      quiz: quizId, // Associate the question with the specified quiz
    });
    await newQuestion.save();

    // Add the question's ID to the quiz's questions array
    quiz.questions.push(newQuestion._id);
    await quiz.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Question creation failed." });
  }
});

router.delete("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Check if the question with the given ID exists
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // If the question exists, delete it
    await Question.findByIdAndRemove(questionId);

    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: "Question deletion failed" });
  }
});

module.exports = router;
