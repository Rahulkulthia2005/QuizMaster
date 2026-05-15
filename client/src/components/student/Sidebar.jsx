import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (
    <div className="studentSidebar">

      <h2 className="studentSidebar-logo">
        Quiz<span>Master</span>
      </h2>

      <ul className="studentSidebar-menu">

        {/* OVERVIEW */}

        <Link
          to="/student"
          className="studentSidebar-link"
        >
          <li
            className={
              location.pathname === "/student"
                ? "active"
                : ""
            }
          >
            Overview
          </li>
        </Link>

        {/* AVAILABLE QUIZZES */}

        <Link
          to="/available-quizzes"
          className="studentSidebar-link"
        >
          <li
            className={
              location.pathname === "/available-quizzes"
                ? "active"
                : ""
            }
          >
            Available Quizzes
          </li>
        </Link>

        {/* PREVIOUS QUIZZES */}

        <Link
          to="/previous-quizzes"
          className="studentSidebar-link"
        >
          <li
            className={
              location.pathname === "/previous-quizzes"
                ? "active"
                : ""
            }
          >
            Previous Quizzes
          </li>
        </Link>

        {/* RESULTS */}

        <Link
          to="/my-results"
          className="studentSidebar-link"
        >
          <li
            className={
              location.pathname === "/my-results"
                ? "active"
                : ""
            }
          >
            Results
          </li>
        </Link>

       

        {/* LEADERBOARD */}

        <Link
          to="/leaderboard"
          className="studentSidebar-link"
        >
          <li>Leaderboard</li>
        </Link>

        {/* ACHIEVEMENTS */}

        <Link
          to="/achievements"
          className="studentSidebar-link"
        >
          <li>Achievements</li>
        </Link>

        {/* PROFILE */}

        <Link
          to="/student-profile"
          className="studentSidebar-link"
        >
          <li
            className={
              location.pathname === "/student-profile"
                ? "active"
                : ""
            }
          >
            Profile
          </li>
        </Link>

        {/* SETTINGS */}

        <Link
          to="/settings"
          className="studentSidebar-link"
        >
          <li>Settings</li>
        </Link>

      </ul>
    </div>
  );
}

export default Sidebar;