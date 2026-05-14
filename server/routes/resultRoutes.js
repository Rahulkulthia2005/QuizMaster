const express = require("express");
const router = express.Router();

const {
  submitQuiz,
  getAllResults,
  getStudentResults
} = require("../controllers/resultController");

router.post("/submit", submitQuiz);
router.get("/all", getAllResults);
router.get("/student/:studentId", getStudentResults);

module.exports = router;