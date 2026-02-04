import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // MongoDB connection file
import studentRoutes from "./routes/studentRoutes.js"; // student route
import mentorRoutes from "./routes/mentorRoutes.js";//mentor route
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js";
import adminRoutes from "./routes/adminRoutes.js"
//import authRoutes from "./routes/studentRoutes.js"

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/admin", adminRoutes);

// Default route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});



// Run only once to create admin
async function createInitialAdmin() {
  const existing = await Admin.findOne({ username: "admin" });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashed = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    name: "Super Admin",
    username: "admin",
    password: hashed,
  });

  await admin.save();
  console.log("Initial Admin Created Successfully");
}

// Call function
createInitialAdmin();