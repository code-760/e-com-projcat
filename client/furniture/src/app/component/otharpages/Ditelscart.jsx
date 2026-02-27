"use client";
import { fetchcart, removeItemFromCart } from "@/app/redex/slice/cartslice";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Ditelscart() {
  // 1. Redux se data nikalte waqt safety check (|| {} lagaya hai)
  const cart = useSelector((Allmystroy) => Allmystroy.cartstore.cart) || {};

  // 2. Destructuring mein default values set ki hain
  const { cartdetails = [], path = "" } = cart;

  // 3. State ko initialize kiya
  const [cartdeta, setcartdeta] = useState(cartdetails);

  // 4. Jab Redux ka data update ho, tab local state bhi update ho jaye
  useEffect(() => {
    if (cartdetails) {
      setcartdeta(cartdetails);
    }
  }, [cartdetails]);

  // 5. Subtotal calculate karne ka safe tareeka
  const calculateSubtotal = () => {
    if (!cartdeta || !Array.isArray(cartdeta)) return 0;
    return cartdeta.reduce(
      (acc, obj) => acc + obj.price * (obj.quantity || 1),
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 50;

  let cardIid = cartdeta.map((obj) => obj._id);

  let cartdelete = (id) => {
    console.log("UI se delete ho raha hai ID:", id);
    // Filter use karo: Deleted ID ko chhod kar baaki sab rakho
    const updatedData = cartdeta.filter((item) => item._id !== id);
    // Local state update hote hi item "hatho-hath" gayab ho jayega
    setcartdeta(updatedData);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

        {/* Cart Items Loop */}
        {cartdeta && cartdeta.length > 0 ? (
          cartdeta.map((obj, index) => (
            <Cartcard
              key={index}
              obj={obj}
              path={path}
              cartdelete={cartdelete}
            />
          ))
        ) : (
          <h3 className="text-center text-gray-500 text-lg py-10">
            Your cart is currently empty.
          </h3>
        )}

        {/* Order Summary Section */}
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              {/* Ab yahan error nahi aayega */}
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>Total</span>
              {/* Grand Total logic */}
              <span>₹{subtotal + shipping}</span>
            </div>
          </div>

          <Link href="/Chakout">
            <button
              disabled={subtotal === 0}
              className={`mt-6 w-full py-3 rounded-lg font-medium ${subtotal === 0 ? "bg-gray-400" : "bg-black text-white"}`}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Ditelscart;

function Cartcard({ obj, path, cartdelete }) {
  let dispatch = useDispatch();
  let cardIid = obj._id;
  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  let currentquantity = obj.quantity;

  let qutyupdate = (Sign) => {
    if (Sign == "+") {
      currentquantity++;

      if (Sign == "-") {
        currentquantity--;
      }

      axios
        .put(`${basurl}cart/update-quantity`, {
          id: cardIid,
          quantity: currentquantity,
        })
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres._status === true) {
            dispatch(fetchcart()); // Redux store ko update karo taki UI bhi update ho jaye
            alert("Quantity updated successfully!");
          }
        });
    }
  };

  let deletecart = (id) => {
    axios
      .delete(`${basurl}cart/delete-cart/${id}`)
      .then((res) => res.data)
      .then((finalres) => {
        if (finalres._status === true) {
          // 1. Redux wala function call karo (Poori web app se item hatane ke liye)
          dispatch(removeItemFromCart(id));

          // 2. Agar aapne parent se koi function pass kiya hai toh use bhi call kar sakte ho
          // cartdelete(id);

          console.log("Hatho-hath delete ho gaya!");
        }
      })
      .catch((err) => {
        console.error("Error deleting cart item:", err);
      });
  };

  return (
    <div key={obj._id} className="space-y-4 mb-8">
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={path + obj.productImg}
            alt={obj.productName}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {obj.productName}
            </h3>
            <button
              onClick={() => deletecart(obj._id)}
              className="text-red-500 text-sm mt-1"
            >
              Delete Cart
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => qutyupdate("-")}
              className="px-3 py-1 text-gray-600"
            >
              −
            </button>
            <span className="px-4 text-sm font-medium">{currentquantity}</span>
            <button
              onClick={() => qutyupdate("+")}
              className="px-3 py-1 text-gray-600"
            >
              +
            </button>
          </div>

          <p className="text-base font-semibold text-gray-800">
            Total: ₹{obj.price * (obj.quantity || 1)}
          </p>
        </div>
      </div>
    </div>
  );
}
