import React from 'react'
import { useState } from 'react'
import { FaFilter, FaPenNib } from "react-icons/fa";
import { 
  RiDeleteBin6Line, 
  RiToggleLine, 
  RiSearchLine, 
  RiMore2Fill, 
  RiUser3Line, 
  RiMailLine,
  RiAdminLine,
  RiCheckDoubleLine
} from "react-icons/ri";

export default function ContactEnquirys() {

  let [searchbox, setsearchbox] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          Contact Enquiries
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">150 Total</span>
        </h2>
        <p className="text-gray-500 mt-2">Manage and respond to user inquiries effectively.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Emails</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">150</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <RiMailLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">120</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full text-green-600">
            <RiCheckDoubleLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Inactive Users</p>
            <h3 className="text-3xl font-bold text-red-500 mt-1">30</h3>
          </div>
          <div className="bg-red-50 p-3 rounded-full text-red-500">
            <RiToggleLine size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setsearchbox(prev => !prev)} 
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${searchbox ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <FaFilter /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl flex items-center gap-2 transition-all">
              <RiDeleteBin6Line /> <span className="hidden sm:inline">Delete</span>
            </button>
            <button className="px-4 py-2.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl flex items-center gap-2 transition-all">
              <RiToggleLine /> <span className="hidden sm:inline">Change Status</span>
            </button>
          </div>

          {/* Search Box */}
          <div className={`relative transition-all duration-300 ${searchbox ? 'w-full sm:w-72 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
            <RiSearchLine className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="search"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="Search users..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                      JD
                    </div>
                    <span className="font-medium text-gray-900">John Doe</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <RiMailLine className="text-gray-400" /> john@example.com
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">Project Inquiry</td>
                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                  Looking for details about the premium plan pricing...
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                      <FaPenNib />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 (Example Data) */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3">
                      AS
                    </div>
                    <span className="font-medium text-gray-900">Alice Smith</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <RiMailLine className="text-gray-400" /> alice@example.com
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">Support Request</td>
                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                  I cannot access my dashboard login...
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                      <FaPenNib />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 1-10 of 150 entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-100 text-sm">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-100 text-sm">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}