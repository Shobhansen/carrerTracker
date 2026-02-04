// src/Mentor_component/Dashboard.jsx (The Main App Layout/Router)
import React, { useState } from "react";
import { Routes, Route, Navigate,useLocation } from "react-router-dom";

// Import all required components
import TopNavigation from "./TopNavigation";
import DashboardContent from "./DashboardContent"; // Renamed content to avoid conflict
import StudentList from "./StudentList";
import DiscussionForum from "./DiscussionForum";
import Profile from "./Profile";
import JobNotification from "./JobNotification";
import RoadmapSuggestion from "./RoadmapSuggestion";
import MentorRegister from "./Auth/MentorRegister";
import MentorLogin from "./Auth/MentorLogin";
import EditProfile from "./EditProfile";
import mentorPic from "../assets/OIP1.webp"; 

export default function MDashboard() {

  const location=useLocation();

  // Mentor data state (centralized)
  const [mentor] = useState({
    name: "Suman Das",
    email: "suman.das@example.com",
    totalStudents: 8,
    activeSessions: 3,
    totalDiscussions: 15,
    skills: ["React", "Node.js", "AI/ML"],
    profilePicture:mentorPic,
    certificates: ["Certified React Developer – Meta (Coursera)",
      "Node.js Backend Development – Udemy Pro Certification",
      "Machine Learning Specialization – Stanford University (Coursera)"]
  });

  const handleLogout = () => {
    alert("You have been logged out!");
    // In a real app, this would redirect to the login page
  };

  //  Hide navbar for registration & login routes
    const hideNavbarRoutes = ["/mentor/registration", "/mentor/login"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex flex-col">

      {/* Conditionally render navbar */}
      {shouldShowNavbar && <TopNavigation handleLogout={handleLogout} />}

      {/* Main Content Area - Switched by React Router */}
      <main className={`${shouldShowNavbar ? 'p-8' : ''} flex-1`}>
        <Routes>

          {/* Default Route: Redirects the base path (e.g., /mentor/) to /mentor/dashboard */}
          <Route path="/" element={<Navigate to="login" replace />} />

          {/* Individual Content Routes (using relative paths) */}
          <Route path="registration" element={<MentorRegister/>}/>
          <Route path="login" element={<MentorLogin/>} />

          <Route path="dashboard" element={<DashboardContent mentor={mentor} />} />
          <Route path="profile" element={<Profile mentor={mentor} />} />
          <Route path="profile/editProfile" element={<EditProfile mentor={mentor}/>} />
          <Route path="students" element={<StudentList />} />
          <Route path="discussion" element={<DiscussionForum />} />
          <Route path="students/jobs" element={<JobNotification/>} />
          <Route path="students/list" element={<StudentList/>} />
          <Route path="students/roadmap" element={<RoadmapSuggestion/>} />

          {/* Fallback Route */}
          <Route path="*" element={<div className="text-center text-xl p-10 text-red-600">404: Page Not Found</div>} />
        </Routes>
      </main>

    </div>
  );
}