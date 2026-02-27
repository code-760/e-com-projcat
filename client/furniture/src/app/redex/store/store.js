const { configureStore } = require("@reduxjs/toolkit");
import  cartslice  from "../slice/cartslice";
import userslice from  "../slice/userslice";

export let store=configureStore({
    reducer:{
        userstore:userslice,
        cartstore:cartslice
    }
})