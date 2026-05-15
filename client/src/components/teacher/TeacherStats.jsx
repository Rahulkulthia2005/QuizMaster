import "./TeacherStats.css";
import {
  useEffect,
  useState
} from "react";
import axios from "axios";

function TeacherStats() {
  const [stats,
    setStats] =
    useState({
      totalQuizzes: 0,
      totalStudents: 0,
      totalAttempts: 0,
      averageScore: 0
    });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const res =
          await axios.get(
            "https://quizmaster-1-w9fq.onrender.com/api/dashboard/teacher-stats"
          );

        setStats(
          res.data
        );

      } catch (error) {
        console.error(
          error
        );
      }
    };

  return (
    <div className="teacherStats">

      <div className="teacherStat-card">
        <h2>
          {
            stats.totalQuizzes
          }
        </h2>
        <p>
          Total Quizzes
        </p>
      </div>

      <div className="teacherStat-card">
        <h2>
          {
            stats.totalStudents
          }
        </h2>
        <p>
          Total Students
        </p>
      </div>

      <div className="teacherStat-card">
        <h2>
          {
            stats.totalAttempts
          }
        </h2>
        <p>
          Total Attempts
        </p>
      </div>

      <div className="teacherStat-card">
        <h2>
          {
            stats.averageScore
          }%
        </h2>
        <p>
          Average Score
        </p>
      </div>

    </div>
  );
}

export default TeacherStats;