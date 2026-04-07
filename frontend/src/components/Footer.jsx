// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../assets/logo.png'
// import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

// const Footer = () => {
//   return (
//     <footer className='bg-gray-800 text-gray-200 py-10'>
//       <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
//         {/*  info */}
//         <div className='mb-6 md:mb-0'>
//             <Link to='/' className='flex gap-3 items-center'>
//               {/* <img src={Logo} alt="" className='w-32'/> */}
//               <img src={Logo} alt="" className='invert w-12 h-12'/>
//               <h1 className=' text-3xl font-bold'>Logo</h1>
//             </Link>
//             <p className='mt-2'>Sharing insights, tutorials, and ideas on web development and tech.</p>
//             <p className='mt-2 text-sm'>123 Blog St, Style City, NY 10001</p>
//             <p className='text-sm'>Email: support@blog.com</p>
//             <p className='text-sm'>Phone: (123) 456-7890</p>
//         </div>
//         {/* customer service link */}
//         <div className='mb-6 md:mb-0'>
//             <h3 className='text-xl font-semibold'>Quick Links</h3>
//             <ul className='mt-2 text-sm space-y-2'>
//                 <li>Home</li>
//                 <li>Blogs</li>
//                 <li>About Us</li>
//                 {/* <li>Contact Us</li> */}
//                 <li>FAQs</li>
//             </ul>
//         </div>
//         {/* social media links */}
//         <div className='mb-6 md:mb-0'>
//             <h3 className='text-xl font-semibold'>Follow Us</h3>
//             <div className='flex space-x-4 mt-2'>
//                 <FaFacebook/>
//                 <FaInstagram/>
//                 <FaTwitterSquare/>
//                 <FaPinterest/>
//             </div>
//         </div>
//         {/* newsletter subscription */}
//         <div>
//             <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
//             <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
//             <form action="" className='mt-4 flex'>
//                 <input 
//                 type="email" 
//                 placeholder='Your email address'
//                 className='w-full p-2 rounded-l-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
//                 />
//                 <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700'>Subscribe</button>
//             </form>
//         </div>
//       </div>
//       {/* bottom section */}
//       <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
//         <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>Blog</span>. All rights reserved</p>
//       </div>
//     </footer>
//   )
// }

// export default Footer







import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-200 transition-colors duration-300 pt-16 pb-8">

      {/* 🔥 Background Blobs */}
      <div className="absolute -top-24 left-0 w-72 h-72 bg-orange-300/40 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-0 w-72 h-72 bg-gray-400/40 dark:bg-gray-500/20 rounded-full blur-3xl"></div>

      {/* 🔳 Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] 
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),
        linear-gradient(to_bottom,#000_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),
        linear-gradient(to_bottom,#fff_1px,transparent_1px)]
        bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🏷️ Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="" className="w-12 h-12 invert dark:invert-0" />
            <h1 className="text-2xl font-bold">Logo</h1>
          </Link>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
            Sharing insights, tutorials, and ideas on web development and tech.
          </p>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>123 Blog St, Style City</p>
            <p>Email: support@blog.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* 🔗 Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {["Home", "Blogs", "About Us", "FAQs"].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-orange-500 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 🌐 Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-orange-500 hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:text-orange-500 hover:scale-110 transition" />
            <FaTwitterSquare className="cursor-pointer hover:text-orange-500 hover:scale-110 transition" />
            <FaPinterest className="cursor-pointer hover:text-orange-500 hover:scale-110 transition" />
          </div>
        </div>

        {/* 📩 Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay in the Loop</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Subscribe to get latest updates & articles
          </p>

          <form className="flex bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 bg-transparent outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 text-sm transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* ⚡ Bottom */}
      <div className="relative mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-orange-500 font-semibold">Blog</span>. All rights reserved
        </p>
      </div>

    </footer>
  )
}

export default Footer