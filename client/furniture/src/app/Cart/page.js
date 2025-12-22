import React from 'react'
import Link from 'next/link'
import { MdOutlineNavigateNext } from "react-icons/md";


export default function Cart() {
  return (
    <div>
       <div className=' border-b border-[#CCC] py-7'>
                <div className='text-center flex flex-col items-center'>
                    <h1 className='p-4 text-4xl font-semibold font-[cha]'>Shopping Cart</h1>
                    <div className=' flex '>

                        <div className=' flex items-center hover:text-[#c09578]'><Link href={"/"}>Home</Link><MdOutlineNavigateNext /></div>
                        <p>Shopping Cart</p>
                    </div>
                </div>
            </div>
            <div className='w-[1370px] mx-auto border-b border-[#ccc] pb-7'>
                <div className=' flex justify-center'>
                    <img src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg' />
                </div>
                <div className='text-center'>
                    <p>Your shopping cart is empty!</p>
                </div>
            </div>
    </div>
  )
}
