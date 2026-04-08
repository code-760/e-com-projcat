const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

export let userslice=createSlice({ 
    name:"user",
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
        
        setUserData: (state, action) => {
            state.userData = action.payload; 
        }, 
         
        setUserpath: (state, action) => {
            state.userpath = action.payload; 
        } 

        
    }
})

export const {setUserData, settokan, removetokan,setUserpath } = userslice.actions

export default userslice.reducer