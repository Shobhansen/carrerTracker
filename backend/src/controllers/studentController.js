import Student from "../models/Student.js";

export const registerStudent = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.collegeIdCard = req.file.filename;
    }

    const student = await Student.create(data);

    res.json({ success: true, student });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const updateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const data = req.body;

    if (req.file) {
      data.collegeIdCard = req.file.filename;
    }

    const updated = await Student.findByIdAndUpdate(id, data, { new: true });
    res.json(updated);
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndDelete(id);
  res.json({ success: true });
};
