import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/student/Sidebar";

import "./AvailableQuizzes.css";

function AvailableQuizzes() {

  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {

    try {

      const res = await axios.get(
        "https://quizmaster-1-w9fq.onrender.com/api/quiz"
      );

      setQuizzes(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="availableQuizzesPage">

      {/* SIDEBAR */}

      <Sidebar />

      {/* RIGHT CONTENT */}

      <div className="availableQuizzes-content">

        <div className="availableQuizzes-card">

          {/* HEADER */}

          <div className="studentSection-header">

            <h2>Available Quizzes</h2>

            <span>
              {quizzes.length} Quizzes
            </span>

          </div>

          {/* QUIZZES */}

          {
            quizzes.length === 0 ? (

              <p className="noQuizText">
                No quizzes available
              </p>

            ) : (

              quizzes.map((quiz) => (

                <div
                  className="studentQuiz-card"
                  key={quiz._id}
                >

                  <div>

                    <h3>{quiz.title}</h3>

                    <p>
                      {quiz.questions.length} Questions
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleStartQuiz(quiz._id)
                    }
                  >
                    Start Quiz
                  </button>

                </div>
              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

export default AvailableQuizzes;