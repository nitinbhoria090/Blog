// import React, { useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
// import Logo from "../assets/logo.png"
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
// import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useDispatch, useSelector } from 'react-redux'
// import store from '../redux/store'
// import { toggleTheme } from '../redux/themeSlice'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { setUser } from '../redux/authSlice'
// import { LiaCommentDollarSolid, LiaCommentsSolid } from "react-icons/lia";
// import userLogo from "../assets/user.jpg"
// import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
// import {
//   DropdownMenuGroup,
//   DropdownMenuLabel,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import ResponsiveMenu from './ResponsiveMenu'

// const Navbar = () => {

//   const { user } = useSelector(store => store.auth)
//   const { theme } = useSelector(store => store.theme)
//   const [searchTerm, setSeachTerm] = useState("")
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [openNav, setOpenNav] = useState(false)
//   const toggleNav = ()=>{
//     setOpenNav(!openNav)
//   }

//   const handleSeach = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim() !== "") {
//       navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
//       setSeachTerm("")
//     }

//   }

//   const logoutHandler = async (e) => {
//     try {
//       const res = await axios.get(`https://blog-2-zfmp.onrender.com/api/v1/user/logout`, { withCredentials: true })
//       if (res.data.success) {
//         navigate('/')
//         dispatch(setUser(null))
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error)
//     }
//   }

//   return (
//     <div className='py2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
//       <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-14'>
//         {/* logo section */}
//         <div className='flex gap-7 items-center'>
//           <Link to={'/'}>
//             <div className='flex gap-2 items-center'>
//               <img src={Logo} alt="" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
//               <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
//             </div>
//           </Link>
//           {/* <div className='relative hidden md:block'>
//             <Input
//               type="text"
//               placeholder="Search.."
//               value={searchTerm}
//               onChange={(e) => setSeachTerm(e.target.value)}
//               className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-300px hidden md:block"

//             />
//             <Button onClick={handelSeach} className="absolute right-0 top-0"><Search /></Button>
//           </div> */}
//           <div className='relative hidden md:block'>
//             <Input
//               type="text"
//               placeholder="Search.."
//               value={searchTerm}
//               onChange={(e) => setSeachTerm(e.target.value)}
//               className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] pr-10"
//             />

//             <Button
//               type="button"
//               onClick={handleSeach}
//               className="absolute right-0 top-0 h-full"
//             >
//               <Search />
//             </Button>
//           </div>
//         </div>
//         {/* Nav section */}

//         <nav className='flex md:gap-7 gap-4 items-center'>
//           <ul className='hidden md:flex gap-7 items-center text-x1 font-semibold'>
//             <Link to={'/'} ><li>Home</li></Link>
//             <Link to={'/blogs'}><li>Blogs</li></Link>
//             <Link to={'/about'}><li>About</li></Link>
            

//           </ul>
//           <div className='flex'>
//             <Button onClick={() => dispatch(toggleTheme())}>
//               {
//                 theme === 'light' ? <FaMoon /> : <FaSun />
//               }
//             </Button>
//             {
//               user ? <div className='ml-7 flex gap-3 items-center'>


//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Avatar>
//                       <AvatarImage src={user.photoUrl || userLogo} />
//                       <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56" align="start">
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuGroup>
//                       <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
//                         <User />
//                         Profile
//                         <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => navigate('/dashboard/blogs')}>
//                         <ChartColumnBig />
//                         Your Blog
//                         <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
//                         <LiaCommentsSolid />
//                         Comments
//                         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => navigate('/dashboard/create-blog')}>
//                         <FaRegEdit />
//                         Write Blogs
//                         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                       </DropdownMenuItem>

//                     </DropdownMenuGroup>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuItem>
//                       <LogOut />
//                       Log out
//                       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//                 <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>

//               </div> : <div className='ml-7 md:flex gap-2'>
//                 <Link to={'/login'}><Button>Login</Button></Link>
//                 <Link className='hidden md:block' to={'/signup'}><Button>Signup</Button></Link>

//               </div>
//             }
//           </div>
//           {
//             openNav ? <HiMenuAlt3  onClick={toggleNav} className='w-7 h-7 md:hidden'/> : <HiMenuAlt1 className='w-7 h-7 md:hidden' onClick={toggleNav}/>
//           }
//         </nav>
//         <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler}/>
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/themeSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '../redux/authSlice'
import { LiaCommentsSolid } from "react-icons/lia";
import userLogo from "../assets/user.jpg"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";

import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import ResponsiveMenu from './ResponsiveMenu'

const Navbar = () => {

  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const [searchTerm, setSeachTerm] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false)

  const toggleNav = () => setOpenNav(!openNav)

  const handleSeach = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSeachTerm("")
    }
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`https://blog-2-zfmp.onrender.com/api/v1/api/v1/user/logout`, { withCredentials: true })
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Logout failed")
    }
  }

  return (
    <div className="fixed top-0 w-full z-50 bg-[#0B1120] border-b border-gray-800">
      
      {/* 🔥 Gradient Glow Effect */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-orange-600/30 to-transparent blur-2xl"></div>

      <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-3 relative'>

        {/* 🔹 Logo + Search */}
        <div className='flex gap-8 items-center'>
          <Link to={'/'}>
            <div className='flex gap-2 items-center'>
              <img src={Logo} alt="logo" className='w-8 h-8 md:w-10 md:h-10' />
              <h1 className='font-bold text-2xl md:text-3xl text-white'>
                Logo<span className='text-orange-500'>.</span>
              </h1>
            </div>
          </Link>

          {/* 🔍 Search */}
          <div className='relative hidden md:block'>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSeachTerm(e.target.value)}
              className="bg-[#111827] border border-gray-700 text-white w-[280px] rounded-full pr-10 focus:ring-1 focus:ring-orange-500"
            />

            <Button
              type="button"
              onClick={handleSeach}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full p-2"
            >
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* 🔹 Nav Links + Actions */}
        <nav className='flex items-center gap-4 md:gap-6'>

          {/* Links */}
          <ul className='hidden md:flex gap-8 items-center text-white font-medium'>
            <Link to='/'><li className='hover:text-orange-500 cursor-pointer'>Home</li></Link>
            <Link to='/blogs'><li className='hover:text-orange-500 cursor-pointer'>Blogs</li></Link>
            <Link to='/about'><li className='hover:text-orange-500 cursor-pointer'>About</li></Link>
          </ul>

          {/* Theme Toggle */}
          <Button
            onClick={() => dispatch(toggleTheme())}
            className="bg-[#111827] border border-gray-700 hover:bg-gray-800 text-white"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>

          {/* User Section */}
          {
            user ? (
              <div className='ml-4 flex gap-3 items-center'>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.photoUrl || userLogo} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 bg-[#111827] text-white border-gray-700">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                        <User /> Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/blogs')}>
                        <ChartColumnBig /> Your Blog
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                        <LiaCommentsSolid /> Comments
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/create-blog')}>
                        <FaRegEdit /> Write Blogs
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            ) : (
              <div className='ml-4 hidden md:flex gap-2'>
                <Link to='/login'>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Login</Button>
                </Link>
                <Link to='/signup'>
                  <Button variant="outline" className="border-gray-600 text-white">Signup</Button>
                </Link>
              </div>
            )
          }

          {/* Mobile Menu Icon */}
          {
            openNav
              ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden text-white cursor-pointer' />
              : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden text-white cursor-pointer' />
          }
        </nav>

        {/* Mobile Menu */}
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler} />
      </div>
    </div>
  )
}

export default Navbar