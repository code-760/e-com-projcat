"use client";
import React, { useState } from "react";
import Image from "next/image"; // ⭐ Ye line add karo
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";
import { fetchcart } from "@/app/redex/slice/cartslice";
import parse from 'html-react-parser';

export default function Singleproducte({ data, path }) {
  let [qutantity, setquantity] = useState(1);
  let tokan = useSelector((Allmystroy) => Allmystroy.userstore.tokan);
  let dispatch = useDispatch();
  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  let product = data;

  let pathe = path;

  // ⭐ Data ko directly product variable me rakh lo

  let {
    ProductName,
    Category,
    color,
    material,
    ActualPrice,
    SalePrice,
    Description,
    ProductImage,
    GalleryImage,
  } = product;

  // console.log(color);
  

  let addcart = () => {
    let obj = {
      productName: ProductName,
      price: SalePrice,
      productImg: ProductImage,
      productId: product._id,
      productQuantity: qutantity,
    };
    if (tokan) {
      axios
        .post(`${basurl}cart/add-to-cart`, obj, {
          headers: {
            Authorization: `Bearer ${tokan}`,
          },
        })
        .then((res) => res.data)
        .then((finalres) => {
          dispatch(fetchcart());
          console.log(finalres);
          alert(finalres.message);
        });
    } else {
      redirect("/Login-Register");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-12 font-sans text-[#333] bg-white">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* --- Left Section: Image Gallery --- */}
        <div className="flex-1">
          {/* Main Product Image */}
          <div className="border border-gray-100 rounded-sm overflow-hidden bg-[#f9f9f9] shadow-sm">
            <img
              src={pathe + ProductImage}
              alt={ProductName}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 mt-4 justify-center lg:justify-start">
            {GalleryImage.map((item) => (
              <div
                key={item}
                className="w-24 h-20 border border-gray-200 cursor-pointer hover:border-[#C09578] transition-all"
              >
                <img
                  src={pathe + item}
                  alt="thumbnail"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100"
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
              ${ActualPrice}
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
              onChange={(e) => setquantity(e.target.value)}
              value={qutantity}
              className="w-20 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C09578]"
            />
          </div>

          <button
            onClick={addcart}
            className="w-full md:w-72 py-4 bg-[#C09578] text-white font-bold rounded-sm hover:bg-[#a67d60] transition-colors shadow-sm uppercase tracking-wider mb-10"
          >
            Add To Cart
          </button>

          {/* Product Specifications List */}
          <div className="space-y-3 border-t pt-8 text-[14px]">
            <p className="flex items-center">
              <span className="font-semibold w-40 text-gray-700">Code:</span>
              <span className="text-gray-600">jod00113</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold  w-40 text-gray-700">
                Dimension:
              </span>
              <span className="text-gray-600"> {parse(Description || "")}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-40 text-gray-700">
                Estimate Delivery Days:
              </span>
              <span className="text-gray-600">"30-35" Days</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-40 text-gray-700">
                Category:
              </span>
              <span className="text-gray-600">{Category.categoryName}</span>
            </p>
            <div className="flex items-start">
              <span className="font-semibold w-40 text-gray-700">Color:</span>
              <div className="flex flex-col gap-1">
                {color.map((item, index) => (
                 
                  
                  <span key={index} className="text-gray-600 text-[14px]">
                    {item.colorName}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-semibold w-40 text-gray-700">
                Material:
              </span>
              <div className="flex flex-col gap-1">
                {material.map((item, index) => (
                  <span key={index} className="text-gray-600 text-[14px]">
                    {item.materialName}
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
