import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

// Icons for Premium Look
import {
  RiQuestionLine,
  RiChatQuoteLine,
  RiSortAsc,
  RiAddCircleLine,
  RiEditBoxLine,
} from "react-icons/ri";

export default function Add_Faq() {
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
      FaqQuestion: e.target.FaqQuestion.value,
      FaqAnswer: e.target.FaqAnswer.value,
      FaqOder: e.target.FaqOder.value,
    };

    if (id) {
      axios
        .put(`${apibaseurl}/Faq/update/${id}`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec._status) {
            swal("Successfully", "updeted Successfully ", "success");
            setTimeout(() => {
              Navigate("/ViewFaq");
            }, 2000);
          } else {
            toast.error(fainlrec.error.CountryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Faq/create`, obj)
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/ViewFaq");
            }, 2000);
          } else {
            toast.error(
              fainlrec.error?.FaqQuestion || fainlrec.error?.FaqAnswer
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
      FaqOder: "",
    });
    if (id) {
      axios
        .get(`${apibaseurl}/FAq/get-deteils/${id}`)
        .then((rec) => rec.data)
        .then((finlRec) => {
          let { FaqQuestion, FaqAnswer, FaqOder } = finlRec.data;

          // console.log(finlRec);

          setformvalue({
            FaqQuestion,
            FaqAnswer,
            FaqOder,
          });
        });
    }

  }, [id]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 p-6">
      <ToastContainer />

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {id ? (
              <RiEditBoxLine className="text-3xl" />
            ) : (
              <RiAddCircleLine className="text-3xl" />
            )}
            {id ? "Update FAQ" : "Add Frequently Asked Question"}
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            Create meaningful questions and answers for your users.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={onsbmite} className="space-y-6">
            {/* Question Input */}
            <div className="group">
              <label
                htmlFor="FaqQuestion"
                className="block text-sm font-semibold text-gray-700 mb-2 pl-1"
              >
                Question
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <RiQuestionLine size={20} />
                </div>
                <input
                  type="text"
                  name="FaqQuestion"
                  id="FaqQuestion"
                  value={formvalue.FaqQuestion}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. How do I track my order?"
                />
              </div>
            </div>

            {/* Answer Input (Textarea) */}
            <div className="group">
              <label
                htmlFor="FaqAnswer"
                className="block text-sm font-semibold text-gray-700 mb-2 pl-1"
              >
                Answer
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <RiChatQuoteLine size={20} />
                </div>
                <textarea
                  name="FaqAnswer"
                  id="FaqAnswer"
                  value={formvalue.FaqAnswer}
                  onChange={getsetvalue}
                  placeholder="Provide a detailed answer here..."
                  className="w-full pl-10 pr-4 py-3 h-40 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Order Input */}
            <div className="group">
              <label
                htmlFor="FaqOder"
                className="block text-sm font-semibold text-gray-700 mb-2 pl-1"
              >
                Sort Order
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <RiSortAsc size={20} />
                </div>
                <input
                  type="number"
                  name="FaqOder"
                  id="FaqOder"
                  value={formvalue.FaqOder}
                  onChange={getsetvalue}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm bg-gray-50 focus:bg-white"
                  placeholder="e.g. 1, 2, 3"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
                {id ? "Save Changes" : "Submit FAQ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
