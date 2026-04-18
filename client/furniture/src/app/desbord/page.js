"use client";
import axios from "axios";
import Link from "next/link";
import {
  BiMapPin,
  BiPackage,
  BiUserCircle,
  BiCreditCard,
} from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdCameraAlt } from "react-icons/md"; // Camera icon ke liye

import { Suspense } from "react";

function DashboardContent() {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmNewPassword, setConfirmNewPassword] = useState("");
  let [preview, setPreview] = useState(null);
  let [user, setuser] = useState({
    UserName: "",
    useremail: "",
    userphone: "",
    useraddress: "",
    userGender: "",
    userprofile: "", // Profile photo ke liye state
    shippingAddress: {
      shippingName: "",
      shippingEmail: "",
      shippingPhone: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
  });

  let tokan = useSelector((Allmystroy) => Allmystroy.userstore.tokan);
  let dispatch = useDispatch();

  const router = useRouter();

  let [desboerdTab, setdesboerdTab] = useState("My Dasboard");
  let basurl = process.env.NEXT_PUBLIC_BASEURL;
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab");

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
        let userData = finlerec.data;

        console.log("Fetched User Data:", userData); // Debugging ke liye

        if (!userData.shippingAddress || !userData.shippingAddress?.address) {
          userData.shippingAddress = {
            shippingName: userData.UserName || "",
            shippingEmail: userData.useremail || "",
            shippingPhone: userData.userphone || "",
            address: userData.useraddress || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
            country: userData.country || "",
          };
        }

        setuser(userData); // ✅ FIXED

        setPreview(finlerec.data.userprofile);
      });
  };

  let gatdata = (e) => {
    let { name, value } = e.target;
    let newdata = { ...user };
    newdata[name] = value;
    setuser(newdata);
  };
  let handlePhoneChange = (value) => {
    setuser({ ...user, userphone: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Photo ka preview URL banana taaki turant dikhe
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  let handleShippingChange = (e) => {
    let { name, value } = e.target;
    setuser({
      ...user,
      shippingAddress: {
        ...user.shippingAddress,
        [name]: value,
      },
    });
  };

  const handleLogout = () => {
    dispatch(removetokan()); // Ensure 'removetokan' is imported
    router.push("/Login-Register"); // redirect ki jagah router.push
  };

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
        console.log("Profile updated successfully");
      });
  };

  const updateShippingInfo = (e) => {
    e.preventDefault(); // Form reload hone se rokne ke liye
    // Check karein ki shippingAddress khali to nahi hai

    if (!user.shippingAddress.address || !user.shippingAddress.shippingPhone) {
      toast.error("Please fill all shipping fields");
      return;
    }

    axios
      .post(`${basurl}user/update-shipping-address`, user.shippingAddress, {
        headers: {
          Authorization: `Bearer ${tokan}`,
        },
      })
      .then((response) => {
        toast.success("Shipping Address Updated Successfully!");
        userditels(); // Naya data refresh karne ke liye call karein
      })
      .catch((err) => {
        console.error("Update Error:", err);
        toast.error("Failed to update shipping address");
      });
  };

  let changePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    axios
      .post(
        `${basurl}user/change-password`,
        {
          oldpassword: oldPassword,
          newpassword: newPassword,
          ConfirmPassword: confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${tokan}` } },
      )
      .then((response) => {
        toast.success("Password changed successfully!");
        setOldPassword(""); // Reset inputs
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to change password");
      });
  };
  useEffect(() => {
    userditels();
  }, [tokan]);

  useEffect(() => {
    if (tabQuery === "profile") {
      setdesboerdTab("My Profile");
    } else if (tabQuery === "dashboard") {
      setdesboerdTab("My Dasboard"); // Spelled exactly like your state
    }
  }, [tabQuery]);

  return (
    <div className="bg-[#F9F9F9] min-h-screen text-gray-800 font-sans">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black mb-3 font-[cha]">
            My Dashboard
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 uppercase tracking-widest">
            <Link href={"/"} className="hover:text-[#c09578] transition-colors">
              Home
            </Link>
            <MdOutlineNavigateNext className="text-lg" />
            <span className="text-black font-medium">My Dashboard</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* --- SIDEBAR --- */}
          <div className="w-full lg:w-[300px]  top-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {[
                { label: "My Dashboard", value: "My Dasboard" },
                { label: "Orders", value: "Orders" },
                { label: "Addresses", value: "Addresses" },
                { label: "My Profile", value: "My Profile" },
                { label: "Change Password", value: "Change Password" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setdesboerdTab(tab.value)}
                  className={`w-full text-left px-6 py-4 font-semibold transition-all duration-300 border-b border-gray-50 last:border-0
                ${
                  desboerdTab === tab.value
                    ? "bg-[#C09578] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-[#C09578]"
                }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-6 py-4 font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {/* Dashboard Tab */}
            {desboerdTab === "My Dasboard" && (
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
                          Managing your sanctuary is easy. Track your furniture
                          orders, update delivery locations, and secure your
                          account from here.
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
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Orders
                          </p>
                          <p className="text-xl font-bold">03 Active</p>
                        </div>
                      </div>
                      <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <BiCreditCard className="text-2xl text-[#C09578]" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Wallet
                          </p>
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
                        <button className="text-sm font-semibold text-[#C09578] hover:underline">
                          View All
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Order Row 1 */}
                        <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <div>
                              <p className="font-bold text-slate-900">
                                #ORD-1024
                              </p>
                              <p className="text-xs text-slate-400">
                                Oct 12, 2023
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">₹14,500</p>
                            <p className="text-[10px] font-bold uppercase text-blue-600">
                              In Transit
                            </p>
                          </div>
                        </div>
                        {/* Order Row 2 */}
                        <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div>
                              <p className="font-bold text-slate-900">
                                #ORD-1021
                              </p>
                              <p className="text-xs text-slate-400">
                                Sep 28, 2023
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">₹8,200</p>
                            <p className="text-[10px] font-bold uppercase text-green-600">
                              Delivered
                            </p>
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
                              <p className="font-bold text-slate-900 text-sm italic">
                                Shipping Address
                              </p>
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
                              <p className="font-bold text-slate-900 text-sm italic">
                                Billing Profile
                              </p>
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
            )}

            {/* Orders Tab */}
            {desboerdTab === "Orders" && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 font-[cha]">
                  Order History
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-bold">Order</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Total</th>
                        <th className="px-6 py-4 font-bold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-black">
                          #1001
                        </td>
                        <td className="px-6 py-4 text-gray-500">2025-11-01</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 uppercase">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">$120.00</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href="/orders/1001"
                            className="text-[#c09578] font-bold hover:underline"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Change Password Tab */}
            {desboerdTab === "Change Password" && (
              <div className="max-w-lg animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 font-[cha]">
                  Security Settings
                </h3>
                <form onSubmit={changePassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Old Password
                    </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#C09578] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#C09578] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#C09578] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-[#c09578] transition-all shadow-lg active:scale-[0.98]"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {desboerdTab === "Addresses" && (
              <div className="animate-fadeIn">
                <p className="text-gray-500 mb-8 italic">
                  Manage your billing and shipping information for a faster
                  checkout.
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  {/* Billing */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-3 font-[cha]">
                      Billing Address
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Billing Name*
                        </label>
                        <input
                          type="text"
                          onChange={gatdata}
                          value={user.UserName}
                          className="w-full border-b border-gray-200 py-2 focus:border-[#c09578] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Billing Email*
                        </label>
                        <input
                          type="email"
                          value={user.useremail}
                          readOnly
                          className="w-full border-b border-gray-200 py-2 bg-gray-50 text-gray-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Mobile Number*
                        </label>
                        <PhoneInput
                          country={"in"}
                          value={user.userphone}
                          onChange={handlePhoneChange}
                          containerClass="phone-input-custom"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          value={user.useraddress}
                          onChange={gatdata}
                          className="w-full border-b border-gray-200 py-2 focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Country"
                          value={user.country || ""}
                          onChange={gatdata}
                          className="border-b border-gray-200 py-2 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={user.state || ""}
                          onChange={gatdata}
                          className="border-b border-gray-200 py-2 outline-none"
                        />
                      </div>
                      <button className="bg-[#c09578] text-white px-8 py-2 rounded-full text-sm font-bold hover:shadow-md transition-all">
                        Update Billing
                      </button>
                    </form>
                  </div>

                  {/* Shipping */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-3 font-[cha]">
                      Shipping Address
                    </h3>
                    <form onSubmit={updateShippingInfo} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Shipping Name*
                        </label>
                        <input
                          type="text"
                          name="shippingName"
                          value={user.shippingAddress?.shippingName || ""}
                          onChange={handleShippingChange}
                          className="w-full border-b border-gray-200 py-2 focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Shipping Email*
                        </label>
                        <input
                          type="email"
                          value={user.shippingAddress?.shippingEmail || ""}
                          readOnly
                          className="w-full border-b border-gray-200 py-2 bg-gray-50 text-gray-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Shipping Phone*
                        </label>
                        <input
                          type="text"
                          name="shippingPhone"
                          value={user.shippingAddress?.shippingPhone || ""}
                          onChange={handleShippingChange}
                          className="w-full border-b border-gray-200 py-2 focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                          Address*
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={user.shippingAddress?.address || ""}
                          onChange={handleShippingChange}
                          className="w-full border-b border-gray-200 py-2 focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={user.shippingAddress?.country || ""}
                          onChange={handleShippingChange}
                          className="border-b border-gray-200 py-2 outline-none"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={user.shippingAddress?.state || ""}
                          onChange={handleShippingChange}
                          className="border-b border-gray-200 py-2 outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#c09578] text-white px-8 py-2 rounded-full text-sm font-bold hover:shadow-md transition-all"
                      >
                        Update Shipping
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* My Profile Tab */}
            {desboerdTab === "My Profile" && (
              <div className="max-w-3xl mx-auto animate-fadeIn">
                <h3 className="text-2xl font-bold mb-8 text-center font-[cha]">
                  Edit Profile
                </h3>
                <form onSubmit={userprofileupdate} className="space-y-8">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full border-4 border-[#c09578] overflow-hidden shadow-xl bg-gray-50 flex items-center justify-center">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[#c09578] text-4xl font-bold uppercase">
                            {user.UserName ? user.UserName.charAt(0) : "U"}
                          </span>
                        )}
                      </div>
                      <label
                        htmlFor="profile-upload"
                        className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-[#c09578] transition-all shadow-lg"
                      >
                        <MdCameraAlt size={18} />
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        name="userprofile"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-8">
                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="userGender"
                        checked={user.userGender === "male"}
                        value="male"
                        onChange={gatdata}
                        className="w-4 h-4 accent-[#c09578]"
                      />
                      <span>Mr.</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="userGender"
                        checked={user.userGender === "female"}
                        value="female"
                        onChange={gatdata}
                        className="w-4 h-4 accent-[#c09578]"
                      />
                      <span>Mrs.</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        name="UserName"
                        onChange={gatdata}
                        value={user.UserName}
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-1 focus:ring-[#C09578] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        value={user.useremail}
                        readOnly
                        className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 text-gray-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Mobile Number*
                      </label>
                      <PhoneInput
                        country={"in"}
                        value={user.userphone}
                        onChange={handlePhoneChange}
                        containerClass="w-full"
                        inputClass="!w-full !h-[50px] !rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Location*
                      </label>
                      <input
                        type="text"
                        name="useraddress"
                        value={user.useraddress}
                        onChange={gatdata}
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-1 focus:ring-[#C09578] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-[#c09578] transition-all shadow-xl active:scale-95"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function dashboard() {
  return (
    // Yeh Suspense tab tak "Loading..." dikhayega jab tak URL parameters read nahi ho jate
    <Suspense
      fallback={<div className="p-4 text-center">Loading Dashboard...</div>}
    >
            <DashboardContent />
    </Suspense>
  );
}
