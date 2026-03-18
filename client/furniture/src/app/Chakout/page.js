"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart } from "../redex/slice/cartslice";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

// --- NAYA (Script Loader): Ye function chupchaap Razorpay ka script laayega ---
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
// -----------------------------------------------------------------------------

function Chakout() {
  let dispatch = useDispatch();
  let [paymentMethod, setPaymentMethod] = useState("1"); // 1 = Online, 2 = COD
  let tokan = useSelector((Allmystroy) => Allmystroy.userstore.tokan);
  let cart = useSelector((Allmystroy) => Allmystroy.cartstore.cart) || {};

  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  let [user, setuser] = useState({
    UserName: "",
    useremail: "",
    userphone: "",
    useraddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  let userprofileupdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post(`${basurl}user/update-user`, formData, {
        headers: { Authorization: `Bearer ${tokan}` },
      })
      .then((response) => {
        userditels();
       
        toast.success("Profile updated successfully");
      })
      .catch((err) => console.log("Update Error:", err));
  };

  let userditels = () => {
    axios
      .post(
        `${basurl}user/user-detail`,
        {},
        {
          headers: { Authorization: `Bearer ${tokan}` },
        },
      )
      .then((response) => {
        if (response.data.data) {
          setuser(response.data.data);
        }
      });
  };

  let gatdata = (e) => {
    let { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (tokan) userditels();
  }, [tokan]);

  let cartitems = cart.cartdetails || [];

  const subtotal = cartitems.reduce(
    (acc, obj) => acc + obj.price * (obj.quantity || 1),
    0,
  );

  let saveorder = () => {
    let orderData = {
      OderiD: "ORD" + Math.floor(Math.random() * 1000000),
      OderItem: cartitems.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        productimg: item.productImg,
      })),
      shippingAddess: {
        name: user.UserName,
        email: user.useremail,
        phone: user.userphone,
        address: user.useraddress,
        country: user.country,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
      },
      paymentMethod,
      orderAmount: subtotal,
      shippingCharges: 100,
      totalAmount: subtotal + 100,
      paymentStatus: "1",
      orderDate: new Date().toISOString(),
    };

    axios
      .post(`${basurl}order/create`, orderData, {
        headers: { Authorization: `Bearer ${tokan}` },
      })
      .then((rec) => rec.data)
      .then(async (data) => {
        // <-- Yahan maine 'async' lagaya hai
        // console.log(data);

        // --- LOGIC FIX: Yahan "2" aayega kyunki "2" Cash on Delivery hai ---
        if (paymentMethod === "2") {
          dispatch(fetchcart());
          ("Order Placed Successfully via COD!");
        } else {
          // --- Yahan "1" (Online Payment) par Razorpay chalega ---

          // Pehle check karenge ki script aayi ya nahi
          const isScriptLoaded = await loadRazorpayScript();
          if (!isScriptLoaded) {
            toast.error(
              "Razorpay SDK failed to load. Please check your connection.",
            );
            return;
          }

          let { fainlrezorpayOrder } = data;
          const options = {
            key: "rzp_test_SPPTOU3xnWuDL3",
            amount: fainlrezorpayOrder.amount_due,
            currency: "INR",
            name: "E-Furniture Web",
            description: "Premium Furniture",
            image: "https://example.com/your-logo.png",
            order_id: fainlrezorpayOrder.id,
            handler: (response) => {
              axios
                .post(`${basurl}order/verify-payment`, response, {
                  headers: { Authorization: `Bearer ${tokan}` },
                })
                .then((rec) => rec.data)
                .then((data) => {
                  console.log("Payment Verification Response:", data);
                  redirect(`/than-you/${data.OderiD}`); // <-- Redirect to Thank You page with order ID
                });
              dispatch(fetchcart());
            },
            prefill: {
              name: user.UserName,
              email: user.useremail,
              contact: user.userphone,
            },
            theme: {
              color: "#4A2311",
            },
          };

          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
       <ToastContainer />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: All Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Billing Form (All Inputs) */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-6">Billing Details</h2>
              <form onSubmit={userprofileupdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="UserName"
                      value={user.UserName || ""}
                      onChange={gatdata}
                      placeholder="Name"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="useremail"
                      value={user.useremail || ""}
                      onChange={gatdata}
                      placeholder="Email"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="userphone"
                      value={user.userphone || ""}
                      onChange={gatdata}
                      placeholder="Phone"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={user.country || ""}
                      onChange={gatdata}
                      placeholder="Country"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={user.state || ""}
                      onChange={gatdata}
                      placeholder="State"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={user.city || ""}
                      onChange={gatdata}
                      placeholder="City"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={user.pincode || ""}
                      onChange={gatdata}
                      placeholder="Pincode"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                      Full Address
                    </label>
                    <input
                      type="text"
                      name="useraddress"
                      value={user.useraddress || ""}
                      onChange={gatdata}
                      placeholder="Address"
                      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition font-medium"
                  >
                    Save Address Info
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Payment Selection */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  onClick={() => setPaymentMethod("1")}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "1" ? "border-black bg-gray-50 ring-1 ring-black" : "border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "1"}
                    readOnly
                  />
                  <div>
                    <p className="font-bold">Online Payment</p>
                    <p className="text-xs text-gray-500">Cards, UPI, Wallets</p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("2")}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "2" ? "border-black bg-gray-50 ring-1 ring-black" : "border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "2"}
                    readOnly
                  />
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">
                      Pay at your doorstep
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary & Final Button */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-10">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
              {cartitems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.productName} (x{item.quantity})
                  </span>
                  <span className="font-medium">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹100</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t text-black">
                <span>Total</span>
                <span>₹{subtotal + 100}</span>
              </div>
            </div>

            <button
              onClick={saveorder}
              className="w-full bg-black text-white py-4 rounded-2xl mt-8 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            >
              Place Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chakout;
