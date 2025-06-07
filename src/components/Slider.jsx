"use client";

import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const banners = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",
  "/images/event7.jpg",
  "/images/event8.jpg",
];

export default function Slider() {
  return (
    <div className="mx-auto max-w-[895px] w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        // effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        speed={4000}
      >
        {banners.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-[891/593]">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 895px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ 自定义 Swiper 样式 */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #d6e9ca;
          z-index: 10 !important;
        }

        .swiper-pagination-bullet {
          background-color: white;
        }

        .swiper-pagination-bullet-active {
          background-color: #fbd26b;
        }
      `}</style>
    </div>
  );
}
