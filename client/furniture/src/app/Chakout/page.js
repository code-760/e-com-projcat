"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Chakout() {
    let tokan = useSelector((Allmystroy) => Allmystroy.userstore.tokan);

  let basurl = process.env.NEXT_PUBLIC_BASEURL;
  let [user, setuser] = useState({
    UserName: "",
    useremail: "",
    userphone: "",
    useraddress: "",
  });

  let userprofileupdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post(`${basurl}user/update-user`, formData, {
        headers: {
          Authorization: `Bearer ${tokan}`,
        },
      })
      .then((response) => response.data)
      .then((finlerec) => {
        userditels();
        console.log(finlerec);
        alert("Profile updated successfully");
      });
  };

  let userditels = () => {
    axios
      .post(
        `${basurl}user/user-detail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokan}`,
          },
        },
      )
      .then((response) => response.data)
      .then((finlerec) => {
        setuser(finlerec.data);
        setPreview(finlerec.path + finlerec.data.userprofile);
      });
  };

  let gatdata = (e) => {
    let { name, value } = e.target;
    let newdata = { ...user };
    newdata[name] = value;
    setuser(newdata);
  };

  useEffect(() => {
    userditels();
  }, [tokan]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Details */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                <form onSubmit={userprofileupdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <input
                      type="text"
                      name="UserName"
                      value={user.UserName}
                      onChange={gatdata}
                      placeholder="Billing Name"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* Email */}
                    <input
                      type="email"
                      name="useremail"
                      value={user.useremail}
                      onChange={gatdata}
                      placeholder="Billing Email"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* Mobile */}
                    <input
                      type="text"
                      name="userphone"
                        value={user.userphone}
                        onChange={gatdata}
                      placeholder="Billing Mobile Number"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* Country */}
                    <input
                      type="text"
                      name="country"
                      value={user.country}
                      onChange={gatdata}
                      placeholder="Country"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* State */}
                    <input
                      type="text"
                      name="state"
                        value={user.state}
                      onChange={gatdata}
                      placeholder="State"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* City */}
                    <input
                      type="text"
                      name="city"
                        value={user.city}
                        onChange={gatdata}
                      placeholder="City"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* Address - Full Width */}
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="useraddress"
                        value={user.useraddress}
                        onChange={gatdata}
                        placeholder="Billing Address"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-black text-white py-2 px-8 rounded-xl hover:opacity-90 transition"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                    <input type="radio" name="payment" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                {/* Static Placeholder Items */}
                <div className="flex justify-between text-sm">
                  <span>Product Name | 1 </span>
                  <span>₹000</span>
                </div>
              </div>

              <div className="flex justify-between text-sm my-5">
                <span>Total</span>
                <span>₹000</span>
              </div>

              <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chakout;
