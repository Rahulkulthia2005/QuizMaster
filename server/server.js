const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");

const session = require("express-session");
const passport = require("passport");
const dashboardRoutes =
  require("./routes/dashboardRoutes");
  
dotenv.config();

/* Database */
connectDB();

/* Passport Config */
require("./config/passport");

const app = express();

/* Middleware */
app.use(express.json());
app.use(
  cors({
    origin: "https://quiz-master-dun.vercel.app",
    credentials: true,
  })
);;

/* Session */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "quizsecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(
  "/uploads",
  express.static("uploads")
);

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Quiz Backend Running");
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});