import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchQuestions from "../../utils/fetchQuestions";
import shuffleQuestions from "../../utils/shuffleQuestions";

export default function TestPage() {
  const navigate = useNavigate();

  const rawField = localStorage.getItem("careerField") || "Web Development";
  const field = rawField
    ?.trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()); // ensures correct casing


  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  //Load questions based on field
  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching questions for:", field);

        const data = await fetchQuestions(field);
        if (!data || data.length === 0) {
          console.warn("⚠️ No questions found for field:", field);
          setQuestions([]);
        } else {
          setQuestions(shuffleQuestions(data).slice(0, 60));
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [field]);

  // handle user selecting an answer
  const handleAnswer = (qid, ans) => {
    setAnswers((prev) => ({ ...prev, [qid]: ans }));
  };

  //Calculate score and go to result page
  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q._id] === (q.correctAnswer || q.correct)) {
        score++;
      }
    });

    const total = questions.length;

    // Save results (optional)
    localStorage.setItem("studentAnswers", JSON.stringify(answers));
    localStorage.setItem("testScore", score);
    localStorage.setItem("testTotal", total);

    // Navigate to result page with data
    navigate("/student/test/result", { state: { score, total } });
  };


  // While loading
  if (loading) return <p className="text-center mt-20 text-blue-600">Loading questions...</p>;

  //No questions found
  if (!questions.length)
    return (
      <div className="text-center text-red-600 mt-20">
        No questions found for your selected career field: <b>{rawField}</b>
      </div>
    );

  const q = questions[current];

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">
          Question {current + 1} of {questions.length}
        </h2>
        <p className="text-gray-700">{q.question}</p>

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className={`block border p-3 rounded-lg cursor-pointer ${answers[q._id] === opt ? "bg-blue-100 border-blue-400" : "hover:bg-blue-50"
                }`}
            >
              <input
                type="radio"
                name={q._id}
                value={opt}
                checked={answers[q._id] === opt}
                onChange={() => handleAnswer(q._id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
          >
            Previous
          </button>

          {current < questions.length - 1 ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setCurrent((c) => c + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
