import "./TeacherRightbar.css";

function TeacherRightbar() {

  return (

    <div className="teacherRightbar">

      <div className="teacherPerformance">

        <h2>Performance</h2>

        <div className="teacherCircle">
          78%
        </div>

      </div>

      <div className="teacherBadges">

        <h2>Recent Activity</h2>

        <div className="teacherActivity">
          Science Quiz Created
        </div>

        <div className="teacherActivity">
          25 Students Attempted
        </div>

        <div className="teacherActivity">
          Maths Quiz Updated
        </div>

      </div>

    </div>
  );
}

export default TeacherRightbar;