import React from 'react';
import { 
    RiUserLine, 
    RiMailLine, 
    RiPhoneLine, 
    RiMapPinLine, 
    RiImageAddLine, 
    RiSave3Line 
} from 'react-icons/ri';

export default function Complitprofile() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
                    <p className="text-blue-100 text-sm mt-1">Manage your personal information and security settings.</p>
                </div>

                <form className="p-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Left Column: Profile Photo */}
                        <div className="lg:col-span-1 flex flex-col items-center text-center space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8">
                            <div className="relative group">
                                <div className="h-40 w-40 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                    {/* Placeholder SVG or Image */}
                                    <svg className="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <button className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-md transition-colors">
                                    <RiImageAddLine size={20} />
                                </button>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                                <p className="text-sm text-gray-500 mt-1">Accepts JPG, PNG or SVG. <br/> Max size 2MB.</p>
                            </div>
                            
                            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium w-full max-w-[200px]">
                                Upload New
                            </button>
                        </div>

                        {/* Right Column: Form Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiUserLine className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all sm:text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiMailLine className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all sm:text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiPhoneLine className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all sm:text-sm"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <RiMapPinLine className="text-gray-400" />
                                    </div>
                                    <textarea
                                        rows="3"
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all sm:text-sm"
                                        placeholder="Enter your full address"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Location Preview</label>
                                <div className="h-48 w-full bg-slate-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-gray-400">
                                    <RiMapPinLine size={32} className="mb-2 opacity-50" />
                                    <span className="text-sm font-medium">Map Integration Unavailable</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex justify-end gap-4 border-t border-gray-100 mt-8">
                                <button 
                                    type="button" 
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    <RiSave3Line size={18} />
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}