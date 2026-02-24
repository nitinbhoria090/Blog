
// import React from 'react'

// const BlogCard = ({blog}) => {
//     const date = new Date(blog.createdAt)
//     const formattedDate = date.toLocaleDateString("en-GB")
//   return (
//     <div className='bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all'>
//         <img src={blog.thumbnail} alt=''className='rounded-lg'/>
//         <p className='text-sm mt2'>
//             by {blog.author.firstName} | {blog.category} |
//         </p>
//     </div>
//   )
// }

// export default BlogCard


import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {

  if (!blog) return null

  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-GB")
    : ""
   const navigate = useNavigate()
  return (
    <div className='bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all'>
      
      <img 
        src={blog?.thumbnail} 
        alt='' 
        className='rounded-lg w-full h-48 object-cover'
      />

      <p className='text-sm mt-2 text-gray-600 dark:text-gray-300'>
        by {blog?.author?.firstName || "Unknown"} | {blog?.category} | {formattedDate}
      </p>
        <h2 className='text-xl font-semibold'>{blog.title}</h2>
        <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>
        <Button className="mt-4 py-2 rounded-lg text-sm" onClick={()=>navigate(`/blogs/${blog._id}`)}>Read More</Button>
    </div>
  )
}

export default BlogCard
