import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Teacher from "./models/Teacher.js";
import connectDB from "./config/mongodb.js";

dotenv.config();  // ✅ Load .env before using MONGODB_URI

// Connect to DB
await connectDB();  

async function createTeacher() {
  try {
    const hashedPass = await bcrypt.hash("ankit123", 10);

    const teacher = new Teacher({
      name: "Ankit",
      email: "ankit@gmail.com",
      password: hashedPass,
      role: "teacher"
    });

    await teacher.save();
    console.log("🎉 Teacher created successfully!");
  } catch (error) {
    console.log("❌ Error creating teacher:", error);
  } finally {
    mongoose.connection.close(); // ✅ close connection
    process.exit();
  }
}

createTeacher();
