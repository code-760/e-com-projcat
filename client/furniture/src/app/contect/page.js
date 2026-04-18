import Link from 'next/link';
import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Contact() {
    return (
        <div className="w-full">
            {/* Breadcrumb Section */}
            <div className='border-b border-[#CCC] py-10 bg-gray-50'>
                <div className='text-center flex flex-col items-center'>
                    <h1 className='pb-4 text-3xl md:text-4xl font-semibold font-[cha]'>Contact Us</h1>
                    <div className='flex items-center gap-1 text-sm md:text-base'>
                        <Link href={"/"} className='flex items-center hover:text-[#c09578] transition-colors'>
                            Home
                        </Link>
                        <MdOutlineNavigateNext className="text-gray-400" />
                        <p className="text-gray-500">Contact Us</p>
                    </div>
                </div>
            </div>

            {/* Google Maps Section */}
            <div className='w-full h-[300px] md:h-[500px] bg-gray-200'>
                <iframe 
                    className='w-full h-full border-0' 
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.484831641031!2d75.76637377518427!3d26.91986425979269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db376043d9c7d%3A0xe547967268d37443!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1713430000000!5m2!1sen!2sin'
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Content Section */}
            <div className='max-w-[1370px] mx-auto px-4 py-12 md:py-20'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
                    
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className='text-2xl md:text-3xl font-semibold font-[cha] text-gray-900'>Contact Us</h2>
                            <p className="text-gray-500 mt-2 italic text-sm md:text-base">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.</p>
                        </div>
                        
                        <div className="space-y-4 border-t pt-6">
                            <div className="flex flex-col border-b pb-4">
                                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Address</span>
                                <p className="text-gray-700 font-medium">Claritas est etiam processus dynamicus, Jaipur, Rajasthan</p>
                            </div>
                            <div className="flex flex-col border-b pb-4">
                                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Phone</span>
                                <p className="text-gray-700 font-medium">+91 98745612330</p>
                            </div>
                            <div className="flex flex-col border-b pb-4">
                                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Email</span>
                                <p className="text-gray-700 font-medium">furnitureinfo@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-5">
                        <h2 className="text-2xl font-bold font-[cha] text-gray-900 mb-4">Tell us your Question</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Your Name (required)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#C09578] focus:border-[#C09578] outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Your Email (required)</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#C09578] focus:border-[#C09578] outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#C09578] focus:border-[#C09578] outline-none transition-all"
                                    placeholder="+91 00000 00000"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#C09578] focus:border-[#C09578] outline-none transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600">Message</label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#C09578] focus:border-[#C09578] outline-none transition-all"
                                rows="4"
                                placeholder="Enter your question here..."
                            ></textarea>
                        </div>

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-black text-white font-bold rounded uppercase tracking-widest text-sm hover:bg-[#C09578] transition-all duration-300 shadow-md"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}