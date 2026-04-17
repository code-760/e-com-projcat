"use client";
import React, { useState, Suspense } from "react";
import { MdVisibility, MdVisibilityOff, MdLockReset } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"; // useRouter behtar hai
import { ToastContainer, toast } from 'react-toastify';

function NewPassword() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false); // CPU safety ke liye loading state
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  const resetPassword = async (e) => {
    e.preventDefault();
    
    const newpassword = e.target.newpassword.value;
    const ConfirmPassword = e.target.ConfirmPassword.value;

    // Client-side basic validation (CPU load kam karta hai)
    if (newpassword !== ConfirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newpassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true); // Button disable karne ke liye

    try {
      const res = await axios.post(`${Baseurl}user/reset-password`, 
        { newpassword, ConfirmPassword }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(res.data.message || "Password reset successful!");
      
      // Redirect with slight delay for toast visibility
      setTimeout(() => {
        router.push("/Login-Register");
      }, 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <ToastContainer />
      {/* Mobile par w-full aur desktop par max-w-md automatically handle hoga */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C09578]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C09578]">
            <MdLockReset size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-[cha]">
            Set New Password
          </h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={resetPassword} className="space-y-5">
          {/* New Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                name="newpassword"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C09578] focus:border-transparent transition-all pr-12 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C09578] transition-colors"
              >
                {showPass ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm your password"
                name="ConfirmPassword"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C09578] focus:border-transparent transition-all pr-12 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C09578] transition-colors"
              >
                {showConfirmPass ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold shadow-md transition-all duration-200 mt-4 active:scale-95 ${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#C09578] text-white hover:bg-[#a88264]"
            }`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            href="/Login-Register"
            className="text-sm text-gray-400 hover:text-[#C09578] font-semibold transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20 font-bold">Secure Loading...</div>}>
      <NewPassword />
    </Suspense>
  );
}