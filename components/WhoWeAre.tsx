import Image from "next/image";
import { Truck, Globe, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import payment from "../public/payment.jpg";
import delivary from "../public/delivary.jpg";
import design from "../public/-design-t-shirt.jpg";
import logo1 from "../public/bikash.webp";
import logo2 from "../public/unnamed (1).png";
import logo3 from "../public/roket.webp";
import logo4 from "../public/upai.png";
const WhoWeAre = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 max-w-7xl mt-52 text-black-100">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-[#00CDFE] font-medium uppercase tracking-wide mb-4">
            WHO WE ARE
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Creative Branding Experts And Customer-Centric Approach
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We specialize in high-quality customized printing solutions to help
            businesses and individuals make a lasting impression. Your
            satisfaction is our priority! We focus on delivering professional,
            reliable, and affordable branding services tailored to your needs.
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">
              All Payment Methods Accepted
            </h2>
            <p className="text-gray-600 mb-6">
              Enjoy a seamless shopping experience with flexible payment
              options, including cash, cards, mobile banking, and online
              transfers. Pay with ease using your preferred method, ensuring a
              smooth and hassle-free transaction every time.
            </p>
            <div className="mb-6">
              <Image
                src={payment}
                alt="payment image"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <Image
                src={logo1}
                alt="bikash logo"
                width={70}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src={logo2}
                alt="nogod logo"
                width={70}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src={logo3}
                alt="roket logo"
                width={70}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src={logo4}
                alt="upai logo"
                width={100}
                height={50}
                className="h-8 w-auto"
              />
            </div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative w-full h-full">
              <Image
                src={design}
                alt="Person working in a print shop"
                width={500}
                height={300}
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-0 w-full flex justify-center">
                <Button className="bg-[#00CDFE] hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full">
                  Start Fulfillment
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-600 mb-6">
              Get your orders delivered on time with care and precision,
              ensuring top-quality products at your doorstep. We prioritize
              quick turnaround times and safe packaging so your branded items
              arrive in perfect condition, every time.
            </p>
            <div className="mb-6">
              <Image
                src={delivary}
                alt="Person packaging products"
                width={400}
                height={300}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="border border-[#00CDFE] rounded-full p-3">
                <ShieldCheck className="h-6 w-6 text-[#00CDFE]" />
              </div>
              <div className="border border-[#00CDFE] rounded-full p-3">
                <Truck className="h-6 w-6 text-[#00CDFE]" />
              </div>
              <div className="border border-[#00CDFE] rounded-full p-3">
                <Globe className="h-6 w-6 text-[#00CDFE]" />
              </div>
              <div className="border border-[#00CDFE] rounded-full p-3">
                <HeadphonesIcon className="h-6 w-6 text-[#00CDFE]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
