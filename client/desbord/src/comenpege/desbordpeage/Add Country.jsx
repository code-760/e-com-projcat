import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
// Importing Icons for the new design
import { BiWorld, BiSortAlt2 } from "react-icons/bi";
import { MdOutlineAddBox, MdUpdate } from "react-icons/md";

export default function Add_Country() {
  let [formvalue, setformvalue] = useState({
    CountryName: "",
    CountryOder: "",
  });

  // updeta ka liye -->

  let { id } = useParams();

  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  
  let Navigate = useNavigate();

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      CountryName: e.target.CountryName.value,
      CountryOder: e.target.CountryOder.value,
    };

    if (id) {
      axios
        .put(`${apibaseurl}/Country/update/${id}`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "Updated Successfully ", "success");
            setTimeout(() => {
              Navigate("/ViewCountry");
            }, 2000);
          } else {
            toast.error(fainlrec.error.CountryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Country/create`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewCountry");
            }, 2000);
          } else {
            toast.error(fainlrec.error.CountryName);
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
      CountryName: "",
      CountryOder: "",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/Country/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { CountryName, CountryOder } = finlRec.data;
          setformvalue({
            CountryName,
            CountryOder,
          });
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 p-6">
      <ToastContainer />
      
      {/* Main Card Container */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            {id ? <MdUpdate className="text-3xl"/> : <MdOutlineAddBox className="text-3xl"/>}
            {id ? "Update Country" : "Add New Country"}
          </h2>
          <p className="text-blue-100 text-sm mt-2">
            {id ? "Modify existing country details below" : "Fill in the details to add a new country"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={onsbmite} className="space-y-6">
            
            {/* Country Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Country Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <BiWorld size={20} />
                </div>
                <input
                  type="text"
                  name="CountryName"
                  value={formvalue.CountryName}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. United States, India..."
                  required
                />
              </div>
            </div>

            {/* Order/Other Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Sort Order (Other)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <BiSortAlt2 size={20} />
                </div>
                <input
                  type="number"
                  name="CountryOder"
                  value={formvalue.CountryOder}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. 1, 10, 20..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-blue-600 shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                {id ? "Save Changes" : "Submit Country"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
