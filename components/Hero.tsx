"use client";

import { useState, useEffect } from "react";
import { Settings2, Target, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const backgroundImages = [
  "https://library.ucf.edu/wp-content/uploads/sites/5/2024/03/print-zone-banner.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBpWTy_FkO-LwUCf11Cieo3BLUDqS9tkC0tg&s",
  "https://library.ucf.edu/wp-content/uploads/sites/5/2015/04/knowledge-commons-2010.jpg",
];
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="relative h-[710px]">
        {/* Background Image Slider */}
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="relative">
          {/* Hero Content */}
          <div className="container mx-auto px-4 pt-20 pb-32">
            <Card className="max-w-2xl bg-[#00cbfe93] text-white border-none">
              <CardContent className="p-8">
                <p className="text-sm font-medium mb-4">
                  WELCOME TO Moriom Print Zone
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Your Trusted Partner in Creative Branding!
                </h1>
                <p className="text-gray-200 mb-8 max-w-lg">
                  Order Now! Get high-quality customized branding solutions for
                  your business. Moriom Print Zone brings your ideas to life
                  with premium printing services.
                </p>
                <Button
                  size="lg"
                  className="bg-white hover:bg-orange-200 text-[#00CDFE] hover:text-[#00cbfeb6] font-semibold"
                >
                  Get Started Now!
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="container mx-auto px-4 pb-20 border-none">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white ">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Settings2 className="w-6 h-6 text-[#00CDFE]" />
                  </div>
                  <CardTitle className="text-xl mb-3 text-[#00CDFE]">
                    Easy to Create & Customize
                  </CardTitle>
                  <p className="text-gray-600">
                    Designing your branding materials has never been easier.
                    Choose from a variety of customization options to match your
                    vision.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#00CDFE] text-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">
                    Premium Quality Design
                  </CardTitle>
                  <p className="text-blue-50">
                    We use advanced printing technology to ensure sharp details
                    and vibrant colors. Your brand deserves nothing but the
                    best.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Tag className="w-6 h-6 text-[#00CDFE]" />
                  </div>
                  <CardTitle className="text-xl mb-3 text-[#00CDFE]">
                    Competitive Product Pricing
                  </CardTitle>
                  <p className="text-gray-600">
                    Get top-notch printing solutions at budget-friendly rates.
                    High quality doesn’t have to come with a high price!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
