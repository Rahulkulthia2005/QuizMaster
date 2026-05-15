import "./TeacherTopbar.css";

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function TeacherTopbar() {

  const [teacher,
    setTeacher] =
    useState(null);

  const navigate =
    useNavigate();

  const userId =
    localStorage.getItem("userId");

  useEffect(() => {

    fetchTeacher();

  }, []);

  const fetchTeacher =
    async () => {

      try {

        const res =
          await axios.get(
            `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`
          );

        setTeacher(
          res.data
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  /* LOGOUT */

  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/login");
    };

  return (

    <div className="teacherTopbar">

      {/* LEFT */}

      <div className="teacherTopbar-left">

        {teacher?.profileImage && (

          <img
            src={`https://quizmaster-1-w9fq.onrender.com${teacher.profileImage}`}
            alt="teacher"
            className="teacherProfileImg"
          />

        )}

        <div className="teacherTopbar-text">

          <h1>
            Welcome,{" "}
            {teacher?.name || "Teacher"}
          </h1>

          <p>
            Manage quizzes and monitor student performance.
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="teacherTopbar-right">

        <button
          className="teacherLogoutBtn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default TeacherTopbar;