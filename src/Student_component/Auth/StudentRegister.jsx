import React, { useState } from "react";
import studentIllustration from "../../assets/student.webp";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function StudentRegistration1() {
  const navigate = useNavigate();

  const careerData = {
    "Web Development": ["Frontend", "Backend"],
    "AI/ML": ["Machine Learning", "Deep Learning", "NLP"],
    "Data Science": ["Analytics", "Visualization"],
    "UI/UX": ["Design", "Research"],
  };

  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const [showWarning, setShowWarning] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");


  const [otpStage, setOtpStage] = useState({
    email: false,
    mobile: false,
  });

  const [otpInput, setOtpInput] = useState({
    email: "",
    mobile: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
    class10: { school: "", year: "", percentage: "" },
    class12: { school: "", year: "", percentage: "" },
    college: "",
    degree: "",
    yearOfPassing: "",
    semester: "",
    collegeIdCard: null,
    careerPath: "",
    subfield: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name.includes("class10") || name.includes("class12")) {
      const [key, field] = name.split(".");
      setFormData({
        ...formData,
        [key]: { ...formData[key], [field]: value },
      });
    } else if (name === "collegeIdCard") {
      setFormData({ ...formData, collegeIdCard: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|net|org)$/i.test(email);

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const sendEmailOTP = async () => {
    if (!validateEmail(formData.email)) return setErrorMsg("Enter valid email!");
    try {
      await axios.post("http://localhost:5000/api/student/send-email-otp", {
        email: formData.email,
      });
      setOtpStage({ ...otpStage, email: true });
      Swal.fire("Email OTP sent! Check your inbox.");
    } catch (err) {
      Swal.fire("Failed to send email OTP.");
    }
  };

  const verifyEmailOTP = async () => {
    if (!otpInput.email) return setErrorMsg("Enter email OTP");

    try {
      const res = await axios.post("http://localhost:5000/api/student/verify-email-otp", {
        email: formData.email,
        otp: otpInput.email,
        purpose: "email",
      });

      if (res.data.success) {
        setEmailVerified(true);
        Swal.fire("✅ Email verified successfully!");
        return;
      }

      // OTP invalid
      Swal.fire(res.data.message || "Invalid Email OTP");

    } catch (err) {
      console.error("Verify Email Error:", err);

      // Email already exists logic
      if (err.response?.data?.emailExists) {
        Swal.fire("❌ Email already registered. Try with another email!");
        setEmailVerified(false);
        return;
      }

      Swal.fire(err.response?.data?.message || "Email verification failed");
    }
  };

  const sendMobileOTP = async () => {
    if (!validatePhone(formData.phone)) return alert("Enter 10-digit mobile number!");
    if (!validateEmail(formData.email)) return alert("Enter a valid email first!");
    try {
      await axios.post("http://localhost:5000/api/student/send-email-otp", {
        email: formData.email,
        purpose: "mobile",
      });
      setOtpStage({ ...otpStage, mobile: true });
      Swal.fire("Mobile verification OTP sent to your email!");
    } catch {
      Swal.fire("Failed to send mobile verification OTP.");
    }
  };

  const verifyMobileOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/student/verify-email-otp", {
        email: formData.email,
        otp: otpInput.mobile,
        purpose: "mobile",
      });
      if (res.data.success) {
        setMobileVerified(true);
        Swal.fire("✅ Mobile number verified via email!");
      } else alert("Invalid OTP for mobile verification.");
    } catch {
      Swal.fire("Mobile OTP verification failed.");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!validatePersonalStep()) return;
    }

    if (step === 2) {
      if (!validateAcademicStep()) return;
    }

    // if (step === 3) {
    //   if (!validateCareerStep()) return;
    // }

    setErrorMsg("");
    setStep(step + 1);
  };




  const prevStep = () => setStep((prev) => prev - 1);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("careerField", formData.careerPath);
  //   alert("🎉 Student registered successfully!");
  //   navigate("/student/login");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "class10" || key === "class12") {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/student/register", form);
      Swal.fire("Student Registered Successfully!");
      navigate("/student/login");
    } catch (error) {
      Swal.fire("Registration Failed!");
    }
  };

  const validatePersonalStep = () => {
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMsg("Please enter email ID.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setErrorMsg("Enter a valid 10-digit phone number.");
      return false;
    }

    if (!formData.password.trim()) {
      setErrorMsg("Please create a password.");
      return false;
    }

    if (!formData.gender.trim()) {
      setErrorMsg("Please select gender.");
      return false;
    }

    if (!formData.dob.trim()) {
      setErrorMsg("Please select date of birth.");
      return false;
    }

    if (!emailVerified) {
      setErrorMsg("Please verify your email.");
      return false;
    }

    if (!mobileVerified) {
      setErrorMsg("Please verify your mobile number.");
      return false;
    }

    return true;
  };
  const validateAcademicStep = () => {
    setErrorMsg("");

    if (!formData.class10.school.trim()) {
      setErrorMsg("Enter 10th school name.");
      return false;
    }

    if (!/^\d{4}$/.test(formData.class10.year)) {
      setErrorMsg("10th year must be 4 digits.");
      return false;
    }

    const perc10 = Number(formData.class10.percentage);
    if (isNaN(perc10) || perc10 < 0 || perc10 > 100) {
      setErrorMsg("10th percentage must be a valid number between 0 and 100.");
      return false;
    }

    if (!formData.class12.school.trim()) {
      setErrorMsg("Enter 12th school name.");
      return false;
    }

    if (!/^\d{4}$/.test(formData.class12.year)) {
      setErrorMsg("12th year must be 4 digits.");
      return false;
    }

    if (formData.class12.year - formData.class10.year < 2) {
      setErrorMsg("12th year must be at least 2 years after 10th.");
      return false;
    }

    const perc12 = Number(formData.class12.percentage);
    if (isNaN(perc12) || perc12 < 0 || perc12 > 100) {
      setErrorMsg("12th percentage must be a valid number between 0 and 100.");
      return false;
    }

    if (!formData.college.trim()) {
      setErrorMsg("Enter college name.");
      return false;
    }

    if (!/^\d{4}$/.test(formData.yearOfPassing)) {
      setErrorMsg("College passing year must be 4 digits.");
      return false;
    }

    if (!/^[1-9]$/.test(formData.semester)) {
      setErrorMsg("Enter valid semester.");
      return false;
    }

    if (!formData.collegeIdCard) {
      setErrorMsg("Upload college ID card.");
      return false;
    }

    return true;
  };


  const steps = ["Personal", "Academic", "Career", "Review"];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 to-pink-100">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-8 text-white">
          <img src={studentIllustration} alt="Student" className="w-full h-auto" />
          <h1 className="text-3xl font-bold mt-4">CareerTracker</h1>
          <p className="text-sm italic text-indigo-100 mt-1">Your Journey, Your Success 🚀</p>
          <p className="text-center mt-2">Step {step} of {steps.length}</p>

          <div className="w-full bg-white/30 rounded-full h-3 mt-4">
            <div
              className="bg-green-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-between w-full text-xs mt-2">
            {steps.map((label, idx) => (
              <span key={idx} className={step >= idx + 1 ? "text-white" : "text-gray-300"}>
                {label}
              </span>
            ))}
          </div>
          {/* login Link */}
          <p className="text-center mt-6 text-gray-300">
            Already Registered?{" "}
            <NavLink
              className="text-white font-semibold hover:underline"
              to={"/student/login"}
            >
              Login here
            </NavLink>
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>


            {/* STEP 1 — PERSONAL DETAILS */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold">Personal Details</h2>
                {errorMsg && (
                  <div className="bg-red-100 text-red-700 p-3 rounded mb-3 text-sm">
                    {errorMsg}
                  </div>
                )}


                <input name="name" placeholder="Full Name" className="input w-full" onChange={handleChange} />

                {/* EMAIL SECTION */}
                <div className="space-y-2">
                  <input
                    name="email"
                    placeholder="Email"
                    className="input w-full"
                    onChange={handleChange}
                  />

                  {!otpStage.email && !emailVerified && (
                    <button
                      type="button"
                      onClick={sendEmailOTP}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Send Email OTP
                    </button>
                  )}

                  {otpStage.email && !emailVerified && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter Email OTP"
                        className="input w-full"
                        onChange={(e) => setOtpInput({ ...otpInput, email: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={verifyEmailOTP}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Verify Email
                      </button>
                    </div>
                  )}

                  {emailVerified && (
                    <p className="text-green-600 text-sm">✅ Email Verified</p>
                  )}
                </div>

                {/* PHONE SECTION */}
                <div className="space-y-2 mt-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="input w-full"
                    onChange={handleChange}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />

                  {!otpStage.mobile && !mobileVerified && (
                    <button
                      type="button"
                      onClick={sendMobileOTP}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Send Mobile OTP
                    </button>
                  )}

                  {otpStage.mobile && !mobileVerified && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter Mobile OTP"
                        className="input w-full"
                        onChange={(e) =>
                          setOtpInput({ ...otpInput, mobile: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={verifyMobileOTP}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Verify Mobile
                      </button>
                    </div>
                  )}

                  {mobileVerified && (
                    <p className="text-green-600 text-sm">✅ Mobile Verified</p>
                  )}
                </div>

                <select name="gender" className="input w-full" onChange={handleChange}>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input w-full"
                  onChange={handleChange}
                />

                <input
                  name="dob"
                  type="text"
                  placeholder="DOB"
                  className="input w-full"
                  onChange={handleChange}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                />
              </>
            )}
            {/* Step 2: Academic */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold">Academic Details</h2>

                {errorMsg && (
                  <div className="bg-red-100 text-red-700 p-3 rounded mb-3 text-sm">
                    {errorMsg}
                  </div>
                )}


                <h3 className="font-semibold">10th Class</h3>
                <input name="class10.school" placeholder="School Name" className="input" onChange={handleChange} />
                <input name="class10.year" placeholder="Year of Passing" className="input" onChange={handleChange} />
                <input name="class10.percentage" placeholder="Percentage" className="input" onChange={handleChange} />

                <h3 className="font-semibold mt-2">12th Class</h3>
                <input name="class12.school" placeholder="School Name" className="input" onChange={handleChange} />
                <input name="class12.year" placeholder="Year of Passing" className="input" onChange={handleChange} />
                <input name="class12.percentage" placeholder="Percentage" className="input" onChange={handleChange} />

                <h3 className="font-semibold mt-2">College</h3>
                <input name="college" placeholder="College Name" className="input" onChange={handleChange} />
                <input name="degree" placeholder="Degree" className="input" onChange={handleChange} />
                <input name="yearOfPassing" placeholder="Year of Passing" className="input" onChange={handleChange} />
                <input name="semester" placeholder="Current Semester" className="input" onChange={handleChange} />
                <div className="input flex items-center justify-between">
                  {formData.collegeIdCard ? (              //if the ID card is not upload then show:  "upload id card" else: show the file name as well as "reupload" option 
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        {formData.collegeIdCard.name}
                      </span>
                      <label className="cursor-pointer text-gray-500">
                        <span className="text-gray-500">Change ID</span>
                        <input
                          type="file"
                          name="collegeIdCard"
                          className="hidden"              //for hidden the deafult class
                          onChange={handleChange}
                        />
                      </label>

                    </div>
                  ) : (
                    <label className="cursor-pointer text-gray-500">
                      <span className="text-gray-500">Upload College ID Card</span>
                      <input
                        type="file"
                        name="collegeIdCard"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </label>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Career Interests */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-bold">Career Interests</h2>
                <select
                  name="careerPath"
                  className="input mr-20"
                  value={formData.careerPath}
                  onChange={(e) =>
                    setFormData({ ...formData, careerPath: e.target.value, subfield: "" })
                  }
                >
                  <option value="">Select Career Path</option>
                  {Object.keys(careerData).map((path) => (
                    <option key={path} value={path}>{path}</option>
                  ))}
                </select>

                <select
                  name="subfield"
                  className="input"
                  value={formData.subfield}
                  onChange={handleChange}
                  // disabled={!formData.careerPath}
                  onClick={() => { if (!formData.careerPath) { setShowWarning(true) } }}
                >
                  <option value="">Select Subfield</option>
                  {formData.careerPath &&
                    careerData[formData.careerPath].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
                {/* Warning message */}
                {showWarning && !formData.careerPath && (
                  <p className="text-red-500 text-sm mt-1">Please choose career path first</p>
                )}
              </>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">

                {/* PERSONAL DETAILS */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Date of Birth:</strong> {formData.dob}</p>
                </div>

                {/* ACADEMIC DETAILS */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Academic Details</h3>

                  <h4 className="font-semibold mt-2">10th Class</h4>
                  <p><strong>School:</strong> {formData.class10.school}</p>
                  <p><strong>Year:</strong> {formData.class10.year}</p>
                  <p><strong>Percentage:</strong> {formData.class10.percentage}</p>

                  <h4 className="font-semibold mt-2">12th Class</h4>
                  <p><strong>School:</strong> {formData.class12.school}</p>
                  <p><strong>Year:</strong> {formData.class12.year}</p>
                  <p><strong>Percentage:</strong> {formData.class12.percentage}</p>

                  <h4 className="font-semibold mt-2">College</h4>
                  <p><strong>College Name:</strong> {formData.college}</p>
                  <p><strong>Degree:</strong> {formData.degree}</p>
                  <p><strong>Year of Passing:</strong> {formData.yearOfPassing}</p>
                  <p><strong>Semester:</strong> {formData.semester}</p>
                  <p><strong>ID Card:</strong> {formData.collegeIdCard?.name || "Not Uploaded"}</p>
                </div>

                {/* CAREER DETAILS */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Career Interests</h3>
                  <p><strong>Career Path:</strong> {formData.careerPath}</p>
                  <p><strong>Subfield:</strong> {formData.subfield}</p>
                </div>

              </div>
            )}

            {/* FOOTER BUTTONS */}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded-lg">
                  Back
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
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
    </div>
  );
}
