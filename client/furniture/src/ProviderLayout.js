"use client";
import React, { useEffect, useCallback } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "./app/redex/store/store";
import { setUserData } from "./app/redex/slice/userslice"; // Ise import karna zaroori hai

function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const tokan = useSelector((state) => state.userstore.tokan);
  const basurl = process.env.NEXT_PUBLIC_BASEURL;

  // CPU Optimization: API call ko useCallback mein dala taaki function bar-bar recreate na ho
  const fetchUserDetails = useCallback(async () => {
    if (!tokan || !basurl) return;

    try {
      const res = await axios.post(
        `${basurl}user/user-detail`,
        {},
        {
          headers: { Authorization: `Bearer ${tokan}` },
        }
      )
      .then((response) => response.data)
      .then((fainldata) => {
      
        return fainldata;
      })
      .catch((error) => {
        console.error("API Error:", error);
        return null; // Error handling ke liye null return karna
      });

      // console.log("AuthWrapper API Response:", data); // Debugging ke liye response log karna
      // console.log("User Details:", res);
      if (res?._status || res?.data) {
        const { UserName, useremail, userprofile } = res.data;
        

        const safeUserData = {
          UserName,
          useremail,
          userprofile,
        };


        // console.log("fat",safeUserData);
        

        // Redux update - Isse infinite loop nahi banega kyunki dependencies managed hain
        dispatch(setUserData(safeUserData));
      }
    } catch (err) {
      console.error("AuthWrapper Error:", err);
    }
  }, [tokan, basurl, dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails, tokan]); // Sirf token change hone par hi chalega

  return <>{children}</>;
}

export default function ProviderLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthWrapper>{children}</AuthWrapper> 
    </Provider>
  );
}