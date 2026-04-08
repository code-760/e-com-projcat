"use client";
import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import axios from "axios";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqList, setFaqList] = useState([]);

  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    if (basurl) {
      axios
        .get(`${basurl}home-items/faq-viwe`)
        .then((res) => res.data)
        .then((fainlData) => {
          if (fainlData && fainlData.data && fainlData.data.length > 0) {
            setFaqList(fainlData.data);
          }
        })
        .catch((error) => console.error("FAQ fetch error:", error));
    }
  }, [basurl]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="py-16 bg-gray-50">
        <h1 className="text-4xl font-bold text-center uppercase mx-4 mb-10 text-gray-800 font-[cha]">
          Frequently Asked Questions
        </h1>

        <div className="w-[1370px] max-w-full mx-auto px-4">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`my-3 border rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${
                  isOpen ? "border-[#c09578]" : "border-gray-200 bg-white"
                }`}
              >
                {/* --- QUESTION HEADER --- */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-300 ${
                    isOpen ? "bg-[#c09578] text-white" : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <h2 className="text-lg font-medium flex gap-3">
                    <span className={isOpen ? "opacity-80" : "text-gray-400"}>
                      {(index + 1).toString().padStart(2, "0")}.
                    </span>
                    {faq.FaqQuestion}
                  </h2>

                  {/* Icon rotation animation */}
                  <div className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
                    {isOpen ? (
                      <IoIosCloseCircleOutline className="text-2xl" />
                    ) : (
                      <CgAdd className="text-2xl text-gray-400" />
                    )}
                  </div>
                </div>

                {/* --- ANSWER SECTION (SMOOTH ANIMATION LOGIC) --- */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 bg-white text-gray-600 border-t border-gray-100 leading-relaxed">
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