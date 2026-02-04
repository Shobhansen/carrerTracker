import React, { useState } from "react";
import {
  FaUserGraduate,
  FaUserTie,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEnvelope,
  FaRedo,
  FaEye,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("students");
  const [search, setSearch] = useState("");

  // Sample Mock Data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aditi Sharma",
      email: "aditi@example.com",
      careerPath: "Web Development",
      mentor: "John Doe",
      status: "Active",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      careerPath: "AI/ML",
      mentor: "Pending",
      status: "Pending",
    },
  ]);

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      skills: ["React", "Node.js", "AI/ML"],
      experience: "5 years",
      assignedStudents: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Khan",
      email: "sarah@example.com",
      skills: ["Python", "Data Science"],
      experience: "3 years",
      assignedStudents: 3,
      status: "Pending",
    },
  ]);

  // Helper Functions
  const updateStatus = (type, id, newStatus) => {
    const list = type === "student" ? [...students] : [...mentors];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) list[index].status = newStatus;
    type === "student" ? setStudents(list) : setMentors(list);
  };

  const deleteUser = (type, id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    const list =
      type === "student"
        ? students.filter((s) => s.id !== id)
        : mentors.filter((m) => m.id !== id);
    type === "student" ? setStudents(list) : setMentors(list);
  };

  const resetPassword = (name) => alert(`Password reset link sent to ${name}`);
  const sendActivationEmail = (name) =>
    alert(`Activation email sent to ${name}`);
  const assignStudent = (studentName, mentorName) =>
    alert(`${studentName} assigned to ${mentorName}`);
  const viewProfile = (name) =>
    alert(`Opening ${name}'s full profile details`);

  //  Filter by search
  const filteredList =
    activeTab === "students"
      ? students.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
      : mentors.filter((m) =>
          m.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-lg p-8 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-blue-300 pb-3">
        User Management
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "students"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
          }`}
        >
          <FaUserGraduate /> Students
        </button>
        <button
          onClick={() => setActiveTab("mentors")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "mentors"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
          }`}
        >
          <FaUserTie /> Mentors
        </button>
      </div>

      {/*  Search Bar */}
      <div className="flex items-center border-2 border-blue-300 rounded-full overflow-hidden mb-6 w-full max-w-md bg-white">
        <FaSearch className="text-blue-500 ml-3" />
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 outline-none text-blue-800"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl border border-blue-200 shadow-sm">
          <thead className="bg-blue-100 text-blue-800 font-semibold">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              {activeTab === "students" && (
                <>
                  <th className="py-3 px-4">Career Path</th>
                  <th className="py-3 px-4">Mentor</th>
                </>
              )}
              {activeTab === "mentors" && (
                <>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Assigned Students</th>
                </>
              )}
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-blue-50 transition"
              >
                <td className="py-3 px-4 font-medium text-blue-900">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-blue-700">{user.email}</td>

                {activeTab === "students" && (
                  <>
                    <td className="py-3 px-4">{user.careerPath}</td>
                    <td className="py-3 px-4">{user.mentor}</td>
                  </>
                )}
                {activeTab === "mentors" && (
                  <>
                    <td className="py-3 px-4">
                      {user.skills.join(", ")}
                    </td>
                    <td className="py-3 px-4">{user.experience}</td>
                    <td className="py-3 px-4">{user.assignedStudents}</td>
                  </>
                )}

                <td
                  className={`py-3 px-4 font-semibold ${
                    user.status === "Active"
                      ? "text-green-600"
                      : user.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {user.status}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 flex gap-3 justify-center text-lg">
                  <button
                    onClick={() => viewProfile(user.name)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Profile"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(
                        activeTab === "students" ? "student" : "mentor",
                        user.id,
                        "Active"
                      )
                    }
                    className="text-green-600 hover:text-green-800"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(
                        activeTab === "students" ? "student" : "mentor",
                        user.id,
                        "Suspended"
                      )
                    }
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Suspend"
                  >
                    <FaTimes />
                  </button>
                  <button
                    onClick={() =>
                      deleteUser(
                        activeTab === "students" ? "student" : "mentor",
                        user.id
                      )
                    }
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>

                  {activeTab === "students" && (
                    <>
                      <button
                        onClick={() => resetPassword(user.name)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Reset Password"
                      >
                        <FaRedo />
                      </button>
                      <button
                        onClick={() => sendActivationEmail(user.name)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Send Activation Email"
                      >
                        <FaEnvelope />
                      </button>
                    </>
                  )}

                  {activeTab === "mentors" && (
                    <button
                      onClick={() =>
                        assignStudent("Aditi Sharma", user.name)
                      }
                      className="text-blue-500 hover:text-blue-700"
                      title="Assign Student"
                    >
                      <FaUserPlus />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredList.length === 0 && (
              <tr>
                <td
                  colSpan={activeTab === "students" ? 7 : 8}
                  className="text-center text-gray-500 py-6"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
