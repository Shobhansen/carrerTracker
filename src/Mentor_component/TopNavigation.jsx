import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaUser,
  FaUsers,
  FaComments,
  FaBell,
  FaChevronDown,
  FaUserEdit,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import mentorPic from "../assets/OIP1.webp"; // your local mentor image

export default function TopNavigation({ mentorName = "Suman Das", handleLogout }) {
  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const studentMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        studentMenuRef.current &&
        !studentMenuRef.current.contains(e.target)
      ) {
        setShowStudentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { path: "/mentor/dashboard", label: "Dashboard", icon: FaChartLine },
    { path: "/mentor/profile", label: "Profile", icon: FaUser },
    { path: "/mentor/discussion", label: "Discussion Forum", icon: FaComments },
  ];

  const handleSendHelp = () => {
    if (helpMessage.trim() === "") {
      alert("Please enter your message before sending.");
      return;
    }
    alert("Help request sent successfully!");
    setHelpMessage("");
    setShowHelpModal(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <header className="flex items-center justify-between px-8 py-3">
        {/* LEFT SECTION: Logo + Menu */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            <NavLink to={"/"}>
              <h1 className="text-2xl font-bold text-amber-800">CareerTracker</h1>
            </NavLink>
            <span className="text-gray-500 text-sm font-medium hidden lg:block">
              Mentor Portal
            </span>
          </div>

          {/* Menu */}
          <nav className="flex gap-8 text-gray-700 font-medium ml-20 relative">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition ${
                    isActive ? "text-amber-700" : "hover:text-amber-700"
                  }`
                }
              >
                <item.icon className="text-lg" /> {item.label}
              </NavLink>
            ))}

            {/* Student Management Dropdown (CLICK BASED) */}
            <div className="relative" ref={studentMenuRef}>
              <button
                onClick={() => setShowStudentMenu((prev) => !prev)}
                className="flex items-center gap-2 hover:text-amber-700 transition"
              >
                <FaUsers className="text-lg" />
                Student Management
                <FaChevronDown
                  className={`text-xs mt-1 transition-transform duration-200 ${
                    showStudentMenu ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {showStudentMenu && (
                <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-md w-56 z-10">
                  <NavLink
                    to="/mentor/students/list"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-100"
                  >
                    Student List
                  </NavLink>

                  <NavLink
                    to="/mentor/students/roadmap"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-100"
                  >
                    Roadmap & Suggestion
                  </NavLink>

                  <NavLink
                    to="/mentor/students/jobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-100"
                  >
                    Job Section
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* RIGHT SECTION: Notification + Profile */}
        <div className="flex items-center gap-8 relative">
          {/* Notification */}
          <button
            title="Notifications"
            className="relative text-gray-700 hover:text-amber-600"
          >
            <FaBell className="text-2xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>

          {/* Mentor Name */}
          <span className="font-semibold text-gray-800 hidden sm:block">
            {mentorName}
          </span>

          {/* Profile Picture with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                src={mentorPic}
                alt="Mentor"
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-600"
              />
              <FaChevronDown
                className={`absolute bottom-0 right-0 text-white bg-amber-600 rounded-full p-[2px] text-[15px] transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-20">
                <button
                  onClick={() => {
                    navigate("/mentor/profile/editProfile");
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-amber-50 text-gray-700"
                >
                  <FaUserEdit className="mr-2 text-amber-600" /> Edit Profile
                </button>

                <button
                  onClick={() => {
                    setShowHelpModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-amber-50 text-gray-700"
                >
                  <FaLifeRing className="mr-2 text-amber-600" /> Help & Support
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-amber-50 text-gray-700"
                >
                  <FaSignOutAlt className="mr-2 text-amber-600" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-amber-800 mb-3">
              Help & Support
            </h2>
            <textarea
              placeholder="Describe your issue..."
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-amber-500 resize-none"
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
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
