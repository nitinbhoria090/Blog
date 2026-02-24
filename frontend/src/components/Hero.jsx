// import React from 'react'
// import heroImg from "../assets/blog2.png"
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'

// const Hero = () => {
//   return (
//     <div className='px-4 md:px-0 '>
//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center h-600px my-10 md:my-0'>
//         {/* text section */}
//         <div className="max-w-2xl">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4 ">Explore the Latest Tech & Web Trends</h1>
//         <p className="text-lg md:text-xl opacity-80 mb-6 ">
//           Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and tech innovations.
//         </p>
//         <div className="flex space-x-4">
//           <Link to={"/dashboard/write-blog"}><Button className="text-lg ">Get Started</Button></Link>
//           <Link to={"/about"}><Button variant="outline" className="border-white px-6 py-3 text-lg">Learn More</Button></Link>
//         </div>
//       </div>
//         {/* image section */}
//         <div className=' flex items-center justify-center '>
//             <img src={heroImg} alt="" className='md:h-550px md:w-550px'/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero
import React from "react";
import heroImg from "../assets/blog2.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // Light mode mein 'bg-slate-50' (Smoke White) aur dark mode mein 'dark:bg-black'
    <section className="  relative overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      
      {/* Dynamic Glows - Light mode mein halka gray, Dark mode mein colors */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-slate-200/50 dark:bg-purple-600/20 blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-gray-200/50 dark:bg-blue-600/20 blur-3xl"></div>

      {/* <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-14"> */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-10">

        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white mb-4">
            Explore the{" "}
            {/* Gradient change based on theme */}
            <span className="bg-gradient-to-r from-slate-600 to-slate-400 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Latest Tech
            </span>{" "}
            & Web Trends
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 mb-8 font-medium">
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and emerging technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/dashboard/write-blog">
              <Button className="px-8 py-6 text-lg bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition shadow-lg">
                Get Started
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="flex justify-center relative">
          {/* Decorative circle behind image (Only visible in light mode for depth) */}
          <div className="absolute inset-0 bg-slate-200 dark:bg-transparent rounded-full blur-3xl opacity-40 transform scale-75"></div>
          
          <img
            src={heroImg}
            alt="Hero"
            className="relative w-[260px] md:w-[420px] drop-shadow-2xl dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;