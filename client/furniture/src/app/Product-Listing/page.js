"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaHeart, FaFilter, FaTimes } from "react-icons/fa";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    categories: [],
    subcategories: [],
    subsubcategories: [], // Iska use nesting ke liye hoga
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [selectedSubsubCats, setSelectedSubsubCats] = useState([]);
  const [price, setPrice] = useState(200000);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  const fetchSidebar = useCallback(async () => {
    try {
      const res = await axios.get(`${Baseurl}product/sidebar-filters`);
      if (res.data.status) setSidebarData(res.data);
    } catch (err) {
      console.error("Sidebar error", err);
    }
  }, [Baseurl]);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}product/products`, {
        params: {
          categories: selectedCats.join(","),
          subcategories: selectedSubCats.join(","),
          subsubcategories: selectedSubsubCats.join(","),
          maxPrice: price,
          sort: sort,
        },
      });
      setProducts(response.data.data || []);
    } catch (err) {
      console.error("Fetch Error", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCats, selectedSubCats, selectedSubsubCats, price, sort, Baseurl]);

  useEffect(() => { fetchSidebar(); }, [fetchSidebar]);
  useEffect(() => { getProducts(); }, [getProducts]);

  const handleCheck = (id, state, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 sticky top-0 z-30 shadow-sm">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
          <FaFilter size={14} /> Filter & Sort
        </button>
        <p className="text-sm font-bold text-gray-500">{products.length} Items</p>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 lg:p-6">
        
        {/* --- SIDEBAR --- */}
        <aside className={`
          fixed lg:sticky lg:top-6 inset-0 z-40 lg:z-10 bg-white p-6 shadow-xl lg:shadow-none 
          h-full lg:h-[calc(100vh-48px)] overflow-y-auto transition-transform duration-300
          ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h1 className="font-bold text-xl">Filters</h1>
            <FaTimes onClick={() => setIsMobileFilterOpen(false)} className="text-2xl cursor-pointer" />
          </div>

          <h1 className="hidden lg:block font-serif text-3xl mb-8 border-b pb-4 text-gray-800">
            Categories
          </h1>

          {/* Hierarchical Filters */}
          <div className="space-y-8">
            {sidebarData.categories.map((cat) => (
              <div key={cat._id} className="relative">
                {/* 1. Category Name (Bold Title) */}
                <h3 className="text-md font-bold text-[#c09578] mb-4 uppercase tracking-wider">
                  {cat.categoryName}
                </h3>

                <div className="space-y-5 ml-1">
                  {sidebarData?.subcategories
                    ?.filter((sub) => sub.Category === cat._id)
                    .map((sub) => (
                      <div key={sub._id} className="group">
                        
                        {/* 2. Subcategory Checkbox */}
                        <label className="flex items-center cursor-pointer mb-3">
                          <input
                            type="checkbox"
                            checked={selectedSubCats?.includes(sub._id)}
                            onChange={() => handleCheck(sub._id, selectedSubCats, setSelectedSubCats)}
                            className="w-4 h-4 rounded border-gray-300 accent-black mr-3"
                          />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                            {sub.SubcategoryName}
                          </span>
                        </label>

                        {/* 3. Sub-Subcategories (Material/Color list) */}
                        <div className="ml-7 space-y-2 border-l border-gray-100 pl-4 py-1">
                          {sidebarData?.subsubcategories
                            ?.filter((subsub) => subsub.SubCategory === sub._id)
                            .map((subsub) => (
                              <label key={subsub._id} className="flex items-center group/item cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedSubsubCats.includes(subsub._id)}
                                  onChange={() => handleCheck(subsub._id, selectedSubsubCats, setSelectedSubsubCats)}
                                  className="w-3.5 h-3.5 rounded border-gray-300 accent-[#c09578] mr-3"
                                />
                                <span className="text-gray-500 text-xs group-hover/item:text-black transition-colors font-light">
                                  {subsub.SubsubcategoryName}
                                </span>
                              </label>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="font-serif text-xl text-gray-800 mb-6">Filter By Price</h2>
            <input
              type="range" min="0" max="200000" step="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c09578]"
            />
            <p className="text-xs font-bold mt-4 text-gray-500">
              Rs. 0 - Rs. {price}
            </p>
            <button className="w-full mt-4 bg-gray-900 text-white py-2 text-xs font-bold uppercase tracking-widest hover:bg-black">
              Filter
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT (Product Grid) --- */}
        <main className="px-4 lg:px-0">
          <div className="hidden lg:flex justify-between items-center bg-white p-4 mb-6 shadow-sm rounded-xl">
            <p className="text-gray-500 font-medium">
              Showing <span className="text-black font-bold">{products.length}</span> luxury pieces
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 rounded-lg px-4 py-2 text-sm font-bold outline-none"
            >
              <option value="">Default Sorting</option>
              <option value="3">Price: Low to High</option>
              <option value="4">Price: High to Low</option>
              <option value="1">Name: A - Z</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {products.map((item) => (
                <div key={item._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img src={item.ProductImage} alt={item.ProductName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md text-gray-400 hover:text-red-500">
                      <FaHeart />
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-grow text-center">
                    <span className="text-[10px] text-[#c09578] font-bold uppercase tracking-widest mb-1">
                      {item.Category?.categoryName || "Premium Furniture"}
                    </span>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-3">{item.ProductName}</h3>
                    <div className="mt-auto flex justify-center items-center gap-3">
                      <span className="text-gray-400 line-through text-xs">₹{item.ActualPrice}</span>
                      <span className="text-md font-black text-gray-900">₹{item.SalePrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}