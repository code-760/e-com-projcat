"use client";
import React, { useState, useMemo } from "react"; // useMemo add kiya
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart } from "react-icons/fa";
import Slider from "react-slick";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  aadwishlist,
  addItemToWishlistLocal,
  removeItemFromwishlist,
  removewishlist,
} from "@/app/redex/slice/wishlist";

export default function Bestselling_Products({ bdata }) {
  // Logic: Filters ko useMemo mein dala taaki har render par filter na chale
  const filteredProducts = useMemo(() => {
    return (bdata || []).filter(
      (item) => item.BestSelling === true || item.BestSelling === 1
    );
  }, [bdata]);

  const settings = {
    infinite: filteredProducts.length > 4, // Bug fix: Agar 4 se kam product hain toh infinite band
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    lazyLoad: 'ondemand', // CPU saving: Sirf dikhne wali images load karega
  };

  const dispatch = useDispatch();

  // Wishlist data optimization
  const wishlistItems = useSelector((state) => state.wishliststore.wishlist?.wishlistdetails || []);

  // Performance Fix: Wishlist IDs ka Set banaya taaki loop na chalana pade
  const wishlistIds = useMemo(() => new Set(wishlistItems.map(item => item._id)), [wishlistItems]);

  const handleLikeClick = (e, product, isLiked) => {
    e.preventDefault();
    e.stopPropagation(); // Event bubbling roka

    if (isLiked) {
      dispatch(removeItemFromwishlist(product._id));
      dispatch(removewishlist(product._id));
    } else {
      dispatch(addItemToWishlistLocal(product));
      dispatch(aadwishlist(product._id));
    }
  };

  return (
    <div className="slider-container w-[1170px] h-auto my-12 mx-auto">
      <div className="relative flex items-center mb-10">
        <h2 className="pr-5 text-3xl font-[cha] bg-white z-10">
          Bestselling Products
        </h2>
        <div className="absolute top-[50%] right-0 left-0 border-[#ccc] border-t z-0"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <Slider {...settings} className="h-full">
          {filteredProducts.map((product, index) => {
            // Memory Optimization: Loop ke andar .some() ki jagah .has() use kiya
            const isLiked = wishlistIds.has(product._id);

            return (
              <div key={product._id || index} className="p-3">
                <div className="w-72 bg-white shadow-md hover:shadow-xl mx-auto rounded-t-xl">
                  <Link href={`/product/${product._id}`}>
                    <div>
                      <img
                        src={product.ProductImage}
                        alt={product.ProductName}
                        loading="lazy" // Memory optimization
                        className="h-40 w-72 object-center rounded-t-xl"
                      />

                      <div className="px-4 py-3 text-center w-full">
                        <span className="text-gray-400 my-5 text-[12px] uppercase block truncate">
                          {product.Category?.categoryName || "Furniture"}
                        </span>

                        <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">
                          {product.ProductName}
                        </p>

                        <div className="border my-4 border-[#ccc]"></div>

                        <div className="flex flex-col justify-center items-center">
                          <div className="flex items-center">
                            <p className="text-sm text-gray-600 cursor-auto line-through">
                              Rs. {product.ActualPrice}
                            </p>
                            <p className="text-lg font-semibold text-black ml-2">
                              Rs. {product.SalePrice}
                            </p>
                          </div>

                          <div className="text-center flex gap-1 mt-3">
                            <div
                              onClick={(e) => handleLikeClick(e, product, isLiked)}
                              className="py-1 px-2 border-[#ebebeb] flex items-center bg-[#ebebeb] cursor-pointer hover:bg-gray-100"
                            >
                              <FaHeart
                                className={`transition-colors duration-300 ${
                                  isLiked ? "text-[#c09578]" : "text-gray-400"
                                }`}
                              />
                            </div>

                            <div className="border p-1 border-[#ebebeb] bg-[#ebebeb] cursor-pointer hover:bg-gray-100">
                              <h5 className="font-medium text-sm">Add cart</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No bestselling products available.
        </p>
      )}
    </div>
  );
}