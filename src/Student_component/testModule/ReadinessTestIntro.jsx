import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

export default function ReadinessTestIntro() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
        <FaTrophy className="text-amber-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Congratulations!
        </h1>
        <p className="text-gray-600 mb-6">
          You’ve completed second milestone roadmap tasks. Now take your readiness test to boost your score.
        </p>
        <button
          onClick={() => navigate("/student/readiness-test")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
