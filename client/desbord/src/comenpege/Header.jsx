import React from 'react'
import { Link } from 'react-router'

export default function Header() {
  return (
    <div>
        <header className=" text-white p-4 border shadow ">
            <div className="container mx-auto flex justify-end items-center">
                
                {/* <h1 className="text-xl font-bold">Logo</h1> */}
                <div className="relative group ">
                    <div className="flex items-center cursor-pointer">
                        <img 
                            src="https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg" 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full"
                        />
                        <samp  className="ml-2 text-black">Profile</samp>
                    </div>
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <ul className="py-2 mb-5 ">
                           <li className="px-4 py-2 hover:bg-gray-100"><Link to={"/profile"}> MyAccount </Link></li> 
                           <li><Link to={"/Complitprofile"} className="px-4 py-2 hover:bg-gray-100">Complitprofile</Link></li>
                            <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
      
    </div>
  )
}
