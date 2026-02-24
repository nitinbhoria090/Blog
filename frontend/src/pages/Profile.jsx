import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Card } from '../components/ui/card'
import React, { useState } from 'react'
import UserLogo from "../assets/user.jpg"
import { Loader2, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
// import { Label } from '@radix-ui/react-dropdown-menu'


import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'



const Profile = () => {
  const [open, setOpen] = useState(false)
  const { user,loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    github: user?.github,
    linkedin: user?.linkedin,
    instagram: user?.instagram,
    file: user?.photoUrl
  })

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("firstName", input.firstName)
    formData.append("lastName", input.lastName)
    formData.append("facebook", input.facebook)
    formData.append("bio", input.bio)
    formData.append("instagram", input.instagram)
    formData.append("github", input.github)
    formData.append("occupation", input.occupation)
    formData.append("linkedin", input.linkedin)
    if (input?.file) {
      formData.append("file", input?.file)
    }

    console.log(input);
    try {
      dispatch(setLoading(true));
      console.log(formData);
      // const res = axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
      //   withCredentials: true
      // });

      const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
        withCredentials: true,
      });

      if (res.data.success) {
        setOpen(false)
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }

    } catch (error) {
      console.log(error);

    } finally {
      dispatch(setLoading(false))
    }

  }

  return (
    <div className='pt-10 md:ml-80  md:h-screen'>
      {/* md:ml-[320px] */}
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className='flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0'>
          {/* image section */}
          {/* <div className='flex flex-col items-center  justify-center md:w-[400px]'>
            <Avatar className='w-40 h-40 border-2'>
              <AvatarImage src={user.photoUrl || UserLogo} />
            </Avatar>
            <h1 className='text-center font-semibold text-x1 text-gray-700 dark:text-gray-300 my-3'>{user.occupation || "Mern Stack Developer"}</h1>
            <div className='flex gap-4 items-center'>
              <Link><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-100' /></Link>
              <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-100' /></Link>
              <Link><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-100' /></Link>
              <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-100' /></Link>
            </div>

          </div> */}
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2 rounded-full overflow-hidden">
              <AvatarImage
                src={user?.photoUrl || UserLogo}
                alt="User profile photo"
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="text-3xl font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "MERN Stack Developer"}
            </h1>

            <div className="flex gap-4 items-center">
              <Link to="#"><FaFacebook className="w-6 h-6" /></Link>
              <Link to="#"><FaLinkedin className="w-6 h-6" /></Link>
              <Link to="#"><FaGithub className="w-6 h-6" /></Link>
              <Link to="#"><FaInstagram className="w-6 h-6" /></Link>
            </div>
          </div>

          {/* info section */}
          <div >
            <h1 className='font-bold text-center md:text-start text-4xl mb-7'>welcome {user.firstName || "User"}!</h1>
            <p><span className='font-semibold'>Email : </span> {user.email}</p>
            <div className='flex flex-col gap-2 items-start justify-start my-5'>
              <Label>About Me</Label>
              <p className='border dark:border-gray-600 p-6 rounded-lg'>{user.bio || "lorem ipsum is a placeholder text used in graphic design, web development, and publishing to fill space where real content will eventually go"}</p>

            </div>

            {/* <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">Edit profile</DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here. Click save when you&apos;re
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="name" className="text-right mb-1">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        // value={input.firstName}
                        // onChange={changeEventHandler}
                        placeholder="First Name"
                        type="text"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="name" className="text-right mb-1">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="last Name" type="text" className="col-span-3 text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-right mb-1">Instagram</Label>
                      <Input id="lastName" name="lastName" placeholder="Enter a url"
                        className="col-span-3 text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-right mb-1">Github</Label>
                      <Input id="github" name="github" placeholder="Enter a url"
                        className="col-span-3 text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-right mb-1">Linkedin</Label>
                      <Input id="linkedin" name="linkedin" placeholder="Enter a url"
                        className="col-span-3 text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-right mb-1" >Facebook</Label>
                      <Input id="facebbok" name="facebook" placeholder="Enter a url"
                        className="col-span-3 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-right mb-1">Description</Label>
                    <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Enter a Description"
                    className="col-span-3 text-gray-500 "
                    />
                  </div>
                  <div>
                    <Label className="text-right mb-1">Picture</Label>
                    <Input
                    id="file"
                    type="file"
                    accept = "image/*"
                    className="w-[277px]"
                    
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog> */}
            <Dialog open={open} onOpenChange={setOpen}>
              
                <Button onClick={()=>setOpen(true)}>Edit Profile</Button>
              

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit profile</DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>

                {/* ✅ form moved INSIDE DialogContent */}
                <form>
                  <div className="grid grid-cols-2 gap-4 py-4">

                    {/* First Name */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        className="text-gray-500"
                        value={input.firstName}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                        className="text-gray-500"
                        value={input.lastName}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Instagram */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        placeholder="Enter a url"
                        className="text-gray-500"
                        value={input.instagram}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Github */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="github">Github</Label>
                      <Input
                        id="github"
                        name="github"
                        placeholder="Enter a url"
                        className="text-gray-500"
                        value={input.github}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Linkedin */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="linkedin">Linkedin</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="Enter a url"
                        className="text-gray-500"
                        value={input.linkedin}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Facebook (typo fixed) */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        placeholder="Enter a url"
                        className="text-gray-500"
                        value={input.facebook}
                        onChange={changeEventHandler}
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <Label htmlFor="bio">Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Enter a Description"
                      className="text-gray-500"
                      value={input.bio}
                      onChange={changeEventHandler}
                    />
                  </div>

                  {/* Image */}
                  <div className="mb-4">
                    <Label htmlFor="file">Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="w-[277px]"
                      onChange={changeFileHandler}
                    />
                  </div>

                  <DialogFooter>
                    <Button onClick={submitHandler} type="submit">
                      {
                                        loading ? (
                                          <>
                                          <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                                          please a wait...
                                          </>
                                        ) : ("Save Changes")
                                      }
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>

        </Card>
      </div>
    </div>
  )
}

export default Profile



















