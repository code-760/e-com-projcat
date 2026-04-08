import axios from "axios";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let basurl = process.env.NEXT_PUBLIC_BASEURL;

// ==========================================
// 1. API: FETCH WISHLIST
// ==========================================
export let fetchwishlist = createAsyncThunk(
  "wishlist/fetchwishlist",
  async () => {
    let tokan = Cookies.get("tokan") || null;
    let wishlistdata = await axios.post(
      `${basurl}wishlist/viwe-Wishlist`,
      {},
      { headers: { Authorization: `Bearer ${tokan}` } },
    );

    let dataditals = await wishlistdata.data;
    let path = dataditals.path;
    let wishlistdetails = dataditals.data;

    return { wishlistdetails, path };
  },
);

// ==========================================
// 2. API: ADD TO WISHLIST
// ==========================================
export let aadwishlist = createAsyncThunk("wishlist/add", async (productId) => {
  let tokan = Cookies.get("tokan") || null;
  await axios.post(
    `${basurl}wishlist/add-to-wishlist`,
    { productId: productId },
    { headers: { Authorization: `Bearer ${tokan}` } },
  );
  return productId;
});

// ==========================================
// 3. API: REMOVE FROM WISHLIST
// (Backend API ke hisaab se URL check kar lena)
// ==========================================
export let removewishlist = createAsyncThunk("wishlist/remove", async (productId) => {
  let tokan = Cookies.get("tokan") || null;
  
  // 1. axios.delete ka use karein (standard practice)
  // 2. productId ko object ki jagah URL ke end me bhejein (Kyunki backend me req.params hai)
  await axios.delete( 
    `${basurl}wishlist/remove/${productId}`,
    { headers: { Authorization: `Bearer ${tokan}` } }
  );
  
  return productId;
});

// ==========================================
// REDUX SLICE (The Brain)
// ==========================================
export let wishlistslice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: { wishlistdetails: [], path: "" },
  },
  reducers: {
    // UI me turant DIL LAL (Red) karne ke liye
    addItemToWishlistLocal: (state, action) => {
      if (state.wishlist && state.wishlist.wishlistdetails) {
        // Double check taaki array me duplicate na jaye
        const isAlreadyThere = state.wishlist.wishlistdetails.some(
          (item) => item._id === action.payload._id,
        );
        if (!isAlreadyThere) {
          state.wishlist.wishlistdetails.push(action.payload);
        }
      }
    },

    // UI me turant DIL NORMAL (Grey) karne ke liye
    removeItemFromwishlist: (state, action) => {
      if (state.wishlist && state.wishlist.wishlistdetails) {
        state.wishlist.wishlistdetails = state.wishlist.wishlistdetails.filter(
          (item) => item._id !== action.payload,
        );
      }
    },
  },
  extraReducers: (builder) => {
    // A) SUCCESS: Jab data server se aaye
    builder.addCase(fetchwishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
    });

    // B) ERROR: Agar Add API fail ho jaye
    builder.addCase(aadwishlist.rejected, (state, action) => {
      console.log("Add API fail ho gayi! Dil wapas normal kar rahe hain...");
      if (state.wishlist && state.wishlist.wishlistdetails) {
        // action.meta.arg me productId hota hai
        state.wishlist.wishlistdetails = state.wishlist.wishlistdetails.filter(
          (item) => item._id !== action.meta.arg,
        );
      }
    });

    // C) ERROR: Agar Remove API fail ho jaye
    builder.addCase(removewishlist.rejected, (state, action) => {
      console.log("Remove API fail ho gayi!");
      // Is case me aap chahein toh error dikha sakte hain ya automatically `dispatch(fetchwishlist())` call karwa sakte hain UI me
    });
  },
});

export const { removeItemFromwishlist, addItemToWishlistLocal } =
  wishlistslice.actions;
export default wishlistslice.reducer;
