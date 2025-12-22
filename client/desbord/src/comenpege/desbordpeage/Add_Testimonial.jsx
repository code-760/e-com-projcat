import React from 'react'
import { MdOutlineCloudDownload } from "react-icons/md";

export default function Add_Testimonial() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Testimonial</h2>
      <div className=" grid grid-cols-[40%_auto]  mx-auto bg-white rounded-lg shadow-lg p-8">
                            {/* Add Photo Section */}
                            <div className="flex flex-col items-center justify-center border-r pr-8">
                                <div className="w-full h-full bg-gray-100  flex items-center justify-center mb-4">
                                    <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                                    <label htmlFor="photo-upload" className=" text-black py-2 px-4   rounded-md cursor-pointer">
            
                                        <MdOutlineCloudDownload className=' items-center ' />
                                        Add photo
                                    </label>
                                </div>
            
                            </div>
                            {/* Form Section */}
                            <div className=" pl-8 flex flex-col justify-center">
            
                                <label className=" block text-gray-700  font-bold mb-2">
                                Name
                                </label>
                                
                                <input
                                    id="categoryName"
                                    type="text"
                                    className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter category name"
                                />
            
            
                                <label className=" block text-gray-700  font-bold mb-2">
                                   Designation
                                </label>
                                 
                                 <input
                                    id="order"
                                    type="number"
                                    className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter order"
                                />
                               
            
            
            
                                <label className="mb-2 text-gray-700 font-semibold" htmlFor="categoryName">
                                   Rating
                                </label>
                                 <input
                                    id="order"
                                    type="number"
                                    className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter order"
                                />
                                <label className="mb-2 text-gray-700 font-semibold" htmlFor="order">
                                    Order
                                </label>
                                <input
                                    id="order"
                                    type="number"
                                    className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter order"
                                />
                                 <label className=" block text-gray-700  font-bold mb-2">
                                Message
                                </label>
                                
                                <textarea
                                    id="categoryName"
                                    type="text"
                                    className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter category name"
                                />
            
                            </div>
                            <button className="w-55 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold">
                                Add Category
                            </button>
                        </div>
    </div>
  )
}
