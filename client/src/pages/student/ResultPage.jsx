import "./ResultPage.css";
import { useLocation, Link } from "react-router-dom";

function ResultPage() {
  const location = useLocation();

  const {
    score = 0,
    total = 0,
    quizId
  } = location.state || {};

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="studentResultPage">
      <div className="studentResult-card">

        <h1>Quiz Result</h1>

        <p className="studentResult-subtitle">
          Great effort! Keep improving your skills 🚀
        </p>

        <div className="studentResult-circle">
          <h2>{percentage}%</h2>
          <span>Score</span>
        </div>

        <div className="studentResult-details">

          <div className="studentResult-box">
            <h3>{score}</h3>
            <p>Correct Answers</p>
          </div>

          <div className="studentResult-box">
            <h3>{total}</h3>
            <p>Total Questions</p>
          </div>

          <div className="studentResult-box">
            <h3>{total - score}</h3>
            <p>Wrong Answers</p>
          </div>

        </div>

        <div className="studentResult-buttons">

          <Link to="/student">
            <button className="studentResult-btn">
              Back Dashboard
            </button>
          </Link>

          {quizId && (
            <Link to={`/quiz/${quizId}`}>
              <button className="studentRetry-btn">
                Retry Quiz
              </button>
            </Link>
          )}

        </div>

      </div>
    </div>
  );
}

export default ResultPage;