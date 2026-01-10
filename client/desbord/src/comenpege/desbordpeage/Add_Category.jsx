import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuCloudUpload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

export default function Add_Category() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let { id } = useParams();
  let Navigate = useNavigate();

  let [perview, setperview] = useState();
  let [updateper, setupdateper] = useState();
  let [formvalue, setformvalue] = useState({
    categoryName: "",
    categoryimg: "",
    categoryOder: "",
  });

  let categroysave = (e) => {
    e.preventDefault();
    let Form = e.target;
    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/category/update/${id}`, Formdata)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "Updated Successfully ", "success");
            setTimeout(() => {
              Navigate("/ViewCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.categoryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/category/create`, Formdata)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.categoryName);
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
    if (id) {
      axios
        .get(`${apibaseurl}/category/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { categoryName, categoryimg, categoryOder } = finlRec.data;
          setformvalue({
            categoryName,
            categoryimg: "",
            categoryOder,
          });
          setperview(finlRec.path + finlRec.data.categoryimg);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <ToastContainer />
      
      {/* Page Title */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
          {id ? "Update Category" : "Add New Category"}
        </h2>
      </div>

      <form
        onSubmit={categroysave}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Image Upload Section */}
        <div className="w-full md:w-5/12 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center relative">
          
          {/* Delete Icon */}
          {id && perview && (
            <button
              type="button"
              onClick={() => setperview()}
              className="absolute top-4 right-4 z-10 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="Remove Image"
            >
              <MdDelete className="text-xl" />
            </button>
          )}

          <div className="relative w-full aspect-square max-w-[280px]">
            <div className={`w-full h-full border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${perview ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400'}`}>
              
              {/* Image Preview */}
              {perview ? (
                <img
                  src={perview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Upload Placeholder
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                    <LuCloudUpload className="text-4xl" />
                  </div>
                  <p className="font-semibold">Click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG</p>
                </label>
              )}

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                name="categoryimg"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setperview(URL.createObjectURL(file));
                    setformvalue({
                      ...formvalue,
                      categoryimg: file,
                    });
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Upload a category thumbnail
          </p>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Category Name Input */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="categoryName"
              >
                Category Name
              </label>
              <input
                name="categoryName"
                id="categoryName"
                value={formvalue.categoryName}
                onChange={getsetvalue}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                placeholder="e.g. Electronics, Clothing..."
              />
            </div>

            {/* Order Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="order">
                Sort Order
              </label>
              <input
                id="order"
                type="number"
                value={formvalue.categoryOder}
                onChange={getsetvalue}
                name="categoryOder"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                placeholder="e.g. 1, 2, 3..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold text-lg tracking-wide">
              {id ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}