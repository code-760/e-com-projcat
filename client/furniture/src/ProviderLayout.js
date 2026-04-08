"use client";
import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { store } from "./app/redex/store/store";
import { setUserData, setUserpath } from "./app/redex/slice/userslice";

// Ek chota wrapper component jo Redux use kar sake
function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  let tokan = useSelector((state) => state.adminstore.tokan);
  let basurl = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    // Agar token hai, tabhi user details fetch karo
    if (tokan) {
      axios
        .post(
          `${basurl}user/user-detail`,
          {},
          {
            headers: {
              Authorization: `Bearer ${tokan}`,
            },
          },
        )
        .then((res) =>res.data)
        .then((finalrec)=>{
          let { UserName, useremail, userprofile } = finalrec.data;
          let { path } = finalrec


          let safeUserData = {
            UserName,
            useremail,
            userprofile,
            
          };

          let userpath=path 
         
          
          

          // 3. Ab Redux mein sirf yeh safe data bhejo
          dispatch(setUserData(safeUserData));
           dispatch(setUserpath(userpath));
          
        })
        .catch((err) => {
          console.error("Error fetching user details", err);
        });
    }
  }, [tokan, basurl]); // Jab bhi token change ho, ye API dobara hit hogi

  return <>{children}</>;
}

export default function ProviderLayout({ children }) {
  return (
    <Provider store={store}>
{/* yeha per auth wrapper ka content aayega */}

      <AuthWrapper>{children}</AuthWrapper> 
    </Provider>
  );
}
