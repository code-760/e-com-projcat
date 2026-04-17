import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userslice = createSlice({
  name: "user",
  initialState: {
    tokan: Cookies.get("tokan") || null,
    userData: null,
  },
  reducers: {
    settokan: (state, action) => {
      const { tokan } = action.payload;
      state.tokan = tokan;
      Cookies.set("tokan", tokan, { expires: 7 }); // Cookie expiry set ki 7 din
    },
    removetokan: (state) => {
      state.tokan = null;
      state.userData = null;
      Cookies.remove("tokan");
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  }
});

export const { settokan, removetokan, setUserData } = userslice.actions;
export default userslice.reducer;