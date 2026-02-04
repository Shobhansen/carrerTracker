import React, { useState } from "react";
import { FaLightbulb, FaUserGraduate } from "react-icons/fa";

export default function RoadmapSuggestion() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [impLink,setImpLink]=useState("");
  const [submitted, setSubmitted] = useState(false);

  const students = [
    { id: 1, name: "Aditi Sharma" },
    { id: 2, name: "Ravi Kumar" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert(`Roadmap saved for ${selectedStudent}`);
    setRoadmap("");
    setSuggestion("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        <FaLightbulb className="text-amber-600" /> Roadmap & Suggestions
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-3 rounded-lg"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Enter personalized roadmap..."
          className="w-full border p-3 rounded-lg"
          rows={4}
          value={roadmap}
          onChange={(e) => setRoadmap(e.target.value)}
          required
        ></textarea>

        <textarea
          placeholder="Add skill development suggestions..."
          className="w-full border p-3 rounded-lg"
          rows={3}
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Provide Important Link..."
          className="w-full border p-3 rounded-lg"
          rows={3}
          value={impLink}
          onChange={(e) => setImpLink(e.target.value)}
          required
        ></input>

        <button
          type="submit"
          className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Save Roadmap & Suggestions
        </button>
      </form>

      {submitted && (
        <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="font-bold text-green-700">✅ Successfully Saved</h3>
          <p><strong>Student:</strong> {selectedStudent}</p>
        </div>
      )}
    </div>
  );
}
