import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";

export default function Viewsubsubcategory() {


    
     let [searchbox, setsearchbox] = useState(false)
  return (
    <div>
        
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
                              <h2 className="text-2xl font-semibold leading-tight">View sub sub category</h2>
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
                                  <div className="flex space-x-2">
      
      
                                  </div>
                              </div></div>
                          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      
      
                              <table className="min-w-full leading-normal">
                                  <thead>
                                      <tr>
      
                                          <th className="px-10 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"><input type='checkbox' />Name</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sub Category</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category Name</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                      </tr>
                                  </thead>
      
                                  <tr >
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <div className="flex   items-center">
                                              <div className="ml-3">
                                                  <p className="text-gray-900 whitespace-no-wrap"><input type="checkbox" />John Doe</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className=" border-b border-gray-200 bg-white text-sm"></td>
                                      <td className=" border-b border-gray-200 bg-white text-sm"></td>
                                      <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">Men</p>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">Shoe</p>
                                      </td>
      
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <img src="https://packshifts.in/images/iso.png" alt="" className=' w-10 h-10' />
                                      </td>
      
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                           1
                                      </td>
      
                                      <td className=" border-b border-gray-200 bg-white text-sm">
                                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                              Activate
                                          </button>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      
                                          <button className="px-5 py-5 rounded-full ml-2 bg-blue-500 text-white  hover:bg-blue-600 transition-colors">
                                              <FaPenNib />
                                          </button>
                                      </td>
      
      
      
                                  </tr>
                                  <tr >
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <div className="flex   items-center">
                                              <div className="ml-3">
                                                  <p className="text-gray-900 whitespace-no-wrap"><input type="checkbox" />John Doe</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className=" border-b border-gray-200 bg-white text-sm"></td>
                                      <td className=" border-b border-gray-200 bg-white text-sm"></td>
                                      <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">Men</p>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">Shoe</p>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                           <img src="https://packshifts.in/images/iso.png" alt="" className=' w-10 h-10' />
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                           1
                                      </td>
      
                                      <td className=" border-b border-gray-200 bg-white text-sm">
                                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                              Deactivate
                                          </button>
                                      </td>
      
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      
                                          <button className="px-5 py-5 rounded-full ml-2 bg-blue-500 text-white  hover:bg-blue-600 transition-colors">
                                              <FaPenNib />
                                          </button>
                                      </td>
      
      
                                  </tr>
      
                              </table>
                          </div>
                      </div>
                  </div> 
    </div>
  )
}
