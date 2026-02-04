import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },

  gender: { type: String, required: true },
  dob: { type: String, required: true },

  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  experience: { type: Number, required: true },

  field: { type: [String], required: true },   // multi-select array
  skills: { type: String, required: true },
  availability: { type: String, required: true },
  bio: { type: String, required: true },

  password: { type: String, required: true },

  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Mentor", mentorSchema);
