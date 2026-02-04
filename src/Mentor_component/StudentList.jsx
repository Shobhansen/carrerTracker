import React, { useState } from "react";
import { FaUserCheck, FaUserClock, FaUser } from "react-icons/fa";

export default function StudentList() {
  const [activeTab, setActiveTab] = useState("approved");

  const [students, setStudents] = useState({
    approved: [
      {
        id: 1,
        name: "Samarpita Mukherjee",
        email: "samarpita@gmail.com",
        careerPath: "Web Development",
        status: "Active",
      },
      {
        id: 2,
        name: "Susmita Sinha",
        email: "susmita@gmail.com",
        careerPath: "AI/ML",
        status: "Active",
      },
      {
        id: 3,
        name: "Soumita Das",
        email: "soumita@gmail.com",
        careerPath: "AI/ML",
        status: "Active",
      },
    ],
    pending: [
      {
        id: 3,
        name: "Neha Patel",
        email: "neha@gmail.com",
        careerPath: "Data Science",
        status: "Pending",
      },
      {
        id: 4,
        name: "Arjun Das",
        email: "arjun@gmail.com",
        careerPath: "Cybersecurity",
        status: "Pending",
      },
    ],
  });

  // Approve request
  const handleApprove = (id) => {
    const student = students.pending.find((s) => s.id === id);
    if (!student) return;
    setStudents({
      approved: [...students.approved, { ...student, status: "Active" }],
      pending: students.pending.filter((s) => s.id !== id),
    });
  };

  // Reject request
  const handleReject = (id) => {
    setStudents({
      ...students,
      pending: students.pending.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2">
        <FaUser className="text-amber-700" /> Student Management
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("approved")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === "approved"
              ? "bg-amber-600 text-white"
              : "bg-gray-100 hover:bg-amber-100 text-gray-700"
            }`}
        >
          <FaUserCheck /> Approved Students
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === "pending"
              ? "bg-amber-600 text-white"
              : "bg-gray-100 hover:bg-amber-100 text-gray-700"
            }`}
        >
          <FaUserClock /> Pending Requests
        </button>
      </div>

      {/* Approved Students List */}
      {activeTab === "approved" && (
        <table className="w-full border-collapse text-left">
          <thead className="bg-amber-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Career Path</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.approved.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.careerPath}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {student.status}
                </td>
                <td className="p-3">
                  <button className="text-sm px-4 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pending Requests List */}
      {activeTab === "pending" && (
        <table className="w-full border-collapse text-left">
          <thead className="bg-amber-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Career Path</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.pending.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.careerPath}</td>
                <td className="p-3 text-orange-600 font-semibold">
                  {student.status}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleApprove(student.id)}
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(student.id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                  <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
