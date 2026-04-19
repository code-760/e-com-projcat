"use client";
import React, { useMemo } from "react"; // useState ki jagah useMemo behtar hai yahan
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css"; //
import { Autoplay, Pagination } from "swiper/modules"; //Memory optimization ke liye Next Image use karein

export default function Banner({ bannerdata }) {
  // Optimization: State ki jagah useMemo use karein taaki har render par naya array na bane
  const banners = useMemo(() => bannerdata || [], [bannerdata]);

 
  if (banners.length === 0) return null;

  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
            delay:2500,
            disableOnInteraction: false,
          }}
      modules={[Pagination,Autoplay]}
      className="mySwiper"
    >
      <div className="w-full h-[300px] md:h-[550px] overflow-hidden bg-gray-100">
        {banners.map((item) => (
          <SwiperSlide>
            <div
              key={item._id}
              className="relative w-full h-[300px] md:h-[550px]"
            >
              <Image
                src={item.Slidersimg}
                alt={item.Title || "Banner Image"}
                fill // Image container ko pura fill karegi
                cl
                assName=" object-center"
                priority // Slider ki images ko priority load milega
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
        ...
      </div>
    </Swiper>
  );
}
