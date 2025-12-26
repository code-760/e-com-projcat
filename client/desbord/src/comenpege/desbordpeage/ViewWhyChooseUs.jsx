import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { Link } from "react-router";

export default function View_why_chooseUs() {
  let [date, setdate] = useState([]);
  let [path, setpath] = useState();

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let getWhyChooseUs = () => {
    axios
      .get(`${apibaseurl}/WhyChooseUs/viwe`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        // console.log(finlerec.date);
        setpath(finlerec.path);

        setdate(finlerec.date);
      });
  };
  // console.log(date);

  let [allids, setallids] = useState([]);

  let getChacdebox = (e) => {
    if (e.target.checked) {
      // console.log(e.target.value);
      setallids([...allids, e.target.value]);
    } else {
      setallids(allids.filter((v) => v != e.target.value));
    }
  };

  let deleterow = () => {
    if (allids.length >= 1) {
      axios
        .post(`${apibaseurl}/WhyChooseUs/multidelete`, { ids: allids })
        .then((rec) => rec.data)
        .then((fainlrec) => {
          if (fainlrec.status) {
            getWhyChooseUs();
            setallids([]);
          }
        });
    } else {
      toast.error("Please chack the box");
    }
  };

  let changestatus = () => {
    if (allids.length >= 1) {
      axios
        .post(`${apibaseurl}/WhyChooseUs/change-status`, { ids: allids })
        .then((rec) => rec.data)
        .then((finalrec) => {
          if (finalrec.status) {
            getWhyChooseUs();
            setallids([]);
          }
        });
    } else {
      toast.error("Please chack the box");
    }
  };

  let getallchecked = (e) => {
    if (e.target.checked) {
      setallids(date.map((obj) => obj._id));
    } else {
      setallids([]);
    }
  };

  useEffect(() => {
    getWhyChooseUs();
  }, [deleterow]);

  let toteldata = date.length;
  let activdata = date.filter((v) => v.WhyChooseUsstatus).length;
  let dactivdeta = toteldata - activdata;

  let [searchbox, setsearchbox] = useState(false);
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className={`relative ${searchbox ? "block" : "hidden"}`}>
            <input
              type="search"
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users..."
            />
            <button className="absolute left-[226px] top-2.5 text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className=" flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">
              View why chooseUs
            </h2>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="flex justify-between items-center mb-4 px-4">
                  <div className="space-x-2">
                    <button
                      onClick={() => setsearchbox((prev) => !prev)}
                      className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-colors"
                    >
                      <FaFilter />
                    </button>
                    <button
                      onClick={deleterow}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={changestatus}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-gray-600 font-medium">
                    Total Emails:{" "}
                  </span>
                  <span className="text-gray-900">{toteldata} </span>
                </div>
                <div className="bg-green-100 rounded-lg px-4 py-2">
                  <span className="text-green-600 font-medium">Active: </span>
                  <span className="text-green-900">{activdata}</span>
                </div>
                <div className="bg-red-100 rounded-lg px-4 py-2">
                  <span className="text-red-600 font-medium">Deactive: </span>
                  <span className="text-red-900">{dactivdeta}</span>
                </div>
              </div>
              <div className="flex space-x-2"></div>
            </div>
          </div>
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-10 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={date.length == allids.length}
                      onClick={getallchecked}
                    />
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              {date.map((obj, index) => {
                return (
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex   items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <input
                              type="checkbox"
                              onChange={getChacdebox}
                              value={obj._id}
                              checked={allids.includes(obj._id)}
                            />
                            {obj.Title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className=" border-b border-gray-200 bg-white text-sm"></td>
                    <td className=" border-b border-gray-200 bg-white text-sm"></td>
                    <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                      <img
                        src={path + obj.WhyChooseUsimg}
                        alt=""
                        className=" w-10 h-10"
                      />
                    </td>
                    <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {obj.Description}{" "}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {obj.Order}
                      </p>
                    </td>

                    {obj.WhyChooseUsstatus ? (
                      <td className=" border-b border-gray-200 bg-white text-sm">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Activate
                        </button>
                      </td>
                    ) : (
                      <td className=" border-b border-gray-200 bg-white text-sm">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Dactivate
                        </button>
                      </td>
                    )}

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link to={`/Add-Why-Choose-Us-updete/${obj._id}`}>
                        <button className="px-5 py-5 rounded-full ml-2 bg-blue-500 text-white  hover:bg-blue-600 transition-colors">
                          <FaPenNib />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
