    import React, { useState } from "react";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";

export default function JobNotification() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    link: "",
    description: "",
  });

  const [notifiedStudents, setNotifiedStudents] = useState([]);
  const students = [
    { id: 1, name: "Aditi Sharma", jobReady: true },
    { id: 2, name: "Ravi Kumar", jobReady: false },
    { id: 3, name: "Soumita Das", jobReady: true },
  ];

  const handleSendNotification = (studentName) => {
    setNotifiedStudents([...notifiedStudents, studentName]);
    alert(`Job notification sent to ${studentName}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        <FaBriefcase className="text-amber-600" /> Job Notifications
      </h2>

      {/* Job Form */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          className="w-full border p-3 rounded-lg"
          value={jobData.company}
          onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Job Link"
          className="w-full border p-3 rounded-lg"
          value={jobData.link}
          onChange={(e) => setJobData({ ...jobData, link: e.target.value })}
        />
        <textarea
          placeholder="Job Description..."
          className="w-full border p-3 rounded-lg"
          rows={3}
          value={jobData.description}
          onChange={(e) =>
            setJobData({ ...jobData, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* Students Ready for Job */}
      <h3 className="text-lg font-semibold text-amber-800 mb-3">
        Students Ready for Job:
      </h3>
      <ul className="space-y-3">
        {students
          .filter((s) => s.jobReady)
          .map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center bg-amber-50 p-3 rounded-lg"
            >
              <span>{s.name}</span>
              {notifiedStudents.includes(s.name) ? (
                <span className="text-green-600 flex items-center gap-1">
                  <FaCheckCircle /> Notified
                </span>
              ) : (
                <button
                  onClick={() => handleSendNotification(s.name)}
                  className="bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 transition"
                >
                  Send Notification
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
