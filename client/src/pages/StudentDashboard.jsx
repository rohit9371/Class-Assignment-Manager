import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaUserGraduate, FaFlag, FaUser, FaSignOutAlt } from "react-icons/fa";

import logo from "../assets/favicon.png";
import rohit from "../assets/rohit.jpeg";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
// import SubmitAssignment from "./SubmitAssignment";

const StudentDashboard = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [files, setFiles] = useState([]);

  // Tabs
  const tabs = [
    { id: "profile", icon: <FaUser />, label: "Profile" },
    { id: "submitAssignment", icon: <FaUserGraduate />, label: "Submit Assignments" },
    { id: "milestones", icon: <FaFlag />, label: "Assignments" },
  ];

  // LOAD PROFILE + ASSIGNMENTS
  useEffect(() => {
    const load = async () => {
      try {
        axios.defaults.withCredentials = true;

        const p = await axios.get(`${backendUrl}/api/user/data`);
        if (p.data.success) setProfile(p.data.userData);

        const a = await axios.get(`${backendUrl}/api/assignments`);
        if (a.data.success) {
          setAssignments(a.data.assignments);
        }
      } catch (error) {
        toast.error("Failed to load dashboard");
      }
    };

    load();
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedin(false);
      window.location.href = "/login";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    const chosen = Array.from(e.target.files).slice(0, 3);
    setFiles(chosen);
  };

  // SUBMIT ASSIGNMENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssignment) return toast.error("Select assignment first");
    if (!files.length) return toast.error("Select at least one file");

    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    try {
      const res = await axios.post(
        `${backendUrl}/api/assignments/${selectedAssignment}/submit`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Submitted successfully");
        setFiles([]);
      } else {
        toast.error(res.data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  // Render UI Tabs
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <img
              src={rohit}
              className="w-28 h-28 rounded-full shadow-md"
              alt="avatar"
            />

            <div className="bg-gray-50 p-6 rounded-xl shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Student Profile</h2>

              {profile ? (
                <div className="space-y-3">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Roll No:</strong> {profile.rollno}</p>
                  <p>
                    <strong>Verified:</strong>{" "}
                    {profile.isAccountVerified ? "Yes" : "No"}
                  </p>
                </div>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>
          </div>
        );

      case "submitAssignment":
        return (
          <div className="space-y-6">
            {/* Assignment Selection */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Select Assignment</h2>

              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="border p-2 w-full mt-2"
              >
                <option value="">-- choose assignment --</option>
                {assignments.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.subject} - {a.topic}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Upload Files</h2>

              <input
                type="file"
                multiple
                accept=".pdf,.docx,.ppt,.pptx,.js,.py,.txt"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Assignment
            </button>
          </div>
        );

      case "milestones":
        return (
          <div className="space-y-4">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold">
                    {a.subject} — {a.topic}
                  </h3>
                  <p className="text-gray-600">
                    Deadline:{" "}
                    {a.deadline
                      ? new Date(a.deadline).toLocaleDateString()
                      : "No deadline"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-indigo-300">
      {/* Navbar */}
      <nav className="bg-transparent shadow p-4 flex justify-between items-center">
        <img src={logo} className="h-10 w-auto" alt="Logo" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* Dashboard */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
