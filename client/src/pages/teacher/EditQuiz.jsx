import "./EditQuiz.css";

import { useEffect, useState } from "react";

import axios from "axios";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";

function EditQuiz() {

  const [quizzes, setQuizzes] =
    useState([]);

  const [selectedQuiz, setSelectedQuiz] =
    useState(null);

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

        setQuizzes(res.data);

        setLoading(false);

      } catch (error) {

        console.error(error);

        setLoading(false);
      }
    };

  /* SELECT QUIZ */

  const handleSelectQuiz =
    (quiz) => {

      setSelectedQuiz(
        JSON.parse(
          JSON.stringify(quiz)
        )
      );
    };

  /* TITLE */

  const handleTitleChange =
    (e) => {

      setSelectedQuiz({
        ...selectedQuiz,
        title: e.target.value
      });
    };

  /* QUESTION */

  const handleQuestionChange =
    (index, value) => {

      const updatedQuestions =
        [...selectedQuiz.questions];

      updatedQuestions[index].question =
        value;

      setSelectedQuiz({
        ...selectedQuiz,
        questions: updatedQuestions
      });
    };

  /* OPTION */

  const handleOptionChange =
    (qIndex, oIndex, value) => {

      const updatedQuestions =
        [...selectedQuiz.questions];

      updatedQuestions[qIndex]
        .options[oIndex] = value;

      setSelectedQuiz({
        ...selectedQuiz,
        questions: updatedQuestions
      });
    };

  /* CORRECT ANSWER */

  const handleCorrectAnswer =
    (index, value) => {

      const updatedQuestions =
        [...selectedQuiz.questions];

      updatedQuestions[index]
        .correctAnswer = value;

      setSelectedQuiz({
        ...selectedQuiz,
        questions: updatedQuestions
      });
    };

  /* UPDATE QUIZ */

  const handleUpdateQuiz =
    async () => {

      try {

        await axios.put(
          `https://quizmaster-1-w9fq.onrender.com/api/quiz/${selectedQuiz._id}`,
          selectedQuiz
        );

        alert(
          "Quiz Updated Successfully"
        );

        fetchQuizzes();

      } catch (error) {

        console.error(error);

        alert(
          "Update Failed"
        );
      }
    };

  return (

    <div className="editQuizPage">

      {/* SIDEBAR */}

      <TeacherSidebar />

      {/* MAIN */}

      <div className="editQuiz-main">

       

        <div className="editQuiz-container">

          {/* LEFT */}

          <div className="editQuiz-list">

            <h2>
              All Quizzes
            </h2>

            {
              loading ? (

                <p>
                  Loading...
                </p>

              ) : quizzes.length === 0 ? (

                <p>
                  No Quizzes Found
                </p>

              ) : (

                quizzes.map(
                  (quiz) => (

                    <div
                      key={quiz._id}
                      className={`editQuiz-item ${
                        selectedQuiz?._id ===
                        quiz._id
                          ? "activeQuiz"
                          : ""
                      }`}
                      onClick={() =>
                        handleSelectQuiz(
                          quiz
                        )
                      }
                    >

                      <h3>
                        {quiz.title}
                      </h3>

                      <p>
                        {
                          quiz.questions
                            .length
                        } Questions
                      </p>

                    </div>
                  )
                )
              )
            }

          </div>

          {/* RIGHT */}

          <div className="editQuiz-editor">

            {
              selectedQuiz ? (

                <>

                  <div className="editQuiz-header">

                    <h1>
                      Edit Quiz
                    </h1>

                    <button
                      onClick={
                        handleUpdateQuiz
                      }
                    >
                      Save Changes
                    </button>

                  </div>

                  {/* TITLE */}

                  <div className="editQuiz-inputBox">

                    <label>
                      Quiz Title
                    </label>

                    <input
                      type="text"
                      value={
                        selectedQuiz.title
                      }
                      onChange={
                        handleTitleChange
                      }
                    />

                  </div>

                  {/* QUESTIONS */}

                  {
                    selectedQuiz.questions.map(
                      (q, index) => (

                        <div
                          key={index}
                          className="editQuestion-card"
                        >

                          <h3>
                            Question {index + 1}
                          </h3>

                          <input
                            type="text"
                            value={
                              q.question
                            }
                            onChange={(e) =>
                              handleQuestionChange(
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Question"
                          />

                          {
                            q.options.map(
                              (
                                option,
                                i
                              ) => (

                                <input
                                  key={i}
                                  type="text"
                                  value={
                                    option
                                  }
                                  onChange={(e) =>
                                    handleOptionChange(
                                      index,
                                      i,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Option ${i + 1}`}
                                />
                              )
                            )
                          }

                          <input
                            type="text"
                            value={
                              q.correctAnswer
                            }
                            onChange={(e) =>
                              handleCorrectAnswer(
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Correct Answer"
                          />

                        </div>
                      )
                    )
                  }

                </>

              ) : (

                <div className="editQuiz-empty">

                  <h2>
                    Select a Quiz
                  </h2>

                  <p>
                    Choose a quiz from the left side to edit it.
                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditQuiz;