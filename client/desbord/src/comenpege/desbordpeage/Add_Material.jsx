import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

export default function Add_Material() {
  let [formvalue, setformvalue] = useState({
    FaqQuestion: "",
    FaqAnswer: "",
    FaqOder: "",
  });
  // updeta ka liye -->

  let { id } = useParams();

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      materialName: e.target.materialName.value,
      materialOder: e.target.materialOder.value,
    };
    if(id){
       axios
      .put(`${apibaseurl}/material/update/${id}`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec._status) {
          swal("Successfully", "updeted Successfully ", "success");
          setTimeout(() => {
            Navigate("/ViewMaterial");
          }, 2000);
        } else {
          toast.error(fainlrec.error.CountryName);
        }
      });


    }
    else{
      axios
      .post(`${apibaseurl}/material/create`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(() => {
            Navigate("/ViewMaterial");
          }, 2000);
        } else {
          toast.error(fainlrec.error.materialName);
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
      materialName: "",
      materialOder: "",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/material/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let { materialName, materialOder } = finlRec.data;
          console.log(finlRec);

          setformvalue({
            materialName,
            materialOder,
          });
        });
    }
  }, [id]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        <ToastContainer />
        <div className="  rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {id?"update Material":"  Add Material"}
          
          </h2>
          <form onSubmit={onsbmite}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Material Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                name="materialName"
                onChange={getsetvalue}
                value={formvalue.materialName}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                other
              </label>

              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
                name="materialOder"
                onChange={getsetvalue}
                value={formvalue.materialOder}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Material
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
