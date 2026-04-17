"use client";
import { fetchcart, removeItemFromCart } from "@/app/redex/slice/cartslice";
import axios from "axios";
import Link from "next/link";
import React, { useMemo } from "react"; // useMemo ka use karein CPU bachane ke liye
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Ditelscart() {
  const dispatch = useDispatch();
  
  // 1. Redux Selector Optimization (Local state ki zaroorat nahi hai yahan)
  const cartdetails = useSelector((state) => state.cartstore.cart?.cartdetails || []);

  // 2. CPU Fix: Subtotal ko Memoize kiya taaki calculation har render par na chale
  const subtotal = useMemo(() => {
    return cartdetails.reduce((acc, obj) => acc + (obj.price || 0) * (obj.quantity || 1), 0);
  }, [cartdetails]);

  const shipping = 50;

  return (
    <div className="w-full bg-gray-50 min-h-screen py-6 md:py-12">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartdetails.length > 0 ? (
              cartdetails.map((obj) => (
                <Cartcard key={obj._id} obj={obj} />
              ))
            ) : (
              <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                <Link href="/" className="text-[#C09578] font-bold mt-4 inline-block">Start Shopping</Link>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-md sticky top-10">
              <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Shipping</span>
                  <span>{subtotal > 0 ? `₹${shipping}` : "₹0"}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t text-black">
                  <span>Total</span>
                  <span>₹{subtotal > 0 ? subtotal + shipping : 0}</span>
                </div>
              </div>

              <Link href="/Chakout">
                <button
                  disabled={subtotal === 0}
                  className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    subtotal === 0 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-black text-white hover:bg-gray-800 shadow-lg active:scale-95"
                  }`}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Cart Card Component ---
function Cartcard({ obj }) {
  const dispatch = useDispatch();
  const basurl = process.env.NEXT_PUBLIC_BASEURL;

  // Quantity Update Fix: Logic ko clean kiya
  const qutyupdate = (Sign) => {
    let newQuantity = obj.quantity || 1;
    if (Sign === "+") newQuantity += 1;
    if (Sign === "-" && newQuantity > 1) newQuantity -= 1;
    else if (Sign === "-" && newQuantity === 1) return; // 1 se niche mat jane do

    axios.put(`${basurl}cart/update-quantity`, {
      id: obj._id,
      quantity: newQuantity,
    })
    .then((res) => {
      if (res.data._status === true) {
        dispatch(fetchcart());
        toast.info(`Quantity set to ${newQuantity}`);
      }
    })
    .catch(err => console.error("Update Error:", err));
  };

  const deletecart = (id) => {
    axios.delete(`${basurl}cart/delete-cart/${id}`)
    .then((res) => {
      if (res.data._status === true) {
        dispatch(removeItemFromCart(id));
        toast.error("Item removed from cart");
      }
    })
    .catch((err) => console.error("Delete Error:", err));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow gap-4">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={obj.productImg} // Path variable agar env mein hai toh wahan se lein
          alt={obj.productName}
          className="w-20 h-20 rounded-xl object-cover border border-gray-50"
        />
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-gray-800 line-clamp-1">{obj.productName}</h3>
          <p className="text-gray-400 text-xs">Price: ₹{obj.price}</p>
          <button
            onClick={() => deletecart(obj._id)}
            className="text-red-400 text-xs font-semibold mt-2 hover:text-red-600 transition-colors"
          >
            Remove Item
          </button>
        </div>
      </div>

      {/* Quantity & Total Section */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
          <button onClick={() => qutyupdate("-")} className="px-3 py-1.5 hover:bg-gray-200 transition-colors font-bold">−</button>
          <span className="px-4 text-sm font-bold w-10 text-center">{obj.quantity || 1}</span>
          <button onClick={() => qutyupdate("+")} className="px-3 py-1.5 hover:bg-gray-200 transition-colors font-bold">+</button>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">₹{obj.price * (obj.quantity || 1)}</p>
        </div>
      </div>
    </div>
  );
}

export default Ditelscart;