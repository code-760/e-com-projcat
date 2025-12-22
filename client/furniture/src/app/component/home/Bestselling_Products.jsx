"use client";
import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { FaHeart } from "react-icons/fa";

import Slider from 'react-slick';

export default function Bestselling_Products() {

    const settings = {
        
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll:1,
        autoplay: true,
         arrows: true,

    };

    return (
        <div className="slider-container w-[1170px] h-auto  my-12 mx-auto">
            <div>
                <div className=' relative flex  items-center' >
                    <h2 className='pb-10 text-3xl font-[cha]'>Bestselling Products</h2>
                    <div className=' absolute top-[28%] right-0 w-[925px] border-[#ccc] border-t'></div>
                </div>
            </div>
            <Slider {...settings} className='h-full' >
                <div>
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
                <div>
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
                </div>
                <div>

                    <div className="w-72 border-[#CCC] border bg-white shadow-[#cccccc91]  hover:shadow-[#ccc] ">
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
                </div>
                <div>
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
                </div>
                <div>

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


                </div>
                <div>

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
                </div>
                <div>
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



            </Slider>



        </div>
    )
}
