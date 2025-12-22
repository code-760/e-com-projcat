import Link from 'next/link'
import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Wishlist() {
    return (
        <div>
            <div className=' border-b border-[#CCC] py-7'>
                <div className='text-center flex flex-col items-center'>
                    <h1 className='p-4 text-4xl font-semibold font-[cha]'>My Wishlist</h1>
                    <div className=' flex '>

                        <div className=' flex items-center hover:text-[#c09578]'><Link href={"/"}>Home</Link><MdOutlineNavigateNext /></div>
                        <p>My Wishlist</p>
                    </div>
                </div>
            </div>
            <div className='w-[1370px] mx-auto border-b border-[#ccc] pb-7'>
                <div className=' flex justify-center'>
                    <img src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg' />
                </div>
                <div className='text-center'>
                    <p>Your wishlist is empty!</p>
                </div>
            </div>
        </div>
    )
}
