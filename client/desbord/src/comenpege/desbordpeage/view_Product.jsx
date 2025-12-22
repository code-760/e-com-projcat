import React, { useState } from 'react'
import { FaPenNib } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";

export default function View_Product() {
    let [searchbox, setsearchbox] = useState(false)
    let [read,setread]=useState(false)
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Category</h2>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">

                    <div className={`relative ${searchbox ? 'block' : 'hidden'}`}>
                        <input
                            type="search"
                            className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search users..."
                        />
                        <button className="absolute left-[226px] top-2.5 text-gray-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className=' flex justify-between'>
                        <h2 className="text-2xl font-semibold leading-tight">View Product</h2>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">
                                <div className="flex justify-between items-center mb-4 px-4">

                                    <div className="space-x-2">

                                        <button onClick={() => setsearchbox(prev => !prev)} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-colors">
                                            <FaFilter />
                                        </button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                            Delete
                                        </button>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                            Change Status
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-100 rounded-lg px-4 py-2">
                                    <span className="text-gray-600 font-medium">Total Emails: </span>
                                    <span className="text-gray-900">150</span>
                                </div>
                                <div className="bg-green-100 rounded-lg px-4 py-2">
                                    <span className="text-green-600 font-medium">Active: </span>
                                    <span className="text-green-900">120</span>
                                </div>
                                <div className="bg-red-100 rounded-lg px-4 py-2">
                                    <span className="text-red-600 font-medium">Deactive: </span>
                                    <span className="text-red-900">30</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="  border  w-full overflow-hidden">


                        <table className="min-w-full leading-normal border border-gray-600 border-collapse ">

                            <thead   >
                                <tr >

                                    <th className="px-10 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Delete	</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> S. No.</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Product Name	</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Short Description	</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description	</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thumbnails</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>

                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>

                            <tr className=' ' >
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex   items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap text-center "><input type="checkbox" /></p>
                                        </div>
                                    </div>
                                </td>
                                <td className=" border-b border-gray-200 text-center  bg-white text-sm">1</td>
                                <td className=" border-b border-gray-200 text-center  bg-amber-50 text-sm">man`s</td>
                                <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Lorem ipsum dolor sit...</p>
                                    <button className='text-blue-400'>Read more..</button>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Lorem ipsum dolor sit...</p>
                                    <button className='text-blue-400'>Read more..</button>
                                </td>

                                <td className=" border-b border-gray-200  bg-white text-sm">
                                    <img src="	https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png" alt="" className='w-15 h-15 text-center' />
                                </td>
                                <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm ">
                                    <div className=' flex'>
                                        <button className="p-1 rounded-full ml-2 text-black transition-colors">
                                            <MdDelete className=' border-r text-[15px] ' />
                                        </button>

                                        <button className="rounded-full  text-black transition-colors">
                                            <FaPenToSquare className='  text-[12px] ' />
                                        </button>

                                    </div>



                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Activate</p>

                                </td>



                            </tr>

                            <tr className=' ' >
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex   items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap text-center "><input type="checkbox" /></p>
                                        </div>
                                    </div>
                                </td>
                                <td className=" border-b border-gray-200 text-center  bg-white text-sm">1</td>
                                <td className=" border-b border-gray-200 text-center  bg-amber-50 text-sm">man`s</td>
                                <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Lorem ipsum dolor sit...</p>
                                    <button className='text-blue-400' onClick={()=>setread(true)}>Read more..</button>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Lorem ipsum dolor sit...</p>
                                    <button className='text-blue-400'>Read more..</button>
                                </td>

                                <td className=" border-b border-gray-200  bg-white text-sm">
                                    <img src="	https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png" alt="" className='w-15 h-15 text-center' />
                                </td>
                                <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm ">
                                    <div className=' flex'>
                                        <button className="p-1 rounded-full ml-2 text-black transition-colors">
                                            <MdDelete className=' border-r text-[15px] ' />
                                        </button>

                                        <button className="rounded-full  text-black transition-colors">
                                            <FaPenToSquare className='  text-[12px] ' />
                                        </button>

                                    </div>



                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Activate</p>

                                </td>



                            </tr>


                        </table>
                    </div>
                    <div className="mt-8">


                        <div className={`grid fixed w-[1170px] top-[50%]  bg-white left-[60%] grid-cols-1  transform -translate-x-1/2 -translate-y-1/2  ${read ? "block":"hidden"}`}>

                            <div className=' flex justify-between p-6'>
                                <h3 className="text-xl font-semibold ">Product Images &amp; Price</h3>
                                <FaDeleteLeft className=' text-[20px] cursor-pointer ' onClick={()=>setread(false)}/>
                            </div>


                            {/* Product Image */}
                            <div className="flex flex-col w-full  bg-white rounded-lg shadow p-6">
                                <div className="flex  w">

                                    <div className="mt-8 grid grid-cols-2 w-full">

                                        <div className="grid grid-cols-2 gap-6">
                                            {/* Product Image Section */}

                                            <div>
                                                <img
                                                    src="https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png"
                                                    alt="Product"
                                                    className="w-40 h-40 object-cover rounded mb-4 border"
                                                />
                                            </div>

                                            <div className="flex space-x-2">
                                                <img
                                                    src="https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png"
                                                    alt="Product"
                                                    className="w-40 h-40 object-cover rounded mb-4 border" />
                                            </div>

                                        </div>




                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <span className="font-medium text-gray-700">Price: </span>
                                            <span className="text-gray-900">₹ 1500</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">MRP: </span>
                                            <span className="text-gray-900">₹ 3000</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Manage Stock: </span>
                                            <span className="text-green-600">In Stock</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Brand Name: </span>
                                            <span className="text-gray-900">Lev's</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Size: </span>
                                            <span className="text-gray-900">XL</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Color: </span>
                                            <span className="text-gray-900">Red</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div >


    )
}
