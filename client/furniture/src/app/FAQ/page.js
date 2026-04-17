"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import axios from "axios";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqList, setFaqList] = useState([]);
  const basurl = process.env.NEXT_PUBLIC_BASEURL;

  // CPU Fix: Fetching ko useCallback mein dala taaki unnecessary re-renders na hon
  const fetchFAQs = useCallback(async () => {
    if (!basurl) return;
    try {
      const res = await axios.get(`${basurl}home-items/faq-viwe`);
      if (res.data?.data?.length > 0) {
        setFaqList(res.data.data);
      }
    } catch (error) {
      console.error("FAQ fetch error:", error);
    }
  }, [basurl]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-50 py-10 md:py-16">
      <div className="max-w-[1370px] mx-auto px-4">
        {/* Title - Responsive text size */}
        <h1 className="text-2xl md:text-4xl font-bold text-center uppercase mb-8 md:mb-12 text-gray-800 font-[cha] tracking-tight">
          Frequently Asked Questions
        </h1>

        {/* FAQ Container - Width adjustment for all screens */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq._id || index}
                className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                  isOpen ? "border-[#c09578] ring-1 ring-[#c09578]" : "border-gray-200 bg-white"
                }`}
              >
                {/* --- QUESTION HEADER --- */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`p-4 md:p-5 flex justify-between items-center cursor-pointer transition-all duration-300 ${
                    isOpen ? "bg-[#c09578] text-white" : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <h2 className="text-sm md:text-lg font-semibold flex gap-3 pr-4">
                    <span className={isOpen ? "text-white/70" : "text-gray-400"}>
                      {(index + 1).toString().padStart(2, "0")}.
                    </span>
                    {faq.FaqQuestion}
                  </h2>

                  <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
                    {isOpen ? (
                      <IoIosCloseCircleOutline className="text-2xl" />
                    ) : (
                      <CgAdd className="text-2xl text-gray-400" />
                    )}
                  </div>
                </div>

                {/* --- ANSWER SECTION (CPU & Animation Optimized) --- */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 md:p-6 bg-white text-gray-600 border-t border-gray-100 leading-relaxed text-sm md:text-base">
                      {faq.FaqAnswer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}