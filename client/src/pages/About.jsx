import React from 'react'
import { BsStarFill } from 'react-icons/bs';
import TestimonialCard from '../components/about/TestimonialCard.jsx'
import Navbar from '../components/Navbar.jsx'
import rohitImg from '../assets/rohit.jpeg'
import kavyaImg from '../assets/kavya.jpeg'
import unkImg from '../assets/unknownimg.jpg'





const About = () => {
  const AboutTestimonial = [
    {
      id: 1,
      
      name: 'Aryan Thakur',
      jobTitle: "Lead",
      profilePic: unkImg,
      statement: 'Focused on building a seamless user experience with responsive UI components.',
      keyResponsibility: 'Frontend Developer (React UI & Dashboard)',
      
    },
    {
      id: 2,
      name: 'Rohit Saini',
      jobTitle:'Coordinator',
      profilePic: rohitImg,
      statement: 'A good initiative but need to improve the software and the service.',
      keyResponsibility: 'Backend Developer (APIs & Authentication)',
   
    },
    {
      id: 3,
      name: 'Kavya Sandal',
      jobTitle:'Coordinator',
      profilePic: kavyaImg,
      statement: 'Ensures smooth data flow and optimized database design across all modules.',
      keyResponsibility: 'Database Engineer (MongoDB & Schemas)',
     
    },
    {
      id: 4,
      name: 'Suraj Rana',
      jobTitle:'Coordinator',
      profilePic: unkImg,
      statement: 'Handles testing workflows, quality checks, and overall project coordination.',
      keyResponsibility: 'QA & Project Coordinator',
     
    }
    
  ];
  return (
    <div>
      <Navbar />

      <div className='bg-gray-100 p-8'>
    <div className='container mx-auto my-20'>
    <h2 className="text-4xl font-bold text-center mt-10 mb-10 text-gray-800">Our Team</h2>
      <div className='flex flex-wrap justify-center'>
        {AboutTestimonial.map(AboutTestimonial => <TestimonialCard key={AboutTestimonial.id} AboutTestimonial={AboutTestimonial} />)}
      </div>
    </div>
  </div>
    </div>
  )
}

export default About


