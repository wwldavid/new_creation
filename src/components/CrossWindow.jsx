"use client";
import React from "react";

import FaithDeclare from "./FaithDeclare";
import Slider from "./Slider";
import NewsTicker from "./NewsTicker";

export default function CrossWindow() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f8f4e6]  p-4 md:p-12 gap-8 md:gap-16">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0">
        <div className="md:w-3/4 w-full px-24 space-y-4">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#647a5c] drop-shadow-lg italic text-center md:text-left">
            <span>Welcome to New Creation Life Ministries,</span>
            <br />
            <span>Encounter His presence, Be renewed in spirit.</span>
          </h1>
          <div className="w-full aspect-[944/629] max-w-full overflow-hidden rounded-xl ">
            <Slider />
          </div>
        </div>

        <div className="md:w-1/4 w-full flex items-end justify-center">
          <NewsTicker />
        </div>
      </div>

      {/* 宣信组件 */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <FaithDeclare />
      </div>
    </div>
  );
}
