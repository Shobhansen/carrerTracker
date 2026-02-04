import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { sendEmail } from "../utils/sendEmail.js";
import upload from "../middleware/Upload.js";

import {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

let emailOTPs = {}; // temporary store for OTPs

// send OTP (for email or mobile verification)
router.post("/send-email-otp", async (req, res) => {
  const { email, purpose } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const key = `${email}-${purpose || "email"}`;
    emailOTPs[key] = otp;

    const subject =
      purpose === "mobile"
        ? "Mobile Number Verification OTP (CareerTracker)"
        : "Email Verification OTP (CareerTracker)";
    const html = `<h2>Your OTP is ${otp}</h2><p>This OTP will expire in 5 minutes.</p>`;

    await sendEmail(email, subject, html);
    res.json({ success: true, message: "OTP sent successfully" });

    // auto delete after 5 mins
    setTimeout(() => delete emailOTPs[key], 300000);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

// verify OTP (for email or mobile)
router.post("/verify-email-otp", async (req, res) => {
  const { email, otp, purpose } = req.body;
  const key = `${email}-${purpose || "email"}`;

  try {
    // 1Check if email already exists (only for purpose = email)
    if (purpose !== "mobile") {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          emailExists: true,
          message: "Email already registered. Try with another email ID."
        });
      }
    }

    //  Verify OTP
    if (emailOTPs[key] === otp) {
      delete emailOTPs[key];
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});




// register student
router.post("/register", upload.single("collegeIdCard"), async (req, res) => {
  try {
    let data = req.body;

    // Convert JSON strings back to objects
    if (data.class10) data.class10 = JSON.parse(data.class10);
    if (data.class12) data.class12 = JSON.parse(data.class12);

    // Add file upload if exists
    if (req.file) {
      data.resume = req.file.filename;
    }

    // Hash the password before saving
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const newStudent = new Student(data);
    await newStudent.save();

    res.json({ success: true, message: "Student registered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Registration failed!" });
  }
});

/* ======================================
   STUDENT LOGIN (Add this)
====================================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || "MY_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
