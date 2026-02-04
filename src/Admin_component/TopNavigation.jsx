// src/Admin_component/TopNavigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCheck,
  FaComments,
  FaBriefcase,
  FaCogs,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,

} from "react-icons/fa";

export default function TopNavigation({ handleLogout }) {
  const menuItems = [
    { path: "/admin/overview", label: "Overview", icon: FaTachometerAlt },
    { path: "/admin/users", label: "User Management", icon: FaUsers },
    { path: "/admin/mentor-approvals", label: "Mentor Approval", icon: FaUserCheck },
    { path: "/admin/moderation", label: "Moderation", icon: FaComments },
    { path: "/admin/jobs", label: "Jobs", icon: FaBriefcase },
    { path: "/admin/control-question", label: "Control Question", icon: FaCogs },
    { path: "/admin/settings", label: "Settings", icon: FaCogs },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-8 py-3">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          <NavLink to={"/"}>
            <h1 className="text-2xl font-bold text-blue-800">CareerTracker</h1>
          </NavLink>
          <span className="text-gray-500 text-sm font-medium hidden lg:block">
            Admin Panel
          </span>
        </div>

        <nav className="flex gap-6 text-gray-700 font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-blue-700" : "hover:text-blue-700"
                }`
              }
            >
              <item.icon className="text-lg" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: Notification + Profile + Logout */}
      <div className="flex items-center gap-6">
        <button
          title="Notifications"
          className="relative text-gray-700 hover:text-blue-700"
        >
          <FaBell className="text-2xl" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            4
          </span>
        </button>

        <NavLink to="/admin/profile">
          <FaUserCircle className="text-3xl text-blue-700 hover:scale-105 transition" />
        </NavLink>

        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>
    </header>
  );
}
