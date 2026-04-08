import { configureStore } from "@reduxjs/toolkit";
import  adminslice  from "../slice/adminslice";

export let store = configureStore({
  reducer: {
    adminstore: adminslice,
  },
});

