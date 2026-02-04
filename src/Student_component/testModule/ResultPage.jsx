// src/pages/student/TestResult.jsx

import { useLocation, useNavigate } from "react-router-dom";
import motivationalMessages from "../../utils/motivationalMessages";

export default function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || Number(localStorage.getItem("testScore"));
  const total = location.state?.total || Number(localStorage.getItem("testTotal"));
  const field = localStorage.getItem("careerField") || "General";
  const percentage = Math.round((score / total) * 100);

  // Get motivational message from utils
  const message = motivationalMessages(field, score);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Test Completed 🎉</h1>
        <p className="text-xl text-gray-800">
          You scored <span className="text-indigo-600 font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>
        <p className="mt-2 text-gray-600">Your performance: {percentage}%</p>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-lg text-blue-800 font-medium italic leading-relaxed">
            {message}
          </p>
        </div>

        <button
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/student/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
