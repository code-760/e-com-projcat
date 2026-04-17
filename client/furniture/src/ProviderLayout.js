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
      );

      if (res.data?._status || res.data?.data) {
        const { UserName, useremail, userprofile } = res.data.data;
        
        const safeUserData = {
          UserName,
          useremail,
          userprofile,
        };

        // Redux update - Isse infinite loop nahi banega kyunki dependencies managed hain
        dispatch(setUserData(safeUserData));
      }
    } catch (err) {
      console.error("AuthWrapper Error:", err);
    }
  }, [tokan, basurl, dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]); // Sirf token change hone par hi chalega

  return <>{children}</>;
}

export default function ProviderLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthWrapper>{children}</AuthWrapper> 
    </Provider>
  );
}