// src/Mentor_component/DashboardContent.jsx
import React from "react";
import { FaUsers, FaBook, FaComments } from "react-icons/fa";

export default function DashboardContent({ mentor }) {
  return (
    <div className="max-w-6xl mx-auto p-0">
      <h2 className="text-3xl font-bold text-amber-800 mb-6">
        Welcome back, {mentor.name} 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <FaUsers className="text-4xl text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Students Assigned</h3>
          <p className="text-2xl font-bold text-amber-700">{mentor.totalStudents}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <FaBook className="text-4xl text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Pending Request</h3>
          <p className="text-2xl font-bold text-amber-700">5</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <FaComments className="text-4xl text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Discussions</h3>
          <p className="text-2xl font-bold text-amber-700">{mentor.totalDiscussions}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-amber-800 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li>✅ Reviewed student project submissions in React</li>
          <li>💬 Replied to questions in AI/ML discussion forum</li>
          <li>📅 Scheduled mentorship session with Aditi Sharma</li>
        </ul>
      </div>
    </div>
  );
}