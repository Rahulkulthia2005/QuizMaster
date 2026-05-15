import "./ViewResults.css";
import { useEffect, useState } from "react";
import axios from "axios";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";

function ViewResults() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  /* FETCH RESULTS */
  const fetchResults = async () => {
    try {
      const res = await axios.get(
        "https://quizmaster-1-w9fq.onrender.com/api/result/all"
      );

      setResults(res.data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="viewResultsPage">

      {/* SIDEBAR */}
      <TeacherSidebar />

      {/* MAIN */}
      <div className="viewResults-main">

       

        {/* CARD */}
        <div className="viewResults-card">

          {/* HEADER */}
          <div className="viewResults-header">

            <div>
              <h1>
                Student Results
              </h1>

              <p>
                Monitor quiz performance
                of students.
              </p>
            </div>

            <span>
              {results.length} Results
            </span>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="viewResults-loading">
              Loading Results...
            </div>

          ) : results.length === 0 ? (

            <div className="viewResults-empty">

              <h2>
                No Results Found
              </h2>

              <p>
                Students have not
                attempted quizzes yet.
              </p>

            </div>

          ) : (

            <div className="viewResults-tableContainer">

              <table className="viewResults-table">

                <thead>

                  <tr>
                    <th>
                      Student Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Quiz Title
                    </th>

                    <th>
                      Score
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Percentage
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {results.map(
                    (result) => {
                      const percentage =
                        Math.round(
                          (
                            result.score /
                            result.totalQuestions
                          ) * 100
                        );

                      return (
                        <tr
                          key={
                            result._id
                          }
                        >

                          <td>
                            {
                              result
                                .studentId
                                ?.name ||
                              "Unknown Student"
                            }
                          </td>

                          <td>
                            {
                              result
                                .studentId
                                ?.email ||
                              "No Email"
                            }
                          </td>

                          <td>
                            {
                              result
                                .quizId
                                ?.title ||
                              "Unknown Quiz"
                            }
                          </td>

                          <td className="scoreText">
                            {
                              result.score
                            }
                          </td>

                          <td>
                            {
                              result.totalQuestions
                            }
                          </td>

                          <td>

                            <div className="teacherPercentageBox">

                              <div
                                className="teacherPercentageFill"
                                style={{
                                  width: `${percentage}%`
                                }}
                              ></div>

                              <span>
                                {
                                  percentage
                                }%
                              </span>

                            </div>

                          </td>

                          <td>

                            <span
                              className={
                                percentage >=
                                80
                                  ? "excellent"
                                  : percentage >=
                                    50
                                  ? "average"
                                  : "poor"
                              }
                            >
                              {
                                percentage >=
                                80
                                  ? "Excellent"
                                  : percentage >=
                                    50
                                  ? "Average"
                                  : "Poor"
                              }
                            </span>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ViewResults;