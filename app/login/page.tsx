/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import image from "../../public/user.jpg.jpg";
import GoogleLogin from "@/components/googleLogin/googleLogin";
import { useUserLoginMutation } from "@/redux/api/features/users/userApi";
import { toast } from "react-toastify";
import { useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/user.hook";
const Login = () => {
  const [userLogin] = useUserLoginMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user } = useUser();

  if(user){
    window.location.href = "/";
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    const res: any = await userLogin(data);
    console.log(res);
    if (res?.data?.success === true) {
      Cookies.set("accessToken", res.data.data.accessToken);
      Cookies.set("refreshToken", res.data.data.refreshToken);
      e.target.email.value = "";
      e.target.password.value = "";
      window.location.href = "/";
      toast.success("User Login successfully");
    }
    console.log(res);
    if (res?.error?.data?.success === false) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen flex items-center justify-center bg-purple-50 relative overflow-hidden ">
        {/* Background decorative curves */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 w-[600px] h-[600px] border border-[#00CDFE] rounded-full opacity-30"></div>
          <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] border border-[#00CDFE] rounded-full opacity-30"></div>
          <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] border border-[#00CDFE] rounded-full opacity-30"></div>
        </div>
        {/* Main card */}
        <div className="w-full max-w-5xl h-[700px] bg-white rounded-3xl shadow-lg flex overflow-hidden relative z-10 ">
          {/* Left side - Login form */}
          <div className="w-1/2 p-12  flex flex-col">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-[#00CDFE] flex items-center">
                Log In
              </h1>
              <p className="text-gray-500 mt-2">
                Welcome back! Please enter your details
              </p>
            </div>

            <div className="space-y-6 flex-1">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-black"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium my-2 text-black"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button className="w-full mt-5 bg-purple-500 hover:border-[#00CDFE] hover:border-2 hover:text-[#00CDFE] hover:bg-white bg-[#00CDFE] text-white py-3 rounded-md transition duration-200">
                    Log In
                  </button>
                </div>
              </form>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-200 flex-grow"></div>
                <span className="mx-4 text-sm text-gray-500">
                  Or Continue With
                </span>
                <div className="border-t border-gray-200 flex-grow"></div>
              </div>

              <GoogleLogin />
            </div>

            <div className="text-center mt-8 pb-10">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#00CDFE] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Image with gradient */}
          <div className="w-1/2 bg-gradient-to-br from-purple-400 to-[#00CDFE] flex items-center justify-center relative">
            <Image
              src={image}
              alt="Fitness person with headphones"
              width={500}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
