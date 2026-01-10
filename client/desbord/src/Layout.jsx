import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './comenpege/Header'; 
import Sidebar from './assets/sidebar';

export default function Layout() {

    return (
        // STEP 1: Main Wrapper (Full Screen, No Window Scroll)
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            
            {/* STEP 2: Sidebar (Fixed Left) */}
            {/* Sidebar component ke andar already width (w-72) aur height defined hai */}
            <aside className="flex-shrink-0 z-20 hidden md:block"> 
                <Sidebar />
            </aside>

            {/* STEP 3: Right Side (Header + Content) */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                
                {/* Header Top par fixed rahega */}
                <Header />

                {/* STEP 4: Scrollable Content Area */}
                {/* Sirf ye hissa scroll karega, Sidebar aur Header apni jagah rahenge */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
                    
                    {/* Content Width Limiter (Optional: Taaki badi screen par content fail na jaye) */}
                    <div className="mx-auto max-w-7xl">
                        {/* Yeh wo jagah hai jahan Dashboard/Add Product etc. dikhenge */}
                        <Outlet />
                    </div>

                </main>
            </div>

        </div>
    )
}