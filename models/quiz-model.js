const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nosseralaa7:wAhcvQpt0LQ0Nz1q@cluster0.nqs8bq6.mongodb.net/"
);

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
