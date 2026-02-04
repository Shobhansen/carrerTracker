import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaBullseye, FaEnvelopeOpenText, FaUserTie, FaTimes } from 'react-icons/fa';

export default function DashboardContent({ student }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example mentors data (you can replace this with data from your backend)
  const connectedMentors = [
    { name: "Suman Das", expertise: "Web Development", email: "sumandas@example.com", sessions: 3 },
    { name: "Rahul Chakraborty", expertise: "UI/UX Design", email: "rahul.chakraborty@example.com", sessions: 1 },
  ];

  // Dashboard widgets
  const widgets = [
    { 
      title: "Profile Completeness Meter", 
      icon: FaTasks, 
      value: `${student.completenessScore}%`,
      description: "View & Edit Details",
      color: "blue",
      action: () => navigate('/student/profile') 
    },
    { 
      title: "Role Readiness Indicator", 
      icon: FaBullseye, 
      value: `${student.readinessScore}%`,
      description: "Go to Readiness Page",
      color: "amber",
      action: () => navigate('readiness')
    },
    { 
      title: "Job Alerts", 
      icon: FaEnvelopeOpenText, 
      value: student.jobAlerts,
      description: "View Job Alerts",
      color: "red",
      action: () => navigate('job')
    },
    { 
      title: "Connected Mentors", 
      icon: FaUserTie, 
      value: `${connectedMentors.length} `,
      description: "View Mentors",
      color: "purple",
      action: () => setIsModalOpen(true)  // open mentor modal
    },
  ];

  const colorMap = {
    blue: { bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-800" },
    amber: { bg: "bg-amber-100", border: "border-amber-500", text: "text-amber-800" },
    red: { bg: "bg-red-100", border: "border-red-500", text: "text-red-800" },
    purple: { bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-800" },
  };

  return (
    <div className="space-y-8 relative">
      <h2 className="text-3xl font-bold text-gray-900">Welcome, {student.name}!</h2>

      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {widgets.map((widget) => {
          const colors = colorMap[widget.color];
          return (
            <div
              key={widget.title}
              className={`p-6 rounded-xl shadow-lg border-t-4 ${colors.border} ${colors.bg} cursor-pointer hover:shadow-xl transition-all duration-300`}
              onClick={widget.action}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${colors.text}`}>{widget.title}</h3>
                <widget.icon className={`text-3xl ${colors.border}`} />
              </div>
              <p className="text-4xl font-bold text-gray-900">{widget.value}</p>
              <button className={`mt-3 text-sm font-medium underline ${colors.text} hover:opacity-80`}>
                {widget.description}
              </button>
            </div>
          );
        })}
      </div>

      {/* Activity + Forum Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-gray-600">
            <li>✅ You updated your profile details. <span className="text-xs text-gray-400">10 min ago</span></li>
            <li>💬 Mentor John Doe replied in the discussion forum. <span className="text-xs text-gray-400">2 hours ago</span></li>
            <li>📅 Upcoming session with John Doe on Friday. <span className="text-xs text-gray-400">Tomorrow</span></li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Discussion Forum Widget</h3>
          <p className="text-gray-600 mb-4">Quick access to unanswered questions or popular topics.</p>
          <button
            onClick={() => navigate('/student/forum')}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Forum
          </button>
        </div>
      </div>

      {/* Mentor Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-purple-700 mb-4">Connected Mentors</h2>

            {connectedMentors.length > 0 ? (
              <div className="space-y-4">
                {connectedMentors.map((mentor, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-lg shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">Expertise: {mentor.expertise}</p>
                    <p className="text-sm text-gray-600">Email: {mentor.email}</p>
                    <p className="text-sm text-gray-600">Sessions: {mentor.sessions}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No mentors connected yet.</p>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/student/find-mentor');
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Find More Mentors
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
