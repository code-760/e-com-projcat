import React from 'react'
import { BiWorld } from "react-icons/bi";
import { LuCircleCheckBig } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { FaStar } from "react-icons/fa6";

export default function Over_sprort() {
    return (
        <div className="w-full overflow-hidden">
            {/* Trust Badges Section */}
            <div className='bg-[#F8F9F9] py-10 md:h-[300px] flex items-center'>
                <div className='max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 w-full'>
                    <div className='flex flex-col justify-center items-center text-center group'>
                        <BiWorld className='hover:text-[#C09578] p-4 rounded-full border border-gray-300 w-16 h-16 text-3xl transition-colors duration-300' />
                        <h5 className='py-1 mt-3 text-[20px] font-[cha] font-semibold'>Free Shipping</h5>
                        <p className='text-gray-600 text-sm'>Free shipping on all orders</p>
                    </div>
                    
                    <div className='flex flex-col justify-center items-center text-center group'>
                        <LuCircleCheckBig className='hover:text-[#C09578] p-4 rounded-full border border-gray-300 w-16 h-16 text-3xl transition-colors duration-300' />
                        <h5 className='py-1 mt-3 text-[20px] font-[cha] font-semibold'>Money Return</h5>
                        <p className='text-gray-600 text-sm'>Back guarantee under 7 days</p>
                    </div>

                    <div className='flex flex-col justify-center items-center text-center group'>
                        <GoClock className='hover:text-[#C09578] p-4 rounded-full border border-gray-300 w-16 h-16 text-3xl transition-colors duration-300' />
                        <h5 className='py-1 mt-3 text-[20px] font-[cha] font-semibold'>Online Support</h5>
                        <p className='text-gray-600 text-sm'>Support online 24 hours a day</p>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className='bg-white'>
                <div className='max-w-[1370px] mx-auto text-center flex flex-col items-center my-10 md:my-[50px] py-10 md:py-[50px] px-4'>
                    <h2 className='text-[25px] pb-5 font-[cha] font-semibold uppercase tracking-wider'>What Our Customers Say?</h2>
                    
                    <div className='max-w-[800px]'>
                        <p className='font-medium text-[#646464] leading-relaxed italic'>
                            "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!"
                        </p>
                    </div>

                    <div className='mt-8'>
                        <img 
                            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#C09578] p-1" 
                            alt="Customer" 
                        />
                    </div>
                    
                    <h5 className='pt-4 text-[20px] font-[cha] font-bold'>Kathy Young</h5>
                    <p className='text-[14px] text-gray-500 pb-3'>CEO of SunPark</p>
                    
                    <ul className='flex text-[#C09578] gap-1'>
                        {[...Array(5)].map((_, i) => <li key={i}><FaStar /></li>)}
                    </ul>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className='bg-[#F8F9F9] py-16 px-4'>
                <div className='max-w-[1370px] mx-auto text-center'>
                    <h2 className='text-3xl py-2 font-[cha] font-semibold uppercase'>Our Newsletter</h2>
                    <p className='py-1 pb-8 text-gray-600'>Get E-mail updates about our latest shop and special offers.</p>
                    
                    <div className='flex flex-col md:flex-row justify-center items-center gap-0 max-w-[800px] mx-auto'>
                        <input 
                            type="text" 
                            placeholder='Email address...' 
                            className='w-full md:w-[70%] p-3 md:p-4 rounded-t-md md:rounded-l-md md:rounded-t-none outline-none bg-white border border-gray-300' 
                        />
                        <button className='w-full md:w-auto px-10 py-3 md:py-4 rounded-b-md md:rounded-r-md md:rounded-b-none bg-[#C09578] duration-300 hover:bg-black text-white font-semibold uppercase tracking-widest text-sm'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}