import React from 'react';
import { FiMail, FiMapPin, FiHeadphones, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar.jsx';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks, we’ll be in touch soon!');
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen  bg-indigo-300'>
      

      <main className='flex-grow container mt-15 mx-auto p-4'>
        <section className='text-center my-10'>
          <h1 className='text-4xl font-bold'>We’re Here to Help!</h1>
          <p className='text-xl mt-4'>Got a question or just want to say hi? Our team is ready to answer all your queries.</p>
        </section>

        <section id='contact' className='my-10'>
          <h2 className='text-3xl font-bold text-center'>Reach Out to Us</h2>
          <form className='mt-8 max-w-md mx-auto' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='first-name'>Name</label>
                <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='first-name' type='text' placeholder='First Name' required aria-label='First Name'/>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='last-name'>Full Name</label>
                <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='last-name' type='text' placeholder='Last Name' required aria-label='Last Name'/>
              </div>
            </div>
            <div className='mb-6'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='email'>Email</label>
              <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='email' type='email' placeholder='you@example.com' required aria-label='Email'/>
            </div>
            <div className='mb-6'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='message'>Message</label>
              <textarea className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='message' placeholder='Your message here' required aria-label='Message'></textarea>
            </div>
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Send</button>
            </div>
          </form>
        </section>
      </main>
    </div>
    </>
    
  );
};

export default ContactUs;