import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter, FaPenNib } from "react-icons/fa";
import { Link } from "react-router-dom"; // Use correct router import
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert"; // Ensure sweetalert is imported

// Premium Icons
import { 
  RiGitMergeLine, 
  RiDeleteBin6Line, 
  RiToggleLine, 
  RiSearchLine, 
  RiCheckDoubleLine, 
  RiCloseCircleLine 
} from "react-icons/ri";

export default function Viewsubsubcategory() {
  let [searchbox, setsearchbox] = useState(false);
  let [date, setdate] = useState([]);
  let [path, setpath] = useState("");
  let [allids, setallids] = useState([]);
  let [searchObj,setSearchObj]=useState(
      {
       SubsubcategoryName:'',
       
      }
    )

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let getSubsubcategory = () => {
    axios
      .get(`${apibaseurl}/Subsubcategory/viwe`,{
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
        text: "Once deleted, you will not be able to recover these categories!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios
            .post(`${apibaseurl}/Subsubcategory/multidelete`, { ids: allids })
            .then((rec) => rec.data)
            .then((fainlrec) => {
              if (fainlrec.status) {
                getsubcategory();
                setallids([]);
                swal("Poof! Your categories have been deleted!", {
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
        .post(`${apibaseurl}/Subsubcategory/change-status`, { ids: allids })
        .then((rec) => rec.data)
        .then((finalrec) => {
          if (finalrec.status) {
            getsubcategory();
            setallids([]);
            toast.success("Status updated successfully");
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

  useEffect(() => {
    getSubsubcategory();
  }, []);

  // Corrected filter key to match the data mapping (Subsubcategorystatus)
  let toteldata = date.length;
  let activdata = date.filter((v) => v.Subsubcategorystatus).length;
  let dactivdeta = toteldata - activdata;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <ToastContainer />
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          Sub-Sub Category Management
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{toteldata} Total</span>
        </h2>
        <p className="text-gray-500 mt-2">Manage nested product categories efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Items</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{toteldata}</h3>
          </div>
          <div className="bg-teal-50 p-3 rounded-full text-teal-600">
            <RiGitMergeLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">{activdata}</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full text-green-600">
            <RiCheckDoubleLine size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Inactive</p>
            <h3 className="text-3xl font-bold text-red-500 mt-1">{dactivdeta}</h3>
          </div>
          <div className="bg-red-50 p-3 rounded-full text-red-500">
            <RiCloseCircleLine size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setsearchbox(prev => !prev)} 
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${searchbox ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <FaFilter /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button onClick={deleterow} className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl flex items-center gap-2 transition-all">
              <RiDeleteBin6Line /> <span className="hidden sm:inline">Delete</span>
            </button>
            <button onClick={changestatus} className="px-4 py-2.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl flex items-center gap-2 transition-all">
              <RiToggleLine /> <span className="hidden sm:inline">Change Status</span>
            </button>
          </div>

          {/* Search Box */}
          <div className={`relative transition-all duration-300 ${searchbox ? 'w-full sm:w-72 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
            <RiSearchLine onClick={getSubsubcategory} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="search"
              onChange={(e)=>{
                let obj={...searchObj}
                 obj[e.target.name]=e.target.value
                setSearchObj(obj)

              }}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="Search categories..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">
                  <input type="checkbox" onChange={getallchecked} checked={date.length > 0 && date.length === allids.length} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="px-6 py-4">Parent Category</th>
                <th className="px-6 py-4">Sub Category</th>
                <th className="px-6 py-4">Sub-Sub Category</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {date.length >= 1 ? (
                date.map((obj, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        onChange={getChacdebox} 
                        value={obj._id} 
                        checked={allids.includes(obj._id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600">{obj.Category?.categoryName}</td>
                    <td className="px-6 py-4 text-gray-600">{obj.SubCategory?.SubcategoryName}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{obj.SubsubcategoryName}</td>
                    <td className="px-6 py-4">
                      <img 
                        src={path + obj.Subsubcategoryimg} 
                        alt={obj.SubsubcategoryName} 
                        className="h-10 w-10 rounded-lg object-cover border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600">{obj.SubsubcategoryOder}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${obj.Subsubcategorystatus ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {obj.Subsubcategorystatus ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/Update-Sub-sub-category/${obj._id}`}>
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                          <FaPenNib />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                    No data found. Add a new sub-sub category to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing {date.length} entries</p>
        </div>

      </div>
    </div>
  );
}