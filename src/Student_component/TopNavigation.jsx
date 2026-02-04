import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaComments,
  FaBell,
  FaUserEdit,
  FaLifeRing,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import studentPic from "../assets/OIP1.webp"; // local image

export default function TopNavigation({ student, handleLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const navigate = useNavigate();

  const dropdownRef = useRef(null); //  reference for dropdown container

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { path: "/student/dashboard", name: "Dashboard", icon: FaTachometerAlt },
    { path: "/student/profile", name: "Profile", icon: FaUser },
    { path: "/student/find-mentor", name: "Mentors", icon: FaUsers },
    { path: "/student/forum", name: "Forum", icon: FaComments },
  ];

  const activeClass =
    "text-blue-600 font-bold transition duration-200 border-b-2 border-blue-600 py-1";
  const inactiveClass =
    "text-gray-700 hover:text-blue-600 transition duration-200 py-1";

  const handleSendHelp = () => {
    if (helpMessage.trim() === "") {
      alert("Please enter your message before sending.");
      return;
    }
    alert("Your support request has been sent!");
    setHelpMessage("");
    setShowHelpModal(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LEFT: Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to={"/"}>
            <h1 className="text-2xl font-bold text-blue-700 tracking-wider">
              CareerTrackr
            </h1>
          </NavLink>
          <span className="text-sm font-light text-gray-500 hidden sm:block border-l border-gray-300 pl-4">
            STUDENT PORTAL
          </span>
        </div>

        {/* CENTER: Navigation */}
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              title={item.name}
            >
              <span className="text-sm uppercase tracking-wider">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: Notification + Profile */}
        <div className="flex items-center space-x-5 relative">
          {/* Notification Icon */}
          <button
            title="Notifications"
            className="relative text-gray-700 hover:text-blue-700 transition p-1 rounded-full"
          >
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Picture Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {/* Profile Picture */}
              <img
                src={studentPic}
                alt="Student"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
              />
              {/* Arrow inside bottom-right */}
              <FaChevronDown
                className={`absolute bottom-0 right-0 text-white bg-blue-600 rounded-full p-[2px] text-[14px] transition-transform duration-200 ${showProfileMenu ? "rotate-180" : "rotate-0"
                  }`}
              />
            </div>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-20">
                <button
                  onClick={() => {
                    navigate("/student/profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaUserEdit className="mr-2 text-blue-600" /> Edit Profile
                </button>

                <button
                  onClick={() => {
                    setShowHelpModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaLifeRing className="mr-2 text-blue-600" /> Help & Support
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaSignOutAlt className="mr-2 text-blue-600" /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Help & Support
            </h2>
            <textarea
              placeholder="Describe your issue..."
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendHelp}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
