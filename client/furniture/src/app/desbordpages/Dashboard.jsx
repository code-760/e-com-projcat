
import React from "react";
import {BiMapPin, BiPackage, BiUserCircle, BiCreditCard } from "react-icons/bi";


const Dashboard = () => {
 

  return (
   <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-10 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Account <span className="text-[#C09578]">Overview</span>
          </h1>
          <div className="h-1 w-20 bg-[#C09578] mt-4 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. Welcome Card */}
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#F3EEEA] shadow-inner bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-400">
                H
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Welcome back, Himanshu!
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md">
                Managing your sanctuary is easy. Track your furniture orders, 
                update delivery locations, and secure your account from here.
              </p>
            </div>
            
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-[#C09578] transition-all duration-300 shadow-lg">
              Edit Account
            </button>
          </div>

          {/* 2. Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <BiPackage className="text-2xl text-[#C09578]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Orders</p>
                <p className="text-xl font-bold">03 Active</p>
              </div>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <BiCreditCard className="text-2xl text-[#C09578]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Wallet</p>
                <p className="text-xl font-bold">₹2,450</p>
              </div>
            </div>
          </div>

          {/* 3. Recent Orders (Fake List) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <BiPackage className="text-[#C09578]" /> Recent Orders
              </h3>
              <button className="text-sm font-semibold text-[#C09578] hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {/* Order Row 1 */}
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-bold text-slate-900">#ORD-1024</p>
                    <p className="text-xs text-slate-400">Oct 12, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">₹14,500</p>
                  <p className="text-[10px] font-bold uppercase text-blue-600">In Transit</p>
                </div>
              </div>
              {/* Order Row 2 */}
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-bold text-slate-900">#ORD-1021</p>
                    <p className="text-xs text-slate-400">Sep 28, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">₹8,200</p>
                  <p className="text-[10px] font-bold uppercase text-green-600">Delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Address Section (Fake Info) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
              <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
                <BiMapPin className="text-[#C09578]" /> Delivery Hub
              </h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FDF8F3] rounded-xl flex items-center justify-center shrink-0">
                    <BiMapPin className="text-xl text-[#C09578]" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm italic">Shipping Address</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      123 Streetrest, <br />
                      Horizon, FL 36207
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-t pt-6">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <BiUserCircle className="text-xl text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm italic">Billing Profile</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Same as shipping <br />
                      imyummame@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-10 border-2 border-slate-100 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                Manage All Locations
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
