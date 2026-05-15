import "./PreviousQuizzes.css";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/student/Sidebar";

function PreviousQuizzes() {

  const [results, setResults] = useState([]);

  const studentId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchPreviousQuizzes();
  }, []);

  const fetchPreviousQuizzes =
    async () => {

      try {

        const res = await axios.get(
          `https://quizmaster-1-w9fq.onrender.com/api/result/student/${studentId}`
        );

        setResults(res.data);

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="previousQuizzesPage">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <div className="previousQuizzes-content">

        <div className="previousQuizzes-card">

          {/* HEADER */}

          <div className="studentSection-header">

            <h2>Previous Quizzes</h2>

            <span>
              {results.length} Completed
            </span>

          </div>

          {/* TABLE */}

          {
            results.length === 0 ? (

              <p className="noQuizText">
                No previous quizzes found
              </p>

            ) : (

              <table className="studentQuiz-table">

                <thead>

                  <tr>
                    <th>Quiz</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    results.map((result) => {

                      const percentage =
                        Math.round(
                          (result.score /
                            result.totalQuestions) *
                            100
                        );

                      return (

                        <tr key={result._id}>

                          <td>
                            {
                              result.quizId
                                ?.title
                            }
                          </td>

                          <td>
                            {
                              new Date(
                                result.createdAt
                              ).toLocaleDateString()
                            }
                          </td>

                          <td
                            className={
                              percentage >= 80
                                ? "studentGreen"
                                : percentage >= 60
                                ? "studentYellow"
                                : "studentRed"
                            }
                          >
                            {percentage}%
                          </td>

                          <td>
                            <span className="completedStatus">
                              Completed
                            </span>
                          </td>

                        </tr>
                      );
                    })
                  }

                </tbody>

              </table>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default PreviousQuizzes;