const Quiz = require("../models/Quiz");

/* CREATE QUIZ */
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      message: "Quiz created successfully",
      quiz
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET ALL QUIZZES */
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .sort({ createdAt: -1 });

    res.status(200).json(quizzes);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET QUIZ BY ID */
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    res.status(200).json(quiz);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* UPDATE QUIZ */
exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    res.status(200).json({
      message: "Quiz updated successfully",
      updatedQuiz
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* DELETE QUIZ */
exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(
      req.params.id
    );

    if (!deletedQuiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    res.status(200).json({
      message: "Quiz deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};