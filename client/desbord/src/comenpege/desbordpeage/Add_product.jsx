import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiCloudStorage } from "react-icons/ti";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

// Premium Icons
import {
  RiProductHuntLine,
  RiPriceTag3Line,
  RiStockLine,
  RiFileList3Line,
  RiImageAddLine,
  RiSave3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

export default function Add_product() {
  let [value, setValue] = useState("");

  let { id } = useParams();

  let [perview, setperview] = useState();
  let [backperview, setbackperview] = useState();
  let [parntcategroydeta, setparntcategroydeta] = useState([]);
  let [subcategroydeta, setsubcategroydeta] = useState([]);
  let [Subsubcategroydeta, setSubsubcategroydeta] = useState([]);
  let [Matriale, setMatriale] = useState([]);
  let [color, setcolor] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  let [formvalue, setformvalue] = useState({
    ProductName: "",
    Category: "",
    SubCategory: "",
    SubsubCategory: "",
    color: [],
    material: [],
    ProductType: null,
    BestSelling: null,
    TopRated: null,
    Upsell: null,
    ActualPrice: "",
    SalePrice: "",
    Description: "",
    Order: "",
    TotalInStocks: "",
  });

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      console.log(filesArray);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((oldImages) => [...oldImages, ...newPreviews]);
    }
  };

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let Navigate = useNavigate();

  let Product = (e) => {
    e.preventDefault();

    let Form = e.target;

    let Formdata = new FormData(Form);
    Formdata.append("Description", value);

    if (id) {
      axios
        .put(`${apibaseurl}/Product/update/${id}`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          // fainlrec ==ture to deta  save

          if (fainlrec._status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/View_Product");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.SubcategoryName);
          }
        });
    } else {
      axios
        .post(`${apibaseurl}/Product/create`, Formdata)
        .then((rec) => rec.data)

        .then((fainlrec) => {
          if (fainlrec.status) {
            swal("Successfully", "Your data is added!", "success");
            setTimeout(() => {
              Navigate("/View_Product");
            }, 2000);
          } else {
            toast.error(fainlrec.error?.SubcategoryName);
          }
        });
    }
  };

  let getparentcategroy = () => {
    axios
      .get(`${apibaseurl}/Product/parnt-categroy`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setparntcategroydeta(finlrec.date);
      });
  };

  let getsubcategroy = (parnetid) => {
    axios
      .get(`${apibaseurl}/Product/sub-categroy/${parnetid}`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setsubcategroydeta(finlrec.date);
      });
  };

  let subCategoryonEdit = (id) => {
    let parnetid = id;
    axios
      .get(`${apibaseurl}/Product/sub-categroy/${parnetid}`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setsubcategroydeta(finlrec.date);
      });
  };

  let getSubsubcategroy = (e) => {
    let parnetid = e;
    axios
      .get(`${apibaseurl}/Product/Sub-sub-categroy/${parnetid}`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setSubsubcategroydeta(finlrec.date);
      });
  };

  let SubsubCategoryonEdit = (id) => {
    let parnetid = id;
    axios
      .get(`${apibaseurl}/Product/Sub-sub-categroy/${parnetid}`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setSubsubcategroydeta(finlrec.date);
      });
  };

  let getMatriale = () => {
    axios
      .get(`${apibaseurl}/Product/Material`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setMatriale(finlrec.deta);
      });
  };

  let getcolor = () => {
    axios
      .get(`${apibaseurl}/Product/color`)
      .then((rec) => rec.data)
      .then((finlrec) => {
        setcolor(finlrec.deta);
      });
  };

  let getsetvalue = (e) => {
    // e.target se cheezein nikalo
    let { name, value, multiple, selectedOptions } = e.target;

    let finalValue = value;

    if (multiple) {
      // Agar multiple hai toh array banao
      finalValue = Array.from(selectedOptions, (option) => option.value);
    }

    // Name fix karo aur state update karo
    let key = name.replace("[]", "");
    setformvalue({ ...formvalue, [key]: finalValue });
  };

  let gatdiles = () => {
    axios
      .get(`${apibaseurl}/Product/get-deteils/${id}`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        let { data } = finlerec;

        console.log(data);

        subCategoryonEdit(data.Category._id);
        SubsubCategoryonEdit(data.SubCategory._id);

        setformvalue({
          ProductName: data.ProductName,
          Category: data.Category._id || "",
          SubCategory: data.SubCategory._id || "",
          SubsubCategory: data.SubsubCategory._id || "",
          color: data.color.map((o, index) => o._id),
          material: data.material.map((o, index) => o._id),
          BestSelling: data?.BestSelling ? "1" : "0",
          TopRated: data?.TopRated ? "1" : "0",
          Upsell: data?.Upsell ? "1" : "0",
          ActualPrice: data?.ActualPrice || "",
          SalePrice: data?.SalePrice || "",
          Description: data?.Description || "",
          Order: data?.Order || "",
          TotalInStocks: data?.TotalInStocks || "",
          ProductType: data.ProductType,
        });
        setperview(finlerec.path + finlerec.data.ProductImage);
        setbackperview(finlerec.path + finlerec.data.BackImage);
        setValue(data.Description);
      });
  };

  useEffect(() => {
    getMatriale();
    getcolor();
    getparentcategroy();
  }, []);

  useEffect(() => {
    if (id) {
      gatdiles();
    }
  }, [id]);

  useEffect(() => {
    console.log("Category:", formvalue.SubCategory);
    console.log(
      "Options:",
      subcategroydeta.map((o) => o._id),
    );
  }, [formvalue.SubCategory, subcategroydeta]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <ToastContainer />

      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <RiProductHuntLine className="text-blue-600" />
          {id ? "Edit Product" : "Add New Product"}
        </h2>
      </div>

      <form
        onSubmit={Product}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT COLUMN - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
              <RiFileList3Line className="text-blue-500" /> Basic Information
            </h3>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  onChange={getsetvalue}
                  value={formvalue.ProductName}
                  placeholder="e.g. Premium Leather Jacket"
                  name="ProductName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Type */}
                <div className="group relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Product Type
                  </label>
                  <div className="relative">
                    <select
                      value={formvalue.ProductType}
                      onChange={getsetvalue}
                      name="ProductType"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                    >
                      <option>Select Type</option>
                      <option value="1">Featured</option>
                      <option value="2">New Arrivals</option>
                      <option value="3">Onsale</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Sort Order */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Sort Order
                  </label>
                  <input
                    value={formvalue.Order}
                    onChange={getsetvalue}
                    name="Order"
                    type="number"
                    placeholder="e.g. 10"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Best Selling */}
                <div className="group relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Best Selling
                  </label>
                  <div className="relative">
                    <select
                      value={formvalue.BestSelling}
                      onChange={getsetvalue}
                      name="BestSelling"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                    >
                      <option>Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Top Rated */}
                <div className="group relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Top Rated
                  </label>
                  <div className="relative">
                    <select
                      value={formvalue.TopRated}
                      onChange={getsetvalue}
                      name="TopRated"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                    >
                      <option>Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Upsell */}
                <div className="group relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Upsell Product
                  </label>
                  <div className="relative">
                    <select
                      value={formvalue.Upsell}
                      onChange={getsetvalue}
                      name="Upsell"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                    >
                      <option>Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
              <RiPriceTag3Line className="text-green-500" /> Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Actual Price (MRP)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    value={formvalue.ActualPrice}
                    onChange={getsetvalue}
                    type="number"
                    name="ActualPrice"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Sale Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    value={formvalue.SalePrice}
                    onChange={getsetvalue}
                    type="number"
                    name="SalePrice"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Total Stock
                </label>
                <div className="relative">
                  <RiStockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={formvalue.TotalInStocks}
                    onChange={getsetvalue}
                    type="number"
                    name="TotalInStocks"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Description
            </h3>
            <div className="h-80 mb-12">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                className="h-64"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Categorization & Images */}
        <div className="space-y-8">
          {/* Organization Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Organization
            </h3>

            <div className="space-y-4">
              {/* Category */}
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Parent Category
                </label>
                <div className="relative">
                  <select
                    name="Category"
                    value={formvalue.Category}
                    onChange={(e) => {
                      getsetvalue(e);
                      getsubcategroy(e.target.value);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                  >
                    <option value="">Select Category</option>
                    {parntcategroydeta.map((obj) => (
                      <option key={obj._id} value={obj._id}>
                        {obj.categoryName}
                      </option>
                    ))}
                  </select>
                  <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sub Category */}
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Sub Category
                </label>
                <div className="relative">
                  <select
                    name="SubCategory"
                    value={formvalue.SubCategory}
                    onChange={(e) => {
                      getsetvalue(e);
                      getSubsubcategroy(e.target.value);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                  >
                    <option>Select Sub-Category</option>
                    {subcategroydeta.map((obj, index) => (
                      <option value={obj._id} key={index}>
                        {obj.SubcategoryName}
                      </option>
                    ))}
                  </select>
                  <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sub Sub Category */}
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Sub-Sub Category
                </label>
                <div className="relative">
                  <select
                    value={formvalue.SubsubCategory}
                    name="SubsubCategory"
                    onChange={getsetvalue} // Added change handler for consistency
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white pr-10"
                  >
                    <option>Select Sub-Sub-Category</option>
                    {Subsubcategroydeta.map((obj, index) => (
                      <option value={obj._id} key={index}>
                        {obj.SubsubcategoryName}
                      </option>
                    ))}
                  </select>
                  <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Material */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Materials
                </label>
                <select
                  value={formvalue.material}
                  onChange={getsetvalue}
                  name="material[]"
                  multiple
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white h-32"
                >
                  {Matriale.map((obj, index) => (
                    <option value={obj._id} key={index} className="p-1">
                      {obj.materialName}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>

              {/* Color */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Colors
                </label>
                <select
                  name="color[]"
                  multiple
                  value={formvalue.color}
                  onChange={getsetvalue}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white h-32"
                >
                  {color.map((obj, index) => (
                    <option value={obj._id} key={index} className="p-1">
                      {obj.colorName}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2">
              <RiImageAddLine className="text-purple-500" /> Media
            </h3>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Main Image
              </label>
              <label
                htmlFor="Product-Image"
                className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-all ${perview ? "border-blue-500" : "border-gray-300"}`}
              >
                {perview ? (
                  <img
                    src={perview}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <TiCloudStorage className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-semibold">
                      Click to upload main image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="Product-Image"
                  name="ProductImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files[0] &&
                    setperview(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            </div>

            {/* Back Image */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Back View Image
              </label>
              <label
                htmlFor="Back-Image"
                className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-all ${backperview ? "border-blue-500" : "border-gray-300"}`}
              >
                {backperview ? (
                  <img
                    src={backperview}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <TiCloudStorage className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-semibold">
                      Click to upload back view
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="Back-Image"
                  name="BackImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files[0] &&
                    setbackperview(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Gallery Images
              </label>
              <label
                htmlFor="Gallery-Image"
                className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <TiCloudStorage className="w-8 h-8 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Add multiple images</p>
                </div>
                <input
                  type="file"
                  id="Gallery-Image"
                  name="GalleryImage"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryChange}
                />
              </label>

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {galleryPreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={src}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            <RiSave3Line size={20} />
            {id ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
