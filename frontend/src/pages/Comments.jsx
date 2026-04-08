
import { Card } from '@/components/ui/card'
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import axios from 'axios'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Comments = () => {
  const [allComments, setAllComments] = useState([])
  const navigate = useNavigate()

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `https://blog-2-zfmp.onrender.com/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      )
      if (res.data.success) {
        setAllComments(res.data.comments)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTotalComments()
  }, [])

  return (
    <div className='relative pb-16 pt-24 md:ml-[320px] min-h-screen bg-gray-100 dark:bg-black'>

   
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/30 dark:bg-orange-500/20 blur-3xl rounded-full"></div>

      <div className='relative max-w-6xl mx-auto px-4'>

        
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold">
            Manage{" "}
            <span className="bg-gradient-to-r from-orange-500 to-gray-700 bg-clip-text text-transparent">
              Comments
            </span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            View and manage comments on your blogs
          </p>
        </div>

        
        <div className="space-y-4 md:hidden">
          {allComments.length > 0 ? (
            allComments.map((comment) => (
              <Card
                key={comment._id}
                className="p-4 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border rounded-xl shadow"
              >
                <h2 className="font-semibold text-sm mb-1">
                  {comment?.postId?.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {comment?.content}
                </p>

                <p className="text-xs text-gray-500 mb-3">
                  by {comment?.userId?.firstName}
                </p>

                <div className="flex justify-end">
                  <Eye
                    className="cursor-pointer hover:text-orange-500"
                    onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                  />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments found 🚫</p>
          )}
        </div>

        <Card className="hidden md:block w-full p-5 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border shadow-xl rounded-2xl">

          <div className="overflow-x-auto">

            <Table>
              <TableCaption>Your recent blog comments</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allComments.length > 0 ? (
                  allComments.map((comment) => (
                    <TableRow
                      key={comment._id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <TableCell className="font-medium">
                        {comment?.postId?.title}
                      </TableCell>

                      <TableCell className="max-w-[250px] truncate">
                        {comment?.content}
                      </TableCell>

                      <TableCell>
                        {comment?.userId?.firstName}
                      </TableCell>

                      <TableCell className="text-center">
                        <Eye
                          className="cursor-pointer hover:text-orange-500"
                          onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      No comments found 🚫
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>

          </div>
        </Card>

      </div>
    </div>
  )
}

export default Comments