"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "How Can I Order Custom Designed T-Shirts?",
      answer:
        "To order custom-designed t-shirts, simply visit our website at https://moriomprintzone.com, choose your design, and provide us with your specifications. You can also contact our customer service team for assistance with your order.",
    },
    {
      question: "How Long Does It Take to Process Orders?",
      answer:
        "Our standard processing time is 7-10 business days from the date of order confirmation. Rush orders may be available for an additional fee. Please contact our customer service team for expedited processing options.",
    },
    {
      question: "What Types of Branding Services Do You Offer?",
      answer:
        "We offer a wide range of branding services, including customized printing for mugs, t-shirts, caps, pens, diaries, and more. Whether you're looking for promotional items or corporate gifts, we provide high-quality branding solutions tailored to your needs.",
    },
    {
      question: "Can I Customize Products for My Business?",
      answer:
        "Yes, we specialize in customized branding solutions for businesses. Whether you're looking for custom t-shirts, branded pens, or other promotional merchandise, we can help bring your branding ideas to life with premium-quality, durable prints.",
    },
    {
      question: "What is the Minimum Order Quantity for Customized Products?",
      answer:
        "We have a minimum order quantity of 12 pieces per design. For bulk orders exceeding 500 pieces, please contact us directly for special pricing and production scheduling.",
    },
    {
      question: "Can I Receive Samples Before Placing a Bulk Order?",
      answer:
        "Yes, we offer sample orders so you can verify the quality, fit, and print accuracy before committing to a larger order. Sample fees may apply but are typically credited toward your final order.",
    },
    {
      question: "What Types of Fabric Are Available for Custom T-Shirts?",
      answer:
        "We offer a variety of fabric options including 100% cotton, cotton/polyester blends, tri-blends, performance fabrics, and eco-friendly organic options. Each fabric type has different characteristics for comfort, durability, and print quality.",
    },
    {
      question: "How Can I Contact Moriom Print Zone?",
      answer:
        "You can contact us via phone at +88 01537487020 or +8801846504688, through WhatsApp at +8801823534353, or via email at moriomprintzone@gmail.com. Our physical location is 36/A, Dilkusha, Motijheel, Dhaka, Bangladesh.",
    },
    {
      question: "What Makes Moriom Print Zone Stand Out?",
      answer:
        "Moriom Print Zone stands out by offering high-quality, customized branding solutions with a focus on creativity, precision, and customer satisfaction. With years of experience and advanced technology, we ensure vibrant, durable prints for all your branding needs.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Left column */}
      <div className="md:w-1/3">
        <h3 className="text-sm font-medium text-[#00CDFE] uppercase tracking-wide">
          COMMON QUESTIONS
        </h3>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          Most Popular Questions
        </h2>
        <p className="mt-4 text-[#424242]">
          Etiam metus tortor accumsan fames porttitor rutrum mattis commodo quis
          neque felis quisque ante placerat gravida ornare at feugiat molestie
        </p>
      </div>

      {/* Right column - Accordion */}
      <div className="md:w-2/3">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex justify-between items-center p-4 text-left font-medium ${
                  index === openIndex
                    ? "bg-[#00CDFE] text-white"
                    : "bg-sky-50 text-[#424242] hover:bg-sky-100"
                }`}
              >
                <span>{item.question}</span>
                <span className="flex-shrink-0 ml-2">
                  {index === openIndex ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>

              {index === openIndex && (
                <div className="bg-sky-50 p-4 text-[#424242]">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
