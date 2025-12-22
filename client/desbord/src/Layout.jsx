import React, { useState } from 'react'
import Header from './comenpege/Header'

import { Link, Outlet } from 'react-router-dom';
import Sidebar from './assets/sidebar';
import Desbord from './comenpege/profile/desbord';




export default function Layout() {

  
    return (

        <div className=" grid grid-cols-[20%_auto] min-h-screen bg-gray-100">
            {/* Sidebar */}
           <div>
            <Sidebar/>
           </div>


            {/* Main Content */}
            <div className=''>
                <Header />

                <div className="flex-1 p-8">
                    <main>
                       
                        <Outlet />
                    </main>
                </div>
            </div>

        </div>
    )
}
