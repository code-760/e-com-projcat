"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Featured_produte({ produtedata }) {
  let [activeTab, setactiveTab] = useState("Featured");

  // State me data rakhna achhi baat hai
  let [path] = useState(produtedata.path);
  let [perodutedata] = useState(produtedata.data);

  // FIXED: Yahan se extra spaces hata diye hain
  let produtefuatures = {
    Featured: 1,
    "New Arrivals": 2,
    Onsale: 3,
  };

  // Filtering Logic
  let filetrdeta = perodutedata.filter((item) => {
    return Number(item.ProductType) === produtefuatures[activeTab];


  });
  console.log(filetrdeta);
  

  return (
    <div>
      <div className="w-[1170px] mx-auto text-center">
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
        {/* FIXED: .length check karna zaroori hai */}
        {filetrdeta.length > 0 ? (
          filetrdeta.map((product) => {
            return (
              // FIX: Yahan 'key' prop add kiya gaya hai
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="w-72 bg-white shadow-md  hover:shadow-xl">
                  <div href="#">
                    <img
                      src={path + product.ProductImage}
                    alt={product.ProductName}
                      className="h-40 w-72 object-center rounded-t-xl"
                    />
                    <div className="px-4 py-3 text-center w-72">
                      <span className="text-gray-400 my-5  text-[12px] uppercase ">
                        Nest Of Tables
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">
                        {product.ProductName}
                      </p>
                      <div className=" border my-4 border-[#ccc] "></div>
                      <div className=" flex flex-col justify-center items-center">
                        <div className=" flex items-center">
                          <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">
                         
                           {product.ActualPrice}
                          </p>
                          <p className=" text-lg font-semibold  text-black ml-2">
                           {product.SalePrice}
                          </p>
                        </div>
                        <div className="text-center flex gap-1 ">
                          <div className=" py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]">
                            <FaHeart />
                          </div>
                          <div className=" border p-1  border-[#ebebeb] bg-[#ebebeb]">
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
