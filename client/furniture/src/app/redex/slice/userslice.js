const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

export let userslice=createSlice({ 
    name:"user",
    initialState:{
        tokan:Cookies.get("tokan") || null
    },
    reducers:{
        settokan:(state,action)=>{
           let {payload}=action;
           let {tokan}=payload;
           state.tokan=tokan
           Cookies.set("tokan",tokan)
        },
        removetokan:(state)=>{
            state.tokan=null
            Cookies.remove("tokan")
        }   
        
    }
})

export const { settokan, removetokan } = userslice.actions

export default userslice.reducer