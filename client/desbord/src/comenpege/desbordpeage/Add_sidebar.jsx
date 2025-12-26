import React, { useEffect, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuCloudUpload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
          // fainlrec ==ture to deta  save

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
          // fainlrec ==ture to deta  save

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
        .get(`${apibaseurl}/Slider/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let { Title, Slidersimg, Order } = finlRec.data;

          setformvalue({
            Title,
            Slidersimg,
            Order,
          });
          //   console.log(finlRec.path + finlRec.data.Slidersimg);
          setperview(finlRec.path + finlRec.data.Slidersimg);
        });
    }
  }, [id]);
  return (
    <div>
        <ToastContainer/>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? "update sidebar" : "Add sidebar"}
      </h2>
      <form
        onSubmit={sidebarsave}
        className=" grid grid-cols-[40%_auto]  mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        {/* Add Photo Section */}
        <div className="flex flex-col h-[300px] items-center justify-center border-r pr-8">
          <div className="w-full relative  h-full flex flex-col items-center  group justify-center border-r pr-8">
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
                name="WhyChooseUsimg"
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
        </div>
        {/* Form Section */}
        <div className=" pl-8 flex flex-col justify-center">
          <label
            className="mb-2 text-gray-700 font-semibold"
            htmlFor="categoryName"
          >
            Title
          </label>
          <input
            id="categoryName"
            type="text"
            name="Title"
            value={formvalue.Title}
            onChange={getsetvalue}

            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter category name"
          />
          <label className="mb-2 text-gray-700 font-semibold" htmlFor="order">
            Order
          </label>
          <input
            id="order"
            name="Order"
            type="number"
            value={formvalue.Order}
             onChange={getsetvalue}
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />
        </div>
        <button className="w-55 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold">
          {id ? "update sidebar" : "Add sidebar"}
        </button>
      </form>
    </div>
  );
}
