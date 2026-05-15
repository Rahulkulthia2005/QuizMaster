import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateQuiz from "./pages/teacher/CreateQuiz";
import QuizPage from "./pages/student/QuizPage";
import ResultPage from "./pages/student/ResultPage";
import ViewResults from "./pages/teacher/ViewResults";
import StudentProfile from "./pages/student/StudentProfile";
import MyResults from "./pages/student/MyResults";
import AvailableQuizzes from "./components/student/AvailableQuizzes";
import PreviousQuizzes from "./components/student/PreviousQuizzes";
import Settings from "./pages/student/Setting";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherSettings from "./pages/teacher/TeacherSettings";
import ManageQuizzes from "./pages/teacher/ManageQuizzes";
import EditQuiz from "./pages/teacher/EditQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/manage-quizzes" element={<ManageQuizzes />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/view-results" element={<ViewResults />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/my-results" element={<MyResults />} />
        <Route path="/available-quizzes" element={<AvailableQuizzes />} />
        <Route path="/previous-quizzes" element={<PreviousQuizzes />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/teacher-settings" element={<TeacherSettings/>} />
        <Route path="/edit-quiz" element={<EditQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;