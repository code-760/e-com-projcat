import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export let adminslice=createSlice({ 
    name:"admin",
    initialState:{
        tokan:Cookies.get("tokan") || null,
        userData: null, 
        userpath: null, 
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
        },
        
        setadminData: (state, action) => {
            state.userData = action.payload; 
        }, 
         
        setAdminpath: (state, action) => {
            state.userpath = action.payload; 
        } 

        
    }
})

export const {setadminData, settokan, removetokan,setAdminpath } = adminslice.actions

export default adminslice.reducer