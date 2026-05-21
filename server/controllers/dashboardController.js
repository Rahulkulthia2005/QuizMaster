const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Result = require("../models/Result");

exports.getTeacherStats =
  async (req, res) => {
    try {
      const totalQuizzes =
        await Quiz.countDocuments();

      const totalStudents =
        await User.countDocuments({
          role: "student"
        });

      const totalAttempts =
        await Result.countDocuments();

      const results =
        await Result.find();

      let averageScore = 0;

      if (results.length > 0) {
        const totalPercentage =
          results.reduce(
            (
              sum,
              result
            ) =>
              sum +
              (
                result.score /
                result.totalQuestions
              ) *
                100,
            0
          );
        averageScore = Math.round(totalPercentage /results.length);
      }

      res.status(200).json({
        totalQuizzes,
        totalStudents,
        totalAttempts,
        averageScore
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };