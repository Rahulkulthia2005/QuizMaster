const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const {
  sendOTP,
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/authController");

/* ================= Multer Storage ================= */
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage
});

/* ================= FRONTEND URL ================= */
const FRONTEND_URL =
  "https://quiz-master-dun.vercel.app";

/* ================= OTP ================= */
router.post("/send-otp", sendOTP);

/* ================= Normal Auth ================= */
router.post("/signup", signup);
router.post("/login", login);

/* ================= Profile ================= */
router.get(
  "/profile/:id",
  getProfile
);

router.put(
  "/profile/:id",
  upload.single("profileImage"),
  updateProfile
);

/* ================= Change Password ================= */
router.put(
  "/change-password/:id",
  changePassword
);

/* ================= Google Login ================= */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/* ================= Google Callback ================= */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      `${FRONTEND_URL}/login?error=usernotfound`
  }),
  (req, res) => {

    if (req.user.role === "student") {
      return res.redirect(
        `${FRONTEND_URL}/student`
      );
    }

    if (req.user.role === "teacher") {
      return res.redirect(
        `${FRONTEND_URL}/teacher`
      );
    }

    return res.redirect(
      `${FRONTEND_URL}/login?error=usernotfound`
    );
  }
);

module.exports = router;