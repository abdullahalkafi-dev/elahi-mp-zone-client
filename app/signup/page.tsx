"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import image from "../../public/user.jpg.jpg";
import GoogleLogin from "@/components/googleLogin/googleLogin";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useUserEmailSignUpMutation } from "@/redux/api/features/users/userApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [signUpWithEmail] = useUserEmailSignUpMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !selectedImage
    ) {
      alert("All fields are required!");
      return;
    }
    const image = await uploadToCloudinary(selectedImage, "image");

    const userData = {
      ...formData,
      image,
    };
    const createUserRes: any = await signUpWithEmail(userData);

    if (createUserRes?.data?.success === true) {
      toast.success("User created successfully");
      setFormData({ name: "", email: "", password: "" });
      router.push("/login");
    }
    console.log(createUserRes);
    if (createUserRes?.error?.data?.success === false) {
      toast.error(createUserRes.error.data.message);
    }
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
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-black"
                >
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
                <label className="block text-sm font-medium mb-2 text-black">
                  Upload your photo
                </label>
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-black"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-black"
                >
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
                    {passwordVisible ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
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
                <span className="mx-4 text-sm text-gray-500">
                  Or Continue With
                </span>
                <div className="border-t border-gray-200 flex-grow"></div>
              </div>

              <GoogleLogin />
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
