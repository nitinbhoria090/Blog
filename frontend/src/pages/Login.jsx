



import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `https://blog-2-zfmp.onrender.com/api/v1/user/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 px-4">

      {/* 🔥 Background blobs (same as PopularAuthor) */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-300/40 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-gray-400/40 dark:bg-gray-500/20 rounded-full blur-3xl"></div>

      {/* 🔳 Grid overlay */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),
        linear-gradient(to_bottom,#000_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),
        linear-gradient(to_bottom,#fff_1px,transparent_1px)]
        bg-[size:40px_40px]"></div>

      {/* 🔥 Login Card */}
      <Card className="relative w-full max-w-md bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-6">

        <CardContent>

          {/* 🔹 Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold">
              Welcome{" "}
              <span className="bg-gradient-to-r from-orange-500 to-gray-700 dark:from-orange-400 dark:to-gray-300 bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Login to continue your journey 🚀
            </p>
          </div>

          {/* 🔹 Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={input.email}
                onChange={handleChange}
                className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={input.password}
                onChange={handleChange}
                className="bg-white/80 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
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

            {/* 🔹 Button */}
            <Button className="w-full font-semibold bg-orange-500 hover:bg-orange-600 text-white">
              {
                loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : "Login"
              }
            </Button>

            {/* 🔹 Footer */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold underline underline-offset-4 hover:opacity-80"
              >
                Sign up
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;

