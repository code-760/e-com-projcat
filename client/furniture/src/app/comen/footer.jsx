import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="w-full">
            {/* Main Footer Content */}
            <div className='max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4'>
                
                {/* Contact Section */}
                <div className='space-y-4'>
                    <div className='pb-2'>
                        <h2 className='text-[25px] font-[cha] capitalize'>Contact Us</h2>
                    </div>
                    <div className='space-y-2'>
                        <p>Address: Claritas est etiam processus dynamicus</p>
                        <p>Phone: 98745612330</p>
                        <p>Email: furnitureinfo@gmail.com</p>
                    </div>
                    
                    {/* Social Icons */}
                    <div className='flex flex-wrap gap-3 pt-4'>
                        {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, AiFillYoutube, FaTelegram].map((Icon, index) => (
                            <div key={index} className='flex items-center justify-center text-[#ccc] w-10 h-10 rounded-full border hover:text-[#C09578] transition-colors cursor-pointer'>
                                <Icon className='text-[20px]' />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Link href={`/Decbord`} className='font-[cha] pb-4 text-[20px]'>My Account</Link>
                        <Link href={"/desbord"} className='hover:text-[#D2A278] cursor-pointer'>My Dashboard</Link>
                        <Link href={"/Wishlist"} className='hover:text-[#D2A278] cursor-pointer'>Wishlist</Link>
                        <Link href={"/Cart"} className='hover:text-[#D2A278] cursor-pointer'>Cart</Link>
                        <Link href={`/Chakout`} className='hover:text-[#D2A278] cursor-pointer'>Checkout</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-[cha] pb-4 text-[20px]'>Information</h2>
                        <Link href={`/About-us`} className='hover:text-[#D2A278] cursor-pointer'>About Us</Link>
                        <Link href={"/contect"} className='hover:text-[#D2A278] cursor-pointer'>Contact Us</Link>
                        <Link href={"/FAQ"} className='hover:text-[#D2A278] cursor-pointer'>Frequently Questions</Link>
                    </div>
                </div>

                {/* Products Section */}
                <div className='space-y-6'>
                    <h2 className='font-[cha] text-[20px]'>Top Rated Products</h2>
                    
                    {/* Product 1 */}
                    <div className='flex gap-4'>
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615225341228Ganthur%20Sheesham%20Wood%20Sofa%20Set___.jpg" className='w-20 h-20 object-cover' alt="Sofa" />
                        <div>
                            <p className='text-[14px] text-gray-500'>2 Seater Sofa</p>
                            <p className='font-[cha] text-[16px] hover:text-[#C09578] cursor-pointer'>Ganthur Sheesham Wood Sofa Set</p>
                            <div className='flex gap-2 text-[14px]'>
                                <span className='text-[#ccc] line-through'>Rs. 8,000</span>
                                <span className='font-bold text-[#C09578]'>Rs. 7,600</span>
                            </div>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className='flex gap-4'>
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" className='w-20 h-20 object-cover' alt="Stool" />
                        <div>
                            <p className='text-[14px] text-gray-500'>Side and End Tables</p>
                            <p className='font-[cha] text-[16px] hover:text-[#C09578] cursor-pointer'>Hrithvik Stool</p>
                            <div className='flex gap-2 text-[14px]'>
                                <span className='text-[#ccc] line-through'>Rs. 7,000</span>
                                <span className='font-bold text-[#C09578]'>Rs. 6,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className='border-y border-[#ccc] mt-14 flex flex-wrap justify-center gap-4 md:gap-10 p-6 font-medium'>
                <Link href={"/"} className='hover:text-[#D2A278] text-[#999] cursor-pointer'>Home</Link>
                <Link href={`/Product-Listing`} className='hover:text-[#D2A278] text-[#999] cursor-pointer'>Online Store</Link>
                <Link href={`/Privacy-Policy`} className='hover:text-[#D2A278] text-[#999] cursor-pointer'>Privacy Policy</Link>
                <Link href={`/Terms-Of-Use`} className='hover:text-[#D2A278] text-[#999] cursor-pointer'>Terms Of Use</Link>
            </div>

            {/* Copyright and Payment */}
            <div className='max-w-[1370px] mx-auto text-center mt-10 pb-10 px-4'>
                <p className='mb-3 text-sm'>All Rights Reserved By Furniture | © 2025</p>
                <div className='flex justify-center'>
                    <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="Payment Methods" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    )
}