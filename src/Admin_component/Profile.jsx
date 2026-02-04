import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  KeyRound,
  Save,
  List,
  X,
  Lock,
} from "lucide-react";

// --- MOCK DATA ---
const mockAdminProfile = {
  name: "System Administrator",
  email: "admin@platform.com",
  is2FAEnabled: true,
};

const mockActivityLog = [
  { id: 105, timestamp: "2025-10-28 10:30:15", action: "Updated platform settings" },
  { id: 104, timestamp: "2025-10-28 09:45:01", action: "Ran system backup" },
  { id: 103, timestamp: "2025-10-27 15:20:44", action: "Updated mentor permissions" },
];

// 🔹 Password Change Modal Component
const PasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("❌ New password and confirmation do not match!");
      return;
    }
    console.log("Password successfully changed!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-blue-200 p-6 animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <Lock className="w-5 h-5" /> Change Password
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end pt-3 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Personal Settings ---
const PersonalSettings = ({ profile, setProfile }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleProfileSave = () => {
    console.log("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-between items-center bg-white p-4 rounded-xl shadow-inner">
        <h5 className="text-lg font-semibold text-gray-700">Password Management</h5>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition font-semibold text-sm"
        >
          <KeyRound className="w-4 h-4" /> Change Password
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleProfileSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-[1.02] font-semibold"
        >
          <Save className="w-5 h-5" /> Save Profile
        </button>
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

// --- Two-Factor Auth ---
const TwoFactorAuth = ({ profile, setProfile }) => {
  const handleToggle2FA = () => {
    setProfile((prev) => ({ ...prev, is2FAEnabled: !prev.is2FAEnabled }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-blue-600" /> Two-Factor Authentication (2FA)
      </h3>

      <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${profile.is2FAEnabled ? "bg-green-500" : "bg-red-500"}`} />
          <span className="font-semibold text-gray-700">
            Status: {profile.is2FAEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <button
          onClick={handleToggle2FA}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            profile.is2FAEnabled
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {profile.is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
};

// --- Admin Activity Log ---
const AdminActivityLog = () => (
  <div className="space-y-4">
    <p className="text-gray-600">Chronological record of admin actions.</p>
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left font-semibold text-gray-700">Timestamp</th>
            <th className="p-4 text-left font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {mockActivityLog.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-900">{log.timestamp}</td>
              <td className="p-4 text-gray-700">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function AdminProfile() {
  const [profile, setProfile] = useState(mockAdminProfile);
  const [currentTab, setCurrentTab] = useState("profile");

  const renderContent = () => {
    switch (currentTab) {
      case "profile":
        return <PersonalSettings profile={profile} setProfile={setProfile} />;
      case "2fa":
        return <TwoFactorAuth profile={profile} setProfile={setProfile} />;
      case "log":
        return <AdminActivityLog />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <User className="w-7 h-7" /> Admin Profile
      </h2>

      <div className="flex flex-wrap border-b border-gray-200 mb-4">
        <button
          onClick={() => setCurrentTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border-b-2 
            ${currentTab === "profile"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-blue-600"}
          `}
        >
          <User className="w-4 h-4" /> Personal Settings
        </button>
        <button
          onClick={() => setCurrentTab("2fa")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border-b-2 
            ${currentTab === "2fa"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-blue-600"}
          `}
        >
          <ShieldCheck className="w-4 h-4" /> 2FA Setup
        </button>
        <button
          onClick={() => setCurrentTab("log")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border-b-2 
            ${currentTab === "log"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-blue-600"}
          `}
        >
          <List className="w-4 h-4" /> Activity Log
        </button>
      </div>

      {renderContent()}
    </div>
  );
}
