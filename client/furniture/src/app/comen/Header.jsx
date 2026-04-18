"use client";
import React, { useEffect, useMemo, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaAngleDown, FaAngleUp } from "react-icons/fa"; // Added FaAngleUp
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removetokan } from "../redex/slice/userslice";
import { fetchcart, removeItemFromCart } from "../redex/slice/cartslice";
import axios from "axios";
import { fetchwishlist } from "../redex/slice/wishlist";
import {
  RiUser3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { magamanu } from "../api-servis/megamanu";

export default function Header() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [opencart, setopencart] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Logical State for Mobile Dropdowns
  const [activeMobileSub, setActiveMobileSub] = useState(null);

  const basurl = process.env.NEXT_PUBLIC_BASEURL;
  const tokan = useSelector((state) => state.userstore.tokan);
  const userData = useSelector((state) => state.userstore.userData);

  console.log(userData, "jjjjj");

  const cartdetails = useSelector(
    (state) => state.cartstore.cart?.cartdetails || [],
  );
  const wishlistItems = useSelector(
    (state) => state.wishliststore.wishlist?.wishlistdetails || [],
  );
  const wishlistCount = wishlistItems.length;

  const subtotal = useMemo(() => {
    return cartdetails.reduce(
      (acc, obj) => acc + (obj.price || 0) * (obj.quantity || 1),
      0,
    );
  }, [cartdetails]);

  useEffect(() => {
    if (tokan) {
      dispatch(fetchcart());
      dispatch(fetchwishlist());
    }
  }, [tokan, dispatch]);

  useEffect(() => {
    magamanu()
      .then(setMenu)
      .catch((err) => console.error("Menu Error:", err));
  }, []);

  const Logout = () => {
    dispatch(removetokan());
    window.location.href = "/Login-Register";
  };

  // Toggle function for mobile categories
  const toggleMobileSub = (idx) => {
    setActiveMobileSub(activeMobileSub === idx ? null : idx);
  };

  return (
    <div className="w-full bg-white">
      {/* --- TOP BAR & MIDDLE SECTION (SAME AS YOUR CODE) --- */}
      <div className="border-b border-[#ebebeb]">
        <div className="max-w-[1370px] mx-auto flex flex-col md:flex-row justify-between items-center p-2.5 gap-2">
          <p className="text-[10px] md:text-[12px] text-center md:text-left">
            Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com
          </p>
          <div
            className="relative group"
            onClick={() => setOpenDropdown(!openDropdown)} // mobile click
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={userData?.userprofile || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-purple-100"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-700">
                  {userData?.UserName || "Guest"}
                </p>
                <p className="text-xs text-gray-500">{userData?.useremail}</p>
              </div>
              <RiArrowDownSLine className="text-gray-400 group-hover:rotate-180 transition-transform" />
            </div>
            <div
              className={`absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 
  transform transition-all duration-300 ease-out z-50 overflow-hidden

  ${openDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}

  md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0
  `}
            >
              <div className="p-4">
                <p className="text-sm font-semibold">My Account</p>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    href="/desbord?tab=dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-purple-50"
                  >
                    <RiUser3Line className="mr-3" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/desbord?tab=profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-purple-50"
                  >
                    <RiSettings4Line className="mr-3 text-lg" /> Complete
                    Profile
                  </Link>
                </li>

                {tokan ? (
                  <li
                    onClick={Logout}
                    className="px-4 py-2.5 text-sm text-red-500 cursor-pointer hover:bg-red-50 flex items-center transition-colors"
                  >
                    <RiLogoutCircleRLine className="mr-3 text-lg" />
                    Logout
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/Login-Register"
                      className="flex items-center px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <RiUser3Line className="mr-3 text-lg" />
                      Login / Register
                    </Link>
                  </li>
                )}

                {/* <li
                  onClick={Logout}
                  className="px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-50 flex items-center"
                >
                  <RiLogoutCircleRLine className="mr-3" /> Logout
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#ebebeb]">
        <div className="max-w-[1370px] mx-auto flex flex-wrap justify-between items-center p-4 md:p-5 gap-4">
          <div className="flex items-center gap-4">
            <RxHamburgerMenu
              className="text-2xl lg:hidden cursor-pointer"
              onClick={() => setOpenMobileMenu(true)}
            />
            <Link href="/">
              <img
                src="/images1.png"
                className="w-[120px] md:w-[156px]"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-6 order-3 md:order-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                placeholder="Search..."
                className="w-full md:w-60 shadow-sm focus:border-purple-400 border border-gray-200 px-4 py-2 rounded-xl outline-none"
                type="text"
              />
              <CiSearch className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-4 order-2 md:order-3">
            <Link href="/Wishlist" className="relative group">
              <FaHeart className="text-2xl group-hover:text-amber-500 transition-colors" />
              <sup className="absolute -top-2 -right-2 bg-[#ff3f6c] text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </sup>
            </Link>
            <div
              className="flex items-center border border-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:border-amber-500 transition-all gap-2"
              onClick={() => setopencart(true)}
            >
              <MdShoppingCart className="text-xl" />
              <p className="hidden sm:block font-semibold">Rs.{subtotal}</p>
              <div className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {cartdetails?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION --- */}
      <nav className="hidden lg:block border-b border-[#ebebeb]">
        <div className="max-w-[1370px] mx-auto">
          <ul className="flex justify-center gap-10">
            {/* Home Link */}
            <Link
              href="/"
              className="py-4 text-[13px] font-medium uppercase hover:text-amber-600"
            >
              Home
            </Link>

            {/* Dynamic Menu Items */}
            {menu?.map((item, idx) => (
              <li
                key={idx}
                className="group relative py-4 text-[13px] font-medium uppercase flex items-center gap-1 cursor-pointer hover:text-amber-600 menu-items"
              >
                {item.categoryName} <FaAngleDown />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-6 grid grid-cols-3 dropdown">
                  {item.subcategories?.map((sub, sIdx) => (
                    <div key={sIdx}>
                      <h3 className="font-bold text-black mb-3">
                        {sub.SubcategoryName}
                      </h3>
                      {sub.Subsubcategories?.map((ssub, ssIdx) => (
                        <Link
                          key={ssIdx}
                          href="/Product-Listing"
                          className="block text-gray-500 py-1 hover:text-amber-600 normal-case font-normal"
                        >
                          {ssub.SubsubcategoryName}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            ))}

            {/* Static Pages Dropdown */}
            <li className="relative z-10 uppercase cursor-pointer group hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium gap-2">
              pages <FaAngleDown />
              <div className="absolute top-full bg-white w-[250px] border border-[#ccc] shadow-sm hidden group-hover:flex">
                <div className="p-3">
                  <ul className="flex flex-col p-6 text-[#ccc] text-left">
                    <Link
                      href="/About-us"
                      className="pb-3 hover:text-black text-nowrap"
                    >
                      About Us
                    </Link>
                    <Link href="/Cart" className="pb-3 hover:text-black">
                      Cart
                    </Link>
                    <Link href="/Chachout" className="pb-3 hover:text-black">
                      Checkout
                    </Link>
                    <Link
                      href="/Frequently-Questions"
                      className="pb-3 hover:text-black text-nowrap"
                    >
                      Frequently Questions
                    </Link>
                  </ul>
                </div>
              </div>
            </li>

            {/* Contact Link */}
            <Link
              href="/contect"
              className="py-4 text-[13px] font-medium uppercase hover:text-amber-600"
            >
              Contact Us
            </Link>
          </ul>
        </div>
      </nav>

      {/* --- UPDATED MOBILE DRAWER NAVIGATION --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity ${
          openMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpenMobileMenu(false)}
      >
        <div
          className={`w-[280px] bg-white h-full transition-transform duration-300 overflow-y-auto ${
            openMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <RxCross2
              className="text-2xl cursor-pointer"
              onClick={() => setOpenMobileMenu(false)}
            />
          </div>

          <ul className="flex flex-col">
            {/* Home Link */}
            <li className="border-b">
              <Link
                href="/"
                className="block p-4 font-medium uppercase text-sm"
                onClick={() => setOpenMobileMenu(false)}
              >
                Home
              </Link>
            </li>

            {/* Dynamic Menu Items */}
            {menu?.map((item, idx) => (
              <li key={idx} className="border-b">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleMobileSub(idx)}
                >
                  <span className="font-medium uppercase text-sm">
                    {item.categoryName}
                  </span>
                  {activeMobileSub === idx ? (
                    <FaAngleUp className="text-amber-600" />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>

                {/* Subcategories (Accordion Content) */}
                {activeMobileSub === idx && (
                  <div className="dropdown bg-gray-50 px-4 pb-4">
                    {item.subcategories?.map((sub, sIdx) => (
                      <div key={sIdx} className="mt-4">
                        <h3 className="font-bold text-xs uppercase text-gray-800 mb-2 border-l-2 border-amber-500 pl-2">
                          {sub.SubcategoryName}
                        </h3>
                        <div className="flex flex-col gap-2 pl-3">
                          {sub.Subsubcategories?.map((ssub, ssIdx) => (
                            <Link
                              key={ssIdx}
                              href="/Product-Listing"
                              className="text-sm text-gray-600 py-1"
                              onClick={() => setOpenMobileMenu(false)}
                            >
                              {ssub.SubsubcategoryName}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* Contact Link */}
            <li className="border-b">
              <Link
                href="/contect"
                className="block p-4 font-medium uppercase text-sm"
                onClick={() => setOpenMobileMenu(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- CART SIDEBAR (SAME AS YOUR CODE) --- */}

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

        {/* Scrollable Area */}
        <div className="h-[calc(100vh-190px)] overflow-y-auto custom-scrollbar px-4 py-6">
          <div className="flex flex-col gap-6 text-center">
            {tokan ? (
              <>
                {cartdetails && cartdetails.length > 0 ? (
                  cartdetails.map((item) => {
                    const isLiked = wishlistItems.some(
                      (wItem) => wItem._id === item._id,
                    );

                    return (
                      <div
                        key={item._id}
                        className="w-full flex justify-center"
                      >
                        <div className="w-full bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden border border-gray-100">
                          <img
                            src={item.productImg}
                            alt={item.ProductName}
                            className="h-40 w-full object-cover"
                          />
                          <div className="px-4 py-3">
                            <span className="text-gray-400 text-[12px] uppercase block mb-1">
                              Nest Of Tables
                            </span>
                            <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">
                              {item.ProductName}
                            </p>

                            <div className="border-t my-3 border-[#ccc]"></div>

                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-600 line-through">
                                  Rs. {item.price}
                                </p>
                                <p className="text-lg font-semibold text-black">
                                  Rs. {item.SalePrice}
                                </p>
                              </div>

                              <div className="flex gap-2 mt-2">
                                <div
                                  onClick={(e) =>
                                    handleLikeClick(e, item, isLiked)
                                  }
                                  className="p-2 border border-[#ebebeb] bg-[#f9f9f9] cursor-pointer rounded-md"
                                >
                                  <FaHeart
                                    className={`transition-colors duration-300 ${isLiked ? "text-[#c09578]" : "text-gray-400"}`}
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    axios
                                      .delete(
                                        `${basurl}cart/delete-cart/${item._id}`,
                                      )
                                      .then((res) => {
                                        if (res.data._status === true) {
                                          dispatch(
                                            removeItemFromCart(item._id),
                                          );
                                        }
                                      });
                                  }}
                                  className="bg-[#ebebeb] px-3 py-1 text-[12px] font-bold uppercase rounded-md hover:bg-red-50 hover:text-red-500 transition-all"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-gray-400 font-medium">
                    Your cart is empty!
                  </div>
                )}
              </>
            ) : (
              <div className="py-10 text-gray-400 font-medium">
                Please login to see cart!
              </div>
            )}
          </div>
        </div>

        {/* Total & Checkout (Bottom Fixed) */}
        <div className="absolute bottom-0 left-0 w-full p-5 bg-white border-t">
          <div className="flex justify-between items-center mb-4 text-xl font-bold">
            <span>Total:</span>
            <span className="text-[#C09578]">Rs. {subtotal}</span>
          </div>
          <button className="w-full py-4 bg-black text-white font-bold hover:bg-[#C09578] transition-all uppercase tracking-wider">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
