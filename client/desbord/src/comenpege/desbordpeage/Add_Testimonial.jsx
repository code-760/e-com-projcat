import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineCloudDownload } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { LuCloudUpload } from "react-icons/lu";

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
          // fainlrec ==ture to deta  save

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
          // fainlrec ==ture to deta  save

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

  // save item -->

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
          // backend me fineone ka use
          let {
            TastimonialName,
            Tastimonialimg,
            Order,
            Description,
            Rating,
            Message,
          } = finlRec.data;

          setformvalue({
            TastimonialName,
            Tastimonialimg,
            Order,
            Description,
            Rating,
            Message,
          });
          console.log(finlRec.path + finlRec.data.Tastimonialimg);
          setperview(finlRec.path + finlRec.data.Tastimonialimg);
        });
    }
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {" "}
        {id ? "Testimonial update" : " Add Testimonial"}
      </h2>
      <form
        onSubmit={Testimonialsave}
        className=" grid grid-cols-[40%_auto]  mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        {/* Add Photo Section */}
        <div className="w-full relative  flex flex-col items-center  group justify-center border-r pr-8">
          {id ? (
            <MdDelete
              onClick={() => setperview()}
              className=" absolute right-2 top-0 text-[20px]"
            />
          ) : (
            ""
          )}

          <div className=" relative border-2 border-dashed overflow-hidden  group-hover:border-[rgba(62,53,53,0.66)]  w-full h-full bg-gray-100  flex items-center justify-center mb-4">
            <div className=" top-0 left-0 absolute ">
              <img src={perview} alt="" className="" width={"100%"} />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
              name="Tastimonialimg"
              onChange={(e) => {
                let file = e.target.files[0];
                if (file) {
                  setperview(URL.createObjectURL(file)); // 👈 image preview
                  setformvalue({
                    ...formvalue,
                    Tastimonialimg: file, // 👈 formdata ke liye
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
          <label className=" block text-gray-700  font-bold mb-2">Name</label>

          <input
            id="categoryName"
            type="text"
            name="TastimonialName"
            onChange={getsetvalue}
            value={formvalue.TastimonialName}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter category name"
          />

          <label className=" block text-gray-700  font-bold mb-2">
            Designation
          </label>

          <input
            id="order"
            type="number"
            name="Designation"
            onChange={getsetvalue}
            value={formvalue.Designation}
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />

          <label
            className="mb-2 text-gray-700 font-semibold"
            htmlFor="categoryName"
          >
            Rating
          </label>
          <input
            id="order"
            type="number"
            name="Rating"
            value={formvalue.Rating}
            onChange={getsetvalue}
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />
          <label className="mb-2 text-gray-700 font-semibold" htmlFor="order">
            Order
          </label>
          <input
            id="order"
            type="number"
            name="Order"
            value={formvalue.Order}
            onChange={getsetvalue}
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />
          <label className=" block text-gray-700  font-bold mb-2">
            Message
          </label>

          <textarea
            id="categoryName"
            type="text"
            name="Message"
            value={formvalue.Message}
            onChange={getsetvalue}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter category name"
          />
        </div>
        <button className="w-55 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold">
          {id ? "Testimonial update" : " Add Testimonial"}
        </button>
      </form>
    </div>
  );
}
