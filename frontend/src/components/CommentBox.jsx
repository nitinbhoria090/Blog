import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { LuSend } from "react-icons/lu"
import axios from 'axios'
import { setComment } from '@/redux/commentslice'
// import store from '@/redux/store'
import { FaEdit, FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast, Toaster } from 'sonner'
import { setBlog } from '@/redux/blogSlice'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDots } from 'react-icons/bs'
import { Delete, Edit, Edit2, Trash2 } from 'lucide-react'
import store from '@/redux/store'


const CommentBox = ({ selectedBlog }) => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const { comment } = useSelector(store => store.comment)
    const { blog } = useSelector(store => store.blog)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editedContent, setEditedContent] = useState("")
    const [content, setContent] = useState("")

    const ChangeEventHandler = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setContent(inputText)
        } else {
            setContent("")
        }
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/comment/${selectedBlog._id}/create`, { content }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                let updatedCommentData

                if (comment.length >= 1) {
                    updatedCommentData = [...comment, res.data.comment]

                } else {
                    updatedCommentData = [res.data.comment]
                }
                dispatch(setComment(updatedCommentData))

                const updatedBlogData = blog.map(blog => blog._id === selectedBlog._id ? { ...blog, comments: updatedCommentData } : blog)
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                setContent("")
            }
        } catch (error) {
            console.log(error);
            toast("comment no added")
        }
    }

    // const editCommentHandler = async (commentId)=>{
    //     try {
    //         const res = await axios.put(`http://localhost:8000/api/v1/comment/${commentId._id}/edit`,{content:editedContent},{
    //             withCredentials: true,
    //             headers:{
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         if(res.data.success){
    //             const updatedCommentData = comment.map(item=>
    //                 item._id === commentId ? {...item, content:editedContent} : item
    //             );
    //             dispatch(setComment(updatedCommentData))
    //             toast.success(res.data.message)
    //             setEditingCommentId(null)
    //             setEditedContent("")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to Edit Comment")
    //     }
    // }
    const editCommentHandler = async (commentId) => {
        try {
            const res = await axios.put(
                `http://localhost:8000/api/v1/comment/${commentId}/edit`,
                { content: editedContent },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (res.data.success) {

                const updatedCommentData = comment.map((item) =>
                    item._id === commentId
                        ? { ...item, content: editedContent }
                        : item
                )

                dispatch(setComment(updatedCommentData))

                toast.success(res.data.message)

                setEditingCommentId(null)
                setEditedContent("")
            }

        } catch (error) {
            console.log(error.response?.data || error.message)
            toast.error("Failed to Edit Comment")
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/comment/${commentId}/delete`, {
                withCredentials: true
            })
            if (res.data.success) {
                const updatedCommentData = comment.filter((item) => item._id !== commentId)
                dispatch(setComment(updatedCommentData))
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Comment not added")
        }
    }

    // const likeCommentHandler = async (commentId) =>{
    //     try {
    //         const res = await axios.put(`http://localhost:8000/api/v1/comment/${commentId}/like`,{
    //             withCredentials: true
    //         })
    //         if(res.data.success){
    //             const updatedComment = res.data.updatedComment;

    //             const updatedCommentList = comment.map(item=>
    //                 item._id === commentId ? updatedComment : item
    //             );
    //             dispatch(setComment(updatedCommentList))
    //             toast.success(res.data.message)
    //         }
    //     } catch (error) {
    //      console.log("Error liking comment", error);
    //      toast.error("something went wrong")

    //     }
    // }
    const likeCommentHandler = async (commentId) => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/comment/${commentId}/like`,
                {}, // empty body
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                const updatedComment = res.data.updatedComment;

                const updatedCommentList = comment.map(item =>
                    item._id === commentId ? updatedComment : item
                );

                dispatch(setComment(updatedCommentList));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log("LIKE ERROR:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };



    useEffect(() => {
        const getAllcommentOfBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/comment/${selectedBlog._id}/comments`)
                const data = res.data.comments
                dispatch(setComment(data))
            } catch (error) {
                console.log(error);

            }
        }
        getAllcommentOfBlog()
    }, [])


    return (
        <div className="max-w-3xl mx-auto -mt-6 px-4">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 border border-gray-200 dark:border-gray-800">

                {/* User Info */}
                <div className='flex items-center gap-3 mb-4'>
                    <Avatar className="h-10 w-10 ring-1 ring-primary/20">
                        <AvatarImage
                            src={user?.photoUrl}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-sm font-semibold bg-gray-200 dark:bg-gray-700">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h3 className="font-medium text-base leading-none">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                            Write a comment
                        </span>
                    </div>
                </div>

                {/* Comment Input */}
                <div className="relative">
                    <Textarea
                        placeholder="Write your comment..."
                        className="
                            w-full
                            min-h-[80px]
                            resize-none
                            rounded-lg
                            bg-gray-50 dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            p-3 pr-12
                            text-sm
                            focus-visible:ring-1
                            focus-visible:ring-primary
                            transition-all
                        "
                        value={content}
                        onChange={ChangeEventHandler}
                    />

                    <Button onClick={commentHandler}
                        size="icon"
                        className="
                            absolute
                            bottom-2
                            right-2
                            h-8 w-8
                            rounded-full
                            shadow
                        "
                    >
                        <LuSend size={16} />
                    </Button>
                </div>
                {
                    comment.length > 0 ? <div className='mt-7 bg-gray-700 dark:bg-gray-800 p-5 rounded-md'>
                        {
                            comment.map((item, index) => {
                                return <div key={index} className='mb-4'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex gap-3 items-start'>
                                            <Avatar>
                                                <AvatarImage src={item?.userId?.photoUrl} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className='mt-2 space-y-1 md:w-[400px]'>
                                                <h1 className='font-semibold'>{item?.userId?.firstName} {item?.userId?.lastName}<span className='text-sm ml-2 font-light'>Yesterday</span></h1>
                                                {
                                                    editingCommentId === item?._id ? (
                                                        <>
                                                            <Textarea
                                                                value={editedContent}
                                                                onChange={(e) => setEditedContent(e.target.value)}
                                                                className="mb-2 bg-gray-200 dark: bg-gray-700"
                                                            />
                                                            <div className=' flex py-1 gap-2'>
                                                                <Button onClick={() => editCommentHandler(item._id)}>Save</Button>
                                                                <Button variant='outline' onClick={() => setEditingCommentId(null)}>cancel</Button>
                                                            </div>
                                                        </>
                                                    ) : <p>{item?.content}</p>
                                                }

                                                <div className='flex gap-5 items-center'>
                                                    <div className='flex gap-2 items-center'>
                                                        <div onClick={() => likeCommentHandler(item._id)}
                                                            className='flex gap-1 items-center cursor-pointer'>

                                                            {
                                                                item?.likes?.some(id => id.toString() === user?._id)
                                                                    ? <FaHeart fill='red' />
                                                                    : <FaRegHeart />
                                                            }

                                                            <span>{item?.likes?.length}</span>
                                                        </div>

                                                    </div>
                                                    <h1 className=' ml-1 cursor-pointer'>Reply</h1>
                                                </div>

                                            </div>
                                        </div>
                                        {
                                            user._id === item?.userId?._id ?

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <BsThreeDots />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem className="bg-green-500" onClick={() => {
                                                                setEditingCommentId(item._id)
                                                                setEditedContent(item.content)
                                                            }}><FaEdit />Edit</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => deleteComment(item._id)} className='bg-red-500'><Trash2 />Delete</DropdownMenuItem>

                                                        </DropdownMenuGroup>

                                                    </DropdownMenuContent>
                                                </DropdownMenu> : null

                                        }

                                    </div>
                                </div>
                            })
                        }

                    </div> : null
                }
            </div>
        </div>
    )
}

export default CommentBox
