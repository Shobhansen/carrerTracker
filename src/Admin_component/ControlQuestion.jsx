// src/Admin_component/ControlQuestion.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import questionBank from "../utils/fetchQuestions";

export default function ControlQuestion() {
  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // Load local questionBank
  useEffect(() => {
    const categories = Object.keys(questionBank);

    const allQuestions = categories.flatMap((cat) =>
      questionBank[cat].map((q) => ({
        id: Date.now() + Math.random(),
        topic: cat,
        question: q.question,
        optionA: q.options[0],
        optionB: q.options[1],
        optionC: q.options[2],
        optionD: q.options[3],
        correctAnswer: q.correct,
      }))
    );

    setQuestions(allQuestions);
  }, []);

  // Update field
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add MCQ locally
  const handleAddMcq = () => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } = form;

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      return alert("Please fill all fields");
    }

    const newMcq = {
      id: Date.now(),
      topic: "Custom",
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    };

    setQuestions([...questions, newMcq]);

    setForm({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
  };

  // Delete MCQ (local only)
  const handleDelete = (id) => {
    if (!window.confirm("Delete this MCQ?")) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">MCQ Control Questions</h1>

      {/* Add MCQ Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Add New MCQ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={form.question}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          />

          <input
            type="text"
            name="optionA"
            placeholder="Option A"
            value={form.optionA}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          />

          <input
            type="text"
            name="optionB"
            placeholder="Option B"
            value={form.optionB}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          />

          <input
            type="text"
            name="optionC"
            placeholder="Option C"
            value={form.optionC}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          />

          <input
            type="text"
            name="optionD"
            placeholder="Option D"
            value={form.optionD}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          />

          <select
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleChange}
            className="p-3 border border-blue-600 rounded-lg"
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
        </div>

        <button
          onClick={handleAddMcq}
          className="mt-5 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> Add MCQ
        </button>
      </div>

      {/* Display MCQs */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">All MCQs</h2>

        {questions.length === 0 ? (
          <p className="text-gray-500">No MCQs available.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li key={q.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{q.question}</h3>
                <p className="text-sm text-blue-500 mb-1">Category: {q.topic}</p>

                <ul className="mt-2 text-gray-700">
                  <li>A. {q.optionA}</li>
                  <li>B. {q.optionB}</li>
                  <li>C. {q.optionC}</li>
                  <li>D. {q.optionD}</li>
                </ul>

                <p className="mt-1 font-semibold text-blue-600">
                  Correct: {q.correctAnswer}
                </p>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="mt-3 text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
