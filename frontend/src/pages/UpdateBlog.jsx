import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'


const UpdateBlog = () => {
  const editor = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const id = params.blogId
  console.log(params);
  const { blog, loading } = useSelector(store => store.blog)
  const selectBlog = blog.find(blog => blog._id === id)
  const [content, setContent] = useState(selectBlog.description)
  const [publish, setPublish] = useState(false)
  const [blogData, setBlogData] = useState({
    title: selectBlog?.title,
    subtitle: selectBlog?.subtitle,
    description: content,
    category: selectBlog?.category
  })
  const [previewthumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value })
  }

  // const selectThumbnail = (e) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setBlogData({ ...blogData, thumbnail: file })
  //     const fileReader = new FileReader()
  //     fileReader.onloadend() = setPreviewThumbnail(fileReader.result)
  //     fileReader.readAsDataURL(file)
  //   }
  // }
  const selectThumbnail = (e) => {
  const file = e.target.files?.[0]

  if (file) {
    setBlogData({ ...blogData, thumbnail: file })

    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setPreviewThumbnail(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }
}

  const updateBlogHandler = async () => {
    const formData = new FormData()
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle)
    formData.append("description", content)
    formData.append("category", blogData.category)
    formData.append("file", blogData.thumbnail)
    try {
      dispatch(setLoading(true))
      const res = await axios.put(`https://blog-2-zfmp.onrender.com/api/v1/blog/${id}`, formData, {
        Headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message)
        console.log(blogData);

      }
    } catch (error) {
      console.log(error);

    }
    finally {
      dispatch(setLoading(false))
    }
  }

 const togglePublshUnpublish = async (action)=>{
  try {
    const res = await axios.patch(`https://blog-2-zfmp.onrender.com/api/v1/blog/${id}`,{
      params:{
        action
      },
      withCredentials:true
    })
    if(res.data.success){
      setPublish(!publish)
      toast.success(res.data.message)
      navigate('/dashboard/blogs')
    }else{
      toast.error("failed to update ")
    }
  } catch (error) {
    console.log(error);
    
  }
 }

 const deleteBlog = async ()=>{
  try {
    const res = await axios.delete(`https://blog-2-zfmp.onrender.com/api/v1/user/blog/delete/${id}`,{withCredentials:true})
    if(res.data.success){
      const updateBlogData = blog.filter((blogItem)=>blogItem?._id !== id)
      dispatch(setBlog(updateBlogData))
      toast.success(res.data.message)
      navigate('/dashboard/blogs')
    }
  } catch (error) {
    console.log(error)
    toast.error("Something Went Wrong")
  }
 }

  return (
    <div className='md:ml-[250px] pt-20 px-3 pb-10'>
      <div className='max-w-6xl mx-auto mt-5'>
        <Card className="w-full bg-white dark:bg-gray-800 p-5 ">
          <h1 className="text-2xl flex items-center justify-center">Basic Blog Infromation</h1>
          <p className="text-lg">Make Changes to your blogs here. click publish when you are done</p>
          <div className='space-x-2'>
            <Button onClick={()=>togglePublshUnpublish(selectBlog.isPublished ? "false":"true")}>
              {
                selectBlog?.isPublished? "UnPublish" : "Publish"
              }
            </Button>
            <Button onClick={deleteBlog} variant="destructive">Remove blog</Button>

          </div>
          <div className='pt-2'>
            <Label className=" text-xl mb-[5px]">Title</Label>
            <Input type="text"
             placeholder="Enter a title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="dark:border-gray-300" />
          </div>
          <div className='pt-2'>
            <Label className=" text-xl mb-[5px]">Subtitle</Label>
            <Input type="text"
             placeholder="Enter a subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
               className="dark:border-gray-300" />
          </div>
          <div className='pt-2'>
            <Label className="text-xl mb-[5px]">Description</Label>
            <JoditEditor
              ref={editor}
              className="jodit_toolbar"
              value={blogData.description}
              onChange={newContent => setContent(newContent)}

            />
          </div>
          <div>
            <Label className="mb-[5px] text-xl">Category</Label>
            <Select onValueChange={selectCategory} className="dark:border-gray-700">
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
          <div>
            <Label className="mb-[5px] text-xl">
              Thumbnail</Label>
            <Input
              type="file"
              id="file"
              onChange={selectThumbnail}
              accepts="image/*"
              className="w-fit dark:border-gray-300"
            />
            {
              previewthumbnail && (
                <img src={previewthumbnail} className='w-64 my-2' alt='Blog Thumbnail'/>
              )
            }
          </div>
          <div className="flex gap-10">
            <Button className="bg-gray-500" onClick={() => navigate(-1)}>Back</Button>
            <Button className="bg-green-700" onClick={updateBlogHandler}>
             {
              loading ? <><Loader2 className='mr-2 h4 animate-spin'/>please wait..</>: "Save"
             } 

            </Button>

          </div>
        </Card>

      </div>
    </div>
  )
}

export default UpdateBlog





// import React, { useRef, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import JoditEditor from 'jodit-react'
// import 'jodit/es2015/jodit.min.css'

// const UpdateBlog = () => {
//   const editor = useRef(null)
//   const [title, setTitle] = useState('')
//   const [subtitle, setSubtitle] = useState('')
//   const [content, setContent] = useState('')

//   const handlePublish = () => {
//     const blogContent = editor.current?.value
//     console.log({
//       title,
//       subtitle,
//       content: blogContent
//     })
//     alert('Blog published! Check console for content.')
//     setContent(blogContent)
//   }

//   const handleRemove = () => {
//     setTitle('')
//     setSubtitle('')
//     setContent('')
//     if (editor.current) editor.current.value = ''
//     alert('Blog removed!')
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-20 ml-50">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">

//           {/* Header */}
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//               Update Blog
//             </h1>
//             <p className="text-gray-500 dark:text-gray-300">
//               Make changes to your blog here. Click <span className="font-semibold">Publish</span> when you are done.
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4">
//             <Button onClick={handlePublish} className="px-6 py-2">
//               Publish
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleRemove}
//               className="px-6 py-2"
//             >
//               Remove Blog
//             </Button>
//           </div>

//           {/* Title Input */}
//           <div className="space-y-2">
//             <Label className="text-gray-700 dark:text-gray-200 font-medium">Title</Label>
//             <Input
//               type="text"
//               placeholder="Enter a title"
//               name="title"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Subtitle Input */}
//           <div className="space-y-2">
//             <Label className="text-gray-700 dark:text-gray-200 font-medium">Subtitle</Label>
//             <Input
//               type="text"
//               placeholder="Enter a subtitle"
//               name="subtitle"
//               value={subtitle}
//               onChange={e => setSubtitle(e.target.value)}
//               className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Description / Editor */}
//           <div className="space-y-2">
//             <Label className="text-gray-700 dark:text-gray-200 font-medium">Description</Label>
//             <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
//               <JoditEditor
//                 ref={editor}
//                 config={{
//                   readonly: false,
//                   height: 400,
//                   theme: 'default',
//                   placeholder: 'Write your blog content here...',
//                   style: {
//                     color: '#000', // text visible
//                     backgroundColor: '#fff'
//                   }
//                 }}
//                 onBlur={() => setContent(editor.current.value)}
//               />
//             </div>
//           </div>

//         </Card>
//       </div>
//     </div>
//   )
// }

// export default UpdateBlog

