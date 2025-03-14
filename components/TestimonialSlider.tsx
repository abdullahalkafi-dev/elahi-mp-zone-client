"use client";
import image1 from "../public/gfsg.jpg";
import image2 from "../public/1.jpg";
import image3 from "../public/2.jpg";
import image4 from "../public/3.jpg";
import image5 from "../public/4.jpg";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Sample testimonial data - each pair represents what's shown at once
const testimonialPairs = [
  [
    {
      id: 1,
      name: "Ahmed Rahman",
      location: "Dhaka",
      image: image2,
      text: "Moriom Print Zone has been our go-to partner for all our branding needs. Their high-quality customized products have helped our business stand out. Whether it's custom mugs, T-shirts, or corporate gifts, their team always delivers on time and with exceptional quality. Highly recommend them!",
    },
    {
      id: 2,
      name: "Sabrina Sultana",
      location: "Chittagong",
      image: image3,
      text: "As a startup business owner, I needed professional printing services, and Moriom Print Zone exceeded my expectations. They worked with me on every design detail and helped create unique promotional items. Their customer service is fantastic, and the final products were perfect!",
    },
  ],
  [
    {
      id: 3,
      name: "Rezaul Karim",
      location: "Rajshahi",
      image: image4,
      text: "Moriom Print Zone offers outstanding quality and service. We ordered custom-designed T-shirts for a company event, and the result was amazing. The prints were vibrant, and the fabric quality was top-notch. The team was incredibly professional throughout the entire process.",
    },
    {
      id: 4,
      name: "Mahiya Sultana",
      location: "Sylhet",
      image: image5,
      text: "We’ve been working with Moriom Print Zone for years, and they never disappoint. From custom diaries to branded pens, every product we’ve ordered has been delivered on time and with premium quality. If you need reliable printing and branding services, Moriom Print Zone is the best in the business!",
    },
  ],
];

export default function TestimonialSlider() {
  const [currentPair, setCurrentPair] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentPair(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentPair((prev) =>
          prev === testimonialPairs.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change slides every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <div className="w-full bg-[#f5f9ff] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Featured Image - Left Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative rounded-lg overflow-hidden max-w-md">
              <Image
                src={image1}
                alt="Client testimonial featured image"
                width={500}
                height={600}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Testimonial Content - Right Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h3 className="text-[#00CDFE] font-medium uppercase tracking-wide mb-2">
                TESTIMONIAL
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Client Feedback
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg">
                Neque scelerisque fames suscipit phasellus suspendisse eget
                nullam ligula cubilia mus proin
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialPairs[currentPair].map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white p-6 rounded-lg shadow-sm transition-opacity duration-500"
                  >
                    <div className="flex flex-col">
                      <div className="flex-shrink-0 mb-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={10}
                          className="rounded border-[#00CDFE] border-2 w-50 h-30 "
                        />
                      </div>
                      <div>
                        <p className="text-[#424242] text-sm mb-4">
                          {testimonial.text}
                        </p>
                        <div className="mt-4 text-center">
                          <p className="font-semibold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonialPairs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      // Reset auto-play timer when manually navigating
                      if (autoPlayRef.current) {
                        clearInterval(autoPlayRef.current);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPair ? "w-4 bg-[#3b82f6]" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
