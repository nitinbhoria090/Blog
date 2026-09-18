

import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'
import store from '@/redux/store'
import { BsThreeDotsVertical } from "react-icons/bs";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const YourBlog = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)
  const navigate = useNavigate()

  // ✅ Fetch Blogs
  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `https://blog-2-zfmp.onrender.com/api/v1/blog/get-own-blogs`,
        { withCredentials: true }
      )
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ✅ Delete Blog
  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `https://blog-2-zfmp.onrender.com/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      )
      if (res.data.success) {
        const updated = blog.filter((b) => b._id !== id)
        dispatch(setBlog(updated))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getOwnBlog()
  }, [])

  // ✅ Date Format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB")
  }

  return (
    <div className="pb-10 pt-20 md:ml-[320px] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800">

          <TableCaption>A list of your recent Blogs.</TableCaption>

          <div className="hidden md:block overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {blog.map((item) => (
                  <TableRow key={item._id}>
                    
                    {/* Title */}
                    <TableCell className="flex gap-3 items-center">
                      <img
                        src={item.thumbnail}
                        className="w-16 h-12 object-cover rounded-md"
                        alt=""
                      />
                      <h1
                        className="hover:underline cursor-pointer"
                        onClick={() => navigate(`/blogs/${item._id}`)}
                      >
                        {item.title}
                      </h1>
                    </TableCell>

                    {/* Category */}
                    <TableCell>{item.category}</TableCell>

                    {/* Date */}
                    <TableCell>{formatDate(item.createdAt)}</TableCell>

                    {/* Action */}
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <BsThreeDotsVertical />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          <DropdownMenuGroup>

                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/dashboard/write-blog/${item._id}`)
                              }
                            >
                              <FaEdit /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => deleteBlog(item._id)}
                              className="text-red-500"
                            >
                              <FaTrash /> Delete
                            </DropdownMenuItem>

                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

         
          <div className="md:hidden space-y-4">
            {blog.map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-xl bg-gray-100 dark:bg-gray-700 shadow"
              >
                <div className="flex gap-3">

                  {/* Image */}
                  <img
                    src={item.thumbnail}
                    className="w-16 h-12 object-cover rounded-md"
                    alt=""
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <h1
                      className="font-semibold text-sm cursor-pointer"
                      onClick={() => navigate(`/blogs/${item._id}`)}
                    >
                      {item.title}
                    </h1>

                    <p className="text-xs text-gray-500">
                      {item.category}
                    </p>

                    <p className="text-xs text-gray-400">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  {/* Action */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>
                        <BsThreeDotsVertical />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/dashboard/write-blog/${item._id}`)
                        }
                      >
                        <FaEdit /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => deleteBlog(item._id)}
                        className="text-red-500"
                      >
                        <FaTrash /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>
              </div>
            ))}
          </div>

        </Card>
      </div>
    </div>
  )
}

export default YourBlog

