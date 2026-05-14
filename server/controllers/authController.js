require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const otpStore = {};

/* Mail Transport */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ================= Send OTP ================= */
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Quiz App OTP Verification",
      text: `Your OTP is: ${otp}`
    });

    res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.log("OTP Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= Signup ================= */
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      otp
    } = req.body;

    if (otpStore[email] != otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    delete otpStore[email];

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= Login ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {
      name
    };

    if (req.file) {
      updateData.profileImage =
        `/uploads/${req.file.filename}`;
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};