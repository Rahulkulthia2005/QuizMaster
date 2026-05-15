import "./QuizPage.css";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate
} from "react-router-dom";

function QuizPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {

    fetchQuiz();

    enterFullScreen();

    /* EXIT FULLSCREEN DETECT */

    const fullscreenHandler = () => {

      if (
        !document.fullscreenElement &&
        !submitted
      ) {

        alert(
          "You exited fullscreen. Quiz submitted automatically."
        );

        handleSubmit();
      }
    };

    document.addEventListener(
      "fullscreenchange",
      fullscreenHandler
    );

    return () => {

      document.removeEventListener(
        "fullscreenchange",
        fullscreenHandler
      );
    };

  }, []);

  /* FETCH QUIZ */

  const fetchQuiz = async () => {

    try {

      const res = await axios.get(
        `https://quizmaster-1-w9fq.onrender.com/api/quiz/${id}`
      );

      setQuiz(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  /* ENTER FULLSCREEN */

  const enterFullScreen = async () => {

    const elem = document.documentElement;

    if (elem.requestFullscreen) {

      await elem.requestFullscreen();
    }
  };

  /* HANDLE ANSWER */

  const handleAnswer = (
    qIndex,
    answer
  ) => {

    setAnswers({
      ...answers,
      [qIndex]: answer
    });
  };

  /* SUBMIT QUIZ */

  const handleSubmit = async () => {

  if (submitted) return;

  setSubmitted(true);

  try {

    const res = await axios.post(
      "https://quizmaster-1-w9fq.onrender.com/api/result/submit",
      {
        quizId: id,
        answers,
        studentId:
          localStorage.getItem("userId")
      }
    );

    /* EXIT FULLSCREEN */

    if (document.fullscreenElement) {

      await document.exitFullscreen();
    }

    navigate("/result", {
      state: {
        score: res.data.score,
        total: res.data.total,
        quizId: id
      }
    });

  } catch (error) {

    console.error(error);

    alert("Submission failed");
  }
};

  if (!quiz)
    return (
      <div className="quizLoading">
        Loading Quiz...
      </div>
    );

  return (

    <div className="studentQuizPage">

      {/* HEADER */}

      <div className="studentQuizHeader">

        <h1>{quiz.title}</h1>

        <p>
          Answer all questions carefully.
        </p>

      </div>

      {/* QUESTIONS */}

      <div className="studentQuizContainer">

        {
          quiz.questions.map(
            (q, index) => (

              <div
                className="studentQuestionCard"
                key={index}
              >

                <h2>
                  Q{index + 1}.{" "}
                  {q.question}
                </h2>

                <div className="studentOptions">

                  {
                    q.options.map(
                      (option, i) => (

                        <label
                          className="studentOption"
                          key={i}
                        >

                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() =>
                              handleAnswer(
                                index,
                                option
                              )
                            }
                          />

                          <span>
                            {option}
                          </span>

                        </label>
                      )
                    )
                  }

                </div>

              </div>
            )
          )
        }

        {/* SUBMIT BUTTON */}

        <button
          className="studentSubmitBtn"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>

      </div>

    </div>
  );
}

export default QuizPage;