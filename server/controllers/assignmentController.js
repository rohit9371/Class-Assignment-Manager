import path from "path";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";

// teacher upload assignment
export const uploadAssignment = async (req, res) => {
  try {
    // must be teacher
    if (req.role !== "teacher") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { subject, topic, deadline } = req.body;
    if (!subject || !topic) return res.status(400).json({ success: false, message: "subject and topic required" });

    const filePath = req.file ? `/uploads/assignments/${req.file.filename}` : "";

    const assignment = await Assignment.create({
      subject,
      topic,
      deadline: deadline ? new Date(deadline) : null,
      filePath,
      teacherId: req.userId
    });

    return res.json({ success: true, assignment });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// list all assignments (students and teachers)
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, assignments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// student submit assignment (multiple files allowed)
export const submitAssignment = async (req, res) => {
  try {
    // only students
    if (req.role !== "student") {
      return res.status(403).json({ success: false, message: "Only students can submit" });
    }

    const assignmentId = req.params.id;
    if (!assignmentId) return res.status(400).json({ success: false, message: "Assignment id missing" });

    // collect file paths
    const files = [];
    if (req.files && req.files.length) {
      req.files.forEach(f => files.push(`/uploads/submissions/${f.filename}`));
    }

    const submission = await Submission.create({
      assignmentId,
      studentId: req.userId,
      files
    });

    return res.json({ success: true, submission });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// optional: list submissions for an assignment (teacher only)
export const getSubmissionsForAssignment = async (req, res) => {
  try {
    if (req.role !== "teacher") return res.status(403).json({ success: false, message: "Forbidden" });

    const { id } = req.params;
    const subs = await Submission.find({ assignmentId: id }).populate("studentId", "name email rollno").lean();
    return res.json({ success: true, submissions: subs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
