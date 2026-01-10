import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { LuCloudUpload } from "react-icons/lu";
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

// Premium Icons
import { RiFolder3Line, RiNodeTree, RiGitMergeLine, RiSortAsc, RiSave3Line, RiImageAddLine } from "react-icons/ri";

export default function Add_sub_sub_category() {
  let { id } = useParams();

  let [perview, setperview] = useState();
  let [parntcategroydeta, setparntcategroydeta] = useState([]);
  let [subcategroydeta, setsubcategroydeta] = useState([]);

  let [formvalue, setformvalue] = useState({
    SubsubcategoryName: "",
    SubCategory: "",
    Category: "",
    SubsubcategoryOder: "",
    Subsubcategoryimg: "",
  });

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();

  let savesubsubcategroy = (e) => {
    e.preventDefault();
    let Form = e.target;

    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/Subsubcategory/update/${id}`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          // fainlrec ==ture to deta  save

          if (fainlrec._status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewSubSubCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.SubcategoryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Subsubcategory/create`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          // fainlrec ==ture to deta  save

          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewSubSubCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.SubcategoryName);
          }
        });
    }
  };

  let getparentcategroy = () => {
    axios
      .get(`${apibaseurl}/Subsubcategory/parnt-categroy`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setparntcategroydeta(finlrec.date);
      });
  };
  let getsubcategroy = (parnetid) => {
    axios
      .get(`${apibaseurl}/Subsubcategory/sub-categroy/${parnetid}`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        console.log(finlrec.date);
        setsubcategroydeta(finlrec.date);
      });
  };
  let getsetvalue = (e) => {
    let oldobj = { ...formvalue };

    let inputName = e.target.name;
    let inputvalue = e.target.value;

    oldobj[inputName] = inputvalue;

    setformvalue(oldobj);
  };

  let getdilels = () => {
    setformvalue({
      SubsubcategoryName: "",
      SubCategory: "",
      Category: "",
      SubsubcategoryOder: "",
      Subsubcategoryimg: "",
    });
    axios
      .get(`${apibaseurl}/Subsubcategory/get-deteils/${id}`)
      .then((rec) => rec.data)

      .then((finlRec) => {
        console.log(finlRec);
        let {
          SubsubcategoryName,
          SubCategory,
          Category,
          SubsubcategoryOder,
          Subsubcategoryimg,
        } = finlRec.data;

        setformvalue({
          SubsubcategoryName,
          SubCategory: SubCategory._id,
          Category: Category._id,
          SubsubcategoryOder,
          Subsubcategoryimg,
        });
        getsubcategroy(Category._id);
        setperview(finlRec.path + finlRec.data.Subsubcategoryimg);
      });
  };

  useEffect(() => {
    if (id) {
      getdilels();
    }
    getparentcategroy();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <ToastContainer />
      
      {/* Page Title */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-teal-600 pl-4 flex items-center gap-3">
          <RiGitMergeLine className="text-teal-600" />
          {id ? "Update Sub-Sub Category" : "Add Sub-Sub Category"}
        </h2>
      </div>

      <form
        onSubmit={savesubsubcategroy}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Image Upload Section */}
        <div className="w-full md:w-5/12 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center relative">
          
          {/* Delete Icon */}
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

          <div className="relative w-full aspect-square max-w-[280px]">
            <div className={`w-full h-full border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${perview ? 'border-teal-500 bg-white' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400'}`}>
              
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
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500 hover:text-teal-600"
                >
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                    <LuCloudUpload className="text-4xl" />
                  </div>
                  <p className="font-semibold">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG</p>
                </label>
              )}

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                name="Subsubcategoryimg"
                onChange={(e) => {
                  setperview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center flex items-center gap-1">
            <RiImageAddLine /> Upload thumbnail image
          </p>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Parent Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parent Category
              </label>
              <div className="relative">
                <select
                  name="Category"
                  onChange={(e) => {
                    getsetvalue(e);
                    getsubcategroy(e.target.value);
                  }}
                  value={formvalue.Category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm appearance-none bg-white pl-10"
                >
                  <option value="">Select Parent Category</option>
                  {parntcategroydeta.map((obj, index) => (
                    <option value={obj._id} key={index}>
                      {obj.categoryName}
                    </option>
                  ))}
                </select>
                <RiFolder3Line className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sub Category
              </label>
              <div className="relative">
                <select
                  name="SubCategory"
                  onChange={getsetvalue}
                  value={formvalue.SubCategory}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm appearance-none bg-white pl-10"
                >
                  <option value="">Select Sub Category</option>
                  {subcategroydeta.map((obj, index) => (
                    <option value={obj._id} key={index}>
                      {obj.SubcategoryName}
                    </option>
                  ))}
                </select>
                <RiNodeTree className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Sub-Sub Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sub-Sub Category Name
              </label>
              <div className="relative">
                <input
                  name="SubsubcategoryName"
                  type="text"
                  onChange={getsetvalue}
                  value={formvalue.SubsubcategoryName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm pl-10"
                  placeholder="e.g. Wireless Headphones"
                />
                <RiGitMergeLine className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order
              </label>
              <div className="relative">
                <input
                  id="order"
                  name="SubsubcategoryOder"
                  type="number"
                  onChange={getsetvalue}
                  value={formvalue.SubsubcategoryOder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm pl-10"
                  placeholder="e.g. 1"
                />
                <RiSortAsc className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold text-lg tracking-wide flex items-center justify-center gap-2">
              <RiSave3Line size={20} />
              {id ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}