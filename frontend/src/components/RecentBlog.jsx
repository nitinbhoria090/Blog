// import { setBlog } from '@/redux/blogSlice'
// import store from '@/redux/store'
// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import BlogCardList from './BlogCardList'
// import { Badge } from './ui/badge'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { useNavigate } from 'react-router-dom'

// const RecentBlog = () => {
//     const dispatch = useDispatch()
//     const {blog} = useSelector(store=>store.blog)
//     const navigate = useNavigate()
//     useEffect(() => {
//         const getPublishedBlogs = async () => {
//             try {
//                 const res = await axios.get(`https://blog-2-zfmp.onrender.com/blog/get-published-blogs`, { withCredentials: true })
//                 if(res.data.success){
//                    dispatch(setBlog(res.data.blogs))
//                 }
//             } catch (error) {
//                 console.log(error);

//             }
//         }
//         getPublishedBlogs()
//     },[])
//     return (
//         <div className=' bg-gray-100 dark:bg-gray-800 pb-10'>
//             <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
//                 <h1 className='text-4xl font-bold pt-10'>Recent Blogs</h1>
//                 <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
//             </div>
//             {/* <div className='max-w-8xl mx-auto flex gap-10 '> */}
//             <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-4'>

//                 <div className='flex-1'>
//                     <div className='mt-10 px-4 md:px-0'>
//                         {
//                             blog?.slice(0,4)?.map((blog, index)=>{
//                                 return <BlogCardList key={index} blog={blog} />
//                             })
//                         }
//                     </div>
//                 </div>
//                 <div className='bg-white hidden md:block dark:bg-gray-700 w-[330px] p-5 rounded-md mt-10 ml-10'>
//                     <h1 className='text-2xl font-semibold'>Popular Categories</h1>
//                     <div className='my-5 flex flex-wrap gap-3'>
//                         {
//                             ["Blogging", "Web Development", "Digital Marketing", "Cooking","Photography","sports"].map((item, index)=>{
//                                 return <Badge  onClick = {()=>navigate(`/search?q=${item}`)} key={index} className="cursor-pointer">{item}</Badge>
//                             })
//                         }

//                     </div>
//                     <h1 className='text-xl font-semibold'>Subscribe to Newletter</h1>
//                     <p className='text-sm text-gray-600 dark:text-gray-400'>Get the Latest Posts and Updates straight to your inbox</p>
//                     <div className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5'>
//                         <Input type="email" placeholder="Enter your email" className="flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-300"/>
//                         <Button>Subscribe</Button>
//                     </div>
//                     <div className='mt-7'>
//                         <h2 className='text-xl font-semibold mb-3'>Suggested Blogs</h2>
//                         <ul className='space-y-3'>
//                             {
//                                 ["10 tips to Master React",
//                                     "Understanding Tailwind CSS",
//                                     "Improve SEO in 2026"
//                                 ].map((title, idx)=>{
//                                   return   <li key={idx} className='text-sm dark:text-gray-100 hover:underline cursor-pointer'>{title}</li>
//                                 })
//                             }
//                         </ul>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RecentBlog




import { setBlog } from '@/redux/blogSlice'
import store from '@/redux/store'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const RecentBlog = () => {
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const navigate = useNavigate()

    useEffect(() => {
        const getPublishedBlogs = async () => {
            try {
                const res = await axios.get(`https://blog-2-zfmp.onrender.com/api/v1/blog/get-published-blogs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPublishedBlogs()
    }, [])

    return (
        <section className="relative overflow-hidden bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 pb-20">

            {/* 🔥 Background Blobs */}
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-300/40 dark:bg-orange-500/20 blur-3xl"></div>
            <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-gray-400/40 dark:bg-gray-500/20 blur-3xl"></div>

            {/* 🔳 Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] 
                bg-[linear-gradient(to_right,#000_1px,transparent_1px),
                linear-gradient(to_bottom,#000_1px,transparent_1px)]
                dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),
                linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                bg-[size:40px_40px]"></div>

            <div className="relative max-w-7xl mx-auto px-4">

                {/* 🔥 Heading */}
                <div className="text-center pt-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Recent{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-gray-700 dark:from-orange-400 dark:to-gray-300 bg-clip-text text-transparent">
                            Blogs
                        </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Discover the latest insights, tutorials, and trends from our blog.
                    </p>
                </div>

                {/* 📦 Content */}
                <div className="mt-12 flex flex-col md:flex-row gap-8">

                    {/* 📰 Blog List */}
                    <div className="flex-1 space-y-6">
                        {
                            blog?.slice(0, 4)?.map((blog, index) => (
                                <div className="transform hover:scale-[1.02] transition duration-300">
                                    <BlogCardList key={index} blog={blog} />
                                </div>
                            ))
                        }
                    </div>

                    {/* 📊 Sidebar */}
                    <div className="hidden md:block w-[320px]">

                        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-xl">

                            {/* Categories */}
                            <h1 className="text-xl font-semibold mb-4">Popular Categories</h1>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {
                                    ["Blogging", "Web Development", "Digital Marketing", "Cooking", "Photography", "Sports"]
                                        .map((item, index) => (
                                            <Badge
                                                key={index}
                                                onClick={() => navigate(`/search?q=${item}`)}
                                                className="cursor-pointer hover:scale-105 transition"
                                            >
                                                {item}
                                            </Badge>
                                        ))
                                }
                            </div>

                            {/* Newsletter */}
                            <h1 className="text-lg font-semibold">Subscribe</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Get updates directly in your inbox
                            </p>

                            <div className="flex flex-col gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-200 dark:bg-gray-800"
                                />
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                    Subscribe
                                </Button>
                            </div>

                            {/* Suggested */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-3">Suggested Blogs</h2>
                                <ul className="space-y-2">
                                    {
                                        [
                                            "10 Tips to Master React",
                                            "Understanding Tailwind CSS",
                                            "Improve SEO in 2026"
                                        ].map((title, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm hover:underline cursor-pointer text-gray-700 dark:text-gray-300"
                                            >
                                                {title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}

export default RecentBlog