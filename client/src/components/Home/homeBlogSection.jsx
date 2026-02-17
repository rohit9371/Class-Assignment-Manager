import React from 'react';

import students from '../../assets/students.jpg'
import teacher from '../../assets/teacher.jpg'

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Students',
      excerpt: 'Explore the latest trends and techniques in creating stunning web Students can view assignments, read instructions, submit their work, and check grades easily. The dashboard provides a clean, organized interface that simplifies task management and keeps students updated on deadlines and performance.',
     
      image: students,
    },
    {
      id: 2,
      title: 'Teacher',
      excerpt: 'Teachers can create assignments, set deadlines, track submissions, and grade student work through a secure, responsive dashboard. The system centralizes classroom tasks, improves workflow efficiency, and ensures organized academic management. how to create fluid and adaptable designs for all screen sizes.',
     
      image: teacher,
    },
  ];

  return (
    <section className="py-16 bg-indigo-100 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What we provide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  </div>
                  <div className="mt-4">
                    
                    <button
                      className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;