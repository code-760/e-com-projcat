"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { removetokan } from "../redex/slice/userslice";
import { redirect } from "next/navigation";
import { fetchcart } from "../redex/slice/cartslice";
import axios from "axios";

export default function Header() {
  let basurl = process.env.NEXT_PUBLIC_BASEURL;
  let dispatch = useDispatch();
  let tokan = useSelector((Allmystroy) => Allmystroy.userstore.tokan);
  let [opencart, setopencart] = useState(false);

  let Logout = () => {
    dispatch(removetokan());
    redirect("/Login-Register");
  };

  useEffect(() => {
    dispatch(fetchcart());
  }, [tokan]);

  let cart = useSelector((Allmystroy) => Allmystroy.cartstore.cart) || {};
  let { cartdetails = [], path = "" } = cart;

  // --- TOTAL CALCULATE KARNE KA LOGIC ---
  const calculateSubtotal = () => {
    if (!cartdetails || !Array.isArray(cartdetails)) return 0;
    return cartdetails.reduce(
      (acc, obj) => acc + obj.price * (obj.quantity || 1),
      0,
    );
  };

  const subtotal = calculateSubtotal();

  const [sideCartData, setSideCartData] = useState([]);

  // Jab Redux se data aaye, local state update karein
  useEffect(() => {
    setSideCartData(cartdetails);
  }, [cartdetails]);

  // Delete function jo UI se item hatayega
  const handleSideDelete = (id) => {
    const updated = sideCartData.filter((item) => item._id !== id);
    setSideCartData(updated);
  };

  return (
    <div className=" ">
      {/* top */}
      <div className="  border-b border-[#ebebeb]  ">
        <div className="w-[1370px] mx-auto flex justify-between p-2.5">
          <div>
            <p className="text-[12px]">
              Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com
            </p>
          </div>
          <div>
            {tokan ? (
              <button onClick={Logout}>Log out</button>
            ) : (
              <Link href={"/Login-Register"}>
                <p className="text-[12px]">Login / Register</p>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* midde */}
      <div>
        <div className=" border-b border-[#ebebeb] relative ">
          <div className=" w-[1370px] mx-auto flex justify-between p-5  ">
            <div>
              <img src="/images1.png" className="w-[156px] h[40px]" alt="" />
            </div>
            <div className=" flex items-center gap-4">
              <div className="relative  ">
                <input
                  placeholder="Search..."
                  className=" inputn w-60 shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w- transition-all focus:w-64 outline-none"
                  name="search"
                  type="text"
                />
                <div className=" absolute top-3 right-2  border-l  p-2">
                  <CiSearch className="  " />
                </div>
              </div>
              <div className=" border p-3 border-[#ccc] ">
                <FaHeart className=" hover:text-amber-200" />
              </div>
              <div
                className="border relative flex items-center  px-3 border-[#ccc] py-2 hover:text-[#C09578] gap-2"
                onClick={() => setopencart(true)}
              >
                <div className=" border-r p-2 border-[#ccc]">
                  <MdShoppingCart />
                </div>
                <div>
                  <p>Rs.{subtotal}</p>
                </div>
                <div>
                  <FaAngleDown />
                </div>
                <div className=" bg-[#C09578] w-5 h-5 absolute top-3.5 -left-2.5  rounded-2xl flex items-center text-center">
                  <p className="text-black p-1.5 text-center">
                    {cartdetails?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* side cart */}
          <div
            className={`w-[320px] z-50 bg-white shadow-2xl h-screen fixed top-0 right-0 transform transition-all duration-500 ${opencart ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header Section */}
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <Link href="/Cart">
                <h3 className="text-[20px] font-bold">Cart</h3>
              </Link>
              <RxCross2
                className="cursor-pointer text-2xl"
                onClick={() => setopencart(false)}
              />
            </div>

            {/* Scrollable Area: Yahan 'overflow-y-auto' aur 'custom-scrollbar' zaroori hai */}
            <div className="h-[calc(100vh-190px)] overflow-y-auto custom-scrollbar px-4 py-6">
              <div className="flex flex-col gap-6 text-center">
                {tokan ? (
                  <>
                    {cartdetails && cartdetails.length > 0 ? (
                      cartdetails.map((item, index) => (
                        /* --- AAPKA PURANA CARD CODE START --- */
                        <Link href={`/product/${item.productId}`} key={index}>
                          <div className="w-full bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group border border-gray-100">
                            <div className="cursor-pointer">
                              <div className="h-40 w-full overflow-hidden">
                                <img
                                  src={path + item.productImg}
                                  alt="Product"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <div className="px-4 py-5">
                                <span className="text-gray-400 text-[11px] uppercase tracking-widest font-medium">
                                  Nest Of Tables
                                </span>
                                <p className="text-[17px] font-bold text-black truncate block capitalize mt-1 hover:text-[#C09578]">
                                  {item.productName}
                                </p>
                                <div className="border-t my-4 border-[#eeeeee]"></div>
                                <div className="flex flex-col items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-400 line-through">
                                      {item.ActualPrice}
                                    </p>
                                    <p className="text-lg font-bold text-black">
                                      {item.SalePrice}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 w-full px-2">
                                    <div className="p-2 border border-[#ebebeb] bg-[#f9f9f9] hover:text-[#C09578] cursor-pointer">
                                      <FaHeart />
                                    </div>
                                    <div className="flex-1 py-2 border border-[#ebebeb] bg-[#f9f9f9] hover:bg-[#C09578] hover:text-white cursor-pointer transition-all">
                                      <h5
                                        onClick={() => {
                                          // 1. API call karein
                                          axios
                                            .delete(
                                              `${basurl}cart/delete-cart/${item._id}`,
                                            )
                                            .then((res) => res.data)
                                            .then((finalres) => {
                                              if (finalres._status === true) {
                                                // 1. Redux wala function call karo (Poori web app se item hatane ke liye)
                                                dispatch(
                                                  removeItemFromCart(item._id),
                                                );

                                                // 2. Agar aapne parent se koi function pass kiya hai toh use bhi call kar sakte ho
                                                // cartdelete(id);
                                              }
                                            });
                                        }}
                                        className="text-[13px] font-bold uppercase"
                                      >
                                        Remove from Cart
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        /* --- AAPKA PURANA CARD CODE END --- */
                      ))
                    ) : (
                      <div className="py-10 text-gray-400 font-medium">
                        Your cart is empty!
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-10 text-gray-400">
                    Please login to see cart!
                  </div>
                )}
              </div>
            </div>

            {/* Total & Checkout (Bottom Fixed) */}
            <div className="absolute bottom-0 left-0 w-full p-5 bg-white border-t">
              <div className="flex justify-between items-center mb-4 text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#C09578]">{subtotal}</span>
              </div>
              <button className="w-full py-4 bg-black text-white font-bold hover:bg-[#C09578] transition-all">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* manu */}
      <div className=" border flex items-center border-[#ebebeb]  ">
        <div className="w-[1370px] mx-auto text-center  ">
          <nav className="">
            <ul className=" flex gap-[60px] justify-center   ">
              <Link
                href={"/"}
                className="text-[#C09578]  uppercase cursor-pointer text-[13px]  py-5  font-medium"
              >
                Home
              </Link>
              <li className=" z-10 relative  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium gap-2">
                living
                <FaAngleDown />
                <div className=" absolute  bg-white  top-full w-[700px] hidden group-hover:flex   border border-[#CCC] shadow-[#ccc] ">
                  <div className=" grid grid-cols-3 p-3 ">
                    <div>
                      <ul className=" p-6 text-[#ccc] text-left">
                        <h3 className="pb-4 text-black font-bold  hover:text-[#D2A278]">
                          Tables
                        </h3>
                        <Link
                          href={"/Product-Listing"}
                          className="pb-3 hover:text-black"
                        >
                          Side and End Tables
                        </Link>
                        <li className="pb-3 hover:text-black">
                          Nest Of Tables
                        </li>
                        <li className="pb-3 hover:text-black">
                          Coffee Table Sets
                        </li>
                        <li className="pb-3 hover:text-black">Coffee Tables</li>
                      </ul>
                    </div>
                    <div>
                      <ul className=" p-6 text-[#ccc]  text-left">
                        <h3 className="pb-4 text-black font-bold  hover:text-[#D2A278] ">
                          Mirror
                        </h3>
                        <li className="pb-3 hover:text-black">
                          Wooden Mirrors
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className=" p-6  text-left text-[#ccc]">
                        <h3 className="pb-4 text-black font-bold text-left  hover:text-[#D2A278] ">
                          Living Storage/collections
                        </h3>
                        <li className="pb-3 hover:text-black">Prayer Units</li>
                        <li className="pb-3 hover:text-black">Display Unit</li>
                        <li className="pb-3 hover:text-black">Shoe Racks</li>
                        <li className="pb-3 hover:text-black">
                          Chest Of Drawers
                        </li>
                        <li className="pb-3 hover:text-black">
                          Cabinets and Sideboard
                        </li>
                        <li className="pb-3 hover:text-black">Bookshelves</li>
                        <li className="pb-3 hover:text-black">Tv Units</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className=" z-10 relative  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium  gap-2">
                sofa
                <FaAngleDown />
                <div className=" absolute bg-white top-full w-[700px] border border-[#ccc] shadow-[#ccc] hidden group-hover:flex  ">
                  <div className=" grid grid-cols-3 p-3 ">
                    <div>
                      <ul className=" p-6 text-[#ccc] text-left">
                        <h3 className="pb-4 text-black font-bold  hover:text-[#D2A278]">
                          Sofa Cum Bed
                        </h3>
                        <li className="pb-3 hover:text-black">
                          Wooden Sofa Cum Bed
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className=" p-6 text-[#ccc]  text-left">
                        <h3 className="pb-4 text-black font-bold   hover:text-[#D2A278] ">
                          Sofa Sets
                        </h3>
                        <Link
                          href={"/Product-Listing"}
                          className="pb-3 hover:text-black font-medium"
                        >
                          {" "}
                          L Shape Sofa
                        </Link>
                        <li className="pb-3 hover:text-black font-medium">
                          1 Seater Sofa
                        </li>
                        <li className="pb-3 hover:text-black font-medium">
                          {" "}
                          2 Seater Sofa
                        </li>
                        <li className="pb-3 hover:text-black font-medium">
                          {" "}
                          3 Seater Sofa
                        </li>
                        <li className="pb-3 hover:text-black font-medium">
                          Wooden Sofa Sets
                        </li>
                        <li className="pb-3 hover:text-black font-medium">
                          Normal{" "}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className=" p-6  text-left text-[#ccc]">
                        <h3 className="pb-4 text-black font-medium text-left  hover:text-[#D2A278] ">
                          Swing Jhula
                        </h3>
                        <li className="pb-3 hover:text-black font-medium">
                          Wooden Jhula
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className=" relative z-10  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium  gap-2">
                pages
                <FaAngleDown />
                <div className=" absolute top-full bg-white w-[250px] border border-[#ccc] shadow-[#ccc] hidden group-hover:flex  ">
                  <div className=" grid grid-cols-3 p-3 ">
                    <div>
                      <ul className=" flex flex-col p-6 text-[#ccc] text-left">
                        <Link
                          href={"/About-us"}
                          className="pb-3 hover:text-black text-nowrap"
                        >
                          About Us
                        </Link>
                        <Link href={"/Cart"} className="pb-3 hover:text-black">
                          Cart
                        </Link>
                        <Link
                          href={"/Chachout"}
                          className="pb-3 hover:text-black"
                        >
                          Checkout
                        </Link>
                        <Link
                          href={"/Frequently-Questions"}
                          className="pb-3 hover:text-black text-nowrap"
                        >
                          Frequently Questions
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <Link
                href={"/contect"}
                className=" uppercase cursor-pointer  hover:text-[#C09578] text-[13px]  py-5 flex items-center font-medium gap-2"
              >
                Contact Us
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
