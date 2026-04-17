"use client";
import React, { useMemo } from "react"; // useState ki jagah useMemo behtar hai yahan
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image"; // Memory optimization ke liye Next Image use karein

export default function Banner({ bannerdata }) {
  
  // Optimization: State ki jagah useMemo use karein taaki har render par naya array na bane
  const banners = useMemo(() => bannerdata || [], [bannerdata]);

  console.log(banners);


  const settings = {
    dots: true,
    infinite: banners.length > 1, // Agar 1 hi banner ho toh infinite loop band kar dein
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1, // Single banner par autoplay ki CPU waste na karein
    autoplaySpeed: 4000,
    fade: true, // Smooth transition, CPU par kam load padta hai sliding se
    lazyLoad: "progressive", // Sirf wahi image load hogi jo screen par hai
  };

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-[300px] md:h-[550px] overflow-hidden bg-gray-100">
      <Slider {...settings}>
        {banners.map((item) => (
          <div key={item._id} className="relative w-full h-[300px] md:h-[550px]"> 
            <Image
              src={item.Slidersimg}
              alt={item.Title|| "Banner Image"}
              fill // Image container ko pura fill karegi
              className=" object-center"
              priority // Slider ki images ko priority load milega
              sizes="100vw"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}