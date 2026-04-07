
// // import React from 'react'

// // const BlogCard = ({blog}) => {
// //     const date = new Date(blog.createdAt)
// //     const formattedDate = date.toLocaleDateString("en-GB")
// //   return (
// //     <div className='bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all'>
// //         <img src={blog.thumbnail} alt=''className='rounded-lg'/>
// //         <p className='text-sm mt2'>
// //             by {blog.author.firstName} | {blog.category} |
// //         </p>
// //     </div>
// //   )
// // }

// // export default BlogCard


// import React from 'react'
// import { Button } from './ui/button'
// import { useNavigate } from 'react-router-dom'

// const BlogCard = ({ blog }) => {

//   if (!blog) return null

//   const formattedDate = blog?.createdAt
//     ? new Date(blog.createdAt).toLocaleDateString("en-GB")
//     : ""
//    const navigate = useNavigate()
//   return (
//     <div className='bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all'>
      
//       <img 
//         src={blog?.thumbnail} 
//         alt='' 
//         className='rounded-lg w-full h-48 object-cover'
//       />

//       <p className='text-sm mt-2 text-gray-600 dark:text-gray-300'>
//         by {blog?.author?.firstName || "Unknown"} | {blog?.category} | {formattedDate}
//       </p>
//         <h2 className='text-xl font-semibold'>{blog.title}</h2>
//         <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>
//         <Button className="mt-4 py-2 rounded-lg text-sm" onClick={()=>navigate(`/blogs/${blog._id}`)}>Read More</Button>
//     </div>
//   )
// }

// export default BlogCard




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

      {/* 🖼️ Image */}
      <div className="relative overflow-hidden">
        <img
          src={blog?.thumbnail}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* 🔥 Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* 🏷️ Category */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {blog?.category}
        </span>
      </div>

      {/* 📄 Content */}
      <div className="p-5">

        {/* Meta */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          by {blog?.author?.firstName || "Unknown"} • {formattedDate}
        </p>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-1 line-clamp-2">
          {blog?.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {blog?.subtitle}
        </p>

        {/* Button */}
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