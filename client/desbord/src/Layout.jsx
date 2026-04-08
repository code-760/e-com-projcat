import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './comenpege/Header'; 
import Sidebar from './assets/sidebar';
import { useDispatch, useSelector } from 'react-redux';

export default function Layout() {

    useEffect(() => {
        const dispatch = useDispatch();
    
    // 2. Redux se token aur existing data nikaalein
    const tokan = useSelector((state) => state.adminstore.tokan);
    const userData = useSelector((state) => state.adminstore.userData);
        // Agar token hai, par Redux mein data nahi hai (matlab page reload hua hai)
        if (tokan && !userData) {
            
            // Apna base URL check kar lein, yahan maine example ke liye process.env use kiya hai
             let apibaseurl = import.meta.env.VITE_APIBASEURL;
            
            axios.post(`${apibaseurl}user/user-detail`, {}, {
                headers: {
                    Authorization: `Bearer ${tokan}`,
                },
            })
            .then((res) => {
                // API se jo data aaya, usko Redux mein bhej dein
                // Note: res.data.data check kar lein ki aapki API actual data kahan bhejti hai
                dispatch(setadminData(res.data.data)); 
            })
            .catch((err) => {
                console.error("User details laane mein error:", err);
            });
        }
    }, [tokan, userData, dispatch]);

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