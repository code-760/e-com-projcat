"use client";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Banner({ bannerdata }) {
  // Safe check agar bannerdata ya data undefined ho
  const [banner] = useState(bannerdata || []);
  // let [basePath] = useState(path || "") // Base path for images

// console.log(banner,basePath);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Agar images backend server par hain toh uska URL yahan likhein
  
  return (
    <div className="w-full h-full overflow-hidden">
      <Slider {...settings}>
        {banner.map((item) => (
          <div key={item._id} className="w-full h-[550px] "> 
            <img
              src={item.Slidersimg} // Console ke mutabik 'Slidersimg' use karein
              className="w-full h-full object-cover object-center "
              alt={item.Title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}