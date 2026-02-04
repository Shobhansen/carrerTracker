// src/Mentor_component/Profile.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile({ mentor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
  <h2 className="text-2xl font-bold text-amber-800 mb-4">My Profile</h2>
  <div className="space-y-4">
    <p><strong>Name:</strong> {mentor.name}</p>
    <p><strong>Email:</strong> {mentor.email}</p>
    <p><strong>Skills:</strong> {mentor.skills.join(", ")}</p>
    <NavLink
      to={"/mentor/profile/editProfile"}
      className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
    >
      Edit Profile
    </NavLink>
  </div>
</div>
  );
}