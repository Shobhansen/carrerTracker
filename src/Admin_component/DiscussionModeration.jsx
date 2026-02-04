import React, { useState } from "react";
import {
  User,      // Replaces FaUserGraduate (Student)
  UserCheck, // Replaces FaUserTie (Mentor)
  Eye,       // Replaces FaEye
  Trash2,    // Replaces FaTrashAlt
  Ban,       // Replaces FaBan
  X,         // Replaces FaTimes (Modal Close Button)
  Search,    // New for Search Input
} from "lucide-react";

// Component to replace the banned 'alert'
const MessageBox = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm text-center">
      <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Close
      </button>
    </div>
  </div>
);

export default function DiscussionModeration() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      student: "Riya Sharma",
      mentor: "Ankit Verma",
      messages: [
        { sender: "Riya Sharma", role: "student", text: "Sir, how to deploy React app?" },
        { sender: "Ankit Verma", role: "mentor", text: "You can use Vercel or Netlify, very easy." },
        { sender: "Riya Sharma", role: "student", text: "Thanks! I’ll try Netlify." },
      ],
      flagged: false,
    },
    {
      id: 2,
      student: "Aman Gupta",
      mentor: "Priya Nair",
      messages: [
        { sender: "Aman Gupta", role: "student", text: "I'm confused about MongoDB schema design." },
        { sender: "Priya Nair", role: "mentor", text: "Start with identifying entities and relations." },
        { sender: "Aman Gupta", role: "student", text: "Got it, thank you!" },
      ],
      flagged: true,
    },
  ]);

  const [selectedThread, setSelectedThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageBox, setMessageBox] = useState({ show: false, message: "" });
  
  // NEW STATE for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // 'All', 'Flagged', 'Safe'


  // Delete entire thread
  const handleDeleteThread = (id) => {
    setThreads(threads.filter((t) => t.id !== id));
    setShowModal(false);
  };

  // Ban student/mentor actions (mock)
  const handleBanUser = (user) => {
    setMessageBox({
      show: true,
      message: `🚫 ${user} has been permanently banned from the forum. (Mock Action)`,
    });
    setShowModal(false);
  };

  const lastMessage = (t) => t.messages[t.messages.length - 1].text;

  // Filtering Logic
  const filteredThreads = threads.filter((thread) => {
    // 1. Status Filter
    if (filterStatus === "Flagged" && !thread.flagged) {
      return false;
    }
    if (filterStatus === "Safe" && thread.flagged) {
      return false;
    }

    // 2. Search Filter (case-insensitive search across student name, mentor name, and last message)
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    if (lowerCaseSearchTerm === "") {
        return true; // No search term, so all threads pass
    }

    const studentMatch = thread.student.toLowerCase().includes(lowerCaseSearchTerm);
    const mentorMatch = thread.mentor.toLowerCase().includes(lowerCaseSearchTerm);
    const lastMessageMatch = lastMessage(thread).toLowerCase().includes(lowerCaseSearchTerm);

    return studentMatch || mentorMatch || lastMessageMatch;
  });

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 font-sans">
      <h2 className="text-3xl font-bold text-blue-800 border-b pb-3 mb-6">
        💬 Discussion Moderation Panel
      </h2>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-grow w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by student, mentor, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Select */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium whitespace-nowrap">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
          >
            <option value="All">All Threads</option>
            <option value="Flagged">Flagged</option>
            <option value="Safe">Safe</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-white sticky top-0">
            <tr>
              <th className="p-4 text-left font-semibold">Student</th>
              <th className="p-4 text-left font-semibold">Mentor</th>
              <th className="p-4 text-left font-semibold">Last Message Snippet</th>
              <th className="p-4 text-center font-semibold">Flag Status</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {/* RENDER FILTERED THREADS */}
            {filteredThreads.length > 0 ? (
                filteredThreads.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                    {/* Student */}
                    <td className="p-4 text-gray-900 font-medium">
                        <div className="flex items-center gap-2">
                        <User className="text-lg text-blue-700 w-5 h-5" />
                        {t.student}
                        </div>
                    </td>

                    {/* Mentor */}
                    <td className="p-4 text-gray-700">
                        <div className="flex items-center gap-2">
                        <UserCheck className="text-lg text-green-600 w-5 h-5" />
                        {t.mentor}
                        </div>
                    </td>

                    {/* Last Message */}
                    <td className="p-4 text-gray-600 truncate max-w-xs">
                        {lastMessage(t).length > 40 ? lastMessage(t).substring(0, 40) + '...' : lastMessage(t)}
                    </td>

                    {/* Flagged Status */}
                    <td className="p-4 text-center">
                        {t.flagged ? (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full">
                            ⚠️ Flagged
                        </span>
                        ) : (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                            ✅ Safe
                        </span>
                        )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                        <button
                        onClick={() => {
                            setSelectedThread(t);
                            setShowModal(true);
                        }}
                        className="flex items-center justify-center gap-2 mx-auto bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                        <Eye className="w-4 h-4" /> View
                        </button>
                    </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 text-lg">
                        No discussion threads match your search and filter criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Modal Section */}
      {showModal && selectedThread && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 relative animate-slideUp">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-2xl font-bold text-blue-800">
                Conversation Thread: <span className="text-gray-600 font-normal">{selectedThread.student} ↔ {selectedThread.mentor}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500 text-3xl font-light leading-none transition duration-150"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Message History */}
            <div className="max-h-96 overflow-y-auto border border-gray-200 p-4 rounded-xl bg-gray-50 space-y-4">
              {selectedThread.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "student" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[80%] shadow-sm ${
                      m.role === "student"
                        ? "bg-blue-100 text-gray-800 rounded-bl-none"
                        : "bg-green-100 text-gray-800 rounded-br-none"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {m.sender} (<span className="capitalize">{m.role}</span>)
                    </p>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Actions */}
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => handleBanUser(selectedThread.student)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition transform hover:scale-[1.02]"
              >
                <Ban className="w-4 h-4" /> Ban Student
              </button>
              <button
                onClick={() => handleBanUser(selectedThread.mentor)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 transition transform hover:scale-[1.02]"
              >
                <Ban className="w-4 h-4" /> Ban Mentor
              </button>
              <button
                onClick={() => handleDeleteThread(selectedThread.id)}
                className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-800 transition transform hover:scale-[1.02]"
              >
                <Trash2 className="w-4 h-4" /> Delete Thread
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Alert replacement */}
      {messageBox.show && (
        <MessageBox
          message={messageBox.message}
          onClose={() => setMessageBox({ show: false, message: "" })}
        />
      )}

      {/* Custom Styles for Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
