const express =
  require("express");

const router =
  express.Router();

const {
  getTeacherStats
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/teacher-stats",
  getTeacherStats
);

module.exports =
  router;