import axios from "axios";
import React, { useState } from "react";
import { LuCloudUpload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";

export default function Add_Category() {
  let { id } = useParams();

  let [perview, setperview] = useState();
  let [formvalue, setformvalue] = useState({
    categoryName: "",
    categoryimg: "",
    categoryOder: "",
  });

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();
  // save item -->
  let categroysave = (e) => {
    e.preventDefault();
    let Form = e.target;

    let Formdata = new FormData(Form);

    axios
      .post(`${apibaseurl}/category/create`, Formdata)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(() => {
            Navigate("/ViewCategory");
          }, 2000);
        } else {
          toast.error(fainlrec.error?.colorcode || fainlrec.error?.colorName);
        }
      });
  };

  let getsetvalue = (e) => {
    let oldobj = { ...formvalue };

    let inputName = e.target.name;
    let inputvalue = e.target.value;

    oldobj[inputName] = inputvalue;

    setformvalue(oldobj);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? "update" : "Add Category"}
      </h2>
      <form
        onSubmit={categroysave}
        className=" grid grid-cols-[40%_auto]  mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        {/* Add Photo Section */}
        <div className="flex flex-col items-center  group justify-center border-r pr-8">
          <div className=" relative border-2 border-dashed overflow-hidden  group-hover:border-[rgba(62,53,53,0.66)]  w-full h-full bg-gray-100  flex items-center justify-center mb-4">
            <div className=" top-0 left-0 absolute ">
              <img src={perview} alt="" className="" />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
              name="categoryimg"
              value={formvalue.categoryimg}
              onChange={(e) => {
                let file = e.target.files[0];
                if (file) {
                  setperview(URL.createObjectURL(file)); // 👈 image preview
                  setformvalue({
                    ...formvalue,
                    categoryimg: file, // 👈 formdata ke liye
                  });
                }
              }}
            />
            <label
              htmlFor="photo-upload"
              className=" text-black py-2 px-4 rounded-md cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <LuCloudUpload className="text-3xl" />
                <p>Add photo</p>
              </div>
            </label>
          </div>
        </div>
        {/* Form Section */}
        <div className=" pl-8 flex flex-col justify-center">
          <label
            className="mb-2 text-gray-700 font-semibold"
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
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter category name"
          />
          <label className="mb-2 text-gray-700 font-semibold" htmlFor="order">
            Order
          </label>
          <input
            id="order"
            type="number"
            value={formvalue.categoryOder}
            onChange={getsetvalue}
            name="categoryOder"
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />
        </div>
        <button className="w-55 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold">
          {id ? "update" : "Add Category"}
        </button>
      </form>
    </div>
  );
}
