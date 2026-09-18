
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
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
import { Bookmark, MessageSquare, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import CommentBox from '../components/CommentBox'

const BlogView = () => {
  const { blogId } = useParams()
  const { blog } = useSelector(store => store.blog)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const selectedBlog = blog.find(b => b._id === blogId)

  const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0)
  const [liked, setLiked] = useState(selectedBlog?.likes?.includes(user?._id) || false)

  const changeTimeFormat = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`
    navigator.clipboard.writeText(blogUrl)
    toast.success("Link copied")
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like"
      const res = await axios.get(
        `https://blog-2-zfmp.onrender.com/api/v1/blog/${selectedBlog?._id}/${action}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setBlogLike(liked ? blogLike - 1 : blogLike + 1)
        setLiked(!liked)

        const updatedBlogData = blog.map(p =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter(id => id !== user._id)
                  : [...p.likes, user._id]
              }
            : p
        )

        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      }
    } catch {
      toast.error("Error")
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!selectedBlog) return null

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-[#0B1120] text-black dark:text-white">

      {/* 🔥 Glow */}
      <div className="absolute left-0 top-20 w-40 sm:w-72 h-40 sm:h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* 🔹 Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="text-gray-600 dark:text-gray-400">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-black dark:text-white">
                {selectedBlog.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 🔹 Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-6 leading-tight">
          {selectedBlog.title}
        </h1>

        {/* 🔹 Author */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <AvatarImage src={selectedBlog.author.photoUrl} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">
                {selectedBlog.author.firstName} {selectedBlog.author.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {changeTimeFormat(selectedBlog.createdAt)}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            8 min read
          </p>
        </div>

        {/* 🔹 Image */}
        <div className="mt-8">
          <img
            src={selectedBlog.thumbnail}
            alt="thumbnail"
            className="w-full h-[200px] sm:h-[350px] object-cover rounded-xl"
          />
          <p className="text-gray-500 dark:text-gray-400 mt-3 italic text-sm">
            {selectedBlog.subtitle}
          </p>
        </div>

        {/* 🔹 Content */}
        <div
          className="prose dark:prose-invert max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
        />

        {/* 🔹 Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-y border-gray-300 dark:border-gray-800 py-4 mt-10">

          <div className="flex items-center gap-4">
            <Button onClick={likeOrDislikeHandler} variant="ghost" className="flex items-center gap-2">
              {
                liked
                  ? <FaHeart className="text-red-500" />
                  : <FaRegHeart className="hover:text-gray-500" />
              }
              {blogLike}
            </Button>

            <Button variant="ghost" className="flex items-center gap-2">
              <MessageSquare size={18} />
              Comments
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost"><Bookmark size={18} /></Button>
            <Button variant="ghost" onClick={() => handleShare(selectedBlog._id)}>
              <Share2 size={18} />
            </Button>
          </div>
        </div>

      </div>

      {/* 🔹 Comments */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <CommentBox selectedBlog={selectedBlog} />
      </div>

    </div>
  )
}

export default BlogView
