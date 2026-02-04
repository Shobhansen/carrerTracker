import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowUp,
  FaCode,
  FaCheckCircle,
  FaVideo,
  FaSearch,
  FaTimes,
  FaChartBar,
} from "react-icons/fa";

const initialData = {
  overallScore: 65,
  targetRole: "Backend Development",
  skills: [
    { name: "Express.JS", currentProgress: 75, target: 100, status: "In Progress" },
    { name: "Node.js", currentProgress: 40, target: 80, status: "Needs Work" },
    { name: "Database (SQL)", currentProgress: 90, target: 90, status: "Complete" },
    { name: "Deployment (CI/CD)", currentProgress: 15, target: 50, status: "Not Started" },
  ],
  roadmap: [
    {
      type: "Video Course",
      title: "Advanced Express Middleware",
      action: "Watch Now",
      icon: FaVideo,
      completed: false,
      videoId: "dpw9EHDh2bM",
      timestamp: 1,
    },
    {
      type: "Search Tutor",
      title: "Find Node.js Express Tutor",
      action: "Search Tutors",
      icon: FaSearch,
      completed: false,
      timestamp: 2,
    },
    {
      type: "Update Progress",
      title: "Complete SQL Capstone Project",
      action: "Mark Complete",
      icon: FaCheckCircle,
      completed: false,
      timestamp: 3,
    },
  ],
};

const SkillBar = ({ name, progress }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium text-gray-700">{name}</span>
      <span className="text-sm font-semibold text-blue-700">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default function ReadinessPage() {
  const [readinessData, setReadinessData] = useState(initialData);
  const [modalVideo, setModalVideo] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState(null);
  const [showSkillMatrix, setShowSkillMatrix] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle each roadmap step action
  const handleAction = (step) => {
    if (step.action === "Watch Now") {
      setModalVideo(step.videoId);
      setActiveVideoTitle(step.title);
    } else if (step.action === "Search Tutors") {
      markAsCompleted(step.title);
      navigate(`/student/find-mentor?search=${encodeURIComponent(step.title)}`);
    } else if (step.action === "Mark Complete") {
      markAsCompleted(step.title);
    }
  };

  // Mark step completed + update readiness
  const markAsCompleted = (title) => {
    const updatedRoadmap = readinessData.roadmap.map((r) =>
      r.title === title ? { ...r, completed: true } : r
    );

    const updatedData = {
      ...readinessData,
      roadmap: updatedRoadmap,
      overallScore: Math.min(readinessData.overallScore + 5, 100),
    };

    setReadinessData(updatedData);
    localStorage.setItem("readinessData", JSON.stringify(updatedData));
  };

  // Close video marks as completed
  useEffect(() => {
    if (!modalVideo && activeVideoTitle) {
      markAsCompleted(activeVideoTitle);
      setActiveVideoTitle(null);
    }
  }, [modalVideo]);

  // Load from localStorage safely
  useEffect(() => {
    const savedData = localStorage.getItem("readinessData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Only load if it's not already fully completed
      if (parsed.overallScore < 100) {
        setReadinessData(parsed);
      } else {
        localStorage.removeItem("readinessData");
      }
    }
  }, []);

  // Apply test score improvement
  useEffect(() => {
    if (location.state?.testScore) {
      const newScore = Math.min(
        readinessData.overallScore + Math.round(location.state.testScore / 5),
        100
      );
      const newSkills = readinessData.skills.map((s) => ({
        ...s,
        currentProgress: Math.min(
          s.currentProgress + Math.round(location.state.testScore / 10),
          s.target
        ),
      }));

      const updatedData = { ...readinessData, overallScore: newScore, skills: newSkills };
      setReadinessData(updatedData);
      localStorage.setItem("readinessData", JSON.stringify(updatedData));
    }
  }, [location.state]);

  // Sort roadmap by timestamp
  const sortedRoadmap = [...readinessData.roadmap].sort((a, b) => a.timestamp - b.timestamp);
  const completedCount = sortedRoadmap.filter((r) => r.completed).length;

  return (
    <div className="space-y-10 relative">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-2 flex items-center">
        <FaArrowUp className="mr-3 text-blue-700" />
        Role Readiness Indicator: {readinessData.targetRole}
      </h1>

      {/* Overall Readiness Score */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Overall Readiness Score</h2>
        <div className="flex items-end justify-between">
          <p className="text-6xl font-extrabold text-blue-700">
            {readinessData.overallScore}%
          </p>
          <div className="text-right">
            <p className="text-sm text-gray-500">Threshold for Job Alerts: 75%</p>
            <p className="text-sm font-semibold text-red-500">
              Still {Math.max(75 - readinessData.overallScore, 0)}% required!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
            <FaCode className="mr-2 text-blue-700" /> Skill Breakdown
          </h2>
          {readinessData.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} progress={skill.currentProgress} />
          ))}
          <button
            className="mt-4 text-blue-700 hover:underline font-semibold text-sm flex items-center space-x-2"
            onClick={() => setShowSkillMatrix(true)}
          >
            <FaChartBar />
            <span>View Detailed Skill Matrix</span>
          </button>
        </div>

        {/* Roadmap */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Suggested Roadmap</h2>

          {/* Progress Summary */}
          <p className="text-sm font-medium text-gray-600 mb-4">
            Completed: {completedCount} of {sortedRoadmap.length} tasks
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-700"
              style={{
                width: `${(completedCount / sortedRoadmap.length) * 100}%`,
              }}
            ></div>
          </div>

          <ul className="space-y-4">
            {sortedRoadmap.map((step, index) => {
              const prevCompleted = index === 0 || sortedRoadmap[index - 1].completed;
              const isEnabled = prevCompleted && !step.completed;

              return (
                <li
                  key={index}
                  className={`flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border-l-4 ${
                    step.completed
                      ? "border-green-500 bg-green-50"
                      : isEnabled
                      ? "border-blue-500"
                      : "border-gray-300 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {step.icon && (
                      <step.icon
                        className={`text-xl ${
                          step.completed ? "text-green-600" : "text-blue-600"
                        }`}
                      />
                    )}
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          step.completed ? "text-green-700" : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </p>
                      <span className="text-xs text-gray-500">{step.type}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAction(step)}
                    disabled={!isEnabled}
                    className={`text-xs px-3 py-1 rounded transition ${
                      step.completed
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : isEnabled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {step.completed ? "Completed" : step.action}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Give Test + Reset */}
          <div className="text-center mt-6">
            {completedCount >= 2 && (
              <button
                onClick={() => navigate("/student/readiness-test-intro")}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow mr-3"
              >
                Give Test
              </button>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("readinessData");
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              🔄 Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative p-4">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setModalVideo(null)}
            >
              <FaTimes />
            </button>
            <iframe
              className="w-full h-96 rounded-xl"
              src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1`}
              title="Learning Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Skill Matrix Modal */}
      {showSkillMatrix && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative p-6">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setShowSkillMatrix(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartBar className="mr-2 text-blue-600" /> Detailed Skill Matrix
            </h2>

            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left p-3">Skill</th>
                  <th className="text-left p-3">Current Progress</th>
                  <th className="text-left p-3">Target</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Gap</th>
                </tr>
              </thead>
              <tbody>
                {readinessData.skills.map((s, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{s.name}</td>
                    <td className="p-3 text-blue-700 font-semibold">{s.currentProgress}%</td>
                    <td className="p-3">{s.target}%</td>
                    <td className="p-3 text-sm font-semibold">{s.status}</td>
                    <td className="p-3 text-sm text-red-500">
                      {Math.max(s.target - s.currentProgress, 0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
