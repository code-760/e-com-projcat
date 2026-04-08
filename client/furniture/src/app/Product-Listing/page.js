"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function ProductListing() {
  // --- 1. STATES ---
  const [products, setProducts] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    categories: [],
    subcategories: [],
    materials: [],
    colors: [],
  });
  const [imgPath, setImgPath] = useState("");

  // Filter States
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedMats, setSelectedMats] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [price, setPrice] = useState(150000); // Max Price state
  const [sort, setSort] = useState("");

  const Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  // --- 2. API CALLS ---

  // Sidebar Filters fetch karein (Sirf ek baar mount hone par)
  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await axios.get(`${Baseurl}product/sidebar-filters`);
        if (res.data.status) {
          setSidebarData({
            categories: res.data.categories || [],
            subcategories: res.data.subcategories || [],
            materials: res.data.materials || [],
            colors: res.data.colors || [],
          });
        }
      } catch (err) {
        console.error("Sidebar loading failed", err);
      }
    };
    fetchSidebar();
  }, [Baseurl]);

  // Products fetch karein (Jab bhi filters change hon)
  const getProducts = async () => {
    try {
      const response = await axios.get(`${Baseurl}product/products`, {
        params: {
          categories: selectedCats.join(","),
          materials: selectedMats.join(","),
          colors: selectedColors.join(","),
          maxPrice: price,
          sort: sort,
        },
      });
      setProducts(response.data.data);
      setImgPath(response.data.path);
    } catch (err) {
      console.error("Fetch Error", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCats, selectedMats, selectedColors, price, sort]);

  // --- 3. HELPER FUNCTIONS ---
  const handleCheck = (id, state, setState) => {
    setState(
      state.includes(id) ? state.filter((i) => i !== id) : [...state, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px]  grid grid-cols-[280px_1fr] gap-4">
        
        {/* --- SIDEBAR START --- */}
        <aside className="bg-white p-6 shadow-sm h-screen sticky top-0 overflow-y-auto">
          <h1 className="font-bold text-2xl mb-6 border-b pb-2">Filters</h1>

          {/* A. PRICE FILTER (Naya Section) */}
          <div className="mb-8">
            <h2 className="font-semibold text-lg text-gray-700 mb-4">Price Range</h2>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c09578]"
            />
            <div className="flex justify-between text-sm mt-2 font-medium">
              <span>Rs. 0</span>
              <span className="text-[#c09578]">Up to: Rs. {price}</span>
            </div>
          </div>

          {/* B. CATEGORIES & SUBCATEGORIES */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">Categories</h2>
            {sidebarData.categories.map((cat) => (
              <div key={cat._id} className="mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {cat.categoryName}
                </h3>
                {sidebarData.subcategories
                  .filter((sub) => sub.Category === cat._id)
                  .map((sub) => (
                    <label key={sub._id} className="flex items-center mb-2 cursor-pointer hover:text-[#c09578] transition">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(sub._id)}
                        onChange={() => handleCheck(sub._id, selectedCats, setSelectedCats)}
                        className="w-4 h-4 accent-[#c09578] mr-3"
                      />
                      <span className="text-gray-600 text-sm">{sub.SubcategoryName}</span>
                    </label>
                  ))}
              </div>
            ))}
          </div>

          {/* C. MATERIALS */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">Materials</h2>
            {sidebarData.materials.map((mat) => (
              <label key={mat._id} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMats.includes(mat._id)}
                  onChange={() => handleCheck(mat._id, selectedMats, setSelectedMats)}
                  className="w-4 h-4 accent-[#c09578] mr-3"
                />
                <span className="text-gray-600 text-sm">{mat.materialName}</span>
              </label>
            ))}
          </div>
        </aside>
        {/* --- SIDEBAR END --- */}

        {/* --- MAIN CONTENT START --- */}
        <main className="p-6">
          {/* Header/Sort Bar */}
          <div className="flex justify-between items-center bg-white p-4 mb-6 shadow-sm rounded-md">
            <p className="text-gray-500">
              Showing <span className="font-bold text-black">{products.length}</span> results
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 outline-none focus:border-[#c09578]"
              >
                <option value="">Default</option>
                <option value="1">Name: A to Z</option>
                <option value="2">Name: Z to A</option>
                <option value="3">Price: Low to High</option>
                <option value="4">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div key={item._id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imgPath + item.ProductImage}
                    alt={item.ProductName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition">
                    <FaHeart />
                  </button>
                </div>

                <div className="p-5 text-center">
                  <span className="text-xs text-[#c09578] font-bold uppercase tracking-widest">
                    {item.Category?.categoryName || "Furniture"}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-3 truncate hover:text-[#c09578] cursor-pointer">
                    {item.ProductName}
                  </h3>
                  
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <span className="text-gray-400 line-through text-sm">Rs. {item.ActualPrice}</span>
                    <span className="text-xl font-bold text-gray-900">Rs. {item.SalePrice}</span>
                  </div>

                  <button className="w-full py-2 bg-gray-100 font-medium hover:bg-black hover:text-white transition duration-300 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found matching your filters.
            </div>
          )}
        </main>
        {/* --- MAIN CONTENT END --- */}

      </div>
    </div>
  );
}