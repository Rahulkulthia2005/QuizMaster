const Result = require("../models/Result");
const Quiz = require("../models/Quiz");

/* ================= Submit Quiz ================= */
exports.submitQuiz = async (req, res) => {
  try {
    const {
      quizId,
      answers,
      studentId
    } = req.body;

    const quiz =
      await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    let score = 0;

    quiz.questions.forEach(
      (question, index) => {
        if (
          answers[index] ===
          question.correctAnswer
        ) {
          score++;
        }
      }
    );

    await Result.create({
      studentId,
      quizId,
      score,
      totalQuestions:
        quiz.questions.length
    });

    res.status(200).json({
      score,
      total:
        quiz.questions.length
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

/* ================= Teacher Results ================= */
exports.getAllResults =
  async (req, res) => {
    try {
      const results =
        await Result.find()
          .populate(
            "quizId",
            "title"
          )
          .populate(
            "studentId",
            "name email"
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json(
        results
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

/* ================= Student Results ================= */
exports.getStudentResults =
  async (req, res) => {
    try {
      const results =
        await Result.find({
          studentId:
            req.params
              .studentId
        })
          .populate(
            "quizId",
            "title"
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json(
        results
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };