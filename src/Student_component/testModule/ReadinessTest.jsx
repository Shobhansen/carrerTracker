import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleQuestions = [
  { q: "What is Node.js primarily used for?", options: ["Frontend", "Backend", "Database", "Design"], correct: "Backend" },
  { q: "Which database is SQL-based?", options: ["MongoDB", "MySQL", "Firebase", "Redis"], correct: "MySQL" },
  { q: "Express.js runs on which platform?", options: ["Python", "Node.js", "Java", "PHP"], correct: "Node.js" },
  { q: "CI/CD stands for?", options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Deployment", "Custom Installation", "Continuous Internet"], correct: "Continuous Integration/Continuous Deployment" },
  { q: "Which command starts a Node app?", options: ["npm start", "npm run build", "node app.js", "git push"], correct: "node app.js" },
];

export default function ReadinessTest() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    const score = sampleQuestions.reduce(
      (acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc),
      0
    );
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    navigate("/student/readiness-result", { state: { score: percentage } });
  };

  return (
    <div className="p-10 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Readiness Test
      </h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
        {sampleQuestions.map((q, i) => (
          <div key={i}>
            <p className="font-semibold text-gray-800 mb-2">
              {i + 1}. {q.q}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className={`border p-2 rounded-lg cursor-pointer ${
                    answers[i] === opt ? "bg-blue-100 border-blue-600" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt}
                    onChange={() => setAnswers({ ...answers, [i]: opt })}
                    className="hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
