"use client";
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaHeart, FaFilter, FaTimes } from "react-icons/fa"; // Mobile filters ke liye icons

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    categories: [],
    subcategories: [],
    materials: [],
    colors: [],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // Mobile drawer state

  // Filter States
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [selectedMats, setSelectedMats] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSubsubCats, setSelectedSubsubCats] = useState([]);
  const [price, setPrice] = useState(200000);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  // CPU Optimization: useCallback taaki fetch function baar-baar memory na bhare
  const fetchSidebar = useCallback(async () => {
    try {
      const res = await axios.get(`${Baseurl}product/sidebar-filters`);
      if (res.data.status) setSidebarData(res.data);
    } catch (err) {
      console.error("Sidebar error", err);
    }
  }, [Baseurl]);

  console.log("Sidebar Data:", sidebarData); // Debugging ke liye

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}product/products`, {
        params: {
          categories: selectedCats.join(","),
          subcategories: selectedSubCats.join(","),
          subsubcategories: selectedSubsubCats.join(","),
          materials: selectedMats.join(","),
          colors: selectedColors.join(","),
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
  }, [
    selectedCats,
    selectedSubCats,
    selectedMats,
    selectedColors,
    selectedSubsubCats,
    price,
    sort,
    Baseurl,
  ]);

  useEffect(() => {
    fetchSidebar();
  }, [fetchSidebar]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleCheck = (id, state, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header for Filters */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 sticky top-0 z-30 shadow-sm">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
          <FaFilter size={14} /> Filter & Sort
        </button>
        <p className="text-sm font-bold text-gray-500">
          {products.length} Items
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:p-6">
        {/* --- SIDEBAR (RESPONSIVE) --- */}
        {/* --- SIDEBAR CONTENT --- */}
        <aside
          className={`
  fixed lg:sticky lg:top-6 inset-0 z-40 lg:z-10 bg-white p-6 shadow-xl lg:shadow-none 
  h-full lg:h-[calc(100vh-48px)] overflow-y-auto transition-transform duration-300
  ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h1 className="font-bold text-xl">Filters</h1>
            <FaTimes
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>

          <h1 className="hidden lg:block font-serif text-2xl mb-8 border-b pb-4 text-gray-800 uppercase tracking-widest">
            Filters
          </h1>

          {/* Direct Subcategories & Sub-subcategories */}
          <div className="space-y-8">
            {sidebarData?.subcategories?.map((sub) => (
              <div key={sub._id} className="subcategory-block">
                {/* 1. Subcategory Header (Bottomwear) */}
                <div className="flex items-center mb-3 group">
                  {/* Agar aap subcategory se bhi filter karna chahte hain toh ye checkbox rakhein */}
                  
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                    {sub.SubcategoryName}
                  </h3>
                </div>

                {/* 2. Sub-Subcategories (Pant, etc.) WITH CHECKBOX */}
                <div className="ml-7 space-y-2.5 border-l-2 border-gray-100 pl-5 py-1">
                  {sidebarData?.subsubCategories
                    ?.filter(
                      (subsub) =>
                        String(subsub.SubCategory) === String(sub._id),
                    )
                    .map((subsub) => (
                      <label
                        key={subsub._id}
                        className="flex items-center group/item cursor-pointer"
                      >
                        {/* --- YAHAN HAI VO CHECKBOX JISSE DATA FILTER HOGA --- */}
                        <input
                          type="checkbox"
                          checked={selectedSubsubCats.includes(subsub._id)}
                          onChange={() =>
                            handleCheck(
                              subsub._id,
                              selectedSubsubCats,
                              setSelectedSubsubCats, // Ye function products ko refetch karwa dega
                            )
                          }
                          className="w-3.5 h-3.5 rounded border-gray-300 accent-[#c09578] mr-3 cursor-pointer"
                        />
                        <span className="text-gray-500 text-xs font-medium group-hover/item:text-black transition-colors">
                          {subsub.SubsubcategoryName}
                        </span>
                      </label>
                    ))}

                  {/* Agar pant ya kuch na mile toh feedback ke liye */}
                  {sidebarData?.subsubCategories?.filter(
                    (s) => String(s.SubCategory) === String(sub._id),
                  ).length === 0 && (
                    <span className="text-[10px] text-gray-300 italic">
                      No options available
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Price Filter (Niche Shift kiya hai balance ke liye) */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              Price Range
            </h2>
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c09578]"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-bold text-gray-400">₹0</span>
              <span className="text-xs font-black text-[#c09578] bg-[#c09578]/5 px-2 py-1 rounded">
                UP TO ₹{price}
              </span>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="px-4 lg:px-0">
          {/* Top Sort Bar (Desktop Only Hidden on Mobile) */}
          <div className="hidden lg:flex justify-between items-center bg-white p-4 mb-6 shadow-sm rounded-xl">
            <p className="text-gray-500 font-medium">
              Showing{" "}
              <span className="text-black font-bold">{products.length}</span>{" "}
              luxury pieces
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-gray-400">
                Sort By
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border-none bg-gray-50 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:ring-2 ring-[#c09578]/20"
              >
                <option value="">Default Sorting</option>
                <option value="3">Price: Low to High</option>
                <option value="4">Price: High to Low</option>
                <option value="1">Name: A - Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid - Responsive Columns */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img
                      src={item.ProductImage}
                      alt={item.ProductName}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-all active:scale-90">
                      <FaHeart />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow text-center">
                    <span className="text-[10px] text-[#c09578] font-black uppercase tracking-[0.2em] mb-2">
                      {item.Category?.categoryName || "Premium"}
                    </span>
                    <h3 className="text-md font-bold text-gray-800 line-clamp-1 group-hover:text-[#c09578] transition-colors cursor-pointer mb-3">
                      {item.ProductName}
                    </h3>

                    <div className="mt-auto space-y-4">
                      <div className="flex justify-center items-center gap-3">
                        <span className="text-gray-400 line-through text-xs italic">
                          ₹{item.ActualPrice}
                        </span>
                        <span className="text-lg font-black text-gray-900 font-[cha]">
                          ₹{item.SalePrice}
                        </span>
                      </div>
                      <button className="w-full py-3 bg-gray-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#c09578] transition-all duration-300 rounded-xl shadow-lg shadow-black/5 active:scale-95">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold text-xl italic">
                No luxury pieces match your selection.
              </p>
              <button
                onClick={() => {
                  setSelectedCats([]);
                  setSelectedMats([]);
                  setPrice(200000);
                }}
                className="mt-4 text-[#c09578] font-bold underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div
          onClick={() => setIsMobileFilterOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity"
        />
      )}
    </div>
  );
}
