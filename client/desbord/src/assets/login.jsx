import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")

    let navigate = useNavigate()

    let hadelLogin = (e) => {
        e.preventDefault()


        console.log(email);
        console.log(password);

        log
        

        if (email === "info@gmail.com" && password === "992600") {
            // Logic same hai, dashboard par bhej do
            navigate('/Desbord');
        } else {
            alert("Wrong email or password");
        }
    }

    return (
        // Background: Dark slate color (Aankhon ko sukoon dene wala dark color)
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
            
            {/* Main Card: Thoda sa lighter dark card taaki background se alag dikhe */}
            <div className="w-full max-w-md p-8 bg-[#1e293b] rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border border-gray-800">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    {/* Optional: Aap yahan apna logo bhi laga sakte hain */}
                    {/* <img src="/logo.png" alt="Admin Logo" className="h-12 mx-auto mb-4"/> */}
                    <h2 className="text-3xl font-extrabold text-white">Monsta panle</h2>
                    <p className="text-gray-400 text-sm mt-2">Secure access to dashboard</p>
                </div>

                <form onSubmit={hadelLogin} className="space-y-6">
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative group">
                            {/* SVG Icon */}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            {/* Dark Input Field */}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative group">
                            {/* SVG Icon */}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            {/* Dark Input Field */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button (Thoda चमकदार taaki focus jaye) */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        Secure Login
                    </button>

                </form>
                 <p className="mt-8 text-center text-xs text-gray-500">
                    Restricted Area. Authorized Personnel Only.
                </p>
            </div>
        </div>
    )
}