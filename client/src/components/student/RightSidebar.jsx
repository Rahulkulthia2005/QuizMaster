import "./RightSidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";

function RightSidebar() {
  const [performance,
    setPerformance] =
    useState(0);

  const [badges,
    setBadges] =
    useState([]);

  const studentId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance =
    async () => {
      try {
        const res =
          await axios.get(
            `https://quizmaster-1-w9fq.onrender.com/api/result/student/${studentId}`
          );

        const results =
          res.data;

        if (
          !results.length
        ) {
          return;
        }

        const latest =
          results[0];

        const latestScore =
          Math.round(
            (latest.score /
              latest.totalQuestions) *
              100
          );

        setPerformance(
          latestScore
        );

        generateBadges(
          results
        );

      } catch (error) {
        console.error(
          error
        );
      }
    };

  const generateBadges =
    (results) => {
      const newBadges =
        [];

      const avg =
        Math.round(
          results.reduce(
            (
              total,
              result
            ) =>
              total +
              (result.score /
                result.totalQuestions) *
                100,
            0
          ) /
            results.length
        );

      if (avg >= 80) {
        newBadges.push(
          "🏆 High Scorer"
        );
      }

      if (
        results.length >=
        5
      ) {
        newBadges.push(
          "🔥 Consistent"
        );
      }

      if (
        results.some(
          (r) =>
            (r.score /
              r.totalQuestions) *
              100 >=
            90
        )
      ) {
        newBadges.push(
          "⭐ Quick Learner"
        );
      }

      if (
        newBadges
          .length === 0
      ) {
        newBadges.push(
          "🚀 Beginner"
        );
      }

      setBadges(
        newBadges
      );
    };

  return (
    <div className="studentRightSidebar">

      {/* PERFORMANCE */}
      <div className="studentPerformance-card">

        <h3>
          Recent
          Performance
        </h3>

        <div className="studentCircle">
          {
            performance
          }
          %
        </div>

      </div>

      {/* BADGES */}
      <div className="studentBadges-card">

        <h3>
          Recent
          Badges
        </h3>

        {badges.map(
          (
            badge,
            index
          ) => (
            <div
              key={
                index
              }
              className="studentBadge-item"
            >
              {badge}
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default RightSidebar;