
import { ChartColumnBig, SquareUser } from 'lucide-react';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { LiaCommentSolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col fixed top-10 left-0 h-screen w-[240px] z-20 
      bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl
      border-r border-gray-200 dark:border-gray-700 shadow-lg'>

      
      <div className='px-12 py-6 border-b border-gray-200 dark:border-gray-700'>
        <h1 className='text-xl font-bold'>
          <span className='text-orange-500'>Dash</span>Board
        </h1>
      </div>

     
      <div className='flex-1 px-4 py-6 space-y-3'>

    
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <SquareUser size={18} />
          <span>Profile</span>
        </NavLink>

        
        <NavLink
          to="/dashboard/blogs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <ChartColumnBig size={18} />
          <span>Your Blogs</span>
        </NavLink>

       
        <NavLink
          to="/dashboard/comments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <LiaCommentSolid size={18} />
          <span>Comments</span>
        </NavLink>

       
        <NavLink
          to="/dashboard/create-blog"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <FaRegEdit size={16} />
          <span>Create Blog</span>
        </NavLink>

      </div>

   
      <div className='px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-center text-gray-500'>
        Made with ❤️ by <span className='text-orange-500 font-medium'>Nitin</span>
      </div>

    </div>
  )
}

export default Sidebar
