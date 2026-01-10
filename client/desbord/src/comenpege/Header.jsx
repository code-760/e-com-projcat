import React from 'react';
import { Link } from 'react-router-dom'; // Note: standard 'react-router-dom' use karein

// PREMIUM ICONS (Remix Icons - Same as Sidebar)
import { 
  RiSearchLine, 
  RiNotification3Line, 
  RiUser3Line, 
  RiSettings4Line, 
  RiLogoutCircleRLine, 
  RiMenu2Line,
  RiArrowDownSLine 
} from "react-icons/ri";

export default function Header() {
  return (
    // STEP 1: Sticky Header with Glassmorphism
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      
      <div className="flex flex-row items-center justify-between px-6 py-3 h-20">
        
        {/* --- LEFT SECTION: Mobile Toggle & Title --- */}
        <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle (Visible on small screens mostly) */}
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden">
                <RiMenu2Line size={24} />
            </button>

            {/* Welcome Text or Breadcrumb */}
            <div className="hidden md:block">
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-xs text-gray-500">Welcome back, Admin</p>
            </div>
        </div>

        {/* --- CENTER SECTION: Search Bar --- */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-purple-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-300">
            <RiSearchLine className="text-gray-400 mr-2" size={20} />
            <input 
                type="text" 
                placeholder="Search products, orders or users..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex items-center gap-6">
            
            {/* Notification Bell with Badge */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <RiNotification3Line size={22} />
                <span className="absolute top-1.5 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            {/* Profile Dropdown Area */}
            <div className="relative group">
                <div className="flex items-center gap-3 cursor-pointer">
                    {/* Avatar with Ring */}
                    <img 
                        src="https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg" 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-purple-100 group-hover:ring-purple-500 transition-all duration-300"
                    />
                    
                    {/* User Info (Hidden on mobile) */}
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">John Doe</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    
                    <RiArrowDownSLine className="text-gray-400 group-hover:text-purple-600 transition-transform group-hover:rotate-180" />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out z-50 overflow-hidden">
                    
                    {/* Header inside dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-sm font-semibold text-gray-800">My Account</p>
                    </div>

                    <ul className="py-2">
                        <li>
                            <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                <RiUser3Line className="mr-3 text-lg" />
                                View Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/Complitprofile" className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                <RiSettings4Line className="mr-3 text-lg" />
                                Complete Profile
                            </Link>
                        </li>
                        
                        <div className="my-1 border-t border-gray-100"></div> {/* Divider */}
                        
                        <li>
                            <button className="w-full flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                <RiLogoutCircleRLine className="mr-3 text-lg" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </header>
  )
}
