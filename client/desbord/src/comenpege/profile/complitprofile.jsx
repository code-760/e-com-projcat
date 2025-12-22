import React from 'react'

export default function Complitprofile() {
    return (
        
        <div className=' w-full'>
            <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
                <div className=" mx-auto bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Profile</h2>

                    {/* Profile Photo Section */}
                    <form action="">

 <div className=' grid grid-cols-[20%_auto]'>
                        <div className="mb-6">
                            <div className="flex items-center space-x-6">
                                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="john@example.com"
                                    
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="mt-1 block w-full px-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>



                        </form>
                    </div>
                    {/* Map Preview (Static) */}

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            className="mt-1 block w-full px-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows="3"
                            placeholder="Enter your address"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Map Preview</span>
                        </div>
                    </div>
                   


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 mt-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Profile
                        </button>
                    </div>


                    </form>

                   
                </div>
            </div>
        </div >
    )
}


