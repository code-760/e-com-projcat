import React, { useState } from 'react';
import { 
    RiUserLine, 
    RiMailLine, 
    RiPhoneLine, 
    RiGlobalLine, 
    RiLockPasswordLine, 
    RiEditBoxLine,
    RiUploadCloud2Line
} from 'react-icons/ri';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'password'

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            
            {/* Page Title */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Profile Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        <div className="px-6 pb-6 text-center relative">
                            <div className="relative -mt-16 mb-4 inline-block">
                                <img 
                                    src="https://via.placeholder.com/150" 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" 
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                            <p className="text-indigo-600 font-medium text-sm">Full Stack Developer</p>
                            <p className="text-gray-400 text-xs mt-1">New York, USA</p>

                            <div className="mt-6 border-t border-gray-100 pt-6 text-left space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <RiMailLine className="text-gray-400 text-lg" />
                                    <span>john.doe@example.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <RiPhoneLine className="text-gray-400 text-lg" />
                                    <span>+1 234 567 890</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <RiGlobalLine className="text-gray-400 text-lg" />
                                    <a href="#" className="text-blue-500 hover:underline">www.johndoe.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Edit Forms */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Tabs Header */}
                        <div className="flex border-b border-gray-100">
                            <button 
                                onClick={() => setActiveTab('edit')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                                    activeTab === 'edit' 
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <RiEditBoxLine className="text-lg" /> Edit Profile
                            </button>
                            <button 
                                onClick={() => setActiveTab('password')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                                    activeTab === 'password' 
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <RiLockPasswordLine className="text-lg" /> Security
                            </button>
                        </div>

                        <div className="p-8">
                            
                            {/* --- EDIT PROFILE TAB --- */}
                            {activeTab === 'edit' && (
                                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 animate-fade-in">
                                    
                                    {/* Photo Upload Area */}
                                    <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                        <div className="h-20 w-20 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                            {/* Preview Image Logic Here */}
                                            <img src="https://via.placeholder.com/150" alt="Preview" className="w-full h-full object-cover opacity-50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                                            <div className="flex gap-3">
                                                <label htmlFor="photo-upload" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2">
                                                    <RiUploadCloud2Line /> Upload New
                                                </label>
                                                <input type="file" id="photo-upload" className="hidden" accept="image/*" />
                                                <button type="button" className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Recommended: JPG, PNG or GIF. Max size 2MB.</p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="City, Country" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                            <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="Write a short bio..."></textarea>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* --- CHANGE PASSWORD TAB --- */}
                            {activeTab === 'password' && (
                                <form onSubmit={(e) => e.preventDefault()} className="max-w-lg mx-auto space-y-6 py-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="••••••••" />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}