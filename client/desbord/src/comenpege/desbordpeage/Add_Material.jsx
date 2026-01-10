import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

// Premium Icons
import { RiStackLine, RiSortAsc, RiAddCircleLine, RiEdit2Line, RiPriceTag3Line } from "react-icons/ri";

export default function Add_Material() {
  
  // Logic Fix: Initial state keys should match input names
  let [formvalue, setformvalue] = useState({
    materialName: "",
    materialOder: "",
  });

  // updeta ka liye -->
  let { id } = useParams();
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let Navigate = useNavigate();

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      materialName: e.target.materialName.value,
      materialOder: e.target.materialOder.value,
    };
    if (id) {
      axios
        .put(`${apibaseurl}/material/update/${id}`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          // fainlrec ==ture to deta  save
          if (fainlrec._status) {
            swal("Successfully", "updeted Successfully ", "success");
            setTimeout(() => {
              Navigate("/ViewMaterial");
            }, 2000);
          } else {
            toast.error(fainlrec.error.CountryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/material/create`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          // fainlrec ==ture to deta  save
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewMaterial");
            }, 2000);
          } else {
            toast.error(fainlrec.error.materialName);
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
      materialName: "",
      materialOder: "",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/material/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let { materialName, materialOder } = finlRec.data;
          console.log(finlRec);

          setformvalue({
            materialName,
            materialOder,
          });
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-cyan-50 p-6">
      <ToastContainer />

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            {id ? <RiEdit2Line className="text-3xl" /> : <RiAddCircleLine className="text-3xl" />}
            {id ? "Update Material" : "Add Material"}
          </h2>
          <p className="text-cyan-100 text-sm mt-2">
            {id ? "Edit material details below" : "Create a new material type"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={onsbmite} className="space-y-6">
            
            {/* Material Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                Material Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                  <RiStackLine size={20} />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. Cotton, Polyester, Wood..."
                  name="materialName"
                  onChange={getsetvalue}
                  value={formvalue.materialName}
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
                <div className="absolute left-3 text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                  <RiSortAsc size={20} />
                </div>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. 1, 2, 3..."
                  name="materialOder"
                  onChange={getsetvalue}
                  value={formvalue.materialOder}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                {id ? "Save Changes" : "Submit Material"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
