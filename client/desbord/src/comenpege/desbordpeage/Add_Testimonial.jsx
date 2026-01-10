import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { LuCloudUpload } from "react-icons/lu";
import swal from "sweetalert"; // Ensure you have this installed
import { ToastContainer, toast } from "react-toastify";

// Premium Icons
import { 
  RiUser3Line, 
  RiStarFill, 
  RiSortAsc, 
  RiChatQuoteLine, 
  RiBriefcaseLine, 
  RiSave3Line,
  RiDoubleQuotesL,
  RiImageAddLine
} from "react-icons/ri";

export default function Add_Testimonial() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let { id } = useParams();
  let Navigate = useNavigate();

  let [perview, setperview] = useState();

  let [formvalue, setformvalue] = useState({
    TastimonialName: "",
    Tastimonialimg: "",
    Order: "",
    Description: "",
    Rating: "",
    Message: "",
    Designation: "" // Added this to state to prevent uncontrolled input warning based on your JSX
  });

  let Testimonialsave = (e) => {
    e.preventDefault();
    let Form = e.target;

    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/Tastimonial/update/${id}`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "updeted Successfully ", "success");
            setTimeout(() => {
              Navigate("/Viewtestimonial");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.Description || fainlrec.error?.Title);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Tastimonial/create`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/Viewtestimonial");
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
        .get(`${apibaseurl}/Tastimonial/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let {
            TastimonialName,
            Tastimonialimg,
            Order,
            Description,
            Rating,
            Message,
            Designation // Assuming backend returns this
          } = finlRec.data;

          setformvalue({
            TastimonialName,
            Tastimonialimg,
            Order,
            Description,
            Rating,
            Message,
            Designation
          });
          setperview(finlRec.path + finlRec.data.Tastimonialimg);
        });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center font-sans">
      <ToastContainer />
      
      {/* Page Title */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 flex items-center gap-3">
          <RiChatQuoteLine className="text-orange-500" />
          {id ? "Update Testimonial" : "Add Testimonial"}
        </h2>
      </div>

      <form
        onSubmit={Testimonialsave}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* LEFT SECTION: Photo Upload */}
        <div className="w-full md:w-4/12 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center relative">
          
          {/* Delete Icon */}
          {perview && (
            <button
              type="button"
              onClick={() => setperview()}
              className="absolute top-4 right-4 z-10 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="Remove Photo"
            >
              <MdDelete className="text-xl" />
            </button>
          )}

          <div className="relative w-48 h-48">
            <div className={`w-full h-full border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm ${perview ? 'border-orange-500 bg-white' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
              
              {/* Image Preview */}
              {perview ? (
                <img
                  src={perview}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Upload Placeholder
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <LuCloudUpload className="text-4xl mb-2" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Upload Photo</p>
                </label>
              )}

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                name="Tastimonialimg"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setperview(URL.createObjectURL(file));
                    setformvalue({
                      ...formvalue,
                      Tastimonialimg: file,
                    });
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center flex items-center gap-2">
            <RiImageAddLine /> Client's profile picture
          </p>
        </div>

        {/* RIGHT SECTION: Form Inputs */}
        <div className="w-full md:w-8/12 p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Client Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
              <div className="relative">
                <RiUser3Line className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="TastimonialName"
                  value={formvalue.TastimonialName}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
              <div className="relative">
                <RiBriefcaseLine className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text" // Changed to text as designation is usually text
                  name="Designation"
                  value={formvalue.Designation || ""}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g. CEO, Google"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
              <div className="relative">
                <RiStarFill className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  name="Rating"
                  value={formvalue.Rating}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="5"
                  max="5"
                  min="1"
                />
              </div>
            </div>

            {/* Order */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <div className="relative">
                <RiSortAsc className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  name="Order"
                  value={formvalue.Order}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g. 1"
                />
              </div>
            </div>

            {/* Message */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Testimonial Message</label>
              <div className="relative">
                <RiDoubleQuotesL className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <textarea
                  name="Message"
                  value={formvalue.Message}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all h-32 resize-none"
                  placeholder="What did the client say?"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold text-lg tracking-wide flex items-center justify-center gap-2">
              <RiSave3Line size={20} />
              {id ? "Update Testimonial" : "Save Testimonial"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}