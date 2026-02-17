import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Logo from "../components/logo.jsx";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { backendUrl, setIsLoggedin, setRole } = useContext(AppContent);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 8;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail) ? "" : "Please enter a valid email");
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordError(
      validatePassword(newPass)
        ? ""
        : "Password must be at least 8 characters"
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      axios.defaults.withCredentials = true;
      console.log("Sending:", { email, password });

  
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Login API response:", data);
  
      if (data.success) {
        setIsLoggedin(true);
        setRole(data.role); // ✔ backend sends role = teacher / student
  
        toast.success("Login Successful! Redirecting...", {
          position: "top-center",
        });
  
        setTimeout(() => {
          if (data.role === "teacher") {
            navigate("/teacher");
          } else {
            navigate("/student");
          }
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  


  return (
    <>
      <Logo />

      <div className="min-h-screen flex items-center justify-center bg-indigo-300">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h2>

          <form onSubmit={onSubmitHandler}>
            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Email
              </label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  className="bg-transparent w-full text-gray-700 py-1 px-2 focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs italic">{emailError}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Password
              </label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaLock className="text-gray-400 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent w-full text-gray-700 py-1 px-2 focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
