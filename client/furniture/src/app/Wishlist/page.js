"use client";
import Link from "next/link";
import React, { useEffect, useMemo } from "react"; // useMemo add kiya
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchwishlist, removeItemFromwishlist, removewishlist } from "../redex/slice/wishlist";
import { FaHeart } from "react-icons/fa6";
import Image from "next/image"; // Memory optimization ke liye

export default function Wishlist() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchwishlist());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishliststore.wishlist) || {};
  const product = wishlist?.wishlistdetails || [];

  // CPU Optimization: Unique products calculation ko memoize kiya
  // Ab ye har render par nahi chalega, sirf tab chalega jab 'product' array badlega
  const uniqueProducts = useMemo(() => {
    return product.filter(
      (item, index, self) => index === self.findIndex((p) => p._id === item._id)
    );
  }, [product]);

  const handleRemove = (id) => {
    dispatch(removeItemFromwishlist(id)); // Local State fix
    dispatch(removewishlist(id)); // Database fix
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="border-b border-gray-200 py-6 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-[cha] mb-3">My Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#c09578] transition-colors">Home</Link>
            <MdOutlineNavigateNext />
            <span className="text-gray-800">My Wishlist</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1370px] mx-auto px-4 py-8 md:py-12">
        {uniqueProducts.length > 0 ? (
          /* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {uniqueProducts.map((item) => (
              <div key={item._id} className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                
                {/* Product Image Wrapper */}
                <div className="relative h-48 sm:h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={item.ProductImage}
                    alt={item.ProductName}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Remove from Wishlist Button */}
                  <button 
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-[#c09578] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <FaHeart size={18} />
                  </button>
                </div>

                <div className="p-5 text-center flex flex-col flex-grow">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Premium Furniture
                  </span>
                  <h3 className="text-md font-bold text-gray-800 line-clamp-1 group-hover:text-[#C09578] transition-colors mb-3">
                    {item.ProductName}
                  </h3>
                  
                  <div className="w-10 h-0.5 bg-gray-100 mx-auto mb-4"></div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-center gap-3 mb-5">
                      <span className="text-sm text-gray-400 line-through">₹{item.SalePrice}</span>
                      <span className="text-lg font-black text-gray-900">₹{item.ActualPrice}</span>
                    </div>

                    <button className="w-full py-3 bg-gray-950 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C09578] transition-all shadow-lg active:scale-95">
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Improved UI */
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="w-48 h-48 relative mb-6 grayscale opacity-50">
               <img
                src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg"
                alt="Empty Wishlist"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4 tracking-tight">Your Wishlist is Empty!</h2>
            <Link href="/" className="px-8 py-3 bg-[#c09578] text-white font-bold rounded-full shadow-lg hover:bg-[#a88264] transition-all">
              Go Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}