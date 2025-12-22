import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            <div className=' w-[1370px] mx-auto grid grid-cols-3 p-4'>
                <div>
                    <div>
                        <div className='pb-6'>
                            <h2 className='text-[25px] font-[cha] capitalize  ' >Contact Us</h2>

                        </div>
                        <div>
                            <p>Address: Claritas est etiam processus dynamicus</p>
                        </div>
                        <div>
                            <p>Phone: 98745612330</p>
                        </div>
                        <div>
                            <p>Email: furnitureinfo@gmail.com</p>
                        </div>
                    </div>
                    <div className=' flex gap-3 '>
                        <div className=' flex items-center justify-center text-[#ccc] w-10 h-10 rounded-full font-medium border p-2 hover:text-[#C09578] '>
                            <FaFacebookF className='text-[20px]' />
                        </div>
                        <div className=' flex items-center justify-center w-10 h-10 rounded-full font-medium border p-2  hover:text-[#C09578] text-[#ccc] '>
                            <FaInstagram className='text-[20px]' />
                        </div>
                        <div className=' flex items-center justify-center w-10 h-10 rounded-full font-medium border p-2 hover:text-[#C09578] text-[#ccc]  '>
                            <FaTwitter className='text-[20px]' />
                        </div>
                        <div className=' flex items-center justify-center w-10 h-10 rounded-full font-medium border p-2 hover:text-[#C09578] text-[#ccc]  '>
                            <FaLinkedinIn className='text-[20px]' />
                        </div>
                        <div className=' flex items-center justify-center w-10 h-10 rounded-full font-medium border p-2 hover:text-[#C09578] text-[#ccc]  '>
                            <AiFillYoutube className='text-[20px]' />
                        </div>
                        <div className=' flex items-center justify-center w-11 h-11 rounded-full font-medium border p-2 hover:text-[#C09578] text-[#ccc]  '>
                            <FaTelegram className='text-[20px]' />
                        </div>









                    </div>


                </div>
                <div className=' grid grid-cols-2'>
                    <div>
                        <div><h2 className='font-[cha] pb-6 text-[20px]'  >My Account</h2></div>
                        <div><Link href={"/desbord"} className='pb-1 hover:text-[#D2A278] cursor-pointer'>My Dashboard</Link></div>
                        <div><Link href={"/Wishlist"} className='pb-1 hover:text-[#D2A278] cursor-pointer'>Wishlist</Link></div>
                        <div><Link href={"/Cart"} className='pb-1 hover:text-[#D2A278] cursor-pointer'>Cart</Link></div>
                        <div><h6 className='pb-1 hover:text-[#D2A278] cursor-pointer'>Checkout</h6></div>
                    </div>
                    <div>
                        <div>
                            <div><h2 className='font-[cha] pb-6 text-[20px] '  >Information</h2></div>
                            <div><h6 className='pb-1 hover:text-[#D2A278] cursor-pointer'>About Us</h6></div>
                            <div><Link href={"/contect"} className='pb-1 hover:text-[#D2A278] text-black cursor-pointer'>Contact Us</Link></div>
                            <div><h6 className='pb-1 hover:text-[#D2A278] cursor-pointer'>Frequently Questions</h6></div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='pb-3'>
                        <div><h2 className='font-[cha] text-[20px] pb-6'>Top Rated Products</h2></div>
                        <div className=' flex gap-2'>
                            <div><img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615225341228Ganthur%20Sheesham%20Wood%20Sofa%20Set___.jpg" className='w-20' alt="" /></div>
                            <div>
                                <div><p className='text-[14px]'>2 Seater Sofa</p></div>
                                <div><p className='font-[cha] text-[18px] hover:text-[#C09578]'>Ganthur Sheesham Wood Sofa Set</p></div>
                                <div className=' flex gap-2'>
                                    <div><p className='text-[#ccc] line-through'>Rs. 8,000</p></div>
                                    <div><p> Rs. 7,600</p></div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div>
                     
                        <div className=' flex gap-2'>
                            <div><img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" className='w-20' alt="" /></div>
                            <div>
                                <div><p className='text-[14px]'>Side and End Tables</p></div>
                                <div><p className='font-[cha] text-[18px] hover:text-[#C09578]'>Hrithvik Stool</p></div>
                                <div className=' flex gap-2'>
                                    <div><p className='text-[#ccc] line-through'>Rs. 7,000 </p></div>
                                    <div><p> Rs. 6,000</p></div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>


            </div>
            <div className=' border-y border-[#ccc] mt-14 flex justify-center gap-6 p-6 font-medium '>

                <div><Link href={"/"} className='hover:text-[#D2A278]  text-[#ccc]  cursor-pointer '>Home</Link></div>
                <div><h3 className='hover:text-[#D2A278]  text-[#ccc] cursor-pointer'> Online Store</h3></div>
                <div><h3 className='hover:text-[#D2A278]  text-[#ccc] cursor-pointer'>Privacy Policy</h3></div>
                <div><h3 className='hover:text-[#D2A278]  text-[#ccc] cursor-pointer'> Terms Of Use</h3></div>
               


            </div>

            <div className='w-[1370px] mx-auto text-center mt-10'>
                <div className='mb-1.5'>
                    <p>All Rights Reserved By Furniture | © 2025</p>
                </div>
                <div className=' flex justify-center'>
                    <div><img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="" /></div>
                    
                </div>


            </div>
        </div>
    )
}
