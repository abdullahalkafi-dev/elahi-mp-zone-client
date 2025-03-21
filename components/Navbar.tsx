"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-2.png";
import { useUser } from "@/hooks/user.hook";
import Cookies from "js-cookie";
const Navbar = () => {
  const user = useUser();
  console.log(user.user);
  const handleLogout = () => {
    Cookies.remove("accessToken");

    window.location.href = "/";
  };
  return (
    <div>
      <div>
        <header className="w-full">
          {/* Top Bar */}
          <div className="w-full bg-[#00CDFE] text-white py-2 px-4">
            <div className="container mx-auto flex justify-between items-center text-xs">
              <p className="text-white">
                Design Your Own Tees & Branded Items, Speedy & No-Cost Shipping,
                with Transparent Pricing
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:moriomprintzone@gmail.com"
                  className="hover:text-[#424242] flex items-center gap-1"
                >
                  <span>Help Center</span>
                </a>
                <a
                  href="mailto:moriomprintzone@gmail.com"
                  className="hover:text-[#424242]"
                >
                  moriomprintzone@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="container mx-auto px-4 ">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  alt="Wave Design Logo"
                  width={120}
                  height={10}
                  priority
                />
              </Link>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                <Link href="/" className="text-[#00CDFE] font-medium">
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-[#424242] hover:text-[#00CDFE] font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/all-service"
                  className="text-[#424242] hover:text-[#00CDFE] font-medium"
                >
                  Services
                </Link>

                <Link
                  href="/contact"
                  className="text-[#424242]  hover:text-[#00CDFE] font-medium"
                >
                  Contact Us
                </Link>
              </div>

              {/* Get Started Button */}
              <div className="gap-3 flex">
                {user.user ? (
                  <div className="flex gap-3">
                    <Link
                      href="/dashboard"
                      className="text-white bg-[#00CDFE] px-4 py-2 rounded-md"
                    >
                      <button>Dashboard</button>
                    </Link>
                    <button onClick={handleLogout} className="text-white bg-[#00CDFE] px-4 py-2 rounded-md">
                      Logout
                    </button>

                    <Image
                      src={user.user.image}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="hidden lg:inline-block bg-[#00CDFE] text-white px-6 py-2 rounded-full hover:bg-[#00CDFE] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/get-started"
                      className="hidden lg:inline-block bg-[#00CDFE] text-white px-6 py-2 rounded-full hover:bg-[#00CDFE] transition-colors"
                    >
                      Sign UP
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button className="lg:hidden text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
