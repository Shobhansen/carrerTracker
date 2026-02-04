import React, { useState } from "react";
import {
  FaUserGraduate,
  FaUserTie,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

export default function MentorStudentAssignmentControl() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [manualAssignment, setManualAssignment] = useState({
    student: "",
    mentor: "",
  });

  const pendingRequests = [
    { id: 1, student: "Shobhan Sen", mentor: "Rahul Sen", date: "2025-10-05" },
    { id: 2, student: "Soumita Das", mentor: "Ankur Roy", date: "2025-10-06" },
    { id: 3, student: "Samarpita Mukherjee", mentor: "Anik Patra", date: "2025-10-07" },
  ];

  const handleAction = (req, type) => {
    setSelectedRequest(req);
    setActionType(type);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    alert(`${actionType} request for ${selectedRequest.student}`);
    setShowModal(false);
  };

  const handleManualAssign = () => {
    if (!manualAssignment.student || !manualAssignment.mentor) {
      alert("Please enter both Student and Mentor names.");
      return;
    }
    alert(
      `Assigned ${manualAssignment.student} to ${manualAssignment.mentor} successfully!`
    );
    setManualAssignment({ student: "", mentor: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <h1 className="text-3xl md:text-3xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-4 mb-8">
        Mentor–Student Assignment Control
      </h1>

      {/* ======= Pending Requests Section ======= */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <FaUserGraduate className="text-blue-600" /> Pending Student Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="p-3 rounded-l-lg">Student</th>
                <th className="p-3">Requested Mentor</th>
                <th className="p-3">Date</th>
                <th className="p-3 rounded-r-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-3">{req.student}</td>
                  <td className="p-3">{req.mentor}</td>
                  <td className="p-3">{req.date}</td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => handleAction(req, "Approve")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      <FaCheckCircle className="inline mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(req, "Deny")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      <FaTimesCircle className="inline mr-1" /> Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======= Manual Assignment Section ======= */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <FaUserTie className="text-blue-600" /> Manual Assignment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Student Name
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              value={manualAssignment.student}
              onChange={(e) =>
                setManualAssignment({ ...manualAssignment, student: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Mentor Name
            </label>
            <input
              type="text"
              placeholder="Enter mentor name or Email ID"
              value={manualAssignment.mentor}
              onChange={(e) =>
                setManualAssignment({ ...manualAssignment, mentor: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleManualAssign}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <FaExchangeAlt /> Assign
          </button>
        </div>
      </div>

      {/* ======= Reassignment Section =======
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <FaSyncAlt className="text-blue-600" /> Reassign Student to New Mentor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Current Student
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              New Mentor
            </label>
            <input
              type="text"
              placeholder="Enter new mentor name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 transition">
            <FaSyncAlt /> Reassign
          </button>
        </div>
      </div> */}

      {/* ======= Confirmation Modal ======= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Confirm {actionType}
            </h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to{" "}
              <span className="font-semibold text-blue-600">{actionType}</span>{" "}
              the request for{" "}
              <span className="font-semibold">{selectedRequest?.student}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
