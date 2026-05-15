import "./ManageQuizzes.css";

import { useEffect, useState } from "react";

import axios from "axios";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";

function ManageQuizzes() {

  const [quizzes, setQuizzes] =
    useState([]);

  const [loading, setLoading] =
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

        setLoading(false);

      } catch (error) {

        console.error(error);

        setLoading(false);
      }
    };

  /* DELETE QUIZ */

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this quiz?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `https://quizmaster-1-w9fq.onrender.com/api/quiz/${id}`
        );

        alert(
          "Quiz deleted successfully"
        );

        fetchQuizzes();

      } catch (error) {

        console.error(error);

        alert(
          "Delete failed"
        );
      }
    };

  return (

    <div className="manageQuizzesPage">

      {/* SIDEBAR */}

      <TeacherSidebar />

      {/* MAIN */}

      <div className="manageQuizzes-main">


        {/* CARD */}

        <div className="manageQuizzes-card">

          {/* HEADER */}

          <div className="manageQuizzes-header">

            <div>

              <h1>
                Manage Quizzes
              </h1>

              <p>
                View and manage all created quizzes.
              </p>

            </div>

            <span>
              {quizzes.length} Quizzes
            </span>

          </div>

          {/* LOADING */}

          {
            loading ? (

              <div className="manageLoading">
                Loading...
              </div>

            ) : quizzes.length === 0 ? (

              <div className="manageEmpty">

                <h2>
                  No Quizzes Found
                </h2>

                <p>
                  Create quizzes to manage them here.
                </p>

              </div>

            ) : (

              <div className="manageTableContainer">

                <table className="manageQuizzes-table">

                  <thead>

                    <tr>

                      <th>
                        Quiz Title
                      </th>

                      <th>
                        Total Questions
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      quizzes.map(
                        (quiz) => (

                          <tr
                            key={
                              quiz._id
                            }
                          >

                            <td>
                              {
                                quiz.title
                              }
                            </td>

                            <td>
                              {
                                quiz.questions
                                  .length
                              }
                            </td>

                            <td>

                              <span className="activeStatus">
                                Active
                              </span>

                            </td>

                            <td>

                              <button
                                className="deleteBtn"
                                onClick={() =>
                                  handleDelete(
                                    quiz._id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>
                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default ManageQuizzes;