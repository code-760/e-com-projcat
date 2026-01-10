import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuCloudUpload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Premium Icons
import { RiLayoutTop2Line, RiSortAsc, RiSave3Line, RiImageAddLine } from "react-icons/ri";

export default function Add_sidebar() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let { id } = useParams();
  let Navigate = useNavigate();

  let [perview, setperview] = useState();

  let [formvalue, setformvalue] = useState({
    Title: "",
    Slidersimg: "",
    Order: "",
  });

  let sidebarsave = (e) => {
    e.preventDefault();
    let Form = e.target;
    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/Slider/update/${id}`, Formdata)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "updeted Successfully ", "success");
            setTimeout(() => {
              Navigate("/ViewSlider");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.Description || fainlrec.error?.Title);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Slider/create`, Formdata)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewSlider");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.Description || fainlrec.error?.Title);
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
        .get(`${apibaseurl}/Slider/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { Title, Slidersimg, Order } = finlRec.data;
          setformvalue({
            Title,
            Slidersimg,
            Order,
          });
          setperview(finlRec.path + finlRec.data.Slidersimg);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <ToastContainer />
      
      {/* Page Title */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-purple-600 pl-4 flex items-center gap-3">
          <RiLayoutTop2Line className="text-purple-600" />
          {id ? "Update Slider" : "Add New Slider"}
        </h2>
      </div>

      <form
        onSubmit={sidebarsave}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Image Upload Section */}
        <div className="w-full md:w-5/12 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center relative">
          
          {/* Delete Icon (Only shows if image exists) */}
          {perview && (
            <button
              type="button"
              onClick={() => setperview()}
              className="absolute top-4 right-4 z-10 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="Remove Image"
            >
              <MdDelete className="text-xl" />
            </button>
          )}

          <div className="relative w-full aspect-video max-w-[320px]">
            <div className={`w-full h-full border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${perview ? 'border-purple-500 bg-white' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400'}`}>
              
              {/* Image Preview */}
              {perview ? (
                <img
                  src={perview}
                  alt="Slider Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Upload Placeholder
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500 hover:text-purple-600"
                >
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                    <LuCloudUpload className="text-4xl" />
                  </div>
                  <p className="font-semibold">Click to upload slider image</p>
                  <p className="text-xs text-gray-400 mt-1">1920 x 600 Recommended</p>
                </label>
              )}

              {/* Hidden Input - Name matches your backend requirement */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                name="Slidersimg" 
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setperview(URL.createObjectURL(file));
                    setformvalue({
                      ...formvalue,
                      Slidersimg: file, // Adjusted to match typical file handling if needed, though FormData usually handles file input directly via name attribute
                    });
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center flex items-center gap-1">
            <RiImageAddLine /> Upload a high-quality banner image
          </p>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="Title"
              >
                Slider Title
              </label>
              <div className="relative">
                <input
                  id="Title"
                  type="text"
                  name="Title"
                  value={formvalue.Title}
                  onChange={getsetvalue}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm pl-10"
                  placeholder="e.g. Summer Sale 50% Off"
                />
                <RiLayoutTop2Line className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Order Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="Order">
                Display Order
              </label>
              <div className="relative">
                <input
                  id="Order"
                  type="number"
                  name="Order"
                  value={formvalue.Order}
                  onChange={getsetvalue}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm pl-10"
                  placeholder="e.g. 1"
                />
                <RiSortAsc className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold text-lg tracking-wide flex items-center justify-center gap-2">
              <RiSave3Line size={20} />
              {id ? "Update Slider" : "Save Slider"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}