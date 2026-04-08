
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate()

  if (!blog) return null

  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-GB")
    : ""

  return (
    <div className="group bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-6 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1">

      
      <div className="relative md:w-[220px] w-full overflow-hidden rounded-xl">
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

       
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          {blog?.category}
        </span>
      </div>

      
      <div className="flex flex-col justify-between flex-1">

        <div>
      
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            by {blog?.author?.firstName || "Unknown"} • {formattedDate}
          </p>

      
          <h2 className="text-xl md:text-2xl font-semibold line-clamp-2">
            {blog?.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {blog?.subtitle}
          </p>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="bg-orange-500 hover:bg-orange-600 text-white transition"
          >
            Read More →
          </Button>
        </div>

      </div>
    </div>
  )
}

export default BlogCardList