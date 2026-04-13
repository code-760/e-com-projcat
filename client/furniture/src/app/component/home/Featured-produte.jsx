"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"; // useDispatch import kiya
// Apne action import karna na bhoolein (naam check kar lijiye apni slice se)
import {
  aadwishlist,
  addItemToWishlistLocal,
  removeItemFromwishlist,
  removewishlist,
} from "@/app/redex/slice/wishlist";

export default function Featured_produte({ produtedata }) {
  const dispatch = useDispatch(); // Action bhejne ke liye

  const wishlist =
    useSelector((Allmystroy) => Allmystroy.wishliststore.wishlist) || {};
  // 1. Naam change kiya 'wishlistItems' taaki niche wale 'product' se mix na ho
  const wishlistItems = wishlist?.wishlistdetails || [];

  let [activeTab, setactiveTab] = useState("Featured");
  let [path] = useState(produtedata.path);
  let [perodutedata] = useState(produtedata.data);

  console.log(path);
  

  let produtefuatures = {
    Featured: 1,
    "New Arrivals": 2,
    Onsale: 3,
  };

  let filetrdeta = perodutedata.filter((item) => {
    return Number(item.ProductType) === produtefuatures[activeTab];
  });

  const handleLikeClick = (e, product, isLiked) => {
    e.preventDefault(); // Link ko trigger hone se roke

    if (isLiked) {
      // Agar liked hai, toh remove karo
      dispatch(removeItemFromwishlist(product._id));
      dispatch(removewishlist(product._id));
    } else {
      // Agar liked nahi hai, toh add karo
      dispatch(addItemToWishlistLocal(product));
      dispatch(aadwishlist(product._id));
    }
  };

  return (
    <div>
      <div className="w-[1170px] mx-auto text-center">
        {/* ... Aapka Tabs wala upar ka code same rahega ... */}
        <div className="relative mb-10">
          <div className="absolute top-[50%] left-0 border-t-3 border-[#ebebeb] w-[391px]"></div>
          <div className="flex text-center justify-center relative z-10 bg-white">
            {["Featured", "New Arrivals", "Onsale"].map((tabName) => (
              <h1
                key={tabName}
                className={`cursor-pointer border-4 px-6 py-3 text-[18px] border-[#ebebeb] font-medium ${
                  activeTab === tabName
                    ? "border-orange-300 text-[#C09578]"
                    : "border-[#ebebeb]"
                }`}
                onClick={() => setactiveTab(tabName)}
              >
                {tabName}
              </h1>
            ))}
          </div>
          <div className="absolute top-[50%] right-0 border-t-3 w-[391px] border-[#ebebeb]"></div>
        </div>
      </div>

      <div className="w-[1370px] mx-auto mt-10 grid grid-cols-4 gap-5">
        {filetrdeta.length > 0 ? (
          filetrdeta.map((product) => {
            // 2. YAHAN CHECK HOGA LIKED HAI YA NAHI (Har product ke liye alag se)
            const isLiked = wishlistItems.some(
              (item) => item._id === product._id,
            );

            return (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="w-72 bg-white shadow-md hover:shadow-xl">
                  <div>
                    <img
                      src={path + product.ProductImage}
                      alt={product.ProductName}
                      className="h-40 w-72 object-center rounded-t-xl"
                    />
                    <div className="px-4 py-3 text-center w-72">
                      <span className="text-gray-400 my-5 text-[12px] uppercase ">
                        Nest Of Tables
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">
                        {product.ProductName}
                      </p>
                      <div className=" border my-4 border-[#ccc] "></div>
                      <div className=" flex flex-col justify-center items-center">
                        <div className=" flex items-center">
                          <p className=" text-sm cursor-auto text-gray-600 line-through ">
                            {product.ActualPrice}
                          </p>
                          <p className=" text-lg font-semibold text-black ml-2">
                            {product.SalePrice}
                          </p>
                        </div>
                        <div className="text-center flex gap-1 ">
                          {/* 4. ONCLICK LAGAYA YAHAN */}
                          <div
                            onClick={(e) =>
                              handleLikeClick(e, product, isLiked)
                            }
                            className="py-1 px-2 border-[#ebebeb] flex items-center bg-[#ebebeb] cursor-pointer"
                          >
                            <FaHeart
                              className={`transition-colors duration-300 ${
                                isLiked
                                  ? "text-[#c09578]" // Liked color
                                  : "text-gray-400 hover:text-[#C09578]" // Normal color
                              }`}
                            />
                          </div>
                          <div className=" border p-1 border-[#ebebeb] bg-[#ebebeb]">
                            <h5>Add cart</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-4 text-center py-20">
            <h2 className="text-xl text-gray-400 italic">
              No Data Found for {activeTab}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
