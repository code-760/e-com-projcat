import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

// Premium Icons
import { RiPaletteLine, RiSortNumberDesc, RiEdit2Line, RiAddCircleLine, RiCheckDoubleLine } from "react-icons/ri";

export default function Color() {

  let Navigate = useNavigate();
   
  let [formvalue, setformvalue] = useState({
    colorName: "",
    colorcode: "#000000", // Default color to avoid issues
    colorOder: "",
  });

  // updeta ka liye -->
  let { id } = useParams();
  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      colorName: e.target.colorName.value,
      colorcode: e.target.colorcode.value,
      colorOder: e.target.colorOder.value,
    };

    if(id){
      axios
      .put(`${apibaseurl}/color/update/${id}`, obj)
      .then((rec) => rec.data)
      .then((fainlrec) => {
        if (fainlrec._status) {
          swal("Successfully", "updeted Successfully ", "success");
          setTimeout(() => {
            Navigate("/ViewColor");
          }, 2000);
        } else {
          toast.error(fainlrec.error?.colorcode || fainlrec.error?.colorName);
        }
      });
    }
    else{
      axios
      .post(`${apibaseurl}/color/create`, obj)
      .then((rec) => rec.data)
      .then((fainlrec) => {
        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(() => {
            Navigate("/ViewColor");
          }, 2000);
        } else {
          toast.error(fainlrec.error?.colorcode || fainlrec.error?.colorName);
        }
      });
    }
  };

  let getsetvalue = (e) => {
    let oldobj = { ...formvalue };
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    oldobj[inputName] = inputvalue;
    setformvalue(oldobj);
  };

  useEffect(() => {
    setformvalue({
      colorName: "",
      colorOder: "",
      colorcode: "#000000",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/color/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { colorName, colorcode, colorOder } = finlRec.data; 
          console.log(colorName);

          setformvalue({
            colorName,
            colorcode,
            colorOder,
          });
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-purple-50 p-6">
      <ToastContainer />
      
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            {id ? <RiEdit2Line className="text-3xl" /> : <RiAddCircleLine className="text-3xl" />}
            {id ? "Update Color" : "Add Color"}
          </h2>
          <p className="text-purple-100 text-sm mt-2">
            {id ? "Modify existing color details" : "Create a new color variant"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={onsbmite} className="space-y-6">
            
            {/* Color Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Color Name
              </label>
              <div className="relative">
                <RiPaletteLine className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="colorName"
                  value={formvalue.colorName}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="e.g. Royal Blue"
                  required
                />
              </div>
            </div>

            {/* Color Picker Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Pick Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3.5 text-gray-500 font-mono uppercase text-sm">
                    {formvalue.colorcode}
                  </span>
                  <input
                    type="text"
                    value={formvalue.colorcode}
                    readOnly
                    className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 focus:outline-none cursor-default"
                  />
                </div>
                <input
                  type="color"
                  name="colorcode"
                  value={formvalue.colorcode}
                  onChange={getsetvalue}
                  className="w-14 h-12 p-1 border border-gray-300 rounded-xl cursor-pointer bg-white"
                />
              </div>
            </div>

            {/* Order Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Sort Order
              </label>
              <div className="relative">
                <RiSortNumberDesc className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text" // Kept as text per your code, but number is usually better
                  name="colorOder"
                  value={formvalue.colorOder}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="e.g. 1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-purple-600 shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <RiCheckDoubleLine size={20} />
                {id ? "Update Color" : "Save Color"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}