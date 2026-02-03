"use client";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff, MdLockReset } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
 import { ToastContainer, toast } from 'react-toastify';

export default function NewPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  let userperam = useSearchParams();
  let token = userperam.get("token");

  let Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  let resetPassword = async (e) => {
    e.preventDefault();

    // Add your password reset logic here

    let obj = {
      newpassword: e.target.newpassword.value,
      ConfirmPassword: e.target.ConfirmPassword.value,
    };

    axios
      .post(`${Baseurl}user/reset-password`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((fainlres)=>{
        console.log(fainlres);
       toast.success(fainlres.message,{ position: "top-center", autoClose: 2000  })
        redirect("/Login-Register");
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
         <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C09578]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C09578]">
            <MdLockReset size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-[cha]">
            Set New Password
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={resetPassword} className="space-y-6">
          {/* New Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                name="newpassword"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C09578] focus:border-transparent transition-all pr-12 text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C09578] transition-colors cursor-pointer"
              >
                {showPass ? (
                  <MdVisibility size={22} />
                ) : (
                  <MdVisibilityOff size={22} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Must be at least 8 characters.
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm your password"
                name="ConfirmPassword"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C09578] focus:border-transparent transition-all pr-12 text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C09578] transition-colors cursor-pointer"
              >
                {showConfirmPass ? (
                  <MdVisibility size={22} />
                ) : (
                  <MdVisibilityOff size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#C09578] text-white py-3.5 rounded-lg font-bold shadow-md hover:bg-[#a88264] hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-4"
          >
            Reset Password
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-[#C09578] font-medium flex items-center justify-center gap-1 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
