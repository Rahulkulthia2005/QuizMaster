import "./Topbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [user, setUser] =
    useState(null);

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`
      );

      setUser(res.data);

    } catch (error) {
      console.error(error);
    }
  };

 const handleLogout = () => {
  const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

  if (confirmLogout) {
    localStorage.clear();
    navigate("/login");
  }
};
  return (
    <div className="studentTopbar">

      <div className="studentTopbar-left">

        <img
          src={
            user?.profileImage
              ? `https://quizmaster-1-w9fq.onrender.com${user.profileImage}`
              : "https://via.placeholder.com/80"
          }
          alt="profile"
        />

        <div>
          <h2>
            Hello, {user?.name || "Student"} 👋
          </h2>

          <p>
            Keep learning and growing!
          </p>
        </div>

      </div>

      <button
        className="studentLogout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default Topbar;