"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Decbord() {
    let [desboerdTab, setdesboerdTab] = useState("My Dasboard")
    return (
        <div>
            <div className=' border-b border-[#CCC] py-7'>
                <div className='text-center flex flex-col items-center'>
                    <h1 className='p-4 text-4xl font-semibold font-[cha]'>My Dasboard</h1>
                    <div className=' flex '>

                        <div className=' flex items-center hover:text-[#c09578]'><Link href={"/"}>Home</Link><MdOutlineNavigateNext /></div>
                        <p>My Desbord</p>
                    </div>
                </div>
            </div>
            <div className='w-[1370px] mx-auto border-b border-[#ccc] py-7'>
                <div className='grid grid-cols-[20%_auto] gap-[50px] items-start '>
                    <div className='ml-7 flex flex-col gap-2 mt-6'>
                        <div>
                            <h2 className={` border w-[250px] bg-black font-bold duration-200 cursor-pointer hover:bg-[#C09578] text-white py-2 text-center ${desboerdTab === "My Dasboard" ? "bg-[#C09578]" : "bg-black"}  `} onClick={() => setdesboerdTab("My Dasboard")} >My Dasboard</h2>
                        </div>
                        <div>
                            <h2 className={`border w-[250px] bg-black font-bold cursor-pointer duration-200 hover:bg-[#C09578] text-white  py-2 text-center ${desboerdTab === "Orders" ? "bg-[#C09578]" : "bg-black"}  `} onClick={() => setdesboerdTab("Orders")}>Orders</h2>
                        </div>
                        <div>
                            <h2 className={`border w-[250px] bg-black font-bold cursor-pointer duration-200 hover:bg-[#C09578] text-white  py-2 text-center ${desboerdTab === "Addresses" ? "bg-[#C09578]" : "bg-black"}`} onClick={() => setdesboerdTab("Addresses")} >Addresses</h2>
                        </div>
                        <div>
                            <h2 className={`border w-[250px] bg-black font-bold cursor-pointer duration-200  hover:bg-[#C09578] text-white py-2 text-center  ${desboerdTab === "My Profile" ? "bg-[#C09578]" : "bg-black"}`} onClick={() => setdesboerdTab("My Profile")}>My Profile</h2>
                        </div>
                        <div>
                            <h2 className={` border w-[250px] bg-black  font-bold cursor-pointer duration-200 hover:bg-[#C09578] text-white py-2 text-center ${desboerdTab === "Change Password" ? "bg-[#C09578]" : "bg-black"}`} onClick={() => setdesboerdTab("Change Password")} >Change Password</h2>
                        </div>
                        <div>
                            <h2 className={`border w-[250px] bg-black font-bold cursor-pointer duration-200 hover:bg-[#C09578] text-white  py-2 text-center`}>My Dasboard</h2>
                        </div>

                    </div>
                    <div>
                        {/* desbord */}
                        {
                            desboerdTab === "My Dasboard" &&
                            <div>
                                <div>
                                    <h1 className='p-4 text-4xl font-semibold font-[cha]'>My Decbord</h1>
                                </div>
                                <div>
                                    <p>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and Edit your password and account details.</p>
                                </div>
                            </div>

                        }

                        {/* ordes */}
                        {
                            desboerdTab === "Orders" &&
                            <div className="mt-6">
                                <div className="overflow-x-auto rounded-lg border border-[#e6e6e6]">
                                    <table className="min-w-full divide-y text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700 hover:text-[#C09578]">Order</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Total</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y">
                                            <tr>
                                                <td className="px-4 py-3 font-medium text-gray-800">#1001</td>
                                                <td className="px-4 py-3 text-gray-600">2025-11-01</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">Completed</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-800">$120.00</td>
                                                <td className="px-4 py-3">
                                                    <Link href="/orders/1001" className="mr-3 text-[#c09578] hover:underline">View</Link>
                                                    <button className="text-sm text-gray-600 hover:text-gray-900">Reorder</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-3 font-medium text-gray-800">#1002</td>
                                                <td className="px-4 py-3 text-gray-600">2025-10-22</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">Processing</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-800">$89.50</td>
                                                <td className="px-4 py-3">
                                                    <Link href="/orders/1002" className="mr-3 text-[#c09578] hover:underline">View</Link>
                                                    <button className="text-sm text-gray-600 hover:text-gray-900">Cancel</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-3 font-medium text-gray-800">#1003</td>
                                                <td className="px-4 py-3 text-gray-600">2025-09-15</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">Refunded</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-800">$45.00</td>
                                                <td className="px-4 py-3">
                                                    <Link href="/orders/1003" className="mr-3 text-[#c09578] hover:underline">View</Link>
                                                    <button className="text-sm text-gray-600 hover:text-gray-900">Reorder</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                         {/*Change Password */}
                        {
                            desboerdTab === "Change Password" && (
                                <div className="mt-8 p-6  rounded-lg  password">
                                    <h3 className="text-xl font-semibold mb-4 font-[cha] ">Change Password</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                            <input type="password" className="mt-1 block w-full  border-gray-300  border outline-none p-2 rounded-[10px]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                                            <input type="password" className="mt-1 block w-full  border-gray-300  border outline-none p-2 rounded-[10px]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <input type="password" className="mt-1 block w-full  border-gray-300  border outline-none p-2 rounded-[10px]" />
                                        </div>
                                        <div className=' flex justify-end'>
                                            <button type="submit" className="w-[200px] bg-[#cb9b7a] text-white py-2 px-4 rounded-md hover:bg-[#b99781]">Update Password</button>
                                        </div>
                                        
                                    </form>
                                </div> 
                            )
                        }


                        {/*Addresses  */}
                        {
                            desboerdTab === "Addresses" && (

                                <div>
                                    <div>
                                        <p>The following addresses will be used on the checkout page by default.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {/* /* Billing Address */}

                                        <div className="rounded-lg p-6 bg-white shadow-sm">


                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-2xl font-[cha] font-medium">Billing Address</h3>

                                            </div>
                                            <form className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Billing Name*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2  border-gray-300 shadow-sm focus:border-[#c09578] focus:ring-[#c09578] outline-none " />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Billing Email*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Billing Mobile Number*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Billing Address*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Country*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>


                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">State*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">City*</label>
                                                    <input type="tel" className="mt-1 block px-2 w-full py-1 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div className=' flex justify-end '>
                                                    <button type="submit" className=" bg-[#c09578] text-white py-2 px-6 rounded-3xl hover:bg-[#a88264]">update</button>
                                                </div>


                                            </form>
                                        </div>

                                        {/* Shipping Address */}
                                        <div className="rounded-lg p-6 bg-white shadow-sm">


                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-2xl font-[cha] font-medium">Billing Address</h3>

                                            </div>
                                            <form className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Shipping Name*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2  border-gray-300 shadow-sm focus:border-[#c09578] focus:ring-[#c09578] outline-none " />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Shipping  Email*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Shipping  Mobile Number*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Shipping  Address*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">Country*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>


                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">State*</label>
                                                    <input type="text" className="mt-1 block w-full py-1 px-2 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[15px] text-gray-700 hover:text-[#C09578]">City*</label>
                                                    <input type="tel" className="mt-1 block px-2 w-full py-1 border-gray-300 shadow-sm focus:border-[#c09578] outline-none focus:ring-[#c09578]" />
                                                </div>

                                                <div className=' flex justify-end '>
                                                    <button type="submit" className=" bg-[#c09578] text-white py-2 px-6 rounded-3xl hover:bg-[#a88264]">update</button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                            )
                        }

                        {
                            desboerdTab === "My Profile" && (

                                <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
                                    <div className="w-full  bg-white rounded-2xl shadow-lg p-8">
                                        <h1 className="text-2xl font-semibold mb-6 text-gray-800 font-[cha] ">Update Profile</h1>

                                        <form className="">
                                            {/* Avatar Upload */}
                                            <div  className=' flex items-center gap-2'>
                                                <div>
                                                     <input type="radio" name="gender" value="male"/>Mr.
                                                </div>
                                                <div>
                                                     <input type="radio" name="gender" value="female"/>Mrs.
                                                </div> 
                                            </div>



                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 ">Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                   
                                                    placeholder="Your name"
                                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                  
                                                    placeholder="you@example.com"
                                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                   
                                                    placeholder="+91 98765 43210"
                                                    inputMode="tel"
                                                    pattern="[0-9+\\- ()]+"
                                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                />
                                                
                                            </div>

                                            {/* Bio */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                                                <input
                                                    type="text"
                                                    name="Address*"
                                                    placeholder="Address*"
                                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                />
                                               
                                            </div>

                                            {/* Buttons */}
                                            <div className=" w-full flex justify-end my-2">
                                                <button
                                                    type="submit"
                                                    className=" rounded-full w-[100px] bg-[#c09578] text-white py-3 font-medium "
                                                >
                                                    update
                                                </button>
                                               
                                            </div>

                                           
                                        </form>
                                    </div>
                                </div>

                            )
                        }

                    </div >

                </div >

            </div >
        </div >

    )
}
