"use client";

import Image from "next/image";
import logo from "../public/logo-2.png";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNewsLetterMutation } from "@/redux/api/features/newsletter/newsletterApi";
import { toast } from "react-toastify";
const Footer = () => {
  const [joinNewsletter] = useCreateNewsLetterMutation();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const res = await joinNewsletter({ email });

    if (res.data.success) {
      toast.success("You have successfully subscribed to our newsletter");
    }
  };
  return (
    <div>
      <footer className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-6">
        <div className="container mx-auto px-4">
          {/* Newsletter and Social Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00CDFE] to-blue-400 rounded-2xl transform -skew-y-2" />
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <Image
                  src={logo}
                  alt="Wave Design"
                  width={160}
                  height={40}
                  className="mx-auto mb-6"
                />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Join Our Newsletter
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Stay up to date with the latest news, announcements, and
                  articles.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 h-12 px-4 rounded-xl border-gray-200"
                    />
                    <Button className="h-12 px-8 bg-[#00CDFE] hover:bg-[#00cbfea1] text-white rounded-xl font-medium">
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>

                {/* Social Media Links */}
                <div className="mt-10">
                  <div className="flex justify-center gap-4">
                    {[
                      { icon: Facebook, label: "Facebook" },
                      { icon: Twitter, label: "Twitter" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Instagram, label: "Instagram" },
                      { icon: Youtube, label: "YouTube" },
                    ].map((social) => (
                      <Link
                        key={social.label}
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[#00CDFE] transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mt-20 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Us
              </h4>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    lines: ["Jalan Cempaka Wangi No 22", "Jakarta - Indonesia"],
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    lines: ["support@yourdomain.tid", "hello@yourdomain.tid"],
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    lines: ["+6221.2002.2012", "+6221.2002.2013"],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00CDFE]" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">
                        {item.title}
                      </h5>
                      {item.lines.map((line) => (
                        <p key={line} className="text-gray-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {[
              {
                title: "Company",
                links: [
                  "About Us",
                  "Contact",
                  "News & Article",
                  "FAQ",
                  "Legal Notice",
                ],
              },
              {
                title: "Collection",
                links: [
                  "Design Modern",
                  "Design Hiphop",
                  "Design Pop Culture",
                  "Design Rock & Roll",
                  "Design Patterns",
                ],
              },
              {
                title: "Services",
                links: [
                  "Screen Printing",
                  "Embroidery",
                  "Digital Printing",
                  "Tackle Twill",
                  "All Services",
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold text-gray-900 mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-[#00CDFE] flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">
                © 2024 WaveDesign. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6">
                {["Terms", "Privacy", "Cookies"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-gray-600 hover:text-[#00CDFE] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
