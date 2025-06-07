"use client";
import React, { useState, useEffect } from "react";

export default function NewsTicker() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, []);

  const content = [
    {
      title: "Weekly Bible Study",
      details: [
        "Every Tuesday at 7:00 PM via Zoom",
        "Zoom ID: 752 175 4998",
        "Passcode: 123456",
      ],
    },
    {
      title: "Sunday Worship",
      details: [
        "3:00 PM",
        "Queensway Baptist Church",
        "950 Islington Avenue, Etobicoke, ON M8Z 4P6",
      ],
    },
  ];

  return (
    <div className="w-64 h-56 bg-white rounded-lg shadow-md overflow-hidden relative ml-14 mt-5">
      <div className="bg-[#01652e] text-white text-center py-2">
        <h2 className="text-md font-bold tracking-wide">Latest News</h2>
      </div>
      {content.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 p-4 mt-8 transition-opacity duration-1000 ease-in-out
            ${current === index ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2 text-center">
            {item.title}
          </h2>
          {item.details.map((line, i) => (
            <p key={i} className="text-sm text-gray-700 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
