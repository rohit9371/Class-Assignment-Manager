import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Login from './pages/Login.jsx';
import EmailVerify from './pages/EmailVerify.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Signup from './pages/Signup.jsx';

import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';


import { ToastContainer } from 'react-toastify';
import { AppContent } from './context/AppContext.jsx';





function App() {

  const StudentProtected = ({ children }) => {
    const { isLoggedin, role } = useContext(AppContent);
    return isLoggedin && role === "student"
      ? children
      : <Navigate to="/login" replace />;
  };
  
  
  const TeacherProtected = ({ children }) => {
    const { isLoggedin, role } = useContext(AppContent);
    return isLoggedin && role === "teacher"
      ? children
      : <Navigate to="/login" replace />;
  };
   
  return (
    <>
      <ToastContainer />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        





        {/* Student Dashboard Route */}
        <Route 
          path="/student" 
          element={
            <StudentProtected>
              <StudentDashboard />

            </StudentProtected>
          } 
        />

        {/* Teacher Dashboard Route */}
        <Route 
          path="/teacher" 
          element={
            <TeacherProtected>
              <TeacherDashboard />
            </TeacherProtected>
          } 
        />

      </Routes>
    </>
  );
}

export default App;







