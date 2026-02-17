import React from 'react'
import { BsStarFill } from 'react-icons/bs';



const TestimonialCard = ({ AboutTestimonial }) => {
    return(
    <div className='bg-white flex flex-col justify-between shadow-lg rounded-lg p-4 m-2 w-full md:w-[300px]'>
      <div className='flex flex-col text-center gap-2 items-center mb-4'>
        <img src={AboutTestimonial.profilePic} alt={`${AboutTestimonial.name}`} className='w-20 h-20 rounded-full mr-4 shadow object-cover' />
        <div>
          <p className='font-semibold'>{AboutTestimonial.name}</p>
          <p className='text-gray-600 text-sm'>{`${AboutTestimonial.keyResponsibility}`}</p>
        </div>
      </div>
      <p className='italic mb-4'>{`\"${AboutTestimonial.statement}\"`}</p>
     
  
    </div>
  );}
  
  

export default TestimonialCard
