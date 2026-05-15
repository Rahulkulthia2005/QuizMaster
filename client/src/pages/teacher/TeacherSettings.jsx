import "./TeacherSettings.css";

import { useState } from "react";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";
function TeacherSettings() {

  const [currentPassword,
    setCurrentPassword] = useState("");

  const [newPassword,
    setNewPassword] = useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  /* SUBMIT */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    alert(
      "Password Updated Successfully"
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (

    <div className="teacherSettingsPage">

      {/* SIDEBAR */}

      <TeacherSidebar />

      {/* MAIN */}

      <div className="teacherSettings-main">


        {/* SETTINGS CARD */}

        <div className="teacherSettings-card">

          <h1>
            Account Settings
          </h1>

          <p>
            Change your password securely.
          </p>

          {/* FORM */}

          <form
            className="teacherSettings-form"
            onSubmit={handleSubmit}
          >

            {/* CURRENT PASSWORD */}

            <div className="teacherSettings-inputBox">

              <label>
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* NEW PASSWORD */}

            <div className="teacherSettings-inputBox">

              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="teacherSettings-inputBox">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="teacherSettings-btn"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default TeacherSettings;