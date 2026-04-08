



import React from "react";
import heroImg from "../assets/blog2.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-100 text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">


      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-300/40 dark:bg-orange-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-gray-400/40 dark:bg-gray-500/20 blur-3xl"></div>


      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

       
        <div className="max-w-2xl text-center md:text-left">

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            Explore the{" "}
            <span className="bg-gradient-to-r from-orange-500 to-gray-700 dark:from-orange-400 dark:to-gray-300 bg-clip-text text-transparent">
              Latest Tech
            </span>{" "}
            & Web Trends
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8">
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and emerging technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <Link to="/dashboard/create-blog">
              <Button className="px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition transform hover:scale-105">
                Get Started
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 transition"
              >
                Learn More
              </Button>
            </Link>

          </div>
        </div>

        <div className="flex justify-center relative">

          
          <div className="absolute inset-0 bg-orange-400/30 dark:bg-orange-500/20 rounded-full blur-3xl scale-75"></div>

          <img
            src={heroImg}
            alt="Hero"
            className="relative w-[260px] md:w-[420px] rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;