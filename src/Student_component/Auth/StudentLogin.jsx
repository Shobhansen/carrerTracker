import React, { useState } from "react";
import axios from 'axios';
import studentIllustration from "../../assets/login-ui.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function StudentLogin() {

  const navigate = useNavigate(); // Initialize navigation
  const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|net|org)$/i.test(email);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //satate for show error message
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) return setError("Enter valid email!");
    console.log("Submitting:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Login Success:", response.data);

      // Save token for future requests
      localStorage.setItem("studentToken", response.data.token);

      Swal.fire({
        title: `Login Successful!`,
        icon: "success", // success, error, warning, info, question
        confirmButtonText: "OK"
      });

      navigate("/student/test/start");

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden bg-white/90 backdrop-blur-md">
        {/* Left Side - Welcome Section */}
        <div className="bg-blue-500/90 p-10 flex flex-col justify-center text-white">
          <h1 className="text-3xl font-bold">Welcome To Student Portal !</h1>
          <p className="mt-4 text-white/90">
            Login and unlock your potential.
          </p>

          {/* Illustration */}
          <div className="mt-8 flex justify-center">
            <img
              src={studentIllustration}
              alt="Student Illustration"
              className="w-80 h-80 object-cover rounded-full border-4 border-white shadow-xl"

            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-blue-50/90 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Student Login
          </h2>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                📧
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                🔒
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forget Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600">
            Not a Member?{" "}
            <NavLink
              className="text-blue-600 font-semibold hover:underline"
              to={"/student/registration"}
            >
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
