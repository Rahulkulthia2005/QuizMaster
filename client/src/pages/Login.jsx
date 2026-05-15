import { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
  useLocation
} from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    if (params.get("error") === "usernotfound") {
      alert(
        "User not found. Please signup first."
      );
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://quizmaster-1-w9fq.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "userId",
        res.data.userId
      );

      if (res.data.role === "student") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://quizmaster-1-w9fq.onrender.com/api/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="top-tabs">
          <button className="active-tab">
            Login
          </button>

          <Link
            to="/signup"
            className="signup-link"
          >
            Sign Up
          </Link>
        </div>

        <div className="login-heading">
          <h1>Welcome Back!</h1>
          <p>
            Login to continue your quiz
            journey.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <span className="forgot-password">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="divider">
          or continue with
        </div>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt="google"
          />

          Continue with Google
        </button>

        <div className="bottom-text">
          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;