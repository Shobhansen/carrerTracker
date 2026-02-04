import React, { useState } from "react";
import { FaEdit, FaSave, FaTrashAlt, FaPlus, FaLink } from "react-icons/fa";

export default function EditProfile({ mentor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mentor.name || "",
    email: mentor.email || "",
    mobile: mentor.mobile || "",
    address: mentor.address || "",
    company: mentor.company || "",
    linkedin: mentor.linkedin || "",
    bio: mentor.bio || "",
    skills: mentor.skills || [],
    certificates: mentor.certificates || [],
    profilePicture: mentor.profilePicture || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new skill
  const addSkill = () => {
    const newSkill = prompt("Enter new skill:");
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
    }
  };

  // Remove skill
  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  // Handle certificate upload
  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    const newCerts = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFormData({
      ...formData,
      certificates: [...formData.certificates, ...newCerts],
    });
  };

  // Delete a certificate
  const removeCertificate = (name) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.filter((c) => c.name !== name),
    });
  };

  // Save profile changes
  const saveProfile = () => {
    console.log("Updated profile data:", formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-800">My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          {isEditing ? <FaSave className="inline mr-2" /> : <FaEdit className="inline mr-2" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <img
          src={formData.profilePicture || "https://via.placeholder.com/52"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-amber-300 object-cover"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            className="ml-4"
            onChange={handleProfilePicUpload}
          />
        )}
      </div>

      {/* Editable Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Email:</label>
          <p>{formData.email}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-700">Mobile:</label>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          ) : (
            <p>{formData.mobile}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          ) : (
            <p>{formData.address}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Current Company:</label>
          {isEditing ? (
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          ) : (
            <p>{formData.company}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">LinkedIn Profile:</label>
          {isEditing ? (
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
            />
          ) : (
            <a
              href={formData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-amber-700 hover:underline flex items-center"
            >
              <FaLink className="mr-1" /> {formData.linkedin || "Not added"}
            </a>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Bio:</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 resize-none"
            />
          ) : (
            <p>{formData.bio || "No bio added."}</p>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <label className="font-semibold text-gray-700">Skills:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                {isEditing && (
                  <FaTrashAlt
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                )}
              </span>
            ))}
            {isEditing && (
              <button
                onClick={addSkill}
                className="flex items-center px-3 py-1 border border-amber-500 text-amber-700 rounded-full hover:bg-amber-50 transition"
              >
                <FaPlus className="mr-1" /> Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <label className="font-semibold text-gray-700">Certificates:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {formData.certificates.map((cert, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg flex justify-between items-center bg-amber-50"
              >
                <span className="text-gray-800">{cert}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:underline"
                  >
                    View
                  </a>
                  {isEditing && (
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeCertificate(cert.name)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {isEditing && (
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleCertificateUpload}
              className="mt-3"
            />
          )}
        </div>
      </div>

      {isEditing && (
        <button
          onClick={saveProfile}
          className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition"
        >
          Save Profile
        </button>
      )}
    </div>
  );
}
