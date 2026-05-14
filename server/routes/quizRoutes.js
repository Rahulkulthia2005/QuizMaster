const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz
} = require("../controllers/quizController");

/* CREATE */
router.post("/create", createQuiz);

/* GET ALL */
router.get("/", getAllQuizzes);

/* GET SINGLE */
router.get("/:id", getQuizById);

/* UPDATE */
router.put("/:id", updateQuiz);

/* DELETE */
router.delete("/:id", deleteQuiz);

module.exports = router;