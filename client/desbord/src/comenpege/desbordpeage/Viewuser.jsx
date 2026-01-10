import React, { useState } from 'react';
import { FaFilter, FaPenNib } from "react-icons/fa";
import { 
  RiUser3Line, 
  RiDeleteBin6Line, 
  RiToggleLine, 
  RiSearchLine, 
  RiCheckDoubleLine, 
  RiCloseCircleLine 
} from "react-icons/ri";

export default function Viewuser() {
  let [searchbox, setsearchbox] = useState(false);

  // Mock data for UI purposes - Replace with real data if needed later
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Admin", message: "Initial Setup", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Editor", message: "Content update", status: "Active" }
  ];

  const totalUsers = 150;
  const activeUsers = 120;
  const inactiveUsers = 30;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          User Management
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{totalUsers} Total</span>
        </h2>
        <p className="text-gray-500 mt-2">Manage registered users and administrators.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{totalUsers}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <RiUser3Line size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">{activeUsers}</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full text-green-600">
            <RiCheckDoubleLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Inactive</p>
            <h3 className="text-3xl font-bold text-red-500 mt-1">{inactiveUsers}</h3>
          </div>
          <div className="bg-red-50 p-3 rounded-full text-red-500">
            <RiCloseCircleLine size={24} />
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
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
                <td className="px-6 py-4 text-gray-600">john@example.com</td>
                <td className="px-6 py-4 text-gray-600">Admin</td>
                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">Initial Setup Request...</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                    <FaPenNib />
                  </button>
                </td>
              </tr>

              {/* Row 2 (Example) */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">Alice Smith</td>
                <td className="px-6 py-4 text-gray-600">alice@example.com</td>
                <td className="px-6 py-4 text-gray-600">User</td>
                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">Password Reset...</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                    Inactive
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                    <FaPenNib />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 2 entries</p>
        </div>

      </div>
    </div>
  );
}