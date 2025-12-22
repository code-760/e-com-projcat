"use client"
import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";

export default function Featured_produte() {
  let [activeTab, setactiveTab] = useState("Featured")

  console.log(activeTab);


  return (
    <div>
      <div className='w-[1170px] mx-auto text-center'>
        <div className=' relative    ' >

          <div className=' absolute top-[50%] left-0  border-t-3 border-[#ebebeb] w-[391px] '>


          </div >
          <div className='flex  text-center  justify-center'>

            <h1 className={`border-4 px-6 py-3 text-[18px] border-[#ebebeb] font-medium ${activeTab === "Featured" ? " border-orange-300 text-[#C09578]" : "border-[#ebebeb]"}  `} onClick={() => setactiveTab("Featured")}> Featured </h1>
            <h1 className={`border-4 px-6 py-3 text-[18px] border-[#ebebeb] font-medium ${activeTab === "New Arrivals" ? " border-orange-300" : "border-[#ebebeb]"}  `} onClick={() => setactiveTab("New Arrivals")}> New Arrivals </h1>
            <h1 className={`border-4 px-6 py-3 text-[18px] border-[#ebebeb] font-medium ${activeTab === "Onsale" ? " border-orange-300" : "border-[#ebebeb]"}  `} onClick={() => setactiveTab("Onsale")}> Onsale </h1>
          </div>
          <div className=' absolute top-[50%] right-0 border-t-3 w-[391px] border-[#ebebeb]  to-transparent'>


          </div >


        </div>


      </div>
      <div>


        {/* Featured */}

        {
          activeTab === "Featured" &&

          <div className='w-[1370px] mx-auto mt-10  grid grid-cols-4 gap-5'>
            {/* Featured */}
            
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Coffee Tables

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Evan Coffee Table</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 2,600</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,300</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Shoe Racks

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Gloria Shoe Racks</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,400 </p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,900</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620077669499Erica%20Bookshelfs_brown.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Bookshelves

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Erica Bookshelfs</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 38,000 </p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 30,000</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615277326496Sapien%20Sofa%20Cum%20Bed__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Wooden Sofa Cum Bed

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Sapien Sofa Cum Bed</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 64,000 </p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 54,000</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615225341228Ganthur%20Sheesham%20Wood%20Sofa%20Set___.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">2 Seater Sofa

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Ganthur Sheesham Wood Sofa Set</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 8,000 </p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 7,600</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617816851291Calina%20Swing%20Jhula__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Wooden Jhula

</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Calina Swing Jhula</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 65,000 </p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 58,000</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          
           
          


          </div>
        }
        {/* New Arrivals */}
        {
          activeTab === "New Arrivals" &&
          <div className='w-[1370px] mx-auto mt-10  grid grid-cols-4 gap-5'>
            {/* Featured */}

            
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>


          </div>
        }


        {/* Onsale */}

        {
          activeTab === "Onsale" &&
          <div className='w-[1370px] mx-auto mt-10  grid grid-cols-4 gap-5'>
            {/* Featured */}
            pppppp
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="w-72 bg-white shadow-md  hover:shadow-xl">
              <a href="#">
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="Product" className="h-40 w-72 object-center rounded-t-xl" />
                <div className="px-4 py-3 text-center w-72">

                  <span className="text-gray-400 my-5  text-[12px] uppercase ">Nest Of Tables</span>
                  <p className="text-lg font-bold text-black truncate block capitalize font-[cha] hover:text-[#C09578]">Caroline Study Tables</p>
                  <div className=' border my-4 border-[#ccc] '></div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className=' flex items-center'>
                      <p className=" text-smcursor-auto  text-gray-600  cursor-auto line-through ">Rs. 3,000</p>
                      <p className=" text-lg font-semibold  text-black ml-2"> Rs. 2,500</p>
                    </div>
                    <div className="text-center flex gap-1 ">
                      <div className=' py-1 px-2 border-[#ebebeb] hover:text-[#C09578] flex items-center bg-[#ebebeb]'>
                        <FaHeart />
                      </div>
                      <div className=' border p-1  border-[#ebebeb] bg-[#ebebeb]' >
                        <h5>Add cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>


          </div>
        }




      </div>
    </div>
  )
}
