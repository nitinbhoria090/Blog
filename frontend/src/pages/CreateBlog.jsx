

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setLoading } from '../redux/authSlice'
import { setBlog } from '../redux/blogSlice'
import store from '../redux/store'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { blog, loading } = useSelector(store => store.blog)

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  const createBlogHandler = async () => {
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`https://blog-2-zfmp.onrender.com/api/v1/api/v1/blog/`, { title, category }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      // if (res.data.success) {
      //   if (!blog) {
      //     dispatch(setBlog([res.data.blog]))
      //     toast.success(res.data.message)
      //   }
      //   dispatch(setBlog([...blog, res.data.blog]))
      //   navigate(`/dashboard/write-blog/${res.data.blog._id}`)
      if (res.data.success) {
        const updatedBlogs = blog ? [...blog, res.data.blog] : [res.data.blog];

        dispatch(setBlog(updatedBlogs));
        toast.success(res.data.message);

        navigate(`/dashboard/write-blog/${res.data.blog._id}`);



      } else {
        toast.error("something went wrong")
      }


    } catch (error) {
      console.log(error);

    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">

      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Let's create Blog
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum eveniet veniam ducimus, iure quis eius deleniti sequi voluptatem aliquam! Repellendus veniam velit modi, illo dignissimos nesciunt. Eos, velit sequi!</p>
        <div>
          <div>
            <Label className="mb-2 text-xl font-semibold">Title:</Label>
            <Input type="text" placeholder="Your Blog Name" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white dark:bg-gray-700 shadow-gray-400" />
          </div>
          <div className='mt-4 mb-5'>
            <Label className="mb-2 text-xl font-semibold">Category:</Label>

            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" classname="bg-white dark:bg-gray-700 shadow-gray-400" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {
                loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please Wait...</> : "create"
              }
            </Button>
          </div>

        </div>
      </Card>

    </div>
  )
}

export default CreateBlog
