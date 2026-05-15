import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* Send OTP */
  const handleSendOTP = async () => {
    try {
      await axios.post(
        "https://quizmaster-1-w9fq.onrender.com/api/auth/send-otp",
        {
          email: formData.email
        }
      );

      setOtpSent(true);
      alert("OTP sent to your Gmail");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  /* Verify OTP */
  const handleVerifyOTP = () => {
    if (!formData.otp) {
      return alert("Enter OTP");
    }

    setOtpVerified(true);
    alert("OTP Verified");
  };

  /* Signup */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return alert(
        "Please verify OTP first"
      );
    }

    try {
      await axios.post(
        "https://quizmaster-1-w9fq.onrender.com/api/auth/signup",
        formData
      );

      alert("Signup Successful");
      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="top-tabs">
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

          <button className="active-tab">
            Sign Up
          </button>
        </div>

        <div className="signup-heading">
          <h1>Create Account</h1>
          <p>
            Verify email before signup
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Send OTP */}
          <button
            type="button"
            className="otp-btn"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>

          {/* OTP */}
          <div className="input-box">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>

          {/* Verify OTP */}
          {otpSent && !otpVerified && (
            <button
              type="button"
              className="otp-btn"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          )}

          {/* Password */}
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="input-box role-box">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">
                Student
              </option>
              <option value="teacher">
                Teacher
              </option>
            </select>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            className="signup-btn"
          >
            Create Account
          </button>

        </form>

        <div className="bottom-text">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;