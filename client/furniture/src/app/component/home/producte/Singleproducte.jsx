"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation"; // ⭐ redirect ki jagah useRouter
import { fetchcart } from "@/app/redex/slice/cartslice";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";

export default function Singleproducte({ data }) {
  const [qutantity, setquantity] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const tokan = useSelector((state) => state.userstore.tokan);
  const basurl = process.env.NEXT_PUBLIC_BASEURL;

  const product = data;

  const {
    ProductName,
    Category,
    color = [],
    material = [],
    ActualPrice,
    SalePrice,
    Description,
    ProductImage,
    GalleryImage = [],
  } = product;

  // ⭐ Performance Fix: Description ko sirf tabhi parse karo jab wo change ho
  const parsedDescription = useMemo(
    () => parse(Description || ""),
    [Description],
  );

  const addcart = async () => {
    if (!tokan) {
      router.push("/Login-Register");
      return;
    }

    const obj = {
      productName: ProductName,
      price: SalePrice,
      productImg: ProductImage,
      productId: product._id,
      productQuantity: qutantity,
    };

    try {
      const res = await axios.post(`${basurl}cart/add-to-cart`, obj, {
        headers: { Authorization: `Bearer ${tokan}` },
      });
      dispatch(fetchcart());
      toast.success(res.data.message || "Added to cart");
    } catch (err) {
      console.error("Cart Error:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-12 font-sans text-[#333] bg-white">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-16">
        {/* --- Left Section: Image Gallery --- */}
        <div className="flex-1">
          <div className="border border-gray-100 rounded-sm overflow-hidden bg-[#f9f9f9] shadow-sm relative h-[400px]">
            <Image
              src={ProductImage}
              alt={ProductName}
              fill
              className="object-contain"
              priority // Pehli image ko jaldi load karega
            />
          </div>

          <div className="flex gap-3 mt-4 justify-center lg:justify-start overflow-x-auto pb-2">
            {GalleryImage.map((item, index) => (
              <div
                key={index}
                className="relative w-24 h-20 border border-gray-200 cursor-pointer hover:border-[#C09578] transition-all flex-shrink-0"
              >
                <Image
                  src={item}
                  alt="thumbnail"
                  fill
                  className="object-cover opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Section: Product Details --- */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
            {ProductName}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-xl">
            <span className="text-gray-400 line-through font-light">
              ₹{ActualPrice}
            </span>
            <span className="text-[#C09578] font-bold text-2xl">
              Rs. {SalePrice}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold text-gray-700">Quantity:</label>
            <input
              type="number"
              min={1}
              max={10}
              onChange={(e) => setquantity(Number(e.target.value))}
              value={qutantity}
              className="w-20 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C09578]"
            />
          </div>

          <button
            onClick={addcart}
            className="w-full md:w-72 py-4 bg-[#C09578] text-white font-bold rounded-sm hover:bg-[#a67d60] transition-all shadow-sm uppercase tracking-wider mb-10 active:scale-95"
          >
            Add To Cart
          </button>

          {/* Specifications */}
          <div className="space-y-3 border-t pt-8 text-[14px]">
            <div className="flex items-start">
              <span className="font-semibold w-40 text-gray-700">
                Dimension:
              </span>
              <div className="text-gray-600 prose prose-sm">
                {" "}
                {parsedDescription}
              </div>
            </div>

            <p className="flex items-center">
              <span className="font-semibold w-40 text-gray-700">
                Category:
              </span>
              <span className="text-gray-600">{Category?.categoryName}</span>
            </p>

            {/* Colors & Materials loops optimized with optional chaining */}
            <div className="flex items-start">
              <span className="font-semibold w-40 text-gray-700">Color:</span>
              <div className="flex flex-wrap gap-2">
                {color.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-2 py-1 rounded text-gray-600"
                  >
                    {item.colorName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
