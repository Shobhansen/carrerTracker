import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReadinessResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score = state?.score || 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Test Completed!</h1>
        <p className="text-gray-600 mb-4">You scored:</p>
        <p className="text-6xl font-extrabold text-blue-700 mb-6">{score}%</p>
        <button
          onClick={() => navigate("/student/dashboard/readiness", { state: { testScore: score } })}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Update My Readiness Score
        </button>
      </div>
    </div>
  );
}
