import React from 'react'
import { BiWorld } from "react-icons/bi";
import { LuCircleCheckBig } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { FaStar } from "react-icons/fa6";

export default function Over_sprort() {
    return (
        <div>
            <div className='bg-[#F8F9F9] h-[300px] flex items-center'>
                <div className='w-[1370px] mx-auto grid grid-cols-3 my-6 py-12 '>
                    <div className=' flex flex-col justify-center items-center text-center'>
                        <BiWorld className=' hover:text-[#C09578] p-5 rounded-full border w-15 h-15 text-[2px]' />
                        <h5 className='py-1 text-[20px] font-[cha]'>Free Shipping</h5>
                        <p className=''>Free shipping on all order</p>
                    </div>
                    <div className='  flex flex-col justify-center items-center text-center'>

                        <LuCircleCheckBig className=' hover:text-[#C09578] p-5 rounded-full border w-15 h-15 text-[2px]' />

                        <h5 className='py-1 text-[20px] font-[cha]'>Money Return</h5>
                        <p className=''>Back guarantee under 7 days</p>

                    </div>
                    <div className=' flex flex-col justify-center items-center text-center'>


                        <GoClock className='  hover:text-[#C09578] p-5 rounded-full border w-15 h-15 text-[2px]' />

                        <h5 className='py-1 text-[20px] font-[cha]'>Online Support</h5>
                        <p className=''>Support online 24 hours a day</p>

                    </div>
                </div>

            </div>
            <div>
                <div className='w-[1370px] mx-auto text-center flex flex-col items-center  my-[50px] py-[50px]'>
                    <div>
                        <h2 className='text-[25px] pb-3 font-[cha] font-semibold'>What Our Custumers Say ?</h2>
                    </div>
                    <div>
                        <p className='font-medium text-[#646464]'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support <br /> team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                    </div>
                    <div>
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg" alt="" />
                    </div>
                    <div>
                        <h5 className='py-6 text-[20px] font-[cha]'>Kathy Young</h5>
                    </div>
                    <div>
                        <p className='text-[15px] pb-2'>CEO of SunPark</p>
                    </div>
                    <div>
                        <ul className=' flex text-[#C09578]'>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                        </ul>
                    </div>


                </div>

            </div>
            <div className='  bg-[#F8F9F9]'>
                <div className='w-[1370px] mx-auto text-center py-[50px] '>
                    <div>
                        <h2 className='text-3xl py-2 font-[cha] font-semibold'>Our Newsletter</h2>
                    </div>
                    <div>
                        <p className=' py-1 pb-3'>Get E-mail updates about our latest shop and special offers.</p>
                    </div>
                    <div>
                        <input type="text" placeholder='Email address...' className='w-[690px] p-2 rounded-md outline-none  bg-white border border-gray-300 ' />
                        <button className=' px-8 py-2 rounded-md bg-[#C09578] duration-300  hover:bg-black text-white font-semibold'>Subscribe</button>
                    </div>


                </div>


            </div>


        </div>
    )
}
