import React, { useState, useEffect } from 'react'; // useEffect add kiya hai yahan
import { BsThreeDotsVertical } from "react-icons/bs";
import { 
  RiUser3Line, 
  RiShoppingBag3Line, 
  RiLayoutGridFill, 
  RiPieChartLine 
} from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios'; // Make sure axios is imported

export default function Dashboard() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  // 1. Har card ke liye alag alag state banayi hai taaki numbers alag alag save ho
  let [usersData, setUsersData] = useState([]);
  let [productsCount, setProductsCount] = useState([]);
  let [categoriesCount, setCategoriesCount] = useState([]);

  // 2. Apni APIs ko update kiya taaki wo correct state mein data save karein
  let viweuser = () => {
    axios
      .get(`${apibaseurl}/user/viwe-user`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        setUsersData(finlerec.data || []);
      });
  };

  let getproduct = () => {
    axios
      .get(`${apibaseurl}/Product/viwe`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        console.log(finlerec.date);
        setProductsCount(finlerec.date || []); // Agar data nahi aata toh empty array set kar denge taaki length 0 ho jaye

        
       
        // Agar data nahi aata toh empty array set kar denge taaki length 0 ho jaye
      });
  };

  let getcategory = () => {
    axios
      .get(`${apibaseurl}/category/viwe`)
      .then((rec) => rec.data)
      .then((finlerec) => {
        // API se aane wale array ki length le rahe hain
        setCategoriesCount(finlerec.date|| []); // Agar data nahi aata toh empty array set kar denge taaki length 0 ho jaye
      });
  };

  // 3. Page load hote hi teeno APIs apne aap run ho jayengi
  useEffect(() => {
    viweuser();
    getproduct();
    getcategory();
  }, []);

  // 4. Configuration for the cards - Yahan hardcoded values ki jagah dynamic State laga di hai
  const statsData = [
    {
      id: 1,
      title: "Total Users",
      value: usersData.length, // Dynamic User Number
      icon: <RiUser3Line size={24} />,
      color: "bg-indigo-50 text-indigo-600",
      trend: "+12% this week",
      trendColor: "text-green-500"
    },
    {
      id: 2,
      title: "Total Products",
      value: productsCount.length, // Dynamic Product Number
      icon: <RiShoppingBag3Line size={24} />,
      color: "bg-blue-50 text-blue-600",
      trend: "+5% this week",
      trendColor: "text-green-500"
    },
    {
      id: 3,
      title: "Categories",
      value: categoriesCount.length, // Dynamic Category Number
      icon: <RiLayoutGridFill size={24} />,
      color: "bg-orange-50 text-orange-500",
      trend: "No change",
      trendColor: "text-gray-400"
    },
    {
      id: 4,
      title: "Sales Report",
      value: "432", // Isko agar api se lana ho toh iski bhi state bana kar yahan pass kar dena
      icon: <RiPieChartLine size={24} />,
      color: "bg-red-50 text-red-500",
      trend: "-2% this week",
      trendColor: "text-red-500"
    }
  ];

  // AAPKA UI BIKUL WAHI HAI, ISME KOI CHANGE NAHI KIYA
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Dashboard Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back, here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {statsData.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            {/* Header: Icon & Options */}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <BsThreeDotsVertical />
              </button>
            </div>

            {/* Content: Value & Title */}
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{item.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{item.title}</p>
            </div>

            {/* Footer: Trend */}
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold">
              <span className={`${item.trendColor}`}>{item.trend}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}