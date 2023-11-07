const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctOptionIndex: Number,
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
