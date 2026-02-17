import userModel from "../models/userModel.js";
import Teacher from "../models/Teacher.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;

    if (!userId || !role) {
      return res.json({
        success: false,
        message: "Unauthorized access",
      });
    }

    let userData;

    if (role === "teacher") {
      const teacher = await Teacher.findById(userId);
      if (!teacher) {
        return res.json({ success: false, message: "Teacher not found" });
      }

      userData = {
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
        isAccountVerified: true, // teachers don't have verification logic
      };
    } else {
      const student = await userModel.findById(userId);
      if (!student) {
        return res.json({ success: false, message: "Student not found" });
      }

      userData = {
        name: student.name,
        email: student.email,
        rollno: student.rollno,
        role: "student",
        isAccountVerified: student.isAccountVerified,
      };
    }

    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
