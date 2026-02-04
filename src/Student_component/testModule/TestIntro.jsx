import { NavLink, useNavigate } from "react-router-dom";

export default function TestIntro() {
  const navigate = useNavigate();
  const field = localStorage.getItem("careerField"); // saved from registration

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-blue-700">Welcome to Your {field} Assessment</h1>
        <p className="mt-3 mb-6 text-gray-600">
          You’ll answer <b>60 MCQs</b> related to your chosen career path.  
          Each question has one correct answer.
        </p>
        <NavLink
          to={"/student/test/questions"}
          className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Test
        </NavLink>
      </div>
    </div>
  );
}
