import React, { useState } from 'react'

export default function Profile() {

    let [showpassword, setshowpassword] = useState(false)
    let [Edit, setEdit] = useState(true)
    return (
        <div className=' grid grid-cols-[25%_auto] gap-2'>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center space-x-4">
                    <img src="https://via.placeholder.com/100" alt="Profile" className="w-24 h-24 rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        <p className="text-gray-600">Full Stack Developer</p>
                        <p className="text-sm text-gray-500">New York, USA</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Contact Information</h3>
                        <p className="text-gray-600 mt-2">Email: john.doe@example.com</p>
                        <p className="text-gray-600">Phone: +1 234 567 890</p>
                        <p className="text-gray-600">Website: www.johndoe.com</p>
                    </div>

                </div>


            </div>

            <div className="bg-white p-6 rounded-lg  shadow-md mb-6">

                <div className=' flex gap-6 items-center'>
                    <h2 className={`text-2xl font-bold mb-4 py-3 ${Edit ? " border-b-4 border-purple-600" : "text-gray-700"} `} onClick={() => { setshowpassword(false); setEdit(true); }} >Edit Profile</h2>
                    <h3 className={`text-2xl font-bold mb-4 py-3${showpassword ? " border-b-4 border-purple-600" : "text-gray-700"} `} onClick={() => { setshowpassword(true); setEdit(false); }}>Change Password</h3>

                </div>

                <div>


                    {Edit && (
                        <div className='grid grid-cols-[30%_auto]'>
                            <div className=" p-6 rounded-lg  mb-6" style={{ opacity: 0.7 }}>

                                <div className="  space-x-4">
                                    <div className=" h-[300px] mb-6 bg-gray-200 overflow-hidden">
                                        <img src="" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                                        <label htmlFor="photo-upload" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
                                            Change Photo
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <form className="space-y-4 ">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save Changes</button>
                            </form>
                        </div>


                    )}  {showpassword && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg  password">
                            <h3 className="text-xl font-semibold mb-4 ">Change Password</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Password</button>
                            </form>
                        </div>


                    )}







                </div>

            </div>


        </div>

       
    )
}
