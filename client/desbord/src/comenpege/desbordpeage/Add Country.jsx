import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

export default function Add_Country() {
   let [formvalue, setformvalue] = useState({
   CountryName: "",
   CountryOder: "",
  });

  // updeta ka liye -->

  let { id } = useParams();

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();

  let onsbmite = (e) => {
    e.preventDefault();

    let obj = {
      CountryName: e.target.CountryName.value,
      CountryOder: e.target.CountryOder.value,
    };

    if(id){
       axios
      .put(`${apibaseurl}/Country/update/${id}`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec._status) {
          swal("Successfully", "updeted Successfully ", "success");
          setTimeout(() => {
            Navigate("/ViewCountry");
          }, 2000);
        } else {
          toast.error(fainlrec.error.CountryName);
        }
      });
    }
    else{
      axios
      .post(`${apibaseurl}/Country/create`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(() => {
            Navigate("/ViewCountry");
          }, 2000);
        } else {
          toast.error(fainlrec.error.CountryName);
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
     CountryName: "",
     CountryOder: "",
     
    });
    if (id) {
      axios
        .get(`${apibaseurl}/Country/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let {CountryName,CountryOder } = finlRec.data;
          console.log(finlRec);

          setformvalue({
           CountryName,
           CountryOder,
          });
        });
    }
  }, [id]);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="  rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800"> {id? "Country update":"Add Country "}</h2>
          <form onSubmit={onsbmite}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Country Name
              </label>
              <input
                type="text"
                onChange={getsetvalue}
                value={formvalue.CountryName}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                name="CountryName"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                other
              </label>
              <input
                type="number"
                onChange={getsetvalue}
                  value={formvalue.CountryOder}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
                name="CountryOder"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Country
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
