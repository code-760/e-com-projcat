import Link from 'next/link';
import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Contect() {
    return (
        <div >
            <div className=' border-b border-[#CCC] py-7'>
                <div className='text-center flex flex-col items-center'>
                    <h1 className='p-4 text-4xl font-semibold font-[cha]'>Contact Us</h1>
                    <div className=' flex '>

                        <div className=' flex items-center hover:text-[#c09578]'><Link href={"/"}>Home</Link><MdOutlineNavigateNext /></div>
                        <p>Contact Us</p>
                    </div>
                </div>
            </div>


            <div>
                <div className='w-full h-[500px] '>
                    <iframe className='w-full h-[500px]' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.631421124823!2d73.0283626508787!3d26.27362318332549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1ea7d0c7%3A0xf14d81eb1531921c!2sLaxmi%20Kirana%20Store!5e0!3m2!1sen!2sin!4v1580291833220!5m2!1sen!2sin'>

                    </iframe>

                </div>
                <div >

                    <div className=' w-full'>
                        <div className="   bg-gray-100 ">

                            <div className="  grid grid-cols-2 bg-white p-8 rounded-lg shadow">
                                <div className="bg-white p-6   mb-6">
                                    <div>
                                        <h2 className='text-2xl font-semibold font-[cha] '>Contact Us</h2>
                                    </div>
                                    <div className="mt-6   border-t pt-4">
                                        <div className='w-full'>
                                            <h3 className="font-semibold text-gray-700 py-2 border-b text-nowrap"> Address : Claritas est etiam processus dynamicus</h3>
                                            <p className="text-gray-600 mt-2 border-b py-2 ">98745612330</p>
                                            <p className="text-gray-600 border-b py-2 "> furnitureinfo@gmail.com</p>
                                        </div>

                                    </div>


                                </div>


                                {/* Profile Photo Section */}
                                <form>
                                    <h2 className="text-2xl font-bold mb-6 font-[cha] text-gray-900">Tell us your Question</h2>

                                    <div>


                                        {/* Form Fields */}
                                        <div>


                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Your Name (required)</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full px-2  py-2 border border-gray-400"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Your Email (required)</label>
                                                <input
                                                    type="email"
                                                    className="mt-1 block w-full px-2 py-2 border border-gray-400 "
                                                    placeholder="john@example.com"

                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Your Mobile Number (required)</label>
                                                <input
                                                    type="tel"
                                                    className="mt-1 block w-full px-2 py-2 border border-gray-400"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                                <input
                                                    type="tel"
                                                    className="mt-1 block w-full px-2  py-2 border border-gray-400"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                                <textarea
                                                    className="mt-1 block w-full px-2 py-2 border border-gray-400"
                                                    rows="3"
                                                    placeholder="Enter your address"
                                                ></textarea>
                                            </div>
                                        </div>




                                    </div>
                                    {/* Map Preview (Static) */}



                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 mt-5 bg-black duration-300 text-white rounded-md hover:bg-[#C09578] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                        >
                                            Sand
                                        </button>
                                    </div>


                                </form>


                            </div>
                        </div>
                    </div >
                </div>
            </div>

        </div>
    )
}
