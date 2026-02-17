import React, { useContext, useState } from "react";

import signup from '../assets/signup.png'
import Logo from '../components/logo.jsx'
import {useNavigate} from 'react-router-dom';
import {AppContent} from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';

const Signup = () => {


    const {backendUrl, setIsLoggedin}= useContext(AppContent);

    const [name, setName] = useState("");
const [rollno, setRollno] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

    const navigate=useNavigate(); 

    const onSubmitHandler =async (e)=>{
        try{
            e.preventDefault();

        axios.defaults.withCredentials=true;

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all the fields");
            return;
          }
        //   if(password.length<6){
        //     toast.error("Password should be at least 6 characters");
        //     return;

        //   }
        
          if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;}
          

        const {data}= await axios.post(backendUrl + '/api/auth/register',{name,rollno,email,password});

        if(data.success){
            setIsLoggedin(true);
            toast("Successfully logged in, now Login with same email and password")
            console.log("success")
            setTimeout(() => {
                navigate("/login");
              }, 1500);
        }else{
            toast.error(data.message)
            console.log(data.message)
            
        }

        
        }catch(error){
            toast.error(error.message);
            console.log(error.message)


        }
    }
  return (
    <>
        <Logo />
        <div className='flex flex-wrap justify-center items-center min-h-screen bg-indigo-300'>
      <div className='w-full md:w-1/2 xl:w-2/5 p-8'>
        <img src={signup} />
        <h2 className='text-3xl font-bold my-4 text-center md:text-left'>Join with US</h2>
        <p className='text-gray-700'>Become a member today to network with industry professionals, access exclusive content, and enjoy our premium features.</p>
      </div>
      <div className='w-full md:w-1/2 xl:w-1/3 p-8 bg-white rounded-lg shadow-xl'>
        <h3 className='text-2xl font-bold mb-6'>Sign Up </h3>
        <form onSubmit={onSubmitHandler}>
          <input type='text' placeholder='Full Name' className='w-full p-3 border border-gray-300 rounded mb-4' value={name}
  onChange={(e) => setName(e.target.value)} />
          <input type='text' placeholder='Roll Number(22ucs044)' className='w-full p-3 border border-gray-300 rounded mb-4' value={rollno}
  onChange={(e) => setRollno(e.target.value)} />
          <input type='email' placeholder='Email Address' className='w-full p-3 border border-gray-300 rounded mb-4' value={email}
  onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' className='w-full p-3 border border-gray-300 rounded mb-4' value={password}
  onChange={(e) => setPassword(e.target.value)} />
          <input type='password' placeholder='Confirm Password' className='w-full p-3 border border-gray-300 rounded mb-4' value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type='submit' className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors ease-in-out duration-150'>Create Account</button>
        </form>
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              If Already resistered{"  "}
              <button
                onClick={() => {navigate("/login")}}
                className="text-blue-600 hover:text-blue-800 font-semibold underline m-l-2 cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
       
      </div>
    </div>
    </>
  );
};

export default Signup;