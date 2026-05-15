import "./TeacherProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";

import TeacherSidebar from "../../components/teacher/TeacherSidebar";

function TeacherProfile() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [image, setImage] =
    useState("");

  const [file, setFile] =
    useState(null);

  const userId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchProfile();
  }, []);

  /* FETCH PROFILE */
  const fetchProfile =
    async () => {
      try {
        const res =
          await axios.get(
            `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`
          );

        setName(
          res.data.name
        );

        setEmail(
          res.data.email
        );

        if (
          res.data
            .profileImage
        ) {
          setImage(
            `https://quizmaster-1-w9fq.onrender.com${res.data.profileImage}`
          );
        }

      } catch (error) {
        console.error(
          error
        );
      }
    };

  /* IMAGE CHANGE */
  const handleImageChange =
    (e) => {
      const selectedFile =
        e.target.files[0];

      if (
        selectedFile
      ) {
        setFile(
          selectedFile
        );

        setImage(
          URL.createObjectURL(
            selectedFile
          )
        );
      }
    };

  /* SAVE PROFILE */
  const handleSave =
    async () => {
      try {
        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        if (file) {
          formData.append(
            "profileImage",
            file
          );
        }

        await axios.put(
          `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`,
          formData
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {
        console.error(
          error
        );

        alert(
          "Profile Update Failed"
        );
      }
    };

  return (
    <div className="teacherProfilePage">

      {/* SIDEBAR */}
      <TeacherSidebar />

      {/* MAIN */}
      <div className="teacherProfile-main">

        {/* PROFILE CARD */}
        <div className="teacherProfile-card">

          {/* IMAGE */}
          <div className="teacherProfile-imageSection">

            <img
              src={
                image ||
                "https://via.placeholder.com/150"
              }
              alt="Teacher"
              className="teacherProfile-image"
            />

            <label className="teacherUploadBtn">

              Change Photo

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                hidden
              />

            </label>

          </div>

          {/* FORM */}
          <div className="teacherProfile-form">

            {/* NAME */}
            <div className="teacherProfile-inputBox">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

            </div>

            {/* EMAIL */}
            <div className="teacherProfile-inputBox">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                disabled
              />

            </div>

            {/* BUTTON */}
            <button
              className="teacherSaveBtn"
              onClick={
                handleSave
              }
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherProfile;