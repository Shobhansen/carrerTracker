import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    // Developer sets these before first login
    name: {
      type: String,
      required: true
    },

    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true   // stored as hashed password
    },

    // Admin can add/update these later
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    profileImage: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
