import React, { useEffect, useState } from "react";
import { FaPenNib, FaFilter } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom"; // Fixed 'react-router' to 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"; // Added Toast import
import swal from "sweetalert"; // Added Swal import

// Premium Icons
import {
  RiSearchLine,
  RiDeleteBin6Line,
  RiToggleLine,
  RiEyeLine,
  RiShoppingBag3Line,
  RiCheckDoubleLine,
  RiCloseCircleLine,
} from "react-icons/ri";

export default function View_Product() {
  let [searchbox, setsearchbox] = useState(false);
  let [read, setread] = useState(false);
  let [date, setdate] = useState([]);
  let [path, setpath] = useState("");
  let [detail, setdetail] = useState();
  let [allids, setallids] = useState([]);

  let [searchObj,setSearchObj]=useState(
    {
      productName:'',
      productOrder:''
    }
  )


  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let getproduct = () => {
    axios
      .get(`${apibaseurl}/Product/viwe`,{
          params:searchObj
        })
      .then((rec) => rec.data)
      .then((finlerec) => {
        setpath(finlerec.path);
        setdate(finlerec.date);
      });
  };

  let getChacdebox = (e) => {
    if (e.target.checked) {
      setallids([...allids, e.target.value]);
    } else {
      setallids(allids.filter((v) => v != e.target.value));
    }
  };

  let deleterow = () => {
    if (allids.length >= 1) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these products!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .post(`${apibaseurl}/Product/multidelete`, { ids: allids })
            .then((rec) => rec.data)
            .then((fainlrec) => {
              if (fainlrec.status) {
                getproduct(); // Corrected function name
                setallids([]);
                swal("Poof! Your products have been deleted!", {
                  icon: "success",
                });
              }
            });
        }
      });
    } else {
      toast.error("Please check the box");
    }
  };

  let changestatus = () => {
    if (allids.length >= 1) {
      axios
        .post(`${apibaseurl}/Product/change-status`, { ids: allids }) // Corrected endpoint if needed
        .then((rec) => rec.data)
        .then((finalrec) => {
          if (finalrec.status) {
            getproduct();
            setallids([]);
            toast.success("Status Updated Successfully");
          }
        });
    } else {
      toast.error("Please check the box");
    }
  };

  let getallchecked = (e) => {
    if (e.target.checked) {
      setallids(date.map((obj) => obj._id));
    } else {
      setallids([]);
    }
  };

  let gatdiles = (id) => {
    axios
      .get(`${apibaseurl}/Product/get-deteils/${id}`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        setpath(finlerec.path);
        setdetail(finlerec.data);
        setread(true);
      });
  };

  
  useEffect(() => {
    getproduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <ToastContainer />

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          Product Management
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {date.length} Products
          </span>
        </h2>
        <p className="text-gray-500 mt-2">
          View, edit, and manage your product inventory.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setsearchbox((prev) => !prev)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                searchbox
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaFilter /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button
              onClick={deleterow}
              className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl flex items-center gap-2 transition-all"
            >
              <RiDeleteBin6Line />{" "}
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button
              onClick={changestatus}
              className="px-4 py-2.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl flex items-center gap-2 transition-all"
            >
              <RiToggleLine />{" "}
              <span className="hidden sm:inline">Change Status</span>
            </button>
          </div>

          {/* Search Box */}
          <div
            className={`relative transition-all duration-300 ${
              searchbox
                ? "w-full sm:w-72 opacity-100"
                : "w-0 opacity-0 overflow-hidden"
            }`}
          >
            <RiSearchLine className="absolute left-3 top-3.5 text-gray-400" onClick={getproduct()} />
            <input
              type="search"
              name="ProductName"
              onChange={(e)=>{
                let obj={...searchObj}
                 obj[e.target.name]=e.target.value
                setSearchObj(obj)

              }}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={getallchecked}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Sub Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Thumbnail</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {date.map((obj, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      value={obj._id}
                      checked={allids.includes(obj._id)}
                      onChange={getChacdebox}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {obj.ProductName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {obj.Category?.categoryName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {obj.SubCategory?.SubcategoryName}
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {parse(
                      obj.Description
                        ? obj.Description.substring(0, 50) + "..."
                        : ""
                    )}
                    <button
                      onClick={() => gatdiles(obj._id)}
                      className="text-indigo-500 hover:underline ml-1 text-xs font-medium"
                    >
                      Read more
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={path + obj.ProductImage}
                      alt="Product"
                      className="h-12 w-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        obj.Productstatus
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {obj.Productstatus ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => gatdiles(obj._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <RiEyeLine />
                      </button>
                      <Link to={`/Update-Product/${obj._id}`}>
                        <button
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaPenToSquare />
                        </button>
                      </Link>
                      <button
                        onClick={deleterow}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing {date.length} entries</p>
        </div>
      </div>

      {/* --- MODAL FOR PRODUCT DETAILS --- */}
      {detail && read && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <RiShoppingBag3Line className="text-indigo-600" />
                Product Details
              </h3>
              <button
                onClick={() => setread(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Images */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square w-full border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={path + detail.ProductImage}
                      alt="Main"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Gallery */}
                  <div className="grid grid-cols-4 gap-2">
                    {detail.GalleryImage?.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50 cursor-pointer hover:border-indigo-500 transition-all"
                      >
                        <img
                          src={path + img}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {detail.ProductName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      ID: {detail._id}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Price
                      </p>
                      <p className="text-xl font-bold text-indigo-600">
                        ₹{detail.SalePrice}
                      </p>
                      {detail.ActualPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{detail.ActualPrice}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Stock
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {detail.TotalInStocks || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Category
                      </span>
                      <span className="text-gray-900">
                        {detail.Category?.categoryName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Sub-Category
                      </span>
                      <span className="text-gray-900">
                        {detail.SubCategory?.SubcategoryName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Colors</span>
                      <div className="flex gap-2">
                        {detail.color?.map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700 border border-gray-200"
                          >
                            {c.colorName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      Description
                    </p>
                    <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {parse(detail.Description || "")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setread(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
