import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  files: [{ type: String }], // paths to uploaded files
  submittedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
export default Submission;
