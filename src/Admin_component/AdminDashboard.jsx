// src/Admin_component/AdminDashboard.jsx
import React from "react";
import { Routes, Route, Navigate,useLocation } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import Overview from "./Overview";
import UserManagement from "./UserManagement";
// import MentorApproval from "./MentorApproval";
import DiscussionModeration from "./DiscussionModeration";
import JobManagement from "./JobManagement";
import SystemSettings from "./SystemSettings";
import Profile from "./Profile";
import AdminLogin from "./Auth/AdminLogin";
import MentorStudentAssignmentControl from "./MentorStudentAssignmentControl";
import ControlQuestion from "./ControlQuestion";

export default function AdminDashboard() {

    const location=useLocation();

  const handleLogout = () => {
    alert("Admin logged out!");
    // later redirect: navigate("/login")
  };

  // Hide navbar for registration & login routes
    const hideNavbarRoutes = ["/admin/registration", "/admin/login"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 flex flex-col">
        {/* Conditionally render navbar */}
        {shouldShowNavbar && <TopNavigation handleLogout={handleLogout} />}

      {/* Main Page Routing */}
      <main className="p-8 flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route path="login" element={<AdminLogin/>} />
          <Route path="overview" element={<Overview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="mentor-approvals" element={<MentorStudentAssignmentControl/>} /> 
          <Route path="moderation" element={<DiscussionModeration />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="control-question" element={<ControlQuestion/>} /> 
          <Route
            path="*"
            element={
              <div className="text-center text-xl text-red-600 mt-20">
                404: Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
