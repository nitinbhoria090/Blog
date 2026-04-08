import BlogCard from '../components/BlogCard'
import { setBlog } from '@/redux/blogSlice'
import store from '@/redux/store'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = () => {
  const dispatch = useDispatch()
  const {blog} = useSelector(store =>store.blog)
  useEffect(() => {
    const getAllPublishBlogs = async () => {
      try {
        const res = await axios.get(`https://blog-2-zfmp.onrender.com/api/v1/api/v1/blog/get-published-blogs`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error);

      }
    }
    getAllPublishBlogs()
  },[])
  return (
  <div className='pt-16'>
  <div className="max-w-4xl mx-auto text-center pt-10">
    <h1 className="text-4xl font-bold">
      Our Blogs
    </h1>

    <div className="flex justify-center mt-4">
      <div className="w-24 h-1 bg-red-500 rounded-full"></div>
    </div>
  </div>

  <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0'>
    {
      blog?.map((blog, index)=>(
        <BlogCard blog={blog} key={index}/>
      ))
    }
  </div>
</div>

  )
}

export default Blogs




