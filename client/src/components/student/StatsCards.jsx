import "./StatsCards.css";
import { useEffect, useState } from "react";
import axios from "axios";

function StatsCards() {
  const [stats, setStats] = useState({
    attempted: 0,
    completed: 0,
    averageScore: 0,
    totalTime: "0m"
  });

  const studentId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `https://quizmaster-1-w9fq.onrender.com/api/result/student/${studentId}`
      );

      const results = res.data;

      if (!results.length) return;

      const attempted =
        results.length;

      const completed =
        results.length;

      let totalPercentage = 0;

      results.forEach((result) => {
        totalPercentage +=
          (result.score /
            result.totalQuestions) *
          100;
      });

      const averageScore =
        Math.round(
          totalPercentage /
            results.length
        );

      // Estimated 2 mins per question
      let totalMinutes = 0;

      results.forEach((result) => {
        totalMinutes +=
          result.totalQuestions * 2;
      });

      const hours =
        Math.floor(
          totalMinutes / 60
        );

      const minutes =
        totalMinutes % 60;

      setStats({
        attempted,
        completed,
        averageScore,
        totalTime:
          `${hours}h ${minutes}m`
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="studentStats-container">

      <div className="studentStat-card">
        <h2>{stats.attempted}</h2>
        <p>Quizzes Attempted</p>
      </div>

      <div className="studentStat-card">
        <h2>{stats.completed}</h2>
        <p>Quizzes Completed</p>
      </div>

      <div className="studentStat-card">
        <h2>
          {stats.averageScore}%
        </h2>
        <p>Average Score</p>
      </div>

      <div className="studentStat-card">
        <h2>{stats.totalTime}</h2>
        <p>Total Time Spent</p>
      </div>

    </div>
  );
}

export default StatsCards;