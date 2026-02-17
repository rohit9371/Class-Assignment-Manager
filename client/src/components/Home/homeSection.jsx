import React from 'react'
import { FaDownload } from 'react-icons/fa';
import heroImg from '../../assets/hero.jpg';
import BlogSection from './homeBlogSection.jsx'

const HomeSection = () => {
  return (
    <>
    <div className='font-sans text-white bg-indigo-300 '>
      
      <main className='flex justify-center items-center my-0 mx-auto'>
        <div className='flex-1 justify-center items-center py-30 px-12'>
          <img src={heroImg} alt='Smartphone' className='rounded-lg shadow-2xl' />
        </div>
        <div className='flex-1 text-left px-12'>
          <h1 className='text-6xl font-bold my-4'>A Smarter Way to Manage Classroom Assignments</h1>
          <p className='text-gray-400 text-xl my-4'>Your all-in-one platform for creating, submitting, and grading assignments—secure, fast, and beautifully simple.</p>
          <button className='bg-green-300 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center'>
            
            Lets Started
          </button>
         
        </div>
      </main>
    </div>

    <BlogSection />
    </>
    
  )
}

export default HomeSection
