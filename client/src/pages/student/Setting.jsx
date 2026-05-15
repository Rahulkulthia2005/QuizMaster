import "./Settings.css";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/student/Sidebar";

function Settings() {
  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const userId =
    localStorage.getItem("userId");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        newPassword !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        const res =
          await axios.put(
            `https://quizmaster-1-w9fq.onrender.com/api/auth/change-password/${userId}`,
            {
              currentPassword,
              newPassword
            }
          );

        alert(
          res.data.message
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      } catch (error) {
        alert(
          error.response
            ?.data?.message ||
            "Password update failed"
        );
      }
    };

  return (
    <div className="studentSettings">

      <Sidebar />

      <div className="studentSettings-content">

        <div className="studentSettings-card">

          <h1>
            Account Settings
          </h1>

          <p className="studentSettings-subtitle">
            Update your password securely.
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="studentSettings-form"
          >

            <div className="studentSettings-inputBox">
              <label>
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={
                  currentPassword
                }
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="studentSettings-inputBox">
              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={
                  newPassword
                }
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="studentSettings-inputBox">
              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <button
              type="submit"
              className="studentSettings-btn"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Settings;