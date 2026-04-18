import Link from 'next/link';
import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

export default function About_us() {
    return (
        <div className="w-full">
            {/* Breadcrumb Section */}
            <div className='text-center flex flex-col items-center py-8 md:py-12 bg-gray-50'>
                <h1 className='p-2 text-3xl md:text-4xl font-semibold font-[cha] uppercase tracking-wider'>About us</h1>
                <div className='flex items-center gap-1 text-sm md:text-base'>
                    <div className='flex items-center hover:text-[#c09578] transition-colors'>
                        <Link href={"/"}>Home</Link>
                        <MdOutlineNavigateNext className="text-xl" />
                    </div>
                    <p className="text-gray-500">About us</p>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className='max-w-[1370px] mx-auto flex items-center justify-center my-6 px-4'>
                <div className="w-full overflow-hidden rounded-lg shadow-sm">
                    <img 
                        src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg' 
                        alt="About Monsta Furniture"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Welcome Text Section */}
            <div className='max-w-[1370px] mx-auto text-center py-8 px-6 md:px-20'>
                <div>
                    <h2 className='py-4 text-2xl md:text-3xl font-semibold font-[cha]'>Welcome to Monsta!</h2>
                </div>
                <div className="max-w-[900px] mx-auto">
                    <p className='py-2 text-gray-600 leading-relaxed text-sm md:text-base'>
                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
                    </p>
                </div>
                <div className="mt-4">
                    <p className='text-[#c09578] italic font-medium md:text-lg'>
                        “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='max-w-[1370px] mx-auto mt-10 px-4'>
                <div className='text-center mb-10'>
                    <h2 className='text-2xl md:text-3xl font-[cha] font-semibold uppercase tracking-widest'>Why choose us?</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='flex flex-col items-center text-center p-4'>
                        <img 
                            src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg' 
                            className="mb-4 hover:scale-105 transition-transform duration-300"
                            alt="Guarantee"
                        />
                        <h6 className='pb-3 font-[cha] font-semibold text-xl'>100% Money Back Guarantee</h6>
                        <p className="text-gray-500 text-sm">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>

                    <div className='flex flex-col items-center text-center p-4'>
                        <img 
                            src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg'
                            className="mb-4 hover:scale-105 transition-transform duration-300"
                            alt="Support"
                        />
                        <h6 className='pb-3 font-[cha] font-semibold text-xl'>Online Support 24/7</h6>
                        <p className="text-gray-500 text-sm">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>

                    <div className='flex flex-col items-center text-center p-4'>
                        <img 
                            src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg' 
                            className="w-full rounded-lg shadow-sm"
                            alt="Quality"
                        />
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className='max-w-[1370px] mx-auto text-center flex flex-col items-center my-12 py-12 px-6 bg-gray-50 md:rounded-2xl'>
                <div className="mb-6">
                    <h2 className='text-2xl md:text-3xl pb-3 font-[cha] font-semibold uppercase'>What Our Customers Say?</h2>
                </div>
                <div className='max-w-[800px] mb-8'>
                    <p className='font-medium text-[#646464] italic leading-relaxed md:text-lg'>
                        "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!"
                    </p>
                </div>
                <div className='mb-4'>
                    <img 
                        src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg" 
                        alt="Kathy Young"
                        className="w-20 h-20 rounded-full border-2 border-[#C09578] p-1"
                    />
                </div>
                <div>
                    <h5 className='text-xl font-[cha] font-bold'>Kathy Young</h5>
                    <p className='text-sm text-gray-500 mb-2 font-medium'>CEO of SunPark</p>
                    <ul className='flex text-[#C09578] justify-center gap-1'>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}