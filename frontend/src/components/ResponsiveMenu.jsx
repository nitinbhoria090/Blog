

import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {

  const { user } = useSelector(store => store.auth)

  const handleLogout = () => {
    logoutHandler()
    setOpenNav(false)
  }

  return (
    <>
  
      {openNav && (
        <div
          onClick={() => setOpenNav(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 md:hidden"
        />
      )}

      {/* 📱 Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 h-screen w-[75%] max-w-xs 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
        border-r border-gray-200 dark:border-gray-700
        px-6 pt-16 pb-6 flex flex-col justify-between
        transform transition-transform duration-300
        ${openNav ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* 🔥 Top */}
        <div>

          {/* 👤 User */}
          <div className='flex items-center gap-3 mb-10'>
            {
              user ? (
                <Avatar className="w-14 h-14 ring-2 ring-orange-400/30">
                  <AvatarImage src={user.photoUrl} />
                </Avatar>
              ) : (
                <FaUserCircle size={50} />
              )
            }

            <div>
              <h1 className='font-semibold'>
                Hello, {user?.firstName || "User"}
              </h1>
              <p className='text-xs text-gray-500'>Welcome back 👋</p>
            </div>
          </div>

          {/* 🔗 Navigation */}
          <nav>
            <ul className='flex flex-col gap-6 text-lg font-medium'>

              <Link to="/" onClick={() => setOpenNav(false)}>
                <li className='hover:text-orange-500 transition cursor-pointer'>
                  Home
                </li>
              </Link>

              <Link to="/blogs" onClick={() => setOpenNav(false)}>
                <li className='hover:text-orange-500 transition cursor-pointer'>
                  Blogs
                </li>
              </Link>

              <Link to="/about" onClick={() => setOpenNav(false)}>
                <li className='hover:text-orange-500 transition cursor-pointer'>
                  About
                </li>
              </Link>

            </ul>
          </nav>

          {/* 🔘 Auth Button */}
          <div className="mt-10">
            {
              user ? (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/signup" onClick={() => setOpenNav(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              )
            }
          </div>

        </div>

        {/* ❤️ Footer */}
        <div className='text-center text-xs text-gray-500'>
          Made with ❤️ by <span className="text-orange-500 font-medium">Nitin</span>
        </div>

      </div>
    </>
  )
}

export default ResponsiveMenu