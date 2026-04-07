// import { Card } from '@/components/ui/card'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import axios from 'axios'
// import { Edit, Eye, Trash2 } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Comments = () => {
//     const [allComments, setAllComments] = useState([])
//     const navigate = useNavigate()
//     const getTotalComments = async()=>{
//         try {
//           const res = await axios.get(`http://localhost:8000/api/v1/comment/my-blogs/comments`,{withCredentials:true})
//           if(res.data.success){
//             setAllComments(res.data.comments)
//           }
//         } catch (error) {
//           console.log(error);
          
//         }
//     }
//     useEffect(()=>{
//         getTotalComments()
//     },[])
//     console.log(allComments);
    
//   return (
//     <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
//     <div className='max-w-6xl mx-auto mt-8 '>
//         <Card className="w-full p-5 space-y-2 dark:bg-gray-800">

//             <Table>
//                 <TableCaption>A list of your recent comments.</TableCaption>
//                 <TableHeader >
//                     <TableRow>
//                         {/* <TableHead className="w-[100px]">Author</TableHead> */}
//                         <TableHead>Blog Title</TableHead>
//                         <TableHead>Comment</TableHead>
//                         <TableHead>Author</TableHead>
//                         <TableHead className="text-center">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {allComments?.map((comment, index) => (
//                         <TableRow key={index}>
//                             {/* <TableCell className="font-medium">{item.author.firstName}</TableCell> */}
//                             <TableCell className="flex gap-4 items-center">
//                                 {/* <img src={item.thumbnail} alt="" className='w-20 rounded-md hidden md:block' /> */}
//                                 {comment.postId.title}
//                             </TableCell>
//                             <TableCell>{comment.content}</TableCell>
//                             <TableCell className="">{comment.userId.firstName}</TableCell>
//                             <TableCell className="text-right flex gap-3 items-center justify-center">
//                                 <Eye className='cursor-pointer' onClick={() => navigate(`/blogs/${comment.postId._id}`)} />
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//                 {/* <TableFooter>
//                     <TableRow>
//                         <TableCell colSpan={3}>Total</TableCell>
//                         <TableCell className="text-right">$2,500.00</TableCell>
//                     </TableRow>
//                 </TableFooter> */}
//             </Table>

//         </Card>
//     </div>
// </div>
//   )
// }

// export default Comments




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
        `http://localhost:8000/api/v1/comment/my-blogs/comments`,
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