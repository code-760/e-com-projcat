import React, { useState } from "react"; // KAMI 1 FIXED: useState import kiya
import { Link, useNavigate } from "react-router-dom"; 

// PREMIUM ICONS (Remix Icons - Same as Sidebar)
import {
  RiSearchLine,
  RiNotification3Line,
  RiUser3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiMenu2Line,
  RiArrowDownSLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removetokan } from "../reduc/slice/adminslice";

export default function Header() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");

  let tokan = useSelector((state) => state.adminstore.tokan);
  const userData = useSelector((state) => state.adminstore.userData);

  let Logout = () => {
    dispatch(removetokan());
    navigate("/");
  };

  let { Adminprofile, Adminphone, Adminemail, AdminName } = userData || {};

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      console.log("Searching for:", searchTerm);
      navigate(`/search?q=${searchTerm}`);
    }
  }; 

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex flex-row items-center justify-between px-6 py-3 h-20">
        {/* --- LEFT SECTION: Mobile Toggle & Title --- */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden">
            <RiMenu2Line size={24} />
          </button>

          <div className="hidden md:block">
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-xs text-gray-500">Welcome back, Admin</p>
          </div>
        </div>

        {/* --- CENTER SECTION: Search Bar --- */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-purple-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-300">
          <RiSearchLine
            className="text-gray-400 mr-2 cursor-pointer"
            size={20}
            onClick={() =>
              searchTerm.trim() !== "" && navigate(`/search?q=${searchTerm}`)
            }
          />
          <input
            type="text"
            placeholder="Search products, orders or users..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleSearch} 
          />
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <RiNotification3Line size={22} />
            <span className="absolute top-1.5 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>

          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={Adminprofile || "https://via.placeholder.com/150"} 
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-purple-100 group-hover:ring-purple-500 transition-all duration-300"
              />

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                  {AdminName || "John Doe"}
                </p>
                <p className="text-xs text-gray-500">{Adminemail}</p>
                <p className="text-xs text-gray-500">{Adminphone}</p>
              </div>

              <RiArrowDownSLine className="text-gray-400 group-hover:text-purple-600 transition-transform group-hover:rotate-180" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-semibold text-gray-800">
                  My Account
                  {AdminName && (
                    <span className="font-normal"> - {AdminName}</span>
                  )}
                </p>
              </div>

              <ul className="py-2">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    <RiUser3Line className="mr-3 text-lg" />
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Complitprofile"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    <RiSettings4Line className="mr-3 text-lg" />
                    Complete Profile
                  </Link>
                </li>
                <div className="my-1 border-t border-gray-100"></div>
                
                <li>
                  {tokan ? (
                    <button
                      onClick={Logout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <RiLogoutCircleRLine className="mr-3 text-lg" />
                      Logout
                    </button>
                  ) : (
                    // KAMI 2 FIXED: Login button par click hone par login page par bheja
                    <button 
                      onClick={() => navigate("/login")} 
                      className="w-full flex items-center px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                    >
                      <RiLogoutCircleRLine className="mr-3 text-lg" />
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}