import "./CreateQuiz.css";

import { useState } from "react";

import axios from "axios";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";


function CreateQuiz() {

  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }
  ]);

  /* QUESTION CHANGE */

  const handleQuestionChange = (
    index,
    field,
    value
  ) => {

    const updated = [...questions];

    updated[index][field] = value;

    setQuestions(updated);
  };

  /* OPTION CHANGE */

  const handleOptionChange = (
    qIndex,
    oIndex,
    value
  ) => {

    const updated = [...questions];

    updated[qIndex].options[oIndex] =
      value;

    setQuestions(updated);
  };

  /* ADD QUESTION */

  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);
  };

  /* SUBMIT */

  const handleSubmit = async () => {

    try {

      await axios.post(
        "https://quizmaster-1-w9fq.onrender.com/api/quiz/create",
        {
          title,
          questions
        }
      );

      alert("Quiz Created Successfully");

      setTitle("");

      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: ""
        }
      ]);

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className="createQuizPage">

      {/* SIDEBAR */}

      <TeacherSidebar />

      {/* MAIN */}

      <div className="createQuiz-main">


        {/* CARD */}

        <div className="createQuiz-card">

          <h1>
            Create New Quiz
          </h1>

          <p>
            Add questions, options and answers.
          </p>

          {/* QUIZ TITLE */}

          <div className="createQuiz-inputBox">

            <label>
              Quiz Title
            </label>

            <input
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* QUESTIONS */}

          {
            questions.map(
              (q, index) => (

                <div
                  className="questionCard"
                  key={index}
                >

                  <h2>
                    Question {index + 1}
                  </h2>

                  {/* QUESTION */}

                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                  />

                  {/* OPTIONS */}

                  <div className="optionsGrid">

                    {
                      q.options.map(
                        (option, i) => (

                          <input
                            key={i}
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                index,
                                i,
                                e.target.value
                              )
                            }
                          />
                        )
                      )
                    }

                  </div>

                  {/* CORRECT ANSWER */}

                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                  />

                </div>
              )
            )
          }

          {/* BUTTONS */}

          <div className="createQuiz-buttons">

            <button
              className="addQuestionBtn"
              onClick={addQuestion}
            >
              + Add Question
            </button>

            <button
              className="createQuizBtn"
              onClick={handleSubmit}
            >
              Create Quiz
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateQuiz;