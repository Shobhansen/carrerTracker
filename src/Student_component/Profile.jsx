import React, { useState } from "react";
import {
  FaUserEdit,
  FaSave,
  FaCheckCircle,
  FaProjectDiagram,
  FaGlobe,
  FaCertificate,
  FaLinkedin,
  FaUserCircle,
  FaGithub,
} from "react-icons/fa";

const mockStudentData = {
  name: "Shobhan Sen",
  email: "Shobhan.j@example.com",
  phone: "91+ 123-4567",
  location: "Kolkata, CA",
  desiredRole: "Data Scientist",
  bio: "Passionate about data-driven problem-solving and AI innovation.",
  linkedin: "https://linkedin.com/in/shobhansen",
  completeness: 70,
  profilePic: "",
  skills: ["Python", "SQL", "Machine Learning", "Tableau", "Cloud Computing"],
  achievements: [
    { title: "Google Data Analytics Certificate", file: "" },
    { title: "AI/ML Hackathon Finalist", file: "" },
  ],
  projects: [
    { name: "E-commerce Sales Predictor", link: "#", github: "" },
    { name: "Social Media Analysis Tool", link: "#", github: "" },
  ],
};

const ProfileSection = ({ title, completeness }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
    <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-500 h-2.5 rounded-full"
        style={{ width: `${completeness}%` }}
      ></div>
    </div>
    <span className="text-sm font-medium text-blue-600">
      {completeness}% Complete
    </span>
  </div>
);

const SectionCard = ({ children, icon: Icon, title }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full">
    <div className="flex items-center space-x-3 mb-4 border-b pb-2">
      <Icon className="text-2xl text-blue-600" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

export default function Profile() {
  const [profile, setProfile] = useState(mockStudentData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profilePic: imageURL }));
    }
  };

  const handleCertificateUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const updated = [...profile.achievements];
      updated[index].file = fileURL;
      setProfile((prev) => ({ ...prev, achievements: updated }));
    }
  };

  const handleGithubChange = (index, e) => {
    const value = e.target.value;
    const updated = [...profile.projects];
    updated[index].github = value;
    setProfile((prev) => ({ ...prev, projects: updated }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 border-b pb-2 mb-4">
        Student Profile
      </h1>

      <ProfileSection
        title="Overall Profile Completeness"
        completeness={profile.completeness}
      />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <SectionCard
            icon={FaUserCircle}
            title="Personal & Contact Information"
          >
            {/* Profile Picture */}
            <div className="flex items-center mb-6 space-x-4">
              {profile.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-6xl" />
              )}
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-sm text-gray-700"
                />
              )}
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-6 py-2 rounded-lg font-semibold transition duration-300 flex items-center space-x-2 ${
                  isEditing
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                {isEditing ? (
                  <>
                    <FaSave /> <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <FaUserEdit /> <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* Info Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "phone", "location", "desiredRole", "linkedin"].map(
                (key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-500 mb-1 capitalize">
                      {key === "linkedin"
                        ? "LinkedIn Profile"
                        : key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={profile[key]}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                        isEditing
                          ? "bg-white border-blue-400"
                          : "bg-gray-100 border-gray-300 cursor-default"
                      }`}
                    />
                  </div>
                )
              )}
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Bio:
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows={3}
                className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                  isEditing
                    ? "bg-white border-blue-400"
                    : "bg-gray-100 border-gray-300 cursor-default"
                }`}
              ></textarea>
            </div>
          </SectionCard>

          {/* Certificates Section under personal info for clean design */}
          <SectionCard icon={FaCertificate} title="Achievements & Certificates">
            <ul className="space-y-4">
              {profile.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="bg-green-50 p-3 rounded-lg border border-green-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-700 flex items-center space-x-2">
                      <FaCertificate className="text-green-500" />
                      <span>{ach.title}</span>
                    </div>
                    {isEditing && (
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleCertificateUpload(i, e)}
                        className="text-xs text-gray-700"
                      />
                    )}
                  </div>
                  {ach.file && (
                    <div className="mt-2">
                      <a
                        href={ach.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          <SectionCard icon={FaCheckCircle} title="Key Skills">
            <ul className="space-y-2">
              {profile.skills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-3 text-gray-700 bg-blue-50 p-2 rounded-lg border border-blue-100"
                >
                  <FaCheckCircle className="text-sm text-blue-500" />
                  <span className="text-sm font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Projects */}
          <SectionCard icon={FaProjectDiagram} title="Recent Projects">
            <ul className="space-y-4">
              {profile.projects.map((proj, i) => (
                <li
                  key={i}
                  className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                >
                  <p className="font-semibold text-gray-800">{proj.name}</p>
                  <div className="mt-1 space-y-1">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center space-x-2"
                    >
                      <FaGlobe className="text-blue-500" />
                      <span>Project Link</span>
                    </a>

                    <div className="flex items-center space-x-2 mt-1">
                      <FaGithub className="text-gray-700" />
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="Enter GitHub link"
                          value={proj.github}
                          onChange={(e) => handleGithubChange(i, e)}
                          className="w-full text-sm p-1 border rounded-md"
                        />
                      ) : proj.github ? (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          View GitHub Repo
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          No GitHub link added
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
