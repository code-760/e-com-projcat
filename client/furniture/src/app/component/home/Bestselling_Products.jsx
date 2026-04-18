"use client";

import React, { useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

// ✅ Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import {
  aadwishlist,
  addItemToWishlistLocal,
  removeItemFromwishlist,
  removewishlist,
} from "@/app/redex/slice/wishlist";

export default function Bestselling_Products({ bdata }) {
  const filteredProducts = useMemo(() => {
    return (bdata || []).filter(
      (item) => item.BestSelling === true || item.BestSelling === 1,
    );
  }, [bdata]);

  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishliststore.wishlist?.wishlistdetails || [],
  );

  const wishlistIds = useMemo(
    () => new Set(wishlistItems.map((item) => item._id)),
    [wishlistItems],
  );

  const handleLikeClick = (e, product, isLiked) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      dispatch(removeItemFromwishlist(product._id));
      dispatch(removewishlist(product._id));
    } else {
      dispatch(addItemToWishlistLocal(product));
      dispatch(aadwishlist(product._id));
    }
  };

  return (
    <div className="max-w-[1170px] w-full px-4 my-12 mx-auto">
      <div className="relative flex items-center mb-10">
        <h2 className="pr-5 text-3xl font-[cha] bg-white z-10">
          Bestselling Products
        </h2>
        <div className="absolute top-[50%] right-0 left-0 border-[#ccc] border-t z-0"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <Swiper
          slidesPerView={5}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1 }, // 📱 mobile
            768: { slidesPerView: 3 }, // 📲 tablet
            1024: { slidesPerView: 4 }, // 💻 laptop
          }}
        >
          {filteredProducts.map((product, index) => {
            const isLiked = wishlistIds.has(product._id);

            return (
              <SwiperSlide key={product._id || index}>
                <div className="p-3">
                  <div className="w-full max-w-[240px] bg-white shadow-md hover:shadow-xl mx-auto rounded-t-xl">
                    <Link href={`/product/${product._id}`}>
                      <div>
                        <img
                          src={product.ProductImage}
                          alt={product.ProductName}
                          className="h-40 w-full object-cover rounded-t-xl"
                        />

                        <div className="px-4 py-3 text-center w-full">
                          <span className="text-gray-400 text-[12px] uppercase block truncate">
                            {product.Category?.categoryName || "Furniture"}
                          </span>

                          <p className="text-lg font-bold text-black truncate hover:text-[#C09578]">
                            {product.ProductName}
                          </p>

                          <div className="border my-4 border-[#ccc]"></div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center">
                              <p className="text-sm text-gray-600 line-through">
                                Rs. {product.ActualPrice}
                              </p>
                              <p className="text-lg font-semibold text-black ml-2">
                                Rs. {product.SalePrice}
                              </p>
                            </div>

                            <div className="flex gap-1 mt-3">
                              <div
                                onClick={(e) =>
                                  handleLikeClick(e, product, isLiked)
                                }
                                className="py-1 px-2 bg-[#ebebeb] cursor-pointer hover:bg-gray-100"
                              >
                                <FaHeart
                                  className={`${
                                    isLiked ? "text-[#c09578]" : "text-gray-400"
                                  }`}
                                />
                              </div>

                              <div className="border p-1 bg-[#ebebeb] cursor-pointer hover:bg-gray-100">
                                <h5 className="text-sm">Add cart</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No bestselling products available.
        </p>
      )}
    </div>
  );
}
