"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  aadwishlist,
  addItemToWishlistLocal,
  removeItemFromwishlist,
  removewishlist,
} from "@/app/redex/slice/wishlist";

export default function Featured_produte({ produtedata }) {
  const dispatch = useDispatch();

  // --- MEMORY & CPU OPTIMIZATION ---
  const wishlist = useSelector((state) => state.wishliststore.wishlist) || {};
  const wishlistItems = wishlist?.wishlistdetails || [];

  // CPU 100% Fix: .some() loop ko Set.has() se replace kiya (O(1) complexity)
  const wishlistIds = useMemo(() => {
    return new Set(wishlistItems.map((item) => item._id));
  }, [wishlistItems]);

  const [activeTab, setactiveTab] = useState("Featured");
  const perodutedata = useMemo(() => produtedata?.data || [], [produtedata]);

  const produtefuatures = {
    Featured: 1,
    "New Arrivals": 2,
    Onsale: 3,
  };

  // Tab change optimization
  const filteredData = useMemo(() => {
    return perodutedata.filter((item) => Number(item.ProductType) === produtefuatures[activeTab]);
  }, [activeTab, perodutedata]);

  // Featured_produte.jsx
// ... imports same ...

const handleLikeClick = (e, product, isLiked) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
        // Remove ke liye sirf ID kaafi hai
        dispatch(removeItemFromwishlist(product._id)); 
        dispatch(removewishlist(product._id));
    } else {
        // ADD KE LIYE POORA PRODUCT BHEJO (Yehi mistake thi)
        dispatch(addItemToWishlistLocal(product)); 
        dispatch(aadwishlist(product._id));
    }
};

// ... UI code same rahega ...
  return (
    <div className="w-full py-8 md:py-12 bg-white">
      {/* --- RESPONSIVE TABS SECTION --- */}
      <div className="max-w-[1170px] mx-auto px-4 text-center">
        <div className="relative mb-8 md:mb-12 flex items-center justify-center">
          {/* Decorative lines - Tablet/Desktop par hi dikhengi */}
          <div className="hidden lg:block absolute w-full border-t-2 border-[#ebebeb] z-0"></div>
          
          <div className="flex flex-wrap justify-center gap-0 relative z-10 bg-white px-2">
            {["Featured", "New Arrivals", "Onsale"].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setactiveTab(tabName)}
                className={`cursor-pointer border-2 md:border-4 px-4 md:px-8 py-2 md:py-3 text-[14px] md:text-[18px] font-bold transition-all duration-300 ${
                  activeTab === tabName
                    ? "border-orange-300 text-[#C09578] bg-orange-50/30"
                    : "border-[#ebebeb] text-gray-500 hover:text-black"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE PRODUCT GRID --- */}
      <div className="max-w-[1370px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((product) => {
            const isLiked = wishlistIds.has(product._id);

            return (
              <Link key={product._id} href={`/product/${product._id}`} className="group">
                <div className="bg-white shadow-sm hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-50">
                    <img
                      src={product.ProductImage}
                      alt={product.ProductName}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
                      Premium Collection
                    </span>
                    <h3 className="text-md font-bold text-gray-800 line-clamp-1 capitalize mb-2 group-hover:text-[#C09578] transition-colors">
                      {product.ProductName}
                    </h3>
                    
                    <div className="w-12 h-0.5 bg-gray-100 mx-auto mb-3"></div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-xs text-gray-400 line-through">
                          Rs.{product.ActualPrice}
                        </span>
                        <span className="text-lg font-extrabold text-[#C09578]">
                          Rs.{product.SalePrice}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={(e) => handleLikeClick(e, product, isLiked)}
                          className={`p-2.5 rounded-lg border transition-all ${
                            isLiked 
                              ? "bg-red-50 border-red-100 text-red-500" 
                              : "bg-gray-50 border-gray-100 text-gray-300 hover:text-red-400"
                          }`}
                        >
                          <FaHeart className="text-lg" />
                        </button>
                        
                        <div className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-[#C09578] transition-all">
                          Add to Cart
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4 text-gray-200">📦</div>
            <h2 className="text-xl text-gray-400 font-medium">No Products Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}