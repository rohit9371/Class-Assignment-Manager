import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  deadline: { type: Date, required: false },
  filePath: { type: String, default: "" }, // optional pdf path
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);
export default Assignment;
