import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-content">
      <h1>
        Create. Learn.
        <br />
        <span>Quiz. Succeed.</span>
      </h1>

      <p>
        Empowering teachers to create engaging quizzes and helping
        students learn, compete, and achieve more.
      </p>

      <div className="hero-buttons">
        <Link to="/login">
          <button className="primary-btn">Get Started</button>
        </Link>

        <Link to="/signup">
          <button className="secondary-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;