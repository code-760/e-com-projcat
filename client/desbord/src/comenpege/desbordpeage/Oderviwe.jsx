import React, { use, useEffect, useState } from "react";
import { FaFilter, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

// Order ke liye icons
import {
  RiShoppingBag3Line,
  RiDeleteBin6Line,
  RiToggleLine,
  RiSearchLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiCalendar2Line,
  RiMapPinLine,
} from "react-icons/ri";
import axios from "axios";

export default function Vieworder() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let [searchbox, setsearchbox] = useState(false);
  let [data, setdata] = useState([]);
  let [path, setpath] = useState("");
  let [allids, setallids] = useState([]);
  let [searchObj, setSearchObj] = useState({
    UserName: "",
  });

  let oderviwe = () => {
    axios
      .get(`${apibaseurl}/oder-viwe/oder`, {
        params: searchObj,
      })

      .then((rec) => rec.data)
      .then((falinlrec) => {
        setdata(falinlrec.data);
        setpath(falinlrec.path);
      });
  };

  console.log(data);

  useEffect(() => {
    oderviwe();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Time format karne ke liye (e.g., "05:30 PM")
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  };

  let totalOrders = data.length;
  // Jo orders deliver ho gaye (status == 3)
  let deliveredOrders = data.filter((obj) => obj.paymentStatus == 3).length;
  // Jo orders pending hain (status == 2)
  let pendingOrders = data.filter((obj) => obj.paymentStatus == 2).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          Order Management
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            3 Total
          </span>
        </h2>
        <p className="text-gray-500 mt-2">
          Static UI page with extra details like Date, Items, and Location.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {totalOrders}
            </h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <RiShoppingBag3Line size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Delivered</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">
              {deliveredOrders}
            </h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full text-green-600">
            <RiCheckDoubleLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-1">
              {pendingOrders}
            </h3>
          </div>
          <div className="bg-orange-50 p-3 rounded-full text-orange-500">
            <RiTimeLine size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Toolbar (Static Buttons) */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="px-4 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl flex items-center gap-2 transition-all">
              <FaFilter /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl flex items-center gap-2 transition-all">
              <RiDeleteBin6Line />{" "}
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button className="px-4 py-2.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl flex items-center gap-2 transition-all">
              <RiToggleLine />{" "}
              <span className="hidden sm:inline">Change Status</span>
            </button>
          </div>

          {/* Search Box (Static) */}
          <div className="relative w-full sm:w-72">
            <RiSearchLine onClick={oderviwe} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="search"
             
              name="OderiD"
               onChange={(e)=>{
                let obj={...searchObj}
                 obj[e.target.name]=e.target.value
                setSearchObj(obj)

              }}
              classN
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="Search Order No..."
            />
          </div>
        </div>

        {/* Table (MANUAL HARDCODED ROWS) */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600"
                  />
                </th>
                <th className="px-6 py-4">Order Info</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Amount & Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.length > 0 ? (
                data?.map((obj, index) => {
                  return (
                    <tr className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">
                          {obj.OderiD}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <RiCalendar2Line className="text-gray-400" />
                          <span>{formatDate(obj.orderDate)}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 ml-5">
                          {formatTime(obj.orderDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {obj.shippingAddess.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <RiMapPinLine className="text-gray-400" />{" "}
                          {obj.shippingAddess.country},{" "}
                          {obj.shippingAddess.state}, {obj.shippingAddess.city}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col gap-2">
                          {obj.OderItem?.map((item, i) => (
                            <span
                              key={i}
                              // w-fit lagana zaroori hai, warna background color poori table cell ki width le lega
                              className="bg-gray-100 px-2 py-1 rounded text-sm w-fit"
                            >
                              {item.productName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          ₹{obj.orderAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Paid via UPI
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            obj.paymentStatus == 3 // Yahan === ki jagah == kar diya
                              ? "bg-green-100 text-green-700"
                              : obj.paymentStatus == 2 // Yahan bhi ==
                                ? "bg-orange-100 text-orange-700" // Note: white text orange background pe padhne mein mushkil ho sakti hai, isliye orange-700 better hai
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {obj.paymentStatus == 3 // Yahan bhi ==
                            ? "Delivered"
                            : obj.paymentStatus == 2 // Yahan bhi ==
                              ? "Pending"
                              : "Processing"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link to="/view-order-details/1">
                          <button
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No testimonials found. Add a new one to get started.
                  </td>
                </tr>
              )}

              {/* Row 2 */}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-500">{`Showing ${data.length} entries`}</p>
        </div>
      </div>
    </div>
  );
}
