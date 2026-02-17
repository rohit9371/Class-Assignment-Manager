import React from 'react'
import logo from "../assets/favicon.png";
import {useNavigate} from 'react-router-dom'
const Logo = () => {
    const navigate=useNavigate();
  return (
    
    <div className="  fixed flex  flex-1 p-5 flex-shrink-0 cursor-pointer  bg-indigo-300">
    <img
      className="  h-10 w-auto hover:opacity-80 transition-opacity"
      src={logo}
      alt="Logo"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = { logo };
      }}
    />
    <span
      onClick={() => navigate("/")}
      className="ml-5 text-gray-400 underline cursor-pointer hover:text-primary transition"
    >
      Home
    </span>
  </div>
  )
}

export default Logo;
