import express from "express";
import Mentor from "../models/Mentor.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();
let emailOTPs = {};

// send OTP (for email or mobile verification)
router.post("/send-email-otp", async (req, res) => {
  const { email, purpose } = req.body; // purpose = "email" or "mobile"
  try {
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const key = `${email}-${purpose || "email"}`;
    emailOTPs[key] = otp;

    const subject =
      purpose === "mobile"
        ? "Mobile Verification OTP (CareerTracker)"
        : "Email Verification OTP (CareerTracker)";
    const html = `<h2>Your OTP is ${otp}</h2><p>This OTP will expire in 5 minutes.</p>`;

    await sendEmail(email, subject, html);

    // auto delete OTP after 5 minutes
    setTimeout(() => delete emailOTPs[key], 300000);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});


// verify OTP (for email or mobile)
router.post("/verify-otp", async (req, res) => {
  const { email, otp, purpose } = req.body;

  try {
    // Check duplicate email ONLY during email verification
    if (purpose === "email") {
      const existingMentor = await Mentor.findOne({ email });
      if (existingMentor) {
        return res.status(400).json({
          success: false,
          emailExists: true,
          message: "Email already registered"
        });
      }
    }

    // Check OTP
    const key = `${email}-${purpose || "email"}`;
    if (emailOTPs[key] === otp) {
      delete emailOTPs[key];
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// REGISTER MENTOR
router.post("/register", async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the mentor object with hashed password
    const mentor = new Mentor({
      ...req.body,
      password: hashedPassword
    });

    // Save to database
    await mentor.save();

    res.json({
      success: true,
      message: "Mentor registered successfully!"
    });
  } catch (err) {
    console.error("Mentor Register Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered!"
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed!"
    });
  }
});


/* ======================================
   mentor LOGIN (Add this)
====================================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find mentor by email
    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: mentor._id, email: mentor.email },
      process.env.JWT_SECRET || "MY_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      mentor: {
        id: mentor._id,
        name: mentor.name,
        email: mentor.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
