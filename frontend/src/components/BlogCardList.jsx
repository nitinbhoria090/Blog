import Blogs from '@/pages/Blogs'
import React from 'react'
import { Button } from './ui/button'

const BlogCardList = ({ blog }) => {
  return (
    <div className='bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col md:flex-row md:gap-10 p-5 rounded-2xl mt-6 shadow-lg border transition-all'>
      
      <div>
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className='rounded-lg md:w-[200px] hover:scale-105 transition-all'
        />
      </div>
      <div>
        <h2 className='text-2xl font-semibold mt-3 md:mt-1'>{blog.title}</h2>
        <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>
        <Button className="mt-4 py-2 rounded-lg text-sm" onClick={()=>navigate(`/blogs/${blog._id}`)}>Read More</Button>
      </div>

    </div>
  )
}


export default BlogCardList