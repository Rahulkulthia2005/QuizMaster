import "./StudentProfile.css";
import Sidebar from "../../components/student/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] =
    useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const userId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`
      );

      setUser(res.data);
      setName(res.data.name);

    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("name", name);

    if (image) {
      formData.append(
        "profileImage",
        image
      );
    }

    try {
      await axios.put(
        `https://quizmaster-1-w9fq.onrender.com/api/auth/profile/${userId}`,
        formData
      );

      setEditMode(false);
      fetchProfile();

    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="studentProfile">
      <Sidebar />

      <div className="studentProfile-content">
        <div className="studentProfile-card">

          <img
            src={
              user.profileImage
                ? `https://quizmaster-1-w9fq.onrender.com${user.profileImage}`
                : "https://via.placeholder.com/150"
            }
            alt="profile"
            className="studentProfile-image"
          />

          {editMode ? (
            <>
              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="file"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
              />

              <button
                onClick={handleUpdate}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>

              <p className="studentProfile-email">
                {user.email}
              </p>

              <button
                className="studentProfile-btn"
                onClick={() =>
                  setEditMode(true)
                }
              >
                Edit Profile
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default StudentProfile;