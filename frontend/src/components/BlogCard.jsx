
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {

  const navigate = useNavigate()
  if (!blog) return null

  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-GB")
    : ""

  return (
    <div className="group bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">

     
      <div className="relative overflow-hidden">
        <img
          src={blog?.thumbnail}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

    
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {blog?.category}
        </span>
      </div>

     
      <div className="p-5">

        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          by {blog?.author?.firstName || "Unknown"} • {formattedDate}
        </p>

        
        <h2 className="text-lg font-semibold mb-1 line-clamp-2">
          {blog?.title}
        </h2>

       
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {blog?.subtitle}
        </p>

       
        <Button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white transition"
        >
          Read More →
        </Button>

      </div>
    </div>
  )
}

export default BlogCard
