"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchwishlist } from "../redex/slice/wishlist";
import { FaHeart } from "react-icons/fa6";

export default function Wishlist() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Ye line hi Redux ke function ko chalati hai!
    console.log("Component load hua, ab Redux call hoga...");
    dispatch(fetchwishlist());
  }, [dispatch]);

  const wishlist =
    useSelector((Allmystroy) => Allmystroy.wishliststore.wishlist) || {};

  // const path = wishlist?.path;
  const product = wishlist?.wishlistdetails || [];

  const uniqueProducts = product.filter(
  (item, index, self) =>
    index === self.findIndex((p) => p._id === item._id)
);

console.log(uniqueProducts,"uniqueProducts");


  return (
    <>
      <div>
        <div className=" border-b border-[#CCC] py-7">
          <div className="text-center flex flex-col items-center">
            <h1 className="p-4 text-4xl font-semibold font-[cha]">
              My Wishlist
            </h1>
            <div className=" flex ">
              <div className=" flex items-center hover:text-[#c09578]">
                <Link href={"/"}>Home</Link>
                <MdOutlineNavigateNext />
              </div>
              <p>My Wishlist</p>
            </div>
          </div>
        </div>
        <div className="w-[1370px] mx-auto border-b border-[#ccc] pb-7">
          {product.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
              {uniqueProducts.map((item, index) => (
                <div className="w-72 bg-white shadow-md hover:shadow-xl">
                  {/* Note: If you want this to be clickable, change this <div> to an <a> tag */}
                  <div href="#">
                    <img
                      src={item.ProductImage}
                      alt="Modern Wooden Nesting Tables"
                      className="h-40 w-72 object-cover object-center rounded-t-xl"
                    />
                    <div className="px-4 py-3 text-center w-72">
                      <span className="text-gray-400 my-5 text-[12px] uppercase">
                        Nest Of Tables
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">
                        {item.ProductName}
                      </p>
                      <div className="border my-4 border-[#ccc]"></div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center">
                          <p className="text-sm text-gray-600 cursor-auto line-through">
                           ${item.SalePrice}
                          </p>
                          <p className="text-lg font-semibold text-black ml-2">
                            ${item.ActualPrice}
                          </p>
                        </div>
                        <div className="text-center flex gap-1 mt-2">
                          <div className="py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb] cursor-pointer">
                            {/* Since this is the wishlist page, the item is always in the wishlist, so we style it as active (golden/theme color) */}
                            <FaHeart className="text-[#c09578]" />
                          </div>
                          <div className="border p-1 border-[#ebebeb] bg-[#ebebeb] cursor-pointer px-3">
                            <h5 className="font-medium text-sm">Add cart</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg"
                alt="Empty Wishlist"
              />
              <div className="text-center mt-4">
                <p>Your wishlist is empty!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
