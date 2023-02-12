import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  // cartItems: ["olive", "orange", "maroon", "made"],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload); //action.payload is what we send in the function
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
