import React, { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      Swal.fire({
        title: `Login Successful!`,
        icon: "success", 
        confirmButtonText: "OK"
      });
      navigate("/admin/overview");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-sm bg-white p-10 rounded-xl shadow-2xl text-center border-t-4 border-blue-700">

        <Shield className="w-10 h-10 mx-auto text-blue-700 mb-2" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel Login</h1>
        <p className="text-sm text-gray-500 mb-6">Authorized access only.</p>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Admin Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50"
          />
        </div>

        <button
          className="w-full p-3 mt-6 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg"
          onClick={handleLogin}
        >
          <Lock className="w-5 h-5 inline mr-2 align-text-bottom" />
          Secure Login
        </button>

        <Link to="/admin/forgot-password" className="block mt-4 text-xs text-gray-400 hover:text-blue-600">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
