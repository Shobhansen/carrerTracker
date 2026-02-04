import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import mentorIllustration from "../../assets/student.webp";
import Swal from "sweetalert2";


export default function MentorRegistration() {
  const navigate = useNavigate();

  const fieldOptions = ["Software Development", "AI/ML", "Data Science", "UI/UX"];
  const [step, setStep] = useState(1);
  const steps = ["Personal", "Professional", "Mentorship", "Review"]; //array of step
  const [error, setError] = useState("");

  const [otp, setOtp] = useState({ email: "", mobile: "" });
  const [verified, setVerified] = useState({
    email: false,
    mobile: false
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    jobTitle: "",
    company: "",
    experience: "",
    field: [],
    skills: "",
    availability: "",
    bio: "",
    emailVerified: false,
    mobileVerified: false,
  });

  const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|net|org)$/i.test(email);

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Send Email OTP
  const sendEmailOTP = async () => {
    if (!formData.email) return alert("Enter email first");
    if (!validateEmail(formData.email)) return setError("Enter valid email!");
    try {
      await axios.post("http://localhost:5000/api/mentor/send-email-otp", {
        email: formData.email,
        purpose: "email",
      });

      alert("Email OTP sent!");
    } catch {
      alert("Failed to send email OTP");
    }
  };


  // Send Mobile OTP
  const sendMobileOTP = async () => {
    if (!formData.phone) return alert("Enter phone first");
    if (!validatePhone(formData.phone)) return setError("Enter 10-digit mobile number!");
    if (!validateEmail(formData.email)) return alert("Enter a valid email first!");

    try {
      await axios.post("http://localhost:5000/api/mentor/send-email-otp", {
        email: formData.email,  // backend expects "email" field, but you are sending mobile
        purpose: "mobile",
      });

      alert("Mobile OTP sent!");
    } catch {
      alert("Failed to send mobile OTP");
    }
  };

  //email otp verification
  const verifyEmailOTP = async () => {
    if (!otp.email) return alert("Enter email OTP");

    try {
      const res = await axios.post("http://localhost:5000/api/mentor/verify-otp", {
        email: formData.email,
        otp: otp.email,
        purpose: "email",
      });

      // OTP matched successfully
      if (res.data.success) {
        setVerified((prev) => ({ ...prev, email: true }));
        setFormData((prev) => ({ ...prev, emailVerified: true }));
        Swal.fire("✅ Email verified successfully!");
        return;
      }

      // OTP wrong
      Swal.fire(res.data.message || "Invalid Email OTP");
    } catch (err) {
      console.error("Verify Email Error:", err);

      // Email already exists logic
      if (err.response?.data?.emailExists) {
        Swal.fire("❌ Email already registered. Try with another email!");
        return;
      }

      alert(err.response?.data?.message || "Email verification failed");
    }
  };


  //verify mobile otp
  const verifyMobileOTP = async () => {
    if (!otp.mobile) return alert("Enter mobile OTP");

    try {
      const res = await axios.post("http://localhost:5000/api/mentor/verify-otp", {
        email: formData.email,   // backend expects this field name
        otp: otp.mobile,
        purpose: "mobile",
      });

      if (res.data.success) {
        setVerified({ ...verified, mobile: true });
        setFormData({ ...formData, mobileVerified: true });
        Swal.fire("✅ Mobile verified successfully!");
      } else {
        Swal.fire(res.data.message || "Invalid Email OTP");
      }
    } catch {
      alert("Mobile verification failed");
    }
  };




  // Handle input change
  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Step validation
  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name) return "Please enter your full name.";
      if (!formData.email) return "Please enter email.";
      if (!formData.phone) return "Please enter phone number.";

      // PHONE VALIDATION
      if (!/^\d{10}$/.test(formData.phone))
        return "Phone number must be exactly 10 digits.";

      if (!formData.password) return "Please create a password.";
      if (!verified.email) return "Please verify email.";
      if (!verified.mobile) return "Please verify mobile.";
      if (!formData.gender) return "Please select gender.";
      if (!formData.dob) return "Please select DOB.";
    }

    if (step === 2) {
      if (!formData.jobTitle) return "Enter job title.";
      if (!formData.company) return "Enter company.";
      if (!formData.experience) return "Enter experience.";

      // AGE VALIDATION
      const age = calculateAge(formData.dob);
      if (parseInt(formData.experience) > age)
        return `Experience cannot be more than your age (${age}).`;
    }

    if (step === 3) {
      if (formData.field.length === 0) return "Select at least one field.";
      if (!formData.skills) return "Enter skills.";

      // AVAILABILITY FORMAT CHECK
      if (!/^(\d{1,2})(-\d{1,2})?$/.test(formData.availability))
        return "Maintain the availibility format (like: 6-8).";

      if (!formData.bio) return "Enter bio.";
    }

    return "";
  };


  // Step navigation
  const nextStep = () => {
    const msg = validateStep();
    if (msg) return setError(msg);
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified.email || !verified.mobile)
      return alert("Please verify email & mobile.");

    try {
      await axios.post("http://localhost:5000/api/mentor/register", formData);
      Swal.fire("Mentor registered successfully!");
      navigate("/mentor/login");
    } catch (err) {
      console.log(err);
      Swal.fire("❌ Registration failed.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side - Illustration & Branding */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 flex flex-col items-center justify-center p-6 text-white">
          <img
            src={mentorIllustration}
            alt="Mentor signup graphic"
            className="w-full h-auto object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">MentorConnect</h1>
          <p className="text-center text-white/90 mt-2">
            Guide aspiring professionals, share your knowledge, and shape careers.
          </p>

          <p className="mt-4 text-sm">Step {step} of {steps.length}</p>
          <div className="w-full bg-white/30 rounded-full h-3 mt-2">
            <div
              className="bg-green-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-xs mt-2">
            {steps.map((label, idx) => (
              <span key={idx} className={step >= idx + 1 ? "text-white" : "text-white/60"}>
                {label}
              </span>
            ))}
          </div>
          <p className="text-center text-white/90 mt-5">
            Already Registered ?{" "}
            <NavLink
              className="text-indigo-600 font-semibold hover:underline"
              to="/mentor/login"
            >
              Login here
            </NavLink>
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mentor Registration</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
            {/* Step Content (same as before) */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />


                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={verified.email}
                  />

                  <button
                    type="button"
                    onClick={sendEmailOTP}
                    disabled={verified.email}
                    className={`px-3 text-white rounded ${verified.email ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                      }`}
                  >
                    {verified.email ? "OTP Sent" : "Send OTP"}
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter Email OTP"
                  className="w-full p-3 border rounded-lg"
                  value={otp.email}
                  onChange={(e) => setOtp({ ...otp, email: e.target.value })}
                  disabled={verified.email}
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={verifyEmailOTP}
                    disabled={verified.email}
                    className={`px-3 text-white rounded ${verified.email ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                      }`}
                  >
                    {verified.email ? "Verified" : "Verify Email"}
                  </button>

                  {verified.email && (
                    <span className="text-green-600 font-medium">✔ Email Verified</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-lg"
                    name="phone"
                    maxLength="10"
                    value={formData.phone}
                    disabled={verified.mobile}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, ""); // remove all non-digits
                    }}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={sendMobileOTP}
                    disabled={verified.mobile}
                    className={`px-3 text-white rounded ${verified.mobile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                      }`}
                  >
                    {verified.mobile ? "OTP Sent" : "Send OTP"}
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter Mobile OTP"
                  className="w-full p-3 border rounded-lg"
                  value={otp.mobile}
                  onChange={(e) => setOtp({ ...otp, mobile: e.target.value })}
                  disabled={verified.mobile}
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={verifyMobileOTP}
                    disabled={verified.mobile}
                    className={`px-3 text-white rounded ${verified.mobile ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                      }`}
                  >
                    {verified.mobile ? "Verified" : "Verify Mobile"}
                  </button>

                  {verified.mobile && (
                    <span className="text-green-600 font-medium">✔ Mobile Verified</span>
                  )}
                </div>

                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full p-3 border rounded-lg"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <select
                  className="w-full p-3 border rounded-lg"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="DOB"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  required
                />



              </>
            )}

            {/* Step 2, 3, 4 — same as  version */}
            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Current Job Title"
                  className="w-full p-3 border rounded-lg"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Company / Organization"
                  className="w-full p-3 border rounded-lg"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Years of Experience"
                  className="w-full p-3 border rounded-lg"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {step === 3 && (
              <>
                <label className="block font-medium">Field(s) you can mentor</label>
                <select
                  multiple
                  className="w-full p-3 border rounded-lg"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  required
                >
                  {fieldOptions.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <small className="text-gray-500 block">
                  Hold Ctrl (Windows) or Command (Mac) to select multiple
                </small>

                {formData.field.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.field.map((f) => (
                      <span key={f} className="px-2 py-1 text-sm rounded-full bg-yellow-100 border border-yellow-300">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <textarea
                  placeholder="Skills you can teach..."
                  className="w-full p-3 border rounded-lg"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                ></textarea>

                <input
                  type="text"
                  placeholder="Availability (e.g., Weekends, 6-8 PM)"
                  className="w-full p-3 border rounded-lg"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                />

                <textarea
                  placeholder="Short bio / Introduction..."
                  className="w-full p-3 border rounded-lg"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                ></textarea>
              </>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">Review Your Information</h3>

                {/* Personal Info */}
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Personal Details</h4>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>DOB:</strong> {formData.dob}</p>
                </div>

                {/* Professional Info */}
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Professional Details</h4>
                  <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Experience:</strong> {formData.experience} Years</p>
                </div>

                {/* Mentorship Info */}
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Mentorship Details</h4>
                  <p><strong>Fields:</strong> {formData.field.join(", ")}</p>
                  <p><strong>Skills:</strong> {formData.skills}</p>
                  <p><strong>Availability:</strong> {formData.availability}</p>
                  <p><strong>Bio:</strong> {formData.bio}</p>
                </div>

                <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700 text-sm">
                  Please confirm all details. Once submitted, your mentor account will be created.
                </div>
              </div>
            )}


            {/* Navigation Buttons */}
            <div className="flex justify-between pt-2">

              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}

            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

