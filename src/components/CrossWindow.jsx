import React from "react";
import NewsTicker from "./NewsTicker";
import FaithDeclare from "./FaithDeclare";
import Slider from "./Slider"; // ✅ 导入轮播图组件

export default function CrossWindow() {
  return (
    <div className="flex items-end bg-[#f8f4e6] w-full min-h-screen p-12 gap-20">
      {/* 圆形部分 */}
      <div className="relative">
        {/* 背景轮播图 */}
        <div
          className="absolute top-0 left-0 w-full h-full z-0 rounded-full overflow-hidden flex items-end"
          style={{
            width: "90vw",
            maxWidth: "900px",
            aspectRatio: "1 / 1",
          }}
        >
          <div className="w-full scale-125 -translate-y-6">
            <Slider />
          </div>
        </div>

        {/* 圆形网格层（不动你的代码） */}
        <div
          className="grid rounded-full overflow-hidden relative z-10"
          style={{
            width: "90vw", // 响应式
            maxWidth: "900px",
            aspectRatio: "1 / 1", // 保持圆形
            display: "grid",
            gridTemplateRows: "1fr 70px 5fr",
            gridTemplateColumns: "2fr 70px 3fr",
          }}
        >
          {/* 四个格子 */}
          <div className="bg-white" style={{ gridRow: 1, gridColumn: 1 }} />
          <div className="bg-white" style={{ gridRow: 1, gridColumn: 3 }} />
          <div className="bg-transparent" style={{ gridRow: 3, gridColumn: 1 }}>
            <NewsTicker />
          </div>
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
            className="bg-[#f8f4e6]"
            style={{ gridRow: "1 / 4", gridColumn: 2 }}
          />
        </div>
      </div>

      {/* 右侧宣信组件 */}
      <div>
        <FaithDeclare />
      </div>
    </div>
  );
}
