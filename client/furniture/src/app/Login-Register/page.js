"use client";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { settokan } from "../redex/slice/userslice";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  let pageName = "My Account";

  let dispatch = useDispatch();

  let Baseurl = process.env.NEXT_PUBLIC_BASEURL;

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // *** Naya State: Login Loader ke liye ***
  const [loginLoad, setLoginLoad] = useState(false);

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [load, setLoad] = useState(false); // Ye Register ka loader hai

  const [otp, setOtp] = useState("");

  // Forget password states
  const [forgetEmail, setForgetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Flags
  const [showOtp, setShowOtp] = useState(false);
  const [showForget, setShowForget] = useState(false);

  // Error states (per field)
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [forgetErrors, setForgetErrors] = useState({});
  const [forgetLoader, setForgetLoader] = useState(false);

  // ---------------- LOGIN HANDLER (UPDATED WITH FULL SCREEN LOADER & DELAY) ----------------
  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Loader Start karein (Pura screen block hoga)
    setLoginLoad(true);

    let obj = {
      useremail: loginEmail,
      Password: loginPassword,
    };

    axios
      .post(`${Baseurl}user/login`, obj)
      .then((rec) => rec.data)
      .then((finlerec) => {
        // 2. Kam se kam 2 Second ka wait karein (Artificial Delay)
        setTimeout(() => {
          console.log(finlerec);

          if (finlerec._status) {
            dispatch(settokan({ tokan: finlerec.tokan }));
            redirect("/desbord");
          } else {
            setLoginLoad(false); // Fail hone par loader band
            alert("Login failed. Please try again.");
          }
        }, 2000); // <-- 2000ms = 2 Seconds ka time
      })
      .catch((err) => {
        // Error aane par bhi 2 second baad hi hatayein
        setTimeout(() => {
          setLoginLoad(false);
          console.log(err);
          alert("Something went wrong");
        }, 2000);
      });
  };

  // ---------------- REGISTER HANDLER ----------------
  const handleRegister = (e) => {
    e.preventDefault();

    // 1. Validation Logic
    let errors = {};
    if (!registerName) errors.name = "Name is required.";
    if (!registerPhone) errors.phone = "Phone is required.";

    if (!registerEmail) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(registerEmail))
      errors.email = "Invalid email address.";

    if (!registerPassword) errors.password = "Password is required.";

    setRegisterErrors(errors);

    // 2. Agar koi error hai, toh yahi ruk jayein
    if (Object.keys(errors).length > 0) {
      return;
    }

    // 3. Agar sab sahi hai, tabhi API call karein
    setLoad(true);
    let obj = {
      useremail: registerEmail,
    };

    axios
      .post(`${Baseurl}user/send-OTP`, obj)
      .then((rec) => rec.data)
      .then((finlerec) => {
        setLoad(false);
        if (finlerec._status) {
          alert(finlerec.message);
          setShowOtp(true);
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        alert("Something went wrong");
      });
  };

  // ---------------- OTP HANDLER ----------------
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError("Please enter the OTP.");
      return;
    }

    let obj = {
      UserName: registerName,
      userphone: registerPhone,
      useremail: registerEmail,
      Password: registerPassword,
      OTP: otp,
    };

    axios
      .post(`${Baseurl}user/create-user`, obj)
      .then((rec) => rec.data)
      .then((finlerec) => {
        if (finlerec._status) {
          alert(finlerec.message);
          setShowOtp(false);
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  // ---------------- FORGET PASSWORD HANDLER ----------------
  const handleForgetSubmit = (e) => {
    setForgetLoader(true);
    e.preventDefault(); // Form reload hone se rokta hai

    let errors = {};

    // 1. Validation Logic
    if (!forgetEmail) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(forgetEmail)) {
      errors.email = "Invalid email address.";
    }

    // Errors ko state mein set karo taaki screen par dikhe
    setForgetErrors(errors);

    // 2. Main Logic: Agar koi error NAI hai, tabhi aage badho
    if (Object.keys(errors).length === 0) {
      // Backend ke liye data object
      let obj = {
        useremail: forgetEmail, // forgetEmail state ki value useremail key mein daal di
      };

      console.log("Sending to API:", obj);

      // 3. API Call (Isse IF ke andar hona chahiye)
      axios
        .post(`${Baseurl}user/forget-password`, obj)
        .then((rec) => rec.data)
        .then((finalrec) => {
          console.log("Response:", finalrec);

          if (finalrec._status) {
            // Success tabhi dikhao jab backend se confirmation mile
            setShowForget(false);
            setForgetLoader(false); // Modal/Form band karo
            toast.success(
              "✅ " + (finalrec.message || "Reset link sent to your email."),
            );
          } else {
            // Agar backend ne mana kar diya (e.g. email not found)
            alert("❌ " + (finalrec.message || "Failed to send reset link."));
          }
        })
        .catch((err) => {
          // Network error ya server down ke liye
          console.error(err);
          alert("Server error! Please try again later.");
        });
    } else {
      console.log("Validation failed, not sending API request.");
    }
  };

  return (
    <div className="bg-white min-h-screen relative">
      <ToastContainer />
      {/* ---------------- FULL SCREEN LOADER UI ---------------- */}
      {loginLoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm">
          {/* <!-- From Uiverse.io by devAaus -->  */}
          <div class="flex-col gap-4 w-full flex items-center justify-center">
            <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      {/* ------------------------------------------------------- */}

      {/* <Breadcrumds pageName={pageName} /> */}

      <div className="flex justify-center mt-6">
        <hr className="w-4/5 border-t-[1.5px] border-gray-300" />
      </div>

      <section className="w-4/5 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE - LOGIN */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>

          {!showForget ? (
            <form
              onSubmit={handleLogin}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                {/* Email */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {loginErrors.email && (
                  <p className="text-red-600 text-sm mb-3">
                    {loginErrors.email}
                  </p>
                )}

                {/* Password */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {loginErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {loginErrors.password}
                  </p>
                )}

                <p className="text-sm mt-3">
                  <a
                    href="#"
                    onClick={() => setShowForget(true)}
                    className="text-gray-600 hover:text-[#b76e79] transition-colors duration-300"
                  >
                    Lost your password?
                  </a>
                </p>
                <a
                  href="/Deshbord"
                  onClick={() => setShowForget(true)}
                  className="text-gray-600 hover:text-[#b76e79] transition-colors duration-300"
                >
                  Deshbord
                </a>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  disabled={loginLoad} // Disable button while loading
                  className="bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300 disabled:opacity-50"
                >
                  Login
                </button>
              </div>
            </form>
          ) : (
            // Forget Password
            <form
              onSubmit={handleForgetSubmit}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Reset Password
                </h2>

                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="forgetEmail"
                  value={forgetEmail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {forgetErrors.email && (
                  <p className="text-red-600 text-sm mb-3">
                    {forgetErrors.email}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowForget(false)}
                  className="text-gray-600 hover:text-[#b76e79] transition duration-300"
                >
                  ← Back to Login
                </button>
                <button
                  type="submit"
                  disabled={forgetLoader}
                  className="bg-gray-800 flex items-center gap-3 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Reset
                  {forgetLoader && (
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT SIDE - REGISTER */}
        <div>
          <h1
            onSubmit={handleRegister}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            Register
          </h1>

          {/* RIGHT SIDE - REGISTER PART */}
          {!showOtp ? (
            <form
              onSubmit={handleRegister}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-auto flex flex-col gap-6"
            >
              <div>
                {/* NAME INPUT */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter your Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {/* Name Error */}
                {registerErrors.name && (
                  <p className="text-red-600 text-xs mb-2">
                    {registerErrors.name}
                  </p>
                )}

                {/* PHONE INPUT */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="Enter your Phone"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {/* Phone Error */}
                {registerErrors.phone && (
                  <p className="text-red-600 text-xs mb-2">
                    {registerErrors.phone}
                  </p>
                )}

                {/* EMAIL INPUT */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {registerErrors.email && (
                  <p className="text-red-600 text-xs mb-2">
                    {registerErrors.email}
                  </p>
                )}

                {/* PASSWORD INPUT */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {registerErrors.password && (
                  <p className="text-red-600 text-xs mb-2">
                    {registerErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={load}
                  className="flex gap-2 items-center bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Register
                  {load && (
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </form>
          ) : (
            // OTP
            <form
              onSubmit={handleOtpSubmit}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Verify OTP
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Enter the 6-digit OTP sent to your email.
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {otpError && (
                  <p className="text-red-600 text-sm mt-1">{otpError}</p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="text-gray-600 hover:text-[#b76e79] transition duration-300"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
