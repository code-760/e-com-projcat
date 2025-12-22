import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export default function Color() {

   let Navigate = useNavigate();
   
  let [formvalue, setformvalue] = useState({
    colorName: "",
    colorcode: "",
    colorOder: "",
  });

  // updeta ka liye -->

  let { id } = useParams();

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

 

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      colorName: e.target.colorName.value,
      colorcode: e.target.colorcode.value,
      colorOder: e.target.colorOder.value,
    };

    if(id){
         
    axios
      .put(`${apibaseurl}/color/update/${id}`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec._status) {
          swal("Successfully", "updeted Successfully ", "success");
          setTimeout(() => {
            Navigate("/ViewColor");
          }, 2000);
        } else {
          toast.error(fainlrec.error?.colorcode || fainlrec.error?.colorName);
        }
      });



    }
    else{
      
    axios
      .post(`${apibaseurl}/color/create`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(() => {
            Navigate("/ViewColor");
          }, 2000);
        } else {
          toast.error(fainlrec.error?.colorcode || fainlrec.error?.colorName);
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
      colorName: "",
      colorOder: "",
      colorcode: "",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/color/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let { colorName, colorcode, colorOder } = finlRec.data; 
          console.log(colorName);

          setformvalue({
            colorName,
            colorcode,
            colorOder,
          });
        });
    }
  }, [id]);

  return (
    <div>
      <div className=" bg-gray-100 p-8">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {id ? "update Color" : "Add Color"}
        </h2>
        <form
          onSubmit={onsbmite}
          className=" mx-auto bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {id ? "update Color" : "Add New Color"}
          </h2>
          <div className="space-y-4 ">
            <div className="mb-15">
              <label
                htmlFor="colorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color Name
              </label>
              <input
                type="text"
                name="colorName"
                value={formvalue.colorName}
                onChange={getsetvalue}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter color name"
                required="ram"
              />
            </div>
            <div className="mb-15">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pick Color
              </label>
              <input
                type="color"
                // id="colorPicker"
                name="colorcode"
                value={formvalue.colorcode}
                onChange={getsetvalue}
                className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>

            <div className="mb-15">
              <label
                htmlFor="colorOder"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                other
              </label>
              <input
                type="text"
                name="colorOder"
                value={formvalue.colorOder}
                onChange={getsetvalue}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="other"
              />
            </div>
            <button className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              {id ? "Update Color" : "Add Color"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
