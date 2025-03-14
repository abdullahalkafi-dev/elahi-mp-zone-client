"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";

import Navbar from "@/components/Navbar";
import WhoWeAre from "@/components/WhoWeAre";
import Status from "@/components/status";
import ServicesSection from "@/components/ServicesSection";
import FAQPage from "@/components/FAQPage";
import TestimonialSlider from "@/components/TestimonialSlider";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Status />
      <ServicesSection />
      <TestimonialSlider />
      <FAQPage />
      <Footer />
    </div>
  );
};

export default Home;
