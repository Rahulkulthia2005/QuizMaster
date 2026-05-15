import "./TeacherSidebar.css";

import {
  Link,
  useLocation
} from "react-router-dom";

function TeacherSidebar() {
  const location =
    useLocation();

  return (
    <div className="teacherSidebar">

      {/* LOGO */}
      <h2 className="teacherSidebar-logo">
        Quiz
        <span>
          Master
        </span>
      </h2>

      {/* MENU */}
      <ul className="teacherSidebar-menu">

        {/* DASHBOARD */}
        <Link
          to="/teacher"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/teacher"
                ? "active"
                : ""
            }
          >
            Dashboard
          </li>
        </Link>

        {/* MY QUIZZES */}
        <Link
          to="/manage-quizzes"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/manage-quizzes"
                ? "active"
                : ""
            }
          >
            My Quizzes
          </li>
        </Link>

        {/* CREATE QUIZ */}
        <Link
          to="/create-quiz"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/create-quiz"
                ? "active"
                : ""
            }
          >
            Create Quiz
          </li>
        </Link>

        {/* EDIT QUIZ */}
        <Link
          to="/edit-quiz"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/edit-quiz"
                ? "active"
                : ""
            }
          >
            Edit Quiz
          </li>
        </Link>

        {/* RESULTS */}
        <Link
          to="/view-results"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/view-results"
                ? "active"
                : ""
            }
          >
            All Results
          </li>
        </Link>

        {/* STUDENTS */}
        <Link
          to="/students"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/students"
                ? "active"
                : ""
            }
          >
            Students
          </li>
        </Link>

        {/* PROFILE */}
        <Link
          to="/teacher-profile"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/teacher-profile"
                ? "active"
                : ""
            }
          >
            Profile
          </li>
        </Link>

        {/* SETTINGS */}
        <Link
          to="/teacher-settings"
          className="teacherSidebar-link"
        >
          <li
            className={
              location.pathname ===
              "/teacher-settings"
                ? "active"
                : ""
            }
          >
            Settings
          </li>
        </Link>

      </ul>
    </div>
  );
}

export default TeacherSidebar;