import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

import { FaUser, FaUpload, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/favicon.png";

const TeacherDashboard = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const [activeTab, setActiveTab] = useState("profile");

  const [teacher, setTeacher] = useState(null);

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  // ---------------- FETCH TEACHER PROFILE DATA ----------------
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${backendUrl}/api/user/data`);
        if (data.success) setTeacher(data.userData);
      } catch (error) {
        toast.error("Error loading teacher data");
      }
    };

    fetchTeacher();
  }, []);

  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      toast.success("Logged out");
      setIsLoggedin(false);
      window.location.href = "/login";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // ---------------- ASSIGNMENT UPLOAD ----------------
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("subject", subject);
      form.append("topic", topic);
      form.append("deadline", deadline);
      if (file) form.append("file", file);

      const { data } = await axios.post(`${backendUrl}/api/assignments/upload`
      , form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Assignment uploaded!");
        setSubject("");
        setTopic("");
        setDeadline("");
        setFile(null);
      }
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  // ---------------- TABS ----------------
  const tabs = [
    { id: "profile", icon: <FaUser />, label: "Profile" },
    { id: "upload", icon: <FaUpload />, label: "Upload Assignment" },
    { id: "list", icon: <FaListAlt />, label: "Assignments List" },
  ];

  // ---------------- TAB CONTENT RENDER ----------------
  const renderContent = () => {
    switch (activeTab) {
      // ---------- PROFILE ----------
      case "profile":
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Teacher Profile</h2>

              {teacher ? (
                <div className="space-y-3">
                  <p><strong>Name:</strong> {teacher.name}</p>
                  <p><strong>Email:</strong> {teacher.email}</p>
                  <p><strong>Role:</strong> Teacher</p>
                </div>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>
          </div>
        );

      // ---------- UPLOAD ASSIGNMENT ----------
      case "upload":
        return (
          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold mb-3">Upload Assignment</h2>

            <form onSubmit={handleUpload} className="space-y-3">
              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-2 rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Topic"
                className="w-full border p-2 rounded"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />

              <input
                type="file"
                accept=".pdf"
                className="w-full p-2 border rounded"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Upload
              </button>
            </form>
          </div>
        );

      // ---------- ASSIGNMENTS LIST (STATIC FOR NOW) ----------
      case "list":
        return (
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Assignments List</h2>
            <p className="text-gray-600">Feature Coming Soon...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-indigo-300">
      {/* NAVBAR */}
      <nav className="bg-transparent shadow p-4 flex justify-between items-center">
        <img src={logo} className="h-10 w-auto" alt="Logo" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* DASHBOARD */}
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

        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
