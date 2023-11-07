const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const quizRoute = require("./routes/quiz-route");
const questionRoute = require("./routes/question-route");
const announcementsRoute = require("./routes/announcements-route");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://nosseralaa7:wAhcvQpt0LQ0Nz1q@cluster0.nqs8bq6.mongodb.net/"
);

app.use("/quiz", quizRoute);
app.use("/question", questionRoute);
app.use("/announcements", announcementsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
