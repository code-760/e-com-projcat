"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdCameraAlt } from "react-icons/md"; // Camera icon ke liye
import Dashboard from "../desbordpages/Dashboard";

export default function Decbord() {
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
        if (!userData.shippingAddress || !userData.shippingAddress.address) {
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
    dispatch(removetokan());
      redirect("/Login-Register");
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

  return (
    <div className="bg-white text-gray-800">
      {/* Header Section */}
      <div className="border-b border-[#CCC] py-7">
        <div className="text-center flex flex-col items-center">
          <h1 className="p-4 text-4xl font-semibold font-[cha]">
            My Dashboard
          </h1>
          <div className="flex items-center gap-1 text-sm">
            <Link href={"/"} className="hover:text-[#c09578]">
              Home
            </Link>
            <MdOutlineNavigateNext />
            <p>My Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto border-b border-[#ccc] py-7">
        {/* Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_auto] gap-[50px] items-start">
          {/* --- YOUR ORIGINAL SIDEBAR STYLE --- */}
          <div className="flex flex-col gap-2 mt-6">
            {[
              { label: "My Dasboard", value: "My Dasboard" },
              { label: "Orders", value: "Orders" },
              { label: "Addresses", value: "Addresses" },
              { label: "My Profile", value: "My Profile" },
              { label: "Change Password", value: "Change Password" },
            ].map((tab) => (
              <div key={tab.value}>
                <h2
                  onClick={() => setdesboerdTab(tab.value)}
                  className={`border w-full md:w-[250px] font-bold duration-200 cursor-pointer text-white py-2 text-center 
                                    ${desboerdTab === tab.value ? "bg-[#C09578]" : "bg-black hover:bg-[#C09578]"}`}
                >
                  {tab.label}
                </h2>
              </div>
            ))}

            {/* Log Out Button (Same Style) */}
            <div>
              <h2
                onClick={handleLogout}
                className="border w-full md:w-[250px] bg-black font-bold duration-200 cursor-pointer hover:bg-red-600 text-white py-2 text-center"
              >
                Log Out
              </h2>
            </div>
          </div>

          {/* --- CONTENT AREA (Improved UI) --- */}
          <div className="w-full">
            {/* Dashboard Tab */}
            {desboerdTab === "My Dasboard" && (
              <Dashboard />
              // <div className="animate-fadeIn">
              //   <h1 className="p-4 text-4xl font-semibold font-[cha]">
              //     My Dashboard
              //   </h1>
              //   <p className="mt-2 text-gray-600">
              //     From your account dashboard. you can easily check & view your
              //     recent orders, manage your shipping and billing addresses and
              //     Edit your password and account details.
              //   </p>
              // </div>
            )}

            {/* Orders Tab */}
            {desboerdTab === "Orders" && (
              <div className="mt-6">
                <div className="overflow-x-auto rounded-lg border border-[#e6e6e6]">
                  <table className="min-w-full divide-y text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Order
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          #1001
                        </td>
                        <td className="px-4 py-3 text-gray-600">2025-11-01</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-800">$120.00</td>
                        <td className="px-4 py-3">
                          <Link
                            href="/orders/1001"
                            className="mr-3 text-[#c09578] hover:underline"
                          >
                            View
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
              <div className="mt-8 p-6 rounded-lg border border-gray-200 shadow-sm max-w-xl">
                <h3 className="text-xl font-semibold mb-4 font-[cha]">
                  Change Password
                </h3>
                <form onSubmit={changePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="mt-1 block w-full border-gray-300 border outline-none p-2 rounded-[10px] focus:border-[#C09578]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full border-gray-300 border outline-none p-2 rounded-[10px] focus:border-[#C09578]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="mt-1 block w-full border-gray-300 border outline-none p-2 rounded-[10px] focus:border-[#C09578]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-[200px] bg-[#cb9b7a] text-white py-2 px-4 rounded-md hover:bg-[#b99781]"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {desboerdTab === "Addresses" && (
              <div>
                <p className="mb-6 text-gray-600">
                  The following addresses will be used on the checkout page by
                  default.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Billing */}
                  <div className="rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-[cha] font-medium mb-4 border-b pb-2">
                      Billing Address
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Billing Name*
                        </label>
                        <input
                          type="text"
                          onChange={gatdata}
                          value={user.UserName}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Billing Email*
                        </label>
                        <input
                          type="email"
                          value={user.useremail}
                          readOnly
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="Email Address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Billing Mobile Number*
                        </label>

                        <PhoneInput
                          country={"in"}
                          enableSearch={true}
                          value={user.userphone}
                          onChange={handlePhoneChange}
                          inputStyle={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "0.5rem",
                            border: "1px solid #e5e7eb",
                            fontSize: "16px",
                            paddingLeft: "48px",
                          }}
                          buttonStyle={{
                            borderRadius: "0.5rem 0 0 0.5rem",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "white",
                          }}
                          containerClass="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Billing Address*
                        </label>
                        <input
                          type="text"
                          value={user.useraddress}
                          onChange={gatdata}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="House No, Street, Area"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Country*
                          </label>
                          <input
                            type="text"
                            value={user.country || ""}
                            onChange={gatdata}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            State*
                          </label>
                          <input
                            value={user.state || ""}
                            onChange={gatdata}
                            type="text"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City*
                        </label>
                        <input
                          type="text"
                          value={user.city || ""}
                          onChange={gatdata}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-[#c09578] text-white py-2 px-8 rounded-3xl hover:bg-[#a88264] transition"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Shipping */}
                  <div className="rounded-lg p-6 bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-[cha] font-medium mb-4 border-b pb-2">
                      Shipping Address
                    </h3>

                    <form onSubmit={updateShippingInfo} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shipping Name*
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="Full Name"
                          value={user.shippingAddress?.shippingName || ""}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shipping Email*
                        </label>
                        <input
                          type="email"
                          value={user.shippingAddress?.shippingEmail || ""}
                          readOnly
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="Email Address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shipping Mobile Number*
                        </label>
                        <input
                          type="text"
                          name="shippingPhone"
                          value={user.shippingAddress?.shippingPhone || ""}
                          onChange={handleShippingChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shipping Address*
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={user.shippingAddress?.address || ""}
                          onChange={handleShippingChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          placeholder="House No, Street, Area"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Country*
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={user.shippingAddress?.country || ""}
                            onChange={handleShippingChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            State*
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={user.shippingAddress?.state || ""}
                            onChange={handleShippingChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={user.shippingAddress?.city || ""}
                          onChange={handleShippingChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 shadow-sm focus:border-[#c09578] outline-none"
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-[#c09578] text-white py-2 px-8 rounded-3xl hover:bg-[#a88264] transition"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* My Profile Tab */}
            {/* My Profile Tab */}
            {desboerdTab === "My Profile" && (
              <div className="flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                  <h1 className="text-2xl font-semibold mb-6 text-gray-800 font-[cha] border-b pb-2">
                    Update Profile
                  </h1>
                  <form onSubmit={userprofileupdate} className="space-y-4">
                    {/* ✅ PROFILE PHOTO SECTION START */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative group">
                        {/* Photo Circle */}
                        <div className="w-32 h-32 rounded-full border-4 border-[#c09578] overflow-hidden flex items-center justify-center bg-gray-100">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            // Agar photo nahi hai to ye default icon dikhega
                            <span className="text-gray-400 text-5xl font-bold">
                              {user.UserName
                                ? user.UserName.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          )}
                        </div>

                        {/* Camera Icon (Upload Button) */}
                        <label
                          htmlFor="profile-upload"
                          className="absolute bottom-1 right-1 bg-[#c09578] p-2 rounded-full text-white cursor-pointer hover:bg-[#a88264] shadow-md transition-all"
                        >
                          <MdCameraAlt size={20} />
                        </label>

                        {/* Hidden Input for File Upload */}
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name="userprofile"
                          onChange={handleImageChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Click icon to upload
                      </p>
                    </div>
                    {/* ✅ PROFILE PHOTO SECTION END */}

                    {/* Gender Selection */}
                    <div className="flex items-center gap-4 mb-4 justify-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userGender"
                          checked={user.userGender === "male"}
                          value="male"
                          onChange={gatdata}
                          className="accent-[#c09578]"
                        />{" "}
                        Mr.
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userGender"
                          checked={user.userGender === "female"}
                          value="female"
                          onChange={gatdata}
                          className="accent-[#c09578]"
                        />{" "}
                        Mrs.
                      </label>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name*
                        </label>
                        <input
                          type="text"
                          name="UserName"
                          onChange={gatdata}
                          value={user.UserName}
                          placeholder="Your name"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#C09578]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          name="useremail"
                          value={user.useremail}
                          readOnly
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    {/* Mobile & Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number*
                        </label>
                        <PhoneInput
                          country={"in"}
                          enableSearch={true}
                          value={user.userphone}
                          onChange={handlePhoneChange}
                          inputStyle={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "0.5rem",
                            border: "1px solid #e5e7eb",
                            fontSize: "16px",
                            paddingLeft: "48px",
                          }}
                          buttonStyle={{
                            borderRadius: "0.5rem 0 0 0.5rem",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "white",
                          }}
                          containerClass="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address*
                        </label>
                        <input
                          type="text"
                          name="useraddress"
                          value={user.useraddress}
                          onChange={gatdata}
                          placeholder="Address"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#C09578]"
                        />
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="w-full flex justify-end mt-6">
                      <button
                        type="submit"
                        className="rounded-full w-[150px] bg-[#c09578] text-white py-3 font-medium hover:bg-[#a88264] shadow-md transition-all active:scale-95"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
