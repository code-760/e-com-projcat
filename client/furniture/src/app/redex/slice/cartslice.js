import axios from "axios";
import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
let basurl = process.env.NEXT_PUBLIC_BASEURL;

export let fetchcart = createAsyncThunk("cart/fetchcart", async (thunkAPI) => {
  let tokan = Cookies.get("tokan") || null;
  let data = await axios.post(
    `${basurl}cart/view-cart`,
    {},
    {
      headers: {
        Authorization: `Bearer ${tokan}`,
      },
    },
  );

  let dataditals = data.data;

  let path = dataditals.path;

  let cartdetails = dataditals.data;

  return { cartdetails, path };
});

export let cartslice = createSlice({
  name: "cart",
  initialState: {
    // Initial state ko object rakho kyunki aapka data {cartdetails: [], path: ""} aata hai
    cart: { cartdetails: [], path: "" }, 
  },
  reducers: {
    removeItemFromCart: (state, action) => {
      // Safety check: Pehle dekho cartdetails hai ya nahi
      if (state.cart && state.cart.cartdetails) {
        state.cart.cartdetails = state.cart.cartdetails.filter(
          (item) => item._id !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcart.fulfilled, (state, action) => {
      // Jab data server se aaye, poora object save karo
      state.cart = action.payload;
    });
  },
});

// YE LINE ZAROORI HAI: Action ko export karna padega
export const { removeItemFromCart } = cartslice.actions; 

export default cartslice.reducer;
