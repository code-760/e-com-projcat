import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiGlobalLine,
  RiLockPasswordLine,
  RiEditBoxLine,
  RiUploadCloud2Line,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  let dispatch = useDispatch();
  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'password'

  // Redux से डेटा लेना
  let tokan = useSelector((state) => state.adminstore.tokan);
  const userData = useSelector((state) => state.adminstore.userData);
  let { Adminprofile, Adminphone, Adminemail, AdminName } = userData || {};

  // --- LOGIC START ---

  // 1. Form के डेटा को हैंडल करने के लिए State
  const [formValue, setFormValue] = useState({
    AdminName: "",
    Adminemail: "",
    Adminphone: "",
    Adminaddress: "", // अगर बैकएंड में location है
    Bio: "",
    Adminprofile: "",
  });

  // 2. इमेज अपलोड और प्रीव्यू के लिए State
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://via.placeholder.com/150",
  );

  // जब userData लोड हो, तो फॉर्म में डेटा सेट करें
  useEffect(() => {
    if (userData) {
      setFormValue({
        AdminName: userData.AdminName || "",
        Adminemail: userData.Adminemail || "",
        Adminphone: userData.Adminphone || "",
        Adminaddress: userData.Adminaddress || "",
        Bio: userData.Bio || "",
        Adminprofile: userData.Adminprofile || "",
      });
      if (userData.Adminprofile) {
        setPreviewImage(userData.Adminprofile); // Server वाली इमेज दिखाएं
      }
    }
  }, [userData]);

  // Input में टाइप करते वक़्त State अपडेट करने का फ़ंक्शन
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // इमेज सिलेक्ट करने का फ़ंक्शन (ताकि तुरंत UI में प्रीव्यू दिखे)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // API में भेजने के लिए
      setPreviewImage(URL.createObjectURL(file)); // UI में दिखाने के लिए
    }
  };

  // API Call: एडमिन का डेटा अपडेट करने के लिए
  const handleAdminUpdate = async (e) => {
    e.preventDefault(); // फॉर्म को रीफ्रेश होने से रोकना

    // FormData बनाना (क्योंकि हम इमेज भेज रहे हैं)
    let formData = new FormData();
    formData.append("AdminName", formValue.AdminName);
    formData.append("Adminemail", formValue.Adminemail);
    formData.append("Adminphone", formValue.Adminphone);

    formData.append("Adminaddress", formValue.Adminaddress);
    formData.append("Bio", formValue.Bio);
   

    if (profileImage) {
      formData.append("Adminprofile", profileImage); // बैकएंड में Multer इसी नाम को चेक करेगा
    }

    try {
      // LocalStorage या Cookies से Token निकालें (अपने हिसाब से बदल लें)

      let response = await axios.put(
        `${apibaseurl}/portal/admin-update`, // यहाँ अपना सही API Route डालें
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokan}`, // बैकएंड में Token वेरीफाई करने के लिए
          },
        },
      );

      if (response.data._status) {
        alert("Profile Updated Successfully!");
        // यहाँ आप Redux को अपडेट करने का action dispatch कर सकते हैं
        dispatch(updateAdminData(response.data.data));
      }
    } catch (error) {
      console.error("Update Error:", error);
      console.error("Response Data:", error.response?.data);
      //   alerterror.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <p className="text-gray-500 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-6 pb-6 text-center relative">
              <div className="relative -mt-16 mb-4 inline-block">
                <img
                  src={previewImage} // State वाली इमेज
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {AdminName || "Admin Name"}
              </h1>
              <p className="text-indigo-600 font-medium text-sm">
                Full Stack Developer
              </p>
              <p className="text-gray-400 text-xs mt-1">New York, USA</p>

              <div className="mt-6 border-t border-gray-100 pt-6 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RiMailLine className="text-gray-400 text-lg" />
                  <span>{Adminemail || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RiPhoneLine className="text-gray-400 text-lg" />
                  <span>{Adminphone || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RiGlobalLine className="text-gray-400 text-lg" />
                  <a href="#" className="text-blue-500 hover:underline">
                    Website Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Edit Forms */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "edit"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <RiEditBoxLine className="text-lg" /> Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <RiLockPasswordLine className="text-lg" /> Security
              </button>
            </div>

            <div className="p-8">
              {/* --- EDIT PROFILE TAB --- */}
              {activeTab === "edit" && (
                <form
                  onSubmit={handleAdminUpdate} // Submit होने पर API Call
                  className="space-y-6 animate-fade-in"
                >
                  {/* Photo Upload Area */}
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Photo
                      </label>
                      <div className="flex gap-3">
                        <label
                          htmlFor="photo-upload"
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2"
                        >
                          <RiUploadCloud2Line /> Upload New
                        </label>
                        <input
                          type="file"
                          id="photo-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange} // Image Select Logic
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProfileImage(null);
                            setPreviewImage(
                              userData?.Adminprofile ||
                                "https://via.placeholder.com/150",
                            );
                          }}
                          className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Recommended: JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="AdminName" // name attribute (ज़रूरी)
                        value={formValue.AdminName} // state bind
                        onChange={handleInputChange} // change event
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="Adminemail"
                        value={formValue.Adminemail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="Adminphone"
                        value={formValue.Adminphone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="Adminaddress"
                        value={formValue.Adminaddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows="4"
                        name="Bio"
                        value={formValue.Bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        placeholder="Write a short bio..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit" // button type submit
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* --- CHANGE PASSWORD TAB (UI Kept Intact) --- */}
              {activeTab === "password" && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="max-w-lg mx-auto space-y-6 py-4 animate-fade-in"
                >
                  {/* Password fields... UI kept exactly same */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
