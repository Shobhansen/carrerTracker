// Updated Job Management Component with Add & Manage Buttons
// (Full code rewritten to include 'Add Job & Internship' and 'Manage Job & Internship' buttons)

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  Calendar,
  Archive,
  Eye,
  Activity,
  X,
  Search,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock job data
const initialJobs = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    company: "Innovatech Solutions",
    deadline: "2024-12-31",
    status: "Active",
    description:
      "Build responsive UIs using React and Tailwind CSS. Requires basic knowledge of state management.",
    recommendationHistory: [
      { user: "Riya Sharma", timestamp: "2024-10-15" },
      { user: "Ankit Verma", timestamp: "2024-10-10" },
    ],
  },
  {
    id: 2,
    title: "Data Science Internship",
    company: "DataGenius Labs",
    deadline: "2024-10-25",
    status: "Expired",
    description:
      "Assist with data cleaning, modeling, and visualization using Python/R. Must be proficient in Pandas.",
    recommendationHistory: [{ user: "Priya Nair", timestamp: "2024-09-01" }],
  },
  {
    id: 3,
    title: "Senior Backend Engineer",
    company: "FutureFlow Inc.",
    deadline: "2025-01-15",
    status: "Active",
    description:
      "Design and implement scalable microservices using Node.js and MongoDB. Experience with Kafka is a plus.",
    recommendationHistory: [],
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);

  // Utility function
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Archive job
  const handleArchive = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: "Expired" } : job
      )
    );
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob(null);
      setShowModal(false);
    }
  };

  // Add Job
  const handleAddJob = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newJob = {
      id: jobs.length + 1,
      title: formData.get("title"),
      company: formData.get("company"),
      deadline: formData.get("deadline"),
      status: "Active",
      description: formData.get("description"),
      recommendationHistory: [],
    };

    setJobs([...jobs, newJob]);
    setShowAddForm(false);
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const lower = searchTerm.toLowerCase();

      if (filterStatus !== "All" && job.status !== filterStatus) return false;

      if (lower === "") return true;

      return (
        job.title.toLowerCase().includes(lower) ||
        job.company.toLowerCase().includes(lower) ||
        job.description.toLowerCase().includes(lower)
      );
    });
  }, [jobs, searchTerm, filterStatus]);

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 font-sans">
      <h2 className="text-3xl md:text-3xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-4 mb-6">
        💼 Job & Internship Management
      </h2>

      {/* BUTTONS BELOW MAIN HEADING */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className={`${showAddForm ? 'bg-blue-600 text-white shadow-md' : '"bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'} px-6 py-3 rounded-xl transition`}
        >
          ➕ Add Job & Internship
        </button>

        <button
          onClick={() => setShowAddForm(false)}
          className={`${!showAddForm ? 'bg-blue-600 text-white shadow-md' : '"bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'} px-6 py-3 rounded-xl transition`}
        >
          🛠️ Manage Job & Internship
        </button>
      </div>

      {/* ADD JOB FORM */}
      {showAddForm && (
        <form
          onSubmit={handleAddJob}
          className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10"
        >
          <h3 className="text-xl font-bold text-indigo-700 mb-4">Add New Job</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Job Title"
              required
              className="p-3 border rounded-xl"
            />
            <input
              name="company"
              placeholder="Company Name"
              required
              className="p-3 border rounded-xl"
            />
            <div className="flex flex-col">
              <input
                type="text" // Start as text to show placeholder
                className="w-full p-3 border rounded-xl"
                placeholder="Deadline Date"
                name="deadline"
                onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
                onBlur={(e) => !e.target.value && (e.target.type = "text")} // Switch back if empty
                required
              />

            </div>


            <input
              name="impLink"
              placeholder="Important Link"
              required
              className="p-3 border rounded-xl"
            />
          </div>

          <textarea
            name="description"
            placeholder="Job Description"
            required
            className="w-full mt-4 p-3 border rounded-xl"
            rows="4"
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Add Job
          </button>
        </form>
      )}

      {/* The existing Manage Section appears only when add form is closed */}
      {!showAddForm && (
        <>
          {/* Search + Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title & company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border rounded-xl"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 border rounded-xl"
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active</option>
              <option value="Expired">Status: Expired</option>
            </select>
          </div>

          {/* JOB LIST TABLE  */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Title / Company</th>
                  <th className="p-4 text-left font-semibold hidden sm:table-cell">Deadline</th>
                  <th className="p-4 text-center font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-indigo-50 transition">
                      <td className="p-4 font-medium text-gray-900">
                        <div>
                          <div className="font-bold">{job.title}</div>
                          <div className="text-gray-500 text-xs">{job.company}</div>
                        </div>
                      </td>

                      <td className="p-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-gray-700">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          {job.deadline}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status === "Active" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {job.status}
                        </span>
                      </td>

                      <td className="p-4 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border"
                        >
                          <Eye className="w-3 h-3 inline mr-1" /> View
                        </button>

                        {job.status === "Active" && (
                          <button
                            onClick={() => handleArchive(job.id)}
                            className="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full border"
                          >
                            <Archive className="w-3 h-3 inline mr-1" /> Archive
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-8 text-center text-gray-500 text-lg"
                    >
                      No job listings match your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* MODAL  */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 relative animate-slideUp">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> {selectedJob.title}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedJob(null);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 border rounded-xl bg-indigo-50">
                <h4 className="text-xl font-semibold text-indigo-800 mb-3">
                  Job Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p><strong>Company:</strong> {selectedJob.company}</p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <strong>Status:</strong>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        selectedJob.status
                      )}`}
                    >
                      {selectedJob.status}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <strong>Deadline:</strong> {selectedJob.deadline}
                  </p>
                  <div className="md:col-span-2">
                    <strong>Description:</strong> {selectedJob.description}
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-xl">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Recommendation History
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedJob.recommendationHistory.length > 0 ? (
                    selectedJob.recommendationHistory.map((rec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-green-50 p-3 rounded-lg border"
                      >
                        <span className="font-medium">{rec.user}</span>
                        <span className="text-gray-500 text-xs italic">
                          {rec.timestamp}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No records found.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end">
                {selectedJob.status === "Active" ? (
                  <button
                    onClick={() => handleArchive(selectedJob.id)}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700"
                  >
                    <Archive className="w-5 h-5 inline mr-2" /> Archive Listing
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white px-6 py-3 rounded-xl"
                    disabled
                  >
                    Archived
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
