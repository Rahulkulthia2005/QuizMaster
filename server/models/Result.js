const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    },
    score: Number,
    totalQuestions: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Result",
  resultSchema
);