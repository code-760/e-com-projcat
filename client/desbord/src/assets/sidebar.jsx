import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// PREMIUM ICONS: Remix Icons (Ri)
import { 
  RiDashboard3Line, RiUserStarLine, RiFileList3Line, RiPaletteLine, 
  RiStackLine, RiFolder3Line, RiBox3Line, RiShoppingBag3Line, 
  RiEqualizerLine, RiGlobalLine, RiChatQuoteLine, RiQuestionLine, 
  RiShieldCheckLine, RiArrowDownSLine, RiArrowRightSLine 
} from "react-icons/ri";

import { BiBadgeCheck } from "react-icons/bi";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menuTitle) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
  };

  // --- PREMIUM MENU CONFIGURATION ---
  const menuItems = [
    {
      title: "Dashboard",
      icon: <RiDashboard3Line size={22} />,
      path: "/",
      type: "link",
    },
    {
      title: "Users",
      icon: <RiUserStarLine size={22} />,
      type: "dropdown",
      items: [{ title: "View User", path: "/Viewuser" }],
    },
    {
      title: "Enquiries",
      icon: <RiFileList3Line size={22} />,
      type: "dropdown",
      items: [
        { title: "Contact Enquirys", path: "/ContactEnquirys" },
        { title: "Newsletters", path: "/Newsletters" },
      ],
    },
    {
      title: "Colors",
      icon: <RiPaletteLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Color", path: "/color" },
        { title: "View Color", path: "/ViewColor" },
      ],
    },
    {
      title: "Materials",
      icon: <RiStackLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Material", path: "/Add_Material" },
        { title: "View Material", path: "/ViewMaterial" },
      ],
    },
    {
      title: "Parent Categories",
      icon: <RiFolder3Line size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Category", path: "/Add_Category" },
        { title: "View Category", path: "/ViewCategory" },
      ],
    },
    {
      title: "Sub Categories",
      icon: <RiFolder3Line size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Sub Category", path: "/Add_Sub_category" },
        { title: "View Sub Category", path: "/ViewSubCategory" },
      ],
    },
    {
      title: "Sub Sub Categories",
      icon: <RiFolder3Line size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Sub Sub Category", path: "/Add_sub_sub_category" },
        { title: "View Sub Sub Category", path: "/ViewSubSubCategory" },
      ],
    },
    {
      title: "Products",
      icon: <RiBox3Line size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Product", path: "/Add_Product" },
        { title: "View Product", path: "/View_Product" },
      ],
    },
    {
      title: "Orders",
      icon: <RiShoppingBag3Line size={22} />,
      type: "dropdown",
      items: [{ title: "Orders", path: "/Viewuser" }],
    },
    {
      title: "Sliders",
      icon: <RiEqualizerLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Slider", path: "/Add_sidebar" },
        { title: "View Slider", path: "/ViewSlider" },
      ],
    },
    {
      title: "Why Choose Us",
      icon: <span className="text-xl">✨</span>, 
      type: "dropdown",
      items: [
        { title: "Add Why Choose Us", path: "/Add_Why_Choose_Us" },
        { title: "View Why Choose Us", path: "/View_why_chooseUs" },
      ],
    },
    {
      title: "Country",
      icon: <RiGlobalLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Country", path: "/Add_Country" },
        { title: "View Country", path: "/ViewCountry" },
      ],
    },
    {
      title: "Testimonials",
      icon: <RiChatQuoteLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Testimonial", path: "/Add_Testimonial" },
        { title: "View Testimonial", path: "/Viewtestimonial" },
      ],
    },
    {
      title: "FAQs",
      icon: <RiQuestionLine size={22} />,
      type: "dropdown",
      items: [
        { title: "Add Faq", path: "/Add_Faq" },
        { title: "View Faq", path: "/ViewFaq" },
      ],
    },
    {
      title: "Terms & Conditions",
      icon: <RiShieldCheckLine size={22} />,
      path: "/TermsAndConditions",
      type: "link",
    },
  ];

  return (
    <div className="bg-[#1e293b] text-white shadow-2xl h-screen flex flex-col w-72 border-r border-gray-700 font-sans">
      
      {/* Premium Logo Section */}
     <div className="p-6 border-b border-gray-200 flex justify-center items-center bg-white">
  <img src="/images1.png" className="h-10 object-contain" alt="Logo" />
</div>    
      {/* Navigation Area */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-2">
        {menuItems.map((menu, index) => (
          <div key={index}>
            
            {/* Logic: Direct Link */}
            {menu.type === "link" ? (
              <Link
                to={menu.path}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${
                  location.pathname === menu.path
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 translate-x-1"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white hover:shadow-md"
                }`}
              >
                <span className={`mr-3 transition-transform group-hover:scale-110`}>
                    {menu.icon}
                </span>
                <span className="font-semibold tracking-wide">{menu.title}</span>
              </Link>
            ) : (
              
              // Logic: Dropdown
              <div>
                <button
                  onClick={() => toggleMenu(menu.title)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ease-in-out group ${
                    activeMenu === menu.title
                      ? "bg-gray-800 text-white shadow-md border-l-4 border-purple-500"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 transition-transform group-hover:scale-110 ${activeMenu === menu.title ? "text-purple-400" : ""}`}>
                        {menu.icon}
                    </span>
                    <span className="font-semibold tracking-wide">{menu.title}</span>
                  </div>
                  
                  {/* Premium Rotating Arrow */}
                  <span className={`transition-transform duration-300 text-gray-500 group-hover:text-white ${activeMenu === menu.title ? "rotate-180 text-purple-400" : ""}`}>
                    <RiArrowDownSLine size={20} />
                  </span>
                </button>

                {/* Smooth Expansion Animation */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeMenu === menu.title ? "max-h-96 opacity-100 mt-2 mb-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="ml-4 pl-4 border-l border-gray-700 space-y-1">
                    {menu.items.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                            location.pathname === subItem.path
                            ? "text-purple-400 bg-purple-500/10 font-bold"
                            : "text-gray-400 hover:text-white hover:translate-x-1"
                          }`}
                        >
                          <RiArrowRightSLine className="mr-2 text-xs opacity-70" />
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      
      {/* Optional: User Profile Mini Section at Bottom */}
      <div className="p-4 border-t border-gray-700 bg-[#0f172a] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            AD
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Admin Panel</span>
            <span className="text-xs text-gray-500">View Profile</span>
        </div>
      </div>
    </div>
  );
}