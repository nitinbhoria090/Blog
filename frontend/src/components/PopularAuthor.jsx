
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userLogo from "../assets/user.jpg"

const PopularAuthor = () => {
    const [populerUser, setPopularUser] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get(`https://blog-2-zfmp.onrender.com/api/v1/user/all-users`)
            if (res.data.success) {
                setPopularUser(res.data.users)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <section className="relative overflow-hidden bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 py-20">

            {/* 🔥 Background blobs */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-300/40 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-gray-400/40 dark:bg-gray-500/20 rounded-full blur-3xl"></div>

            {/* 🔳 Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] 
                bg-[linear-gradient(to_right,#000_1px,transparent_1px),
                linear-gradient(to_bottom,#000_1px,transparent_1px)]
                dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),
                linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                bg-[size:40px_40px]"></div>

            <div className="relative max-w-7xl mx-auto px-4">

                {/* 🔥 Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        Popular{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-gray-700 dark:from-orange-400 dark:to-gray-300 bg-clip-text text-transparent">
                            Authors
                        </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">
                        Meet the top contributors sharing amazing content
                    </p>
                </div>

                {/* 👤 Authors */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">

                    {
                        populerUser?.slice(0, 3)?.map((user, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
                            >

                                {/* Avatar */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-xl"></div>
                                    <img
                                        src={user.photoUrl || userLogo}
                                        alt=""
                                        className="relative h-20 w-20 md:h-28 md:w-28 rounded-full object-cover border-4 border-white dark:border-gray-800"
                                    />
                                </div>

                                {/* Name */}
                                <p className="font-semibold text-lg text-center">
                                    {user.firstName} {user.lastName}
                                </p>

                                {/* Optional tag */}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Content Creator
                                </span>

                            </div>
                        ))
                    }

                </div>

            </div>
        </section>
    )
}

export default PopularAuthor