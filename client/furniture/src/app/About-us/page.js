import Link from 'next/link';
import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa6";


export default function About_us() {
    return (
        <div>
            <div className='text-center flex flex-col items-center'>
                <h1 className='p-4 text-4xl font-semibold font-[cha]'>About us</h1>
                <div className=' flex '>

                    <div className=' flex items-center hover:text-[#c09578]'><Link href={"/"}>Home</Link><MdOutlineNavigateNext /></div>
                    <p>About us</p>
                </div>
            </div>
            <div className='w-[1370px] mx-auto flex items-center justify-center my-3'>
                <div >
                    <img src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg' />
                </div>
            </div>
            <div className=' w-[1370px] mx-auto text-center py-4'>
                <div>
                    <h1 className='py-4 text-2xl font-semibold font-[cha]'>Welcome to Monsta!</h1>
                </div>
                <div>
                    <p className='py-2'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                </div>
                <div>
                    <p className='text-[#c09578]'>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
                </div>
            </div>
            <div className='w-[1370px] mx-auto mt-7'>
                <div className='text-center'>
                    <h1 className='text-2xl font-[cha] font-semibold'>Why chose us?</h1>
                </div>
                <div className='grid grid-cols-3 gap-4 mt-7'>

                    <div className=' flex flex-col items-center text-center '>

                        <img src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg' />
                        <h6 className='pb-3 font-[cha] font-semibold'>100% Money Back Guarantee</h6>
                        <p>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>
                    <div className=' flex flex-col items-center text-center'>
                        <img src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg'/>
                        <h6 className='pb-3 font-[cha] font-semibold'>Online Support 24/7</h6>
                        <p>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>
                    <div>
                        <img src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg' />
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

        </div>


    )
}
