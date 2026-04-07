// // import { ChartColumnBig, SquareUser } from 'lucide-react';
// // import React from 'react'
// // import { FaRegEdit } from 'react-icons/fa';
// // import { LiaCommentSolid } from 'react-icons/lia';
// // import { NavLink } from 'react-router-dom';

// // const Sidebar = () => {
// //   return (
// //    <div className='hidden mt-10 fixed md:block border-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[200px] h-screen z-10'>
// //   <div className='pt-10 px-2 space-y-2'>
// //     <NavLink
// //       to="/dashboard/profile"
// //       className={({ isActive }) =>
// //         `w-full flex items-center gap-2 text-2xl ${
// //           isActive
// //             ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
// //             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //         } font-bold cursor-pointer p-3 rounded-2xl`
// //       }
// //     >
// //       <SquareUser />
// //       <span>Profile</span>
// //     </NavLink>
// //     <NavLink
// //       to="/dashboard/profile"
// //       className={({ isActive }) =>
// //         `w-full flex items-center gap-2 text-2xl ${
// //           isActive
// //             ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
// //             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //         } font-bold cursor-pointer p-3 rounded-2xl`
// //       }
// //     >
// //       <ChartColumnBig />
// //       <span>Your Blogs</span>
// //     </NavLink>
// //     <NavLink
// //       to="/dashboard/profile"
// //       className={({ isActive }) =>
// //         `w-full flex items-center gap-2 text-2xl ${
// //           isActive
// //             ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
// //             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //         } font-bold cursor-pointer p-3 rounded-2xl`
// //       }
// //     >
// //       <LiaCommentSolid />
// //       <span>Comments</span>
// //     </NavLink>
// //     <NavLink
// //       to="/dashboard/profile"
// //       className={({ isActive }) =>
// //         `w-full flex items-center gap-2 text-2xl ${
// //           isActive
// //             ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
// //             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //         } font-bold cursor-pointer p-3 rounded-2xl`
// //       }
// //     >
// //       <FaRegEdit/>
// //       <span>Create Blog</span>
// //     </NavLink>
// //   </div>
// // </div>
// //   )
// // }

// // export default Sidebar;

// import { ChartColumnBig, SquareUser } from 'lucide-react';
// import React from 'react'
// import { FaRegEdit } from 'react-icons/fa';
// import { LiaCommentSolid } from 'react-icons/lia';
// import { NavLink } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className='hidden mt-10 fixed md:block border-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[200px] h-screen z-10'>
//       <div className='pt-10 px-2 space-y-2'>

//         <NavLink
//           to="/dashboard/profile"
//           className={({ isActive }) =>
//             `w-full flex items-center gap-3 text-base ${
//               isActive
//                 ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             } font-semibold cursor-pointer px-4 py-3 rounded-2xl`
//           }
//         >
//           <SquareUser size={20} />
//           <span>Profile</span>
//         </NavLink>

//         <NavLink
//           to="/dashboard/blogs"
//           className={({ isActive }) =>
//             `w-full flex items-center gap-3 text-base ${
//               isActive
//                 ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             } font-semibold cursor-pointer px-4 py-3 rounded-2xl`
//           }
//         >
//           <ChartColumnBig size={20} />
//           <span>Your Blogs</span>
//         </NavLink>

//         <NavLink
//           to="/dashboard/comments"
//           className={({ isActive }) =>
//             `w-full flex items-center gap-3 text-base ${
//               isActive
//                 ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             } font-semibold cursor-pointer px-4 py-3 rounded-2xl`
//           }
//         >
//           <LiaCommentSolid size={20} />
//           <span>Comments</span>
//         </NavLink>

//         <NavLink
//           to="/dashboard/create-blog"
//           className={({ isActive }) =>
//             `w-full flex items-center gap-3 text-base ${
//               isActive
//                 ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             } font-semibold cursor-pointer px-4 py-3 rounded-2xl`
//           }
//         >
//           <FaRegEdit size={18} />
//           <span>Create Blog</span>
//         </NavLink>

//       </div>
//     </div>
//   )
// }

// export default Sidebar;



import { ChartColumnBig, SquareUser } from 'lucide-react';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { LiaCommentSolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col fixed top-10 left-0 h-screen w-[240px] z-20 
      bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl
      border-r border-gray-200 dark:border-gray-700 shadow-lg'>

      
      <div className='px-12 py-6 border-b border-gray-200 dark:border-gray-700'>
        <h1 className='text-xl font-bold'>
          <span className='text-orange-500'>Dash</span>Board
        </h1>
      </div>

     
      <div className='flex-1 px-4 py-6 space-y-3'>

    
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <SquareUser size={18} />
          <span>Profile</span>
        </NavLink>

        
        <NavLink
          to="/dashboard/blogs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <ChartColumnBig size={18} />
          <span>Your Blogs</span>
        </NavLink>

       
        <NavLink
          to="/dashboard/comments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <LiaCommentSolid size={18} />
          <span>Comments</span>
        </NavLink>

       
        <NavLink
          to="/dashboard/create-blog"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <FaRegEdit size={16} />
          <span>Create Blog</span>
        </NavLink>

      </div>

   
      <div className='px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-center text-gray-500'>
        Made with ❤️ by <span className='text-orange-500 font-medium'>Nitin</span>
      </div>

    </div>
  )
}

export default Sidebar
