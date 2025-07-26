"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const banners = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",
];

export default function Slider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full aspect-[944/629] overflow-hidden bg-black rounded-xl">
      <AnimatePresence mode="sync">
        <motion.div
          key={banners[idx]} // 关键：让 framer-motion 知道当前是哪张
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 6 }}
        >
          <Image
            src={banners[idx]}
            alt={`Banner ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 944px"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
