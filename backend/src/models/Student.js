import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  gender: String,
  dob: String,
  class10: {
    school: String,
    year: String,
    percentage: String,
  },
  class12: {
    school: String,
    year: String,
    percentage: String,
  },
  college: String,
  degree: String,
  yearOfPassing: String,
  semester: String,
  careerPath: String,
  subfield: String,
  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },
});


export default mongoose.model("Student", studentSchema);
