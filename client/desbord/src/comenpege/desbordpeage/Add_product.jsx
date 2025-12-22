import React from 'react'
import { TiCloudStorage } from "react-icons/ti";

export default function Add_product() {
    return (
        <div className=" min-h-screen bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800"> Add product</h2>
            <form className="w-full  grid grid-cols-2  bg-white p-8 rounded-lg shadow   gap-4">
                <div className='h-full'>
                    <div className='h-[300px] mb-10 '>
                        <label htmlFor="">Product Image</label>
                        <div className="w-full h-full rounded-2xl border bg-gray-100  flex items-center justify-center mb-4">

                            <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                            <label htmlFor="photo-upload" className=" text-black text-center text-2xl flex flex-col items-center py-2 px-4 rounded-md cursor-pointer">
                             



                                <TiCloudStorage />
                                Drag and drop
                            </label>
                        </div>


                    </div>

                    <div className='h-[300px] mb-10 '>
                        <label htmlFor="">Back Image</label>
                        <div className="w-full h-full bg-gray-100  flex items-center justify-center mb-4">

                            <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                            <label htmlFor="photo-upload" className=" text-black py-2 px-4 text-2xl flex flex-col items-center rounded-md cursor-pointer">
                               <TiCloudStorage />
                                Drag and drop
                            </label>
                        </div>


                    </div>

                    <div className='h-[300px] mb-10'>
                        <label htmlFor="">Gallery Image</label>
                        <div className="w-full h-full bg-gray-100  flex items-center justify-center mb-4">

                            <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                            <label htmlFor="photo-upload" className=" text-black text-2xl flex flex-col items-center py-2 px-4 rounded-md cursor-pointer">
                                <TiCloudStorage />
                                Drag and drop
                            </label>
                        </div>


                    </div>




                </div>


                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1 font-medium">
                            Product Name
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border rounded-md px-3 py-2 disabled:bg-gray-100"
                               
                            />
                        </label>

                        <label className="flex flex-col gap-1 font-medium">
                            Select Parent Category
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 font-medium">
                            Select Sub Category
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 font-medium">
                            Select Sub Sub Category
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 font-medium">
                            Select Material
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 font-medium">
                            Select Color
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>
                          <label className="flex flex-col gap-1 font-medium">
                                Order
                                <input
                                    type="number"
                                    placeholder="Enter Order"
                                    disabled
                                    className="border rounded-md px-3 py-2 disabled:bg-gray-100"
                                />
                            </label>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1 font-medium">
                            Select Product Type
                            <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                <option>Nothing Selected</option>
                            </select>
                        </label>

                       
                            
                            <label className="flex flex-col gap-1 font-medium">
                                Is Best Selling
                                <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                    <option>Nothing Selected</option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-1 font-medium">
                                Is Top Rated
                                <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                    <option>Nothing Selected</option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-1 font-medium">
                                Is Upsell
                                <select disabled className="border rounded-md px-3 py-2 disabled:bg-gray-100">
                                    <option>Nothing Selected</option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-1 font-medium">
                                Actual Price
                                <input
                                    type="number"
                                    placeholder="Actual Price"
                                    disabled
                                    className="border rounded-md px-3 py-2 disabled:bg-gray-100"
                                />
                            </label>

                            <label className="flex flex-col gap-1 font-medium">
                                Sale Price
                                <input
                                    type="number"
                                    placeholder="Sale Price"
                                    disabled
                                    className="border rounded-md px-3 py-2 disabled:bg-gray-100"
                                />
                            </label>

                            <label className="flex flex-col gap-1 font-medium">
                                Total In Stocks
                                <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    disabled
                                    className="border rounded-md px-3 py-2 disabled:bg-gray-100"
                                />
                            </label>

                          
                        
                    </div>
                </div>


                <label className="flex flex-col gap-1 font-medium">
                    Description:
                    <textarea rows={4} placeholder="Enter product description" disabled className="input input-bordered disabled:bg-gray-100"></textarea>
                </label>

            </form >
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded disabled:opacity-50" disabled>
                Add Product
            </button>

        </div >
    )
}
