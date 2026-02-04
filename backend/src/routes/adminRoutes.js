import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const router = express.Router();

// LOGIN API
router.post("/login", async (req, res) => {
  try {
    console.log("Received login data:", req.body);

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
