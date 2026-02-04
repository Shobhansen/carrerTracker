// src/Admin_component/Overview.jsx
import React from "react";
import {
  FaUsers,
  FaUserTie,
  FaComments,
  FaBriefcase,
  FaUserClock,
  FaBan,
  FaUserCheck,
} from "react-icons/fa";

export default function Overview() {
  const stats = [
    { icon: FaUsers, label: "Total Students", value: 350, color: "text-blue-600" },
    { icon: FaUserTie, label: "Active Mentors", value: 45, color: "text-indigo-600" },
    { icon: FaComments, label: "Discussions", value: 120, color: "text-cyan-600" },
    { icon: FaBriefcase, label: "Active Jobs", value: 18, color: "text-green-600" },
    { icon: FaUserClock, label: "Pending Requests", value: 22, color: "text-yellow-600" },
    { icon: FaBan, label: "Banned Users", value: 5, color: "text-red-600" },
    { icon: FaUserCheck, label: "Job-Ready Profiles", value: 40, color: "text-emerald-600" },
    { icon: FaUsers, label: "Active Students", value: 280, color: "text-blue-500" },
  ];

  const recentUsers = [
    { id: 1, name: "Riya Sharma", role: "Student", joined: "2025-10-02", email: "riya@gmail.com" },
    { id: 2, name: "Shobhan Sen", role: "Mentor", joined: "2025-10-03", email: "shobhan@outlook.com" },
    { id: 3, name: "Susmita Sinha", role: "Student", joined: "2025-10-04", email: "sinha@gmail.com" },
    { id: 4, name: "Vivek Rao", role: "Student", joined: "2025-10-05", email: "vivek@outlook.com" },
    { id: 5, name: "Soumita Patel", role: "Mentor", joined: "2025-10-06", email: "soumita@domain.com" },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-blue-700">Admin Overview</h2>

      {/*  Stats Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-blue-100 hover:shadow-xl transition-transform hover:scale-[1.03]"
          >
            <stat.icon className={`text-4xl ${stat.color} mx-auto mb-3`} />
            <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
            <p className="text-gray-700 text-xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/*  Last 5 Joined Users */}
      <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-blue-700">Last 5 Joined Users</h3>
          <span className="text-sm text-gray-500">Recent registrations overview</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{user.name}</td>
                  <td
                    className={`p-3 font-semibold ${
                      user.role === "Mentor"
                        ? "text-indigo-600"
                        : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3 text-gray-500">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
