const { configureStore } = require("@reduxjs/toolkit");
import userslice from  "../slice/userslice";

export let store=configureStore({
    reducer:{
        userstore:userslice
    }
})