import React, { useEffect, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { LuCloudUpload } from "react-icons/lu";
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

export default function Add_Sub_category() {
  let { id } = useParams();
  let [perview, setperview] = useState();
  let [parntcategroydeta, setparntcategroydeta] = useState([]);
  let [formvalue, setformvalue] = useState({
    SubcategoryName: "",
    Category: "",
    SubcategoryOder: "",
    Subcategoryimg: "",
  });

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();

  let savesubcategroy = (e) => {
    e.preventDefault();
    let Form = e.target;

    let Formdata = new FormData(Form);

    if (id) {
      axios
        .put(`${apibaseurl}/Subcategory/update/${id}`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          // fainlrec ==ture to deta  save

          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewSubCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.Description || fainlrec.error?.Title);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Subcategory/create`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          // fainlrec ==ture to deta  save

          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewSubCategory");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.SubcategoryName);
          }
        });
    }
  };

  let getparentcategroy = () => {
    axios
      .get(`${apibaseurl}/Subcategory/parnt-categroy`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setparntcategroydeta(finlrec.date);
        // console.log(finlrec.date);
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
    axios
      .get(`${apibaseurl}/Subcategory/get-deteils/${id}`)
      .then((rec) => rec.data)

      .then((finlRec) => {
        console.log(finlRec);
        // backend me fineone ka use
        let { SubcategoryName, Category, SubcategoryOder, Subcategoryimg } =
          finlRec.data;
        // console.log( finlRec.data);

        setformvalue({
          SubcategoryName,
          Category: Category._id,
          SubcategoryOder,
          Subcategoryimg,
        });
        console.log(finlRec.path + finlRec.data.Subcategoryimg);
        setperview(finlRec.path + finlRec.data.Subcategoryimg);
      });
  };

  useEffect(() => {
    if (id) {
      getdilels();
    }
    getparentcategroy();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Sub category
      </h2>
      <form
        onSubmit={savesubcategroy}
        className=" grid grid-cols-[40%_auto]  mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        {/* Add Photo Section */}
        <div className="flex flex-col items-center justify-center border-r pr-8">
          <div className=" relative border-2 border-dashed overflow-hidden  group-hover:border-[rgba(62,53,53,0.66)]  w-full h-full bg-gray-100  flex items-center justify-center mb-4">
            <div className=" top-0 left-0 absolute ">
              <img src={perview} alt="" className="" />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
              name="Subcategoryimg"
              onChange={(e) => {
                setperview(URL.createObjectURL(e.target.files[0]));
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
          <label className=" block text-gray-700  font-bold mb-2">
            Category Name
          </label>
          <select
            name="Category"
            id=""
            onChange={getsetvalue}
            value={formvalue.Category}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=""> select catgroy Name </option>
            {parntcategroydeta.map((obj, index) => {
              return (
                <option value={obj._id} key={index}>
                  {obj.categoryName}
                </option>
              );
            })}
          </select>

          <label
            className="mb-2 text-gray-700 font-semibold"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            onChange={getsetvalue}
            value={formvalue.SubcategoryName}
            name="SubcategoryName"
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter category name"
          />
          <label className="mb-2 text-gray-700 font-semibold" htmlFor="order">
            Order
          </label>
          <input
            id="order"
            type="number"
            onChange={getsetvalue}
            value={formvalue.SubcategoryOder}
            name="SubcategoryOder"
            className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter order"
          />
        </div>
        <button className="w-55 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold">
          Add Category
        </button>
      </form>
    </div>
  );
}
