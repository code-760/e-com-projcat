"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

export default function Thankyou({ params }) {
  let unwrappedParams = use(params);
  let OderiD = unwrappedParams.OderiD;

  const [orderDetails, setOrderDetails] = useState(null);
  const basurl = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    if (!OderiD) return;

    // Timer ko variable mein rakha taaki cleanup kar sakein (Memory Fix)
    const timer = setTimeout(() => {
      const fetchOrder = async () => {
        try {
          const res = await axios.get(`${basurl}order/view/${OderiD}?t=${Date.now()}`);
          if (res.data) {
            setOrderDetails(res.data.data);
          }
        } catch (err) {
          console.error("Order Fetch Error:", err);
        }
      };
      fetchOrder();
    }, 2000);

    // CLEANUP FUNCTION: Memory leak rokne ke liye sabse zaroori
    return () => clearTimeout(timer);
  }, [OderiD, basurl]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Confirming your order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100">
        
        {/* 1. Header Section - Responsive heights */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 md:p-10 text-center text-white">
          <div className="bg-white/20 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 scale-90 md:scale-100">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-black">Order Confirmed!</h1>
          <p className="opacity-90 mt-2 font-medium text-sm md:text-lg">
            Thank you, {orderDetails.shippingAddess?.name?.split(' ')[0]}!
          </p>
        </div>

        <div className="p-5 md:p-10">
          {/* 2. Order Meta - Responsive layout */}
          <div className="flex flex-col sm:flex-row justify-between border-b pb-6 mb-6 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order ID</p>
              <p className="text-lg md:text-xl font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg inline-block">
                #{orderDetails.OderID}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
              <p className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs md:text-sm font-bold capitalize">
                {orderDetails.orderStatus || "Processing"}
              </p>
            </div>
          </div>

          {/* 3. Items List */}
          <div className="mb-8">
            <h3 className="text-md md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Items in your package
            </h3>
            <div className="space-y-3">
              {orderDetails.OderItem?.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50/50 p-3 md:p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 md:gap-4">
                    <img 
                      src={item.productimg} 
                      alt={item.productName} 
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg bg-white shadow-sm flex-shrink-0" 
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-sm md:text-base truncate max-w-[150px] md:max-w-none">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-black text-gray-900 text-md md:text-lg">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* 4. Shipping Details */}
            <div className="bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100/50">
              <h4 className="font-black text-indigo-900 uppercase text-[10px] mb-3 flex items-center gap-2 opacity-60 tracking-wider">
                Shipping Address
              </h4>
              <div className="text-indigo-900/80 text-xs md:text-sm leading-relaxed">
                <p className="font-bold text-indigo-900 text-sm md:text-base mb-1">{orderDetails.shippingAddess?.name}</p>
                <p className="opacity-70 mb-2 truncate">{orderDetails.shippingAddess?.email}</p>
                <p>{orderDetails.shippingAddess?.address}</p>
                <p>{orderDetails.shippingAddess?.city}, {orderDetails.shippingAddess?.state}</p>
                <p>{orderDetails.shippingAddess?.country} - {orderDetails.shippingAddess?.pincode}</p>
                <p className="mt-3 font-bold text-indigo-600">Tel: {orderDetails.shippingAddess?.phone}</p>
              </div>
            </div>

            {/* 5. Payment Summary */}
            <div className="flex flex-col justify-center">
              <div className="space-y-3 border-b border-dashed pb-4 mb-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">₹{orderDetails.orderAmount}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-800">₹{orderDetails.shippingCharges}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md font-bold text-gray-400 uppercase tracking-tighter">Total Paid</span>
                <span className="text-2xl md:text-3xl font-black text-indigo-600">
                  ₹{Number(orderDetails.orderAmount) + Number(orderDetails.shippingCharges)}
                </span>
              </div>
            </div>
          </div>

          {/* 6. Action Button */}
          <div className="mt-8 md:mt-10">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm md:text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


