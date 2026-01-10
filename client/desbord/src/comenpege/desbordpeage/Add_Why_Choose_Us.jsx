import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { LuCloudUpload } from "react-icons/lu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert"; // Ensure sweetalert is imported

// Premium Icons
import { 
  RiText, 
  RiSortNumberDesc, 
  RiFileTextLine, 
  RiSave3Line,
  RiImageAddLine,
  RiShieldStarLine
} from "react-icons/ri";

export default function Add_Why_Choose_Us() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let { id } = useParams();
  let Navigate = useNavigate();

  let [perview, setperview] = useState();

  let [formvalue, setformvalue] = useState({
    Title: "",
    WhyChooseUsimg: "",
    Order: "",
    Description: "",
  });

  let Add_Why_Choose_Us_save = (e) => {
    e.preventDefault();
    let Form = e.target;

    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/WhyChooseUs/update/${id}`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "updeted Successfully ", "success");
            setTimeout(() => {
              Navigate("/View_why_chooseUs");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.Description || fainlrec.error?.Title);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/WhyChooseUs/create`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/View_why_chooseUs");
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
        .get(`${apibaseurl}/WhyChooseUs/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { Title, WhyChooseUsimg, Order, Description } = finlRec.data;

          setformvalue({
            Title,
            WhyChooseUsimg,
            Order,
            Description
          });
          console.log(finlRec.path + finlRec.data.WhyChooseUsimg);
          setperview(finlRec.path + finlRec.data.WhyChooseUsimg);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center font-sans">
      <ToastContainer />
      
      {/* Page Title */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-yellow-500 pl-4 flex items-center gap-3">
          <RiShieldStarLine className="text-yellow-500" />
          {id ? "Update Feature" : "Add 'Why Choose Us' Feature"}
        </h2>
      </div>

      <form
        onSubmit={Add_Why_Choose_Us_save}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* LEFT SECTION: Image Upload */}
        <div className="w-full md:w-4/12 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center relative">
          
          {/* Delete Icon */}
          {perview && (
            <button
              type="button"
              onClick={() => setperview()}
              className="absolute top-4 right-4 z-10 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="Remove Icon"
            >
              <MdDelete className="text-xl" />
            </button>
          )}

          <div className="relative w-40 h-40">
            <div className={`w-full h-full border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm ${perview ? 'border-yellow-500 bg-white' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
              
              {/* Image Preview */}
              {perview ? (
                <img
                  src={perview}
                  alt="Feature Icon"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                // Upload Placeholder
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <LuCloudUpload className="text-4xl mb-2" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Upload Icon</p>
                </label>
              )}

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                name="WhyChooseUsimg"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setperview(URL.createObjectURL(file));
                    setformvalue({
                      ...formvalue,
                      categoryimg: file, // Keeping logic same as provided
                    });
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center flex items-center gap-2">
            <RiImageAddLine /> Upload an icon or image (SVG/PNG)
          </p>
        </div>

        {/* RIGHT SECTION: Form Inputs */}
        <div className="w-full md:w-8/12 p-8 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <div className="relative">
                <RiText className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="Title"
                  value={formvalue.Title}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="e.g. 24/7 Support"
                />
              </div>
            </div>

            {/* Order Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <div className="relative">
                <RiSortNumberDesc className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  name="Order"
                  value={formvalue.Order}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="e.g. 1"
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <div className="relative">
                <RiFileTextLine className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <textarea
                  name="Description"
                  value={formvalue.Description}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all h-32 resize-none"
                  placeholder="Briefly describe this feature..."
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold text-lg tracking-wide flex items-center justify-center gap-2">
              <RiSave3Line size={20} />
              {id ? "Update Feature" : "Save Feature"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}