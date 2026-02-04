import React, { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaTimes } from "react-icons/fa";

const sampleJobs = [
  {
    id: 1,
    company: "TechNova Labs",
    logo: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    title: "Frontend Developer",
    location: "Kolkata, India",
    type: "Full Time",
    experience: "0-2 years",
    skills: ["ReactJS", "TailwindCSS", "JavaScript"],
    description:
      "Join our dynamic frontend team to build responsive and modern UIs using ReactJS and TailwindCSS.",
    applyLink: "https://www.technovaworld.com/",
  },
  {
    id: 2,
    company: "DataSense AI",
    logo: "https://cdn-icons-png.flaticon.com/512/1048/1048877.png",
    title: "Junior Data Analyst",
    location: "Remote",
    type: "Internship",
    experience: "Fresher",
    skills: ["Python", "Excel", "Data Visualization"],
    description:
      "Work with large datasets, prepare reports, and assist in building visualization dashboards for clients.",
    applyLink: "https://practice.datasenseai.com/",
  },
  {
    id: 3,
    company: "CloudCraft Systems",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    title: "DevOps Engineer",
    location: "Bengaluru, India",
    type: "Full Time",
    experience: "1-3 years",
    skills: ["AWS", "Docker", "CI/CD"],
    description:
      "Automate infrastructure and deployments while ensuring high availability of cloud systems.",
    applyLink: "https://docs.datadoghq.com/cloudcraft/r",
  },
];

export default function JobAlertSection() {
  const [selectedJob, setSelectedJob] = useState(null);

  // 🔗 Function to open job page
  const handleApply = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Company link not available.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaBriefcase className="text-blue-600 mr-2" /> Job Alerts
      </h2>

      <p className="text-gray-600 mb-6">
        Based on your readiness and skills, here are some jobs that match your profile.
      </p>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-blue-50/30"
          >
            <div className="flex items-center mb-3">
              <img
                src={job.logo}
                alt={job.company}
                className="w-10 h-10 rounded-full mr-3 border"
              />
              <div>
                <p className="font-bold text-gray-800">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <FaClock className="mr-1 text-blue-500" /> {job.type} • {job.experience}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setSelectedJob(job)}
                className="text-blue-700 hover:underline text-sm font-semibold"
              >
                View Details
              </button>
              <button
                onClick={() => handleApply(job.applyLink)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedJob(null)}
            >
              <FaTimes />
            </button>

            <div className="flex items-center mb-4">
              <img
                src={selectedJob.logo}
                alt={selectedJob.company}
                className="w-12 h-12 rounded-full mr-3 border"
              />
              <div>
                <h2 className="text-xl font-bold text-blue-700">{selectedJob.title}</h2>
                <p className="text-gray-700 font-medium">{selectedJob.company}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />
                  {selectedJob.location}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{selectedJob.description}</p>

            <p className="text-sm text-gray-500 mb-2">
              <strong>Experience:</strong> {selectedJob.experience}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Job Type:</strong> {selectedJob.type}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedJob.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleApply(selectedJob.applyLink)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
