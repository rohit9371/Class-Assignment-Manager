import express from "express";
import multer from "multer";
import path from "path";

import userAuth from "../middleware/userAuth.js";
import {
  uploadAssignment,
  getAllAssignments,
  submitAssignment,
  getSubmissionsForAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

// ----------------------------
// 📁 STORAGE — Teacher Uploads
// ----------------------------
const assignStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/assignments");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "_" + file.fieldname + ext);
  },
});

// Allow only PDF for teacher upload (optional)
const assignmentFileFilter = (req, file, cb) => {
  if (!file) return cb(null, true);

  const allowed = [".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

const uploadAssignmentM = multer({
  storage: assignStorage,
  fileFilter: assignmentFileFilter,
});

// ----------------------------
// 📁 STORAGE — Student Submissions
// ----------------------------
const submitStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/submissions");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "_" + file.fieldname + ext);
  },
});

// Students allowed multiple formats
const submissionFileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".docx", ".ppt", ".pptx", ".js", ".py", ".txt"];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

const uploadSubmissionM = multer({
  storage: submitStorage,
  fileFilter: submissionFileFilter,
});

// ----------------------------
// 📌 ROUTES
// ----------------------------

// Teacher Upload Assignment:
// POST /api/assignment/upload
router.post(
  "/upload",
  userAuth,
  uploadAssignmentM.single("file"),
  uploadAssignment
);

// Get All Assignments (Student + Teacher)
router.get("/", userAuth, getAllAssignments);

// Student Submit Assignment:
// POST /api/assignment/:id/submit
router.post(
  "/:id/submit",
  userAuth,
  uploadSubmissionM.array("files", 3),
  submitAssignment
);

// Teacher View All Submissions of Assignment
router.get("/:id/submissions", userAuth, getSubmissionsForAssignment);

export default router;
