import "./FeatureCards.css";

import teacherImg from "../assets/teacher.png";
import studentImg from "../assets/student.png";

function FeatureCards() {
  return (
    <div className="feature-container">

      {/* TEACHER CARD */}
      <div className="feature-card">
        <img
          src={teacherImg}
          alt="Teacher"
          className="feature-image"
        />

        <h2>For Teachers</h2>

        <p>
          Create quizzes, manage students, track performance,
          schedule tests and analyze quiz reports easily.
        </p>
      </div>

      {/* STUDENT CARD */}
      <div className="feature-card">
        <img
          src={studentImg}
          alt="Student"
          className="feature-image"
        />

        <h2>For Students</h2>

        <p>
          Attempt quizzes, improve learning skills, compete
          with classmates and monitor your quiz scores.
        </p>
      </div>
    </div>
  );
}

export default FeatureCards;