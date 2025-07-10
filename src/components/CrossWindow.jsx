"use client";
import React from "react";

import FaithDeclare from "./FaithDeclare";
import Slider from "./Slider";
import NewsTicker from "./NewsTicker";

export default function CrossWindow() {
  return (
    <div className="relative flex flex-col bg-[#f8f4e6] w-full min-h-screen p-4 md:p-12 gap-8 md:gap-40">
      {/* 标题 */}
      <div className="absolute top-4 md:top-16 left-0 right-0 px-4 md:left-1/2 md:right-auto md:px-0 md:transform md:-translate-x-1/2 z-50">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#647a5c] drop-shadow-lg italic text-center md:text-left ">
          <span>Welcome to New Creation Life Ministries,</span>
          <br />
          <span>Encounter His presence, Be renewed in spirit.</span>
        </h1>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-40 mt-16 md:mt-0">
        {/* 圆形部分 */}
        <div className="relative self-center md:self-start">
          {/* 背景轮播图 */}
          <div className="circle-slider absolute top-0 left-0 w-full h-full z-0 rounded-full overflow-hidden flex items-end">
            <div className="slider-content w-full">
              <Slider />
            </div>
          </div>

          {/* 圆形网格层 */}
          <div className="circle-grid grid rounded-full overflow-hidden relative z-10">
            {/* 四个格子 */}
            <div
              className="bg-[#c4d3d5]"
              style={{ gridRow: 1, gridColumn: 1 }}
            />
            <div
              className="bg-[#c4d3d5]"
              style={{ gridRow: 1, gridColumn: 3 }}
            />
            <div
              className="bg-transparent"
              style={{ gridRow: 3, gridColumn: 1 }}
            />
            <div
              className="bg-transparent"
              style={{ gridRow: 3, gridColumn: 3 }}
            />

            {/* 中间两条交叉线为白色 */}
            <div
              className="bg-[#f8f4e6]"
              style={{ gridRow: 2, gridColumn: "1 / 4" }}
            />
            <div
              className="bg-[#f8f4e6]/50"
              style={{ gridRow: "1 / 4", gridColumn: 2 }}
            />
          </div>
        </div>

        {/* 新闻滚动条 */}
        <div className="w-full flex justify-center pt-8 md:pt-24">
          <div className="w-full max-w-sm md:max-w-none">
            <NewsTicker />
          </div>
        </div>
      </div>

      {/* 宣信组件 */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <FaithDeclare />
      </div>

      {/* 响应式样式 */}
      <style jsx>{`
        /* 手机端样式 */
        .circle-slider,
        .circle-grid {
          width: min(85vw, 400px);
          aspect-ratio: 1 / 1;
        }

        .circle-grid {
          display: grid;
          grid-template-rows: 1fr 40px 5fr;
          grid-template-columns: 2fr 40px 3fr;
        }

        .slider-content {
          transform: scale(1.1) translateY(-12px);
        }

        /* 桌面端样式（md及以上） */
        @media (min-width: 768px) {
          .circle-slider,
          .circle-grid {
            width: 90vw;
            max-width: 900px;
          }

          .circle-grid {
            grid-template-rows: 1fr 70px 5fr;
            grid-template-columns: 2fr 70px 3fr;
          }

          .slider-content {
            transform: scale(1.25) translateY(-24px);
          }
        }
      `}</style>
    </div>
  );
}
