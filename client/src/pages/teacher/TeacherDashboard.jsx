import "./TeacherDashboard.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";
import TeacherTopbar from "../../components/teacher/TeacherTopbar";
import TeacherStats from "../../components/teacher/TeacherStats";

function TeacherDashboard() {
  const [quizzes,
    setQuizzes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes =
    async () => {
      try {
        const res =
          await axios.get(
            "https://quizmaster-1-w9fq.onrender.com/api/quiz"
          );

        setQuizzes(
          res.data.slice(
            0,
            5
          )
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
    <div className="teacherDashboard">

      {/* SIDEBAR */}
      <TeacherSidebar />

      {/* MAIN */}
      <div className="teacherDashboard-main">

        {/* TOPBAR */}
        <TeacherTopbar />

        {/* STATS */}
        <TeacherStats />

        {/* RECENT QUIZZES */}
        <div className="teacherDashboard-section">

          <div className="teacherSection-header">

            <h2>
              Recent Quizzes
            </h2>

            <span
              style={{
                cursor:
                  "pointer"
              }}
              onClick={() =>
                navigate(
                  "/manage-quizzes"
                )
              }
            >
              View All
            </span>

          </div>

          {loading ? (

            <div>
              Loading...
            </div>

          ) : quizzes.length === 0 ? (

            <div>
              No quizzes created
            </div>

          ) : (

            quizzes.map(
              (quiz) => (
                <div
                  className="teacherQuiz-card"
                  key={
                    quiz._id
                  }
                >
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

                  <button
                    onClick={() =>
                      navigate(
                        "/view-results"
                      )
                    }
                  >
                    View Results
                  </button>

                </div>
              )
            )

          )}

        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;