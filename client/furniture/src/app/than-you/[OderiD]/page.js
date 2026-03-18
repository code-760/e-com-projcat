"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

export default function Thankyou({ params }) {
  let unwrappedParams = use(params);
  let OderiD = unwrappedParams.OderiD;
  // let { OderiD } = useParams();

  console.log("Order ID from URL:", OderiD); // Debugging line to check if OderiD is being received correctly
  let [orderDetails, setOrderDetails] = useState(null);
  let [path, setpath] = useState();
  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    if (!OderiD) return;

    const viweoder = () => {
      // ?t=Date.now() lagane se browser hamesha FRESH data layega (cache clear ho jayega)
      axios
        .get(`${basurl}order/view/${OderiD}?t=${Date.now()}`)
        .then((res) => res.data)
        .then((data) => {
          setpath(data.path);

          setOrderDetails(data.data);
        })
        .catch((err) => console.error(err));
    };

    // setTimeout lagane se API call 2 second (2000ms) ke baad hogi
    // Tab tak backend apna kaam pura kar lega
    setTimeout(() => {
      viweoder();
    }, 2000);
  }, [OderiD, basurl]);
  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log("Order Details:", orderDetails); // Debugging line to check if order details are being set correctly

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-black">Order Confirmed!</h1>
          <p className="opacity-90 mt-2 font-medium text-lg">
            Thank you for shopping with us, {orderDetails.shippingAddess?.name}
          </p>
        </div>

        <div className="p-6 md:p-10">
          {/* 2. Order Meta (ID & Status) */}
          <div className="flex flex-wrap justify-between border-b pb-6 mb-6 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                Order ID
              </p>
              <p className="text-xl font-mono font-bold text-indigo-600">
                {orderDetails.OderID}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                Order Status
              </p>
              <p className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold capitalize">
                {orderDetails.orderStatus}
              </p>
            </div>
          </div>

          {/* 3. Items List */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
              Items in your package
            </h3>
            <div className="space-y-4">
              {orderDetails.OderItem?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={path + item.productimg}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg bg-white shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-gray-800">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-black text-gray-900 text-lg">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 4. Shipping Details (Full Data from Image) */}
            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
              <h4 className="font-black text-indigo-900 uppercase text-sm mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeWidth="2"
                  />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
                </svg>
                Shipping Details
              </h4>
              <div className="space-y-1 text-indigo-900/80 text-sm">
                <p className="font-bold text-indigo-900 text-base">
                  {orderDetails.shippingAddess?.name}
                </p>
                <p className="font-medium underline mb-2">
                  {orderDetails.shippingAddess?.email}
                </p>
                <p>{orderDetails.shippingAddess?.address}</p>
                <p>
                  {orderDetails.shippingAddess?.city},{" "}
                  {orderDetails.shippingAddess?.state}
                </p>
                <p>
                  {orderDetails.shippingAddess?.country} -{" "}
                  {orderDetails.shippingAddess?.pincode}
                </p>
                <p className="mt-3 font-bold text-indigo-700">
                  Phone: {orderDetails.shippingAddess?.phone}
                </p>
              </div>
            </div>

            {/* 5. Payment Summary */}
            <div className="space-y-4">
              <h4 className="font-black text-gray-400 uppercase text-sm">
                Payment Summary
              </h4>
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{orderDetails.orderAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-bold">
                    ₹{orderDetails.shippingCharges}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-blue-600 font-bold uppercase mt-2">
                  <span>Payment Method</span>
                  <span>
                    {orderDetails.paymentMethod === "1" ? "COD" : "Online"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-indigo-600">
                  ₹{orderDetails.orderAmount + orderDetails.shippingCharges}
                </span>
              </div>
            </div>
          </div>

          {/* 6. Action Button */}
          <div className="mt-10">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
