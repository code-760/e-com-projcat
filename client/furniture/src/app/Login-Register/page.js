"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // redirect ki jagah useRouter
import axios from "axios";
import { useDispatch } from "react-redux";
import { settokan } from "../redex/slice/userslice";
import { ToastContainer, toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../fairbase.config";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  // --- STATES (Grouped for Memory Efficiency) ---
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loaders, setLoaders] = useState({
    login: false,
    register: false,
    forget: false,
  });
  const [views, setViews] = useState({ showOtp: false, showForget: false });
  const [errors, setErrors] = useState({ login: {}, register: {}, forget: {} });
  const [otp, setOtp] = useState("");

  // --- HANDLERS (Optimized with useCallback for CPU) ---

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoaders((prev) => ({ ...prev, login: true }));

      try {
        const res = await axios.post(`${Baseurl}user/login`, {
          useremail: loginData.email,
          Password: loginData.password,
        });

        // Artificial delay (as per your requirement) but optimized
        setTimeout(() => {
          if (res.data._status) {
            dispatch(settokan({ tokan: res.data.tokan }));
            toast.success("Login Successful!");
            router.push("/desbord"); // Faster and safer than redirect
          } else {
            setLoaders((prev) => ({ ...prev, login: false }));
            toast.error(res.data.message || "Invalid Credentials");
          }
        }, 1500);
      } catch (err) {
        setLoaders((prev) => ({ ...prev, login: false }));
        toast.error("Server Error");
      }
    },
    [loginData, Baseurl, dispatch, router],
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoaders((prev) => ({ ...prev, register: true }));

    // Basic Validation
    if (!registerData.email || !registerData.password) {
      toast.error("Please fill all fields");
      setLoaders((prev) => ({ ...prev, register: false }));
      return;
    }

    try {
      const res = await axios.post(`${Baseurl}user/send-OTP`, {
        useremail: registerData.email,
      });
      setLoaders((prev) => ({ ...prev, register: false }));
      if (res.data._status) {
        toast.success("OTP Sent!");
        setViews((prev) => ({ ...prev, showOtp: true }));
      }
    } catch (err) {
      setLoaders((prev) => ({ ...prev, register: false }));
      toast.error("Email already exists");
    }
  };

  const googeleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const obj = {
        useremail: user.email,
        UserName: user.displayName,
        userphone: user.phoneNumber || "N/A",
        userprofile: user.photoURL || "N/A",
      };

      const res = await axios.post(`${Baseurl}user/google-login`, obj);
      if (res.data._status) {
        dispatch(settokan({ tokan: res.data.tokan }));
        router.push("/desbord");
      }
    } catch (error) {
      toast.error("Google Auth Failed");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer />

      {/* --- FULL SCREEN LOADER --- */}
      {loaders.login && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-md">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-t-[#C09578] border-gray-100 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-b-black border-transparent rounded-full animate-spin-slow"></div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LOGIN / FORGET SECTION */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 font-[cha]">
              {views.showForget ? "Reset Password" : "Login"}
            </h2>

            <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 md:p-10 transition-all">
              {!views.showForget ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C09578] outline-none transition-all"
                      placeholder="email@example.com"
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C09578] outline-none transition-all"
                      placeholder="••••••••"
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setViews({ ...views, showForget: true })}
                    className="text-xs text-[#C09578] font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                      Login to Account
                    </button>
                    <button
                      type="button"
                      onClick={googeleLogin}
                      className="w-full py-4 bg-gray-50 text-black border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                    >
                      <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg"
                        className="w-5"
                        alt=""
                      />
                      Continue with Google
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-6">
                  {/* Forget Password Form Logic */}
                  <p className="text-sm text-gray-500">
                    Enter your email to receive a reset link.
                  </p>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border outline-none"
                    placeholder="Enter email"
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setViews({ ...views, showForget: false })}
                      className="text-sm font-bold"
                    >
                      Back
                    </button>
                    <button className="bg-[#C09578] text-white px-8 py-3 rounded-xl font-bold">
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* REGISTER SECTION */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 font-[cha]">
              {views.showOtp ? "Verify Account" : "Register"}
            </h2>
            <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 md:p-10 transition-all">
              {!views.showOtp ? (
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none"
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none"
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="submit"
                    disabled={loaders.register}
                    className="w-full py-4 bg-[#C09578] text-white rounded-xl font-bold hover:bg-[#a88264] transition-all disabled:opacity-50"
                  >
                    {loaders.register ? "Sending OTP..." : "Create Account"}
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center">
                  <p className="text-gray-500">
                    We've sent a 6-digit code to your email.
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full text-center text-2xl tracking-[1rem] py-4 rounded-xl border-2 border-[#C09578] outline-none"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button className="w-full py-4 bg-black text-white rounded-xl font-bold">
                    Verify & Register
                  </button>
                  <button
                    onClick={() => setViews({ ...views, showOtp: false })}
                    className="text-sm font-bold text-gray-400"
                  >
                    Change Email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
