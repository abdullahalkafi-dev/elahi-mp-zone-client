"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

// Custom hook for counting animation
const useCounter = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    countRef.current = start;
    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);

      countRef.current = value;
      setCount(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration, isAnimating]);

  return { count, setIsAnimating };
};

// Format number with "K" for thousands
const formatNumber = (num, suffix = "") => {
  return num >= 1000
    ? `${(num / 1000).toFixed(0)}K${suffix}`
    : `${num}${suffix}`;
};

const Status = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const counters = {
    main: useCounter(3216, 0, 2500),
    products: useCounter(14000, 0, 2000),
    collections: useCounter(550, 0, 2000),
    years: useCounter(15, 0, 1500),
  };

  useEffect(() => {
    if (inView) {
      Object.values(counters).forEach((counter) =>
        counter.setIsAnimating(true)
      );
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="bg-[#f5faff] py-20 px-4 text-center text-black"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-6xl font-bold mb-2 inline-block relative">
            {formatNumber(counters.main.count, "+")}
            <span
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#00CDFE] rounded-full"
              style={{ bottom: "-5px", width: "80%", marginLeft: "10%" }}
            ></span>
          </h2>
        </div>

        <h3 className="text-3xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
          The Preferred Choice of Companies from Around the Globe, Trusting Us
          to Deliver Exceptional Design Projects
        </h3>

        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Curabitur litora lorem tincidunt sem egestas diam vulputate cras
          natoque lacus nullam primis elementum si facilisis ultricies sociosqu
          viverra lobortis nunc mollis purus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["products", "collections", "years"].map((key, index) => (
            <div key={index} className="flex flex-col items-center">
              <h4 className="text-5xl font-bold text-[#00CDFE]">
                {formatNumber(counters[key].count, "+")}
              </h4>
              <p className="text-lg text-[#424242] mt-2">
                {key === "products"
                  ? "Product Sold"
                  : key === "collections"
                  ? "Design Collections"
                  : "Years of Experience"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Status;
