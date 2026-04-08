import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import auth from "../assets/auth.jpg"


const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {

    console.log( e);
    
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
       `https://blog-2-zfmp.onrender.com/api/v1/api/v1/user/register`,
        user,{
          headers:{
            "Content-type": "application/json"
          },
        },
        { withCredentials: true }
      )                                  

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed")
    }
  }

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 px-4">

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

    {/* 🔥 Signup Card */}
    <Card className="relative w-full max-w-md bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-6">

      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-extrabold">
          Create{" "}
          <span className="bg-gradient-to-r from-orange-500 to-gray-700 dark:from-orange-400 dark:to-gray-300 bg-clip-text text-transparent">
            Account
          </span>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          Join us and start your journey 🚀
        </p>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name Fields */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="w-1/2">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />

            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}
          <Button className="w-full font-semibold bg-orange-500 hover:bg-orange-600 text-white">
            Sign Up
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline underline-offset-4 hover:opacity-80"
            >
              Sign in
            </Link>
          </p>

        </form>
      </CardContent>
    </Card>
  </section>
);
}


export default Signup
