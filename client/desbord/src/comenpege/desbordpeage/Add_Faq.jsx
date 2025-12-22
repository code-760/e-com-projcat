import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Add_Faq() {

   let [formvalue, setformvalue] = useState({
   FaqQuestion: "",
   FaqAnswer: "",
   FaqOder:""

  });

  // updeta ka liye -->

  let { id } = useParams();

      let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate=useNavigate()

  let onsbmite = (e) => {
    e.preventDefault();

   

    let obj = {
      FaqQuestion: e.target.FaqQuestion.value,
      FaqAnswer: e.target.FaqAnswer.value,
      FaqOder: e.target.FaqOder.value,
    };

    if(id){
        axios
      .put(`${apibaseurl}/Faq/update/${id}`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec._status) {
          swal("Successfully", "updeted Successfully ", "success");
          setTimeout(() => {
            Navigate("/ViewFaq");
          }, 2000);
        } else {
          toast.error(fainlrec.error.CountryName);
        }
      });


    }
    else{
       axios
      .post(`${apibaseurl}/Faq/create`, obj)
      .then((rec) => rec.data)

      .then((fainlrec) => {
        // fainlrec ==ture to deta  save

        if (fainlrec.status) {
          swal("Successfully", "Your data is added!", "success");
          setTimeout(()=>{
            Navigate('/ViewFaq')
          },2000)
        }
         else  {
          toast.error(fainlrec.error?.FaqQuestion||fainlrec.error?.FaqAnswer
          );
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
     FaqQuestion: "",
     FaqAnswer: "",
     FaqOder:""
     
    });
    if (id) {
      axios
        .get(`${apibaseurl}/FAq/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          // backend me fineone ka use
          let {FaqQuestion,FaqAnswer,FaqOder } = finlRec.data;
          console.log(finlRec);

          setformvalue({
           FaqQuestion,
           FaqAnswer,
           FaqOder
          });
        });
    }
  }, [id]);
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{id? "update Faq":"Add Faq"}</h2>
      <div className=" bg-gray-100 p-8">
        <div className="  mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{id? "update Faq":"Add Faq"}</h2>
          <form onSubmit={onsbmite} className="space-y-4 ">
            <div className="mb-15">
              <label
                htmlFor="colorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Question
              </label>
              <input
                type="text"
                value={formvalue.FaqQuestion}
                onChange={getsetvalue}
                name="FaqQuestion"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter q name"
              />
            </div>
            <div className="mb-15">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Answer
              </label>
              <textarea
                type="color"
                name="FaqAnswer"
                  value={formvalue.FaqAnswer}
                 onChange={getsetvalue}
                id="colorPicker"
                placeholder=" Answer"
                className="w-full h-[200px] p-1 border resize-none border-gray-300 rounded-md cursor-pointer"
              />
            </div>

            <div className="mb-15">
              <label
                htmlFor="colorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                other
              </label>
              <input
                type="text"
                name="FaqOder"
                 value={formvalue.FaqOder}
                 onChange={getsetvalue}
                id="colorName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="other"
              />
            </div>
            <button className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Add Faq
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
