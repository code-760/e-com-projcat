"use client"
import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Link from 'next/link';

export default function Header() {
  let [opencart, setopencart] = useState(false)
  return (
    <div className=' ' >
      {/* top */}
      <div className='  border-b border-[#ebebeb]  '>
        <div className='w-[1370px] mx-auto flex justify-between p-2.5'>
          <div>
            <p className='text-[12px]'>Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com</p>
          </div>
          <div>
            <p className='text-[12px]'>Login / Register</p>
          </div>
        </div>
      </div>
      {/* midde */}
      <div  >
        <div className=' border-b border-[#ebebeb] relative ' >
          <div className=' w-[1370px] mx-auto flex justify-between p-5  '>
            <div>
              <img src="/images1.png" className='w-[156px] h[40px]' alt="" />
            </div>
            <div className=' flex items-center gap-4'>
              <div className="relative  ">
                <input
                  placeholder="Search..."
                  className=" inputn w-60 shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w- transition-all focus:w-64 outline-none"
                  name="search"
                  type='text'
                />
                <div className=' absolute top-3 right-2  border-l  p-2'>
                  <CiSearch className='  ' />
                </div>
              </div>
              <div className=' border p-3 border-[#ccc] ' >
                <FaHeart className=' hover:text-amber-200' />
              </div>
              <div className='border relative flex items-center  px-3 border-[#ccc] py-2 hover:text-[#C09578] gap-2' onClick={() => setopencart(true)}>
                <div className=' border-r p-2 border-[#ccc]' >
                  <MdShoppingCart />
                </div>
                <div>
                  <p>Rs.4800</p>
                </div>
                <div>
                  <FaAngleDown />
                </div>
                <div className=' bg-[#C09578] w-5 h-5 absolute top-3.5 -left-2.5  rounded-2xl flex items-center text-center'>
                  <p className='text-black p-1.5 text-center'>0</p>
                </div>
              </div>
            </div>
          </div>
          {/* side cart */}
          <div className={`w-[320px] z-10 bg-white shadow h-screen fixed top-0 right-0 transform transition-all duration-500 ${opencart ? 'translate-x-0' : 'translate-x-full'} `}>
            <div className=' flex items-center justify-between p-5'>
              <div><h3 className='text-[20px] font-bold '>Cart</h3></div>
              <div><RxCross2 onClick={() => setopencart(false)} /></div>
            </div>
            <div className='my-6'>
              <img src='/my-Order.jpg' alt="" className='' />
              <div className='border-y p-6 border-[#ccc]'>
                <div className='text-center'>
                  <p className='text-[#a19e9e]'>Your shopping cart is empty!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* manu */}
      <div className=' border flex items-center border-[#ebebeb]  ' >
        <div className='w-[1370px] mx-auto text-center  '>
          <nav className=''>
            <ul className=' flex gap-[60px] justify-center   '>
              <Link href={"/"} className='text-[#C09578]  uppercase cursor-pointer text-[13px]  py-5  font-medium'>Home</Link>
              <li className=' z-10 relative  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium gap-2'>living<FaAngleDown />
                <div className=' absolute  bg-white  top-full w-[700px] hidden group-hover:flex   border border-[#CCC] shadow-[#ccc] '>
                  <div className=' grid grid-cols-3 p-3 '>
                    <div>
                      <ul className=' p-6 text-[#ccc] text-left'>
                        <h3 className='pb-4 text-black font-bold  hover:text-[#D2A278]'>Tables</h3>
                        <Link href={"/Product-Listing"}  className='pb-3 hover:text-black'>Side and End Tables</Link>
                        <li className='pb-3 hover:text-black'>Nest Of Tables</li>
                        <li className='pb-3 hover:text-black'>Coffee Table Sets</li>
                        <li className='pb-3 hover:text-black'>Coffee Tables</li>
                      </ul>
                    </div>
                    <div>
                      <ul className=' p-6 text-[#ccc]  text-left'>
                        <h3 className='pb-4 text-black font-bold  hover:text-[#D2A278] '>Mirror</h3>
                        <li className='pb-3 hover:text-black'>Wooden Mirrors</li>
                      </ul>
                    </div>
                    <div>
                      <ul className=' p-6  text-left text-[#ccc]'>
                        <h3 className='pb-4 text-black font-bold text-left  hover:text-[#D2A278] ' >Living Storage/collections</h3>
                        <li className='pb-3 hover:text-black'>Prayer Units</li>
                        <li className='pb-3 hover:text-black'>Display Unit</li>
                        <li className='pb-3 hover:text-black'>Shoe Racks</li>
                        <li className='pb-3 hover:text-black'>Chest Of Drawers</li>
                        <li className='pb-3 hover:text-black'>Cabinets and Sideboard</li>
                        <li className='pb-3 hover:text-black'>Bookshelves</li>
                        <li className='pb-3 hover:text-black'>Tv Units</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className=' z-10 relative  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium  gap-2'>sofa<FaAngleDown />
                <div className=' absolute bg-white top-full w-[700px] border border-[#ccc] shadow-[#ccc] hidden group-hover:flex  '>
                  <div className=' grid grid-cols-3 p-3 '>
                    <div>
                      <ul className=' p-6 text-[#ccc] text-left'>
                        <h3 className='pb-4 text-black font-bold  hover:text-[#D2A278]'>Sofa Cum Bed</h3>
                        <li className='pb-3 hover:text-black'>Wooden Sofa Cum Bed</li>
                      </ul>
                    </div>
                    <div>
                      <ul className=' p-6 text-[#ccc]  text-left'>
                        <h3 className='pb-4 text-black font-bold   hover:text-[#D2A278] '>Sofa Sets</h3>
                        <Link href={"/Product-Listing"} className='pb-3 hover:text-black font-medium'>  L Shape Sofa</Link>
                        <li className='pb-3 hover:text-black font-medium'>1 Seater Sofa</li>
                        <li className='pb-3 hover:text-black font-medium'> 2 Seater Sofa</li>
                        <li className='pb-3 hover:text-black font-medium'> 3 Seater Sofa</li>
                        <li className='pb-3 hover:text-black font-medium'>Wooden Sofa Sets</li>
                        <li className='pb-3 hover:text-black font-medium'>Normal </li>
                      </ul>
                    </div>
                    <div>
                      <ul className=' p-6  text-left text-[#ccc]'>
                        <h3 className='pb-4 text-black font-medium text-left  hover:text-[#D2A278] ' >Swing Jhula</h3>
                        <li className='pb-3 hover:text-black font-medium'>Wooden Jhula</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className=' relative z-10  uppercase cursor-pointer group  hover:text-[#C09578] text-[13px] flex items-center py-5 font-medium  gap-2'>pages<FaAngleDown />
                <div className=' absolute top-full bg-white w-[250px] border border-[#ccc] shadow-[#ccc] hidden group-hover:flex  '>
                  <div className=' grid grid-cols-3 p-3 '>
                    <div>
                      <ul className=' flex flex-col p-6 text-[#ccc] text-left'>
                        <Link href={"/About-us"} className='pb-3 hover:text-black text-nowrap'>About Us</Link>
                        <Link href={"/Cart"} className='pb-3 hover:text-black'>Cart</Link>
                        <Link href={"/Chachout"} className='pb-3 hover:text-black'>Checkout</Link>
                        <Link href={"/Frequently-Questions"} className='pb-3 hover:text-black text-nowrap'>Frequently Questions</Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <Link href={"/contect"} className=' uppercase cursor-pointer  hover:text-[#C09578] text-[13px]  py-5 flex items-center font-medium gap-2'>Contact Us</Link>
            </ul>
          </nav>

        </div>
      </div>





    </div>




  )
}
