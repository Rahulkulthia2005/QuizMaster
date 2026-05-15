import "./MyResults.css";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/student/Sidebar";

function MyResults() {

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

    try {

      const res = await axios.get(
        `https://quizmaster-1-w9fq.onrender.com/api/result/student/${studentId}`
      );

      setResults(res.data);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);
    }
  };

  return (

    <div className="myResultsLayout">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="myResultsPage">

        {/* HEADER */}

        <div className="myResultsHeader">

          <div>

            <h1>My Quiz Results</h1>

            <p>
              Track your quiz performance and improve your skills.
            </p>

          </div>

        </div>

        {/* LOADING */}

        {
          loading ? (

            <div className="myResultsLoading">
              Loading Results...
            </div>

          ) : results.length === 0 ? (

            <div className="myResultsEmpty">

              <h2>No Results Found 😔</h2>

              <p>
                Start attempting quizzes to see your results here.
              </p>

            </div>

          ) : (

            <div className="myResultsTableContainer">

              <table className="myResultsTable">

                <thead>

                  <tr>
                    <th>Quiz</th>
                    <th>Score</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    results.map((result) => {

                      const percentage = Math.round(
                        (result.score /
                          result.totalQuestions) * 100
                      );

                      return (

                        <tr key={result._id}>

                          <td>
                            {result.quizId?.title}
                          </td>

                          <td className="scoreText">
                            {result.score}
                          </td>

                          <td>
                            {result.totalQuestions}
                          </td>

                          <td>

                            <div className="percentageBox">

                              <div
                                className="percentageFill"
                                style={{
                                  width: `${percentage}%`
                                }}
                              ></div>

                              <span>
                                {percentage}%
                              </span>

                            </div>

                          </td>

                          <td>

                            {
                              new Date(
                                result.createdAt
                              ).toLocaleDateString()
                            }

                          </td>

                          <td>

                            <span
                              className={
                                percentage >= 80
                                  ? "excellent"
                                  : percentage >= 50
                                  ? "average"
                                  : "poor"
                              }
                            >

                              {
                                percentage >= 80
                                  ? "Excellent"
                                  : percentage >= 50
                                  ? "Average"
                                  : "Poor"
                              }

                            </span>

                          </td>

                        </tr>
                      );
                    })
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default MyResults;