// import { useState } from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Label } from "../components/ui/label";
// import { Eye, EyeOff } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";
// import auth from "../assets/auth.jpg"

// const Login = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(input);

//     try {
//       const response = await axios.post(`http://localhost:8000/api/v1/user/login`, input, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       });
//       if (response.data.success) {
//         navigate('/')
//         dispatch(setUser(response.data.user))
//         toast.success(response.data.message)
//       }
//     } catch (error) {
//       console.log(error.response.data.message);

//     }

//   };
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className="flex items-center h-screen md:pt-14 md:h-[760px] ">
//       <div className="hidden md:block">
//         <img src={auth} alt="" className='h-[700px]' />
//       </div>
//       <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
//       <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
//         <CardHeader>
//           <CardTitle className="text-center text-xl font-semibold">Login into your account</CardTitle>
//           <p className='text-gray-600 dark:text-gray-300 mt-2 text-sm font-serif text-center'>Enter your details below to login your account</p>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <Label>Email</Label>
//               <Input type="email"
//                 placeholder="Email Address"
//                 name="email"
//                 value={input.email}
//                 onChange={handleChange}
//                 className="dark:border-gray-600 dark:bg-gray-900"
//               />
//             </div>

//             <div className="relative">
//               <Label>Password</Label>
//               <Input type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password"
//                 name="password"
//                 value={input.password}
//                 onChange={handleChange}
//                 className="dark:border-gray-600 dark:bg-gray-900"
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-9 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <Button type="submit" className="w-full">Login</Button>
//             <p className='text-center text-gray-600 dark:text-gray-300'>Don't have an account? <Link to={'/signup'}><span className='underline cursor-pointer hover:text-gray-800'>Sign up</span></Link></p>
//           </form>
//         </CardContent>
//       </Card>
//       </div>
//     </div>
//   )
// }

// export default Login

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import auth from "../assets/auth.jpg"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(store=>store.auth)
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
     const response = await axios.post(
       `http://localhost:8000/api/v1/user/login`,
        input,{
          headers:{
            "Content-type": "application/json"
          },
          withCredentials: true, 
        },
        // { withCredentials: true }
      )   
      
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      console.log(error);
    }finally{
     dispatch(setLoading(false))
    }
  };

  return (
    // min-h-screen ensures the background covers the whole page
    <div className="flex min-h-screen w-full">
      
      {/* LEFT SIDE: IMAGE (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100">
        <img 
          src={auth} 
          alt="Auth" 
          className='w-full h-full object-cover' 
        />
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className='flex items-center justify-center w-full md:w-1/2 px-4 bg-white dark:bg-gray-900'>
        <Card className="w-full max-w-md p-2 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
            <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm text-center'>
              Welcome back! Please enter your details.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                  required
                />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" className="w-full font-semibold">
                {
                  loading ? (
                    <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                    please a wait...
                    </>
                  ) : ("Login")
                }
              </Button>
              
              <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
                Don't have an account?{" "}
                <Link to='/signup' className='text-black dark:text-white font-semibold underline underline-offset-4 hover:opacity-80'>
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;


