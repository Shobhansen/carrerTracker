
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import mentorIllustration from "../../assets/mentor.webp";
import { NavLink, useNavigate } from "react-router-dom";


export default function MentorLogin() {

  const navigate = useNavigate(); // Initialize navigation

  const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|net|org)$/i.test(email);

  // State for form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  //satate for show error message
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value,});
  };

  

  // Handle form submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateEmail(formData.email)) return setError("Enter valid email!");

  console.log("Submitting:", formData);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/mentor/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    console.log("Login Success:", response.data);

    // Save token for future requests
    localStorage.setItem("mentorToken", response.data.token);

    Swal.fire({
      title: `Login Successful!`,
      icon: "success",
      confirmButtonText: "OK"
    });

    navigate("/mentor/dashboard");

  } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      Swal.fire({
        title: "Login Failed",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100  flex items-center justify-center ">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden bg-white">
        
        {/* Left Side */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-10 flex flex-col justify-center text-white">
          <h1 className="text-3xl font-bold italic drop-shadow-md">
            Mentor Login !
          </h1>
          <p className="mt-4 text-white/90">
            Login to guide students and build successful careers.
          </p>

          <div className="mt-8 flex justify-center">
            <img
              src={mentorIllustration}
              alt="Mentor Illustration"
              className="w-80 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side */}
        
        <form
          onSubmit={handleSubmit}
          className="bg-indigo-100 p-10 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}
          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center border rounded-lg bg-white px-3">
              <span className="material-icons text-gray-400 mr-2">
                📧
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center border rounded-lg bg-white px-3">
              <span className="material-icons text-gray-400 mr-2">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
                
              />
            
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Forgot Password ?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90"
          >
            Login
          </button>

          {/* Register */}
          <p className="mt-6 text-gray-700 text-center">
            New Mentor ?{" "}
            <NavLink 
              to="/mentor/registration"
              className="text-indigo-600 font-semibold hover:underline">
              Register here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}