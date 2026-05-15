import "./StudentDashboard.css";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../../components/student/Sidebar";
import Topbar from "../../components/student/Topbar";
import StatsCards from "../../components/student/StatsCards";
import RightSidebar from "../../components/student/RightSidebar";

import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate =
    useNavigate();

  const [quizzes,
    setQuizzes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  /* FETCH QUIZZES */

  const fetchQuizzes =
    async () => {
      try {
        const res =
          await axios.get(
            "https://quizmaster-1-w9fq.onrender.com/api/quiz"
          );

        setQuizzes(
          res.data
        );

        setLoading(
          false
        );

      } catch (error) {
        console.error(
          error
        );

        setLoading(
          false
        );
      }
    };

  return (
    <div className="studentDashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="studentDashboard-main">

        {/* TOPBAR */}
        <Topbar />

        {/* STATS */}
        <StatsCards />

        {/* AVAILABLE QUIZZES */}
        <div className="studentDashboard-section">

          <div className="studentSection-header">

            <h2>
              Available Quizzes
            </h2>

            <span>
              {
                quizzes.length
              } Quizzes
            </span>

          </div>

          {loading ? (

            <div>
              Loading...
            </div>

          ) : quizzes.length === 0 ? (

            <div>
              No quizzes available
            </div>

          ) : (

            quizzes.map(
              (quiz) => (

                <div
                  className="studentQuiz-card"
                  key={
                    quiz._id
                  }
                >

                  {/* LEFT */}
                  <div>

                    <h3>
                      {
                        quiz.title
                      }
                    </h3>

                    <p>
                      {
                        quiz
                          .questions
                          .length
                      } Questions
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="studentQuiz-right">

                    <span className="quizLevel Easy">
                      Active
                    </span>

                    <button
                      onClick={() =>
                        navigate(
                          `/quiz/${quiz._id}`
                        )
                      }
                    >
                      Start Quiz
                    </button>

                  </div>

                </div>
              )
            )

          )}

        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />

    </div>
  );
}

export default StudentDashboard;