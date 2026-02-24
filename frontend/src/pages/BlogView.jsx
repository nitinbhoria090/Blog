import store from '@/redux/store'
import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaSourcetree } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { data, Link, useParams } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { Bookmark, MessageSquare, Share2, User } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { Toast } from 'radix-ui'
import { setBlog } from '@/redux/blogSlice'
import CommentBox from '../components/CommentBox'


const BlogView = () => {
    const params = useParams()
    const blogId = params.blogId
    const { blog } = useSelector(store => store.blog)
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const selectedBlog = blog.find(blog => blog._id === blogId)
    const [blogLike, setBlogLike] = useState(selectedBlog.likes.length)

    const [liked, setLiked] = useState(selectedBlog.likes.includes(user._id) || false)

    console.log(selectedBlog);


    const changeTimeFormat = (isDate) => {
        const date = new Date(isDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        const formattedDate = date.toLocaleDateString('en-GB', options)
        return formattedDate
    }
    // const handleShare = (blogId) =>{
    //     const blogUrl = `${window.location.origin}/blog/${blogId}`
    //     if(navigator.share){
    //         navigator.share({
    //             title: "check out this blogs!",
    //             text:"Read this amazing blog past",
    //             url:blogUrl,


    //         }).then(()=>console.log("Shared Successfully")
    //         ).catch((err)=>console.error("Error Sharing:", err)
    //         )
    //     }else{
    //         //fall back copy to clipboard
    //         navigator.clipboard.writeText(blogUrl).then(()=>{
    //             toast.success("Blog Link copied to clipboard")
    //         })
    //     }
    // }
    const handleShare = (blogId) => {
        const blogUrl = `${window.location.origin}/blog/${blogId}`

        if (navigator.share) {
            navigator
                .share({
                    title: selectedBlog.title,
                    text: selectedBlog.subtitle,
                    url: blogUrl,
                })
                .then(() => {
                    toast.success("Blog shared successfully")
                })
                .catch(() => {
                    navigator.clipboard.writeText(blogUrl)
                    toast.success("Blog link copied to clipboard")
                })
        } else {
            navigator.clipboard.writeText(blogUrl)
            toast.success("Blog link copied to clipboard")
        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? "dislike" : "like"
            const res = await axios.get(`http://localhost:8000/api/v1/blog/${selectedBlog?._id}/${action}`, { withCredentials: true })
            if (res.data.success) {
                const updatedLikes = liked ? blogLike - 1 : blogLike + 1

                setBlogLike(updatedLikes)
                setLiked(!liked)
            }

            //apne blog ko update krugya
            const updatedBlogData = blog.map(p => p._id === selectedBlog._id ? {
                ...p,
                likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
            } : p
            )
            toast.success(res.data.message)
            dispatch(setBlog(updatedBlogData))

        } 
             
        catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='pt-14'>
            <div className='max-w-6xl mx-auto p-10 '>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* blog header */}
                <div className='my-8'>
                    <h1 className='text-4xl font-bold tracking-tight m-4'>{selectedBlog.title}</h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                <AvatarImage
                                    src={selectedBlog.author.photoUrl}
                                    alt='author'
                                    className="object-cover"
                                />
                                <AvatarFallback>NB</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className='font-medium'>
                                    {selectedBlog.author.firstName}
                                    {selectedBlog.author.lastName}
                                </p>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground'>published on {changeTimeFormat(selectedBlog.createdAt)}: 8 min read</p>
                    </div>



                </div>
                <div className='mb-8 rounded-lg overflow-hidden'>
                    <img src={selectedBlog.thumbnail} alt='thumbnail' width={1000} height={500} className='w-full object-cover' />
                    <p className='text-sm text-muted-foreground mt-2 italic'>{selectedBlog.subtitle}</p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
                {/* engagement */}
                <div className='flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8'>
                    <div className='flex items-center space-x-4'>
                        <Button  onClick= {likeOrDislikeHandler}variant='ghost' className="flex items-center gap-1">
                         {
                            liked ? <FaHeart size={24} className='cursor-pointer text-red-600'/> : <FaRegHeart  size={24} className='cursor-pointer hover:text-gray-600 text-white
                            '/>
                         }   
                            
                        
                            <span>{blogLike}</span></Button>
                        <Button variant='ghost'><MessageSquare className='h-4 w-6' /><span>3 Comments</span> </Button>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button variant='ghost'>
                            <Bookmark className='w-4 h-4' />
                        </Button>
                        <Button variant='ghost' onClick={() => handleShare(selectedBlog._id)}><Share2 className='w-4 h-4' /></Button>
                    </div>
                </div>
            </div>
             <CommentBox selectedBlog={selectedBlog} />

        </div>
    )
}

export default BlogView