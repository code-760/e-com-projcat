// wishlistSlice.js
import axios from "axios";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const basurl = process.env.NEXT_PUBLIC_BASEURL;

export const fetchwishlist = createAsyncThunk("wishlist/fetch", async () => {
    const tokan = Cookies.get("tokan");
    const res = await axios.post(`${basurl}wishlist/viwe-Wishlist`, {}, {
        headers: { Authorization: `Bearer ${tokan}` },
    });
    return { wishlistdetails: res.data.data || [] };
});

export const aadwishlist = createAsyncThunk("wishlist/add", async (productId) => {
    const tokan = Cookies.get("tokan");
    const res = await axios.post(`${basurl}wishlist/add-to-wishlist`, { productId }, {
        headers: { Authorization: `Bearer ${tokan}` },
    });
    return res.data.updatedData; // Poora updated product return karwao backend se
});

export const removewishlist = createAsyncThunk("wishlist/remove", async (productId) => {
    const tokan = Cookies.get("tokan");
    await axios.delete(`${basurl}wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${tokan}` },
    });
    return productId;
});

export const wishlistslice = createSlice({
    name: "wishlist",
    initialState: { wishlist: { wishlistdetails: [] }, status: "idle" },
    reducers: {
        // UI Sync ke liye (Optimistic updates)
        addItemToWishlistLocal: (state, action) => {
            const exists = state.wishlist.wishlistdetails.some(i => i._id === action.payload._id);
            if (!exists) state.wishlist.wishlistdetails.push(action.payload);
        },
        removeItemFromwishlist: (state, action) => {
            state.wishlist.wishlistdetails = state.wishlist.wishlistdetails.filter(i => i._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchwishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload;
            })
            // API successful hone par state sync karo
            .addCase(aadwishlist.fulfilled, (state, action) => {
                // Agar local add nahi hua hai toh yahan ensure karo
            })
            .addCase(removewishlist.fulfilled, (state, action) => {
                state.wishlist.wishlistdetails = state.wishlist.wishlistdetails.filter(i => i._id !== action.payload);
            });
    },
});

export const { addItemToWishlistLocal, removeItemFromwishlist } = wishlistslice.actions;
export default wishlistslice.reducer;