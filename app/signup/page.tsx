"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import image from "../../public/user.jpg.jpg"
import GoogleLogin from "@/components/googleLogin/googleLogin";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen flex items-center justify-center bg-purple-50 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 w-[600px] h-[600px] border border-[#00CDFE] rounded-full opacity-30"></div>
          <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] border border-[#00CDFE] rounded-full opacity-30"></div>
          <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] border border-[#00CDFE] rounded-full opacity-30"></div>
        </div>

        {/* Sign Up Card */}
        <div className="w-full max-w-5xl h-[800px] bg-white rounded-3xl shadow-lg flex overflow-hidden relative z-10">
          {/* Left Side - Form */}
          <div className="w-1/2 p-12 flex flex-col">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-[#00CDFE]">Sign Up</h1>
              <p className="text-gray-500 mt-2">Join our website</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Upload your photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full text-[#00CDFE]"
                  onChange={handleFileChange}
                />
                {selectedImage && (
                  <div className="mt-2">
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-md border"
                    />
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00CDFE] hover:bg-white hover:border-[#00CDFE] hover:border-2 hover:text-[#00CDFE] text-white py-3 rounded-md transition duration-200"
              >
                Sign Up
              </button>
                  <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 flex-grow"></div>
              <span className="mx-4 text-sm text-gray-500">Or Continue With</span>
              <div className="border-t border-gray-200 flex-grow"></div>
            </div>

            {/* Google Sign-In Button */}
                {/* <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center justify-center py-2.5 border text-gray-500  border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Google
              </button>
             
            </div> */}
<GoogleLogin/>
            {/* Login Redirect */}
            <div className="text-center mt-8 pb-10">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-[#00CDFE] font-medium">
                  Login
                </Link>
              </p>
            </div>
            </form>

            {/* Divider */}
        
          </div>

          {/* Right Side - Image */}
          <div className="w-1/2 bg-gradient-to-br from-purple-400 to-[#00CDFE] flex items-center justify-center">
            <Image
              src={image}
              alt="User"
              width={500}
              height={600}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
