import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  supply: null,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setProduct: (state, actions) => {
      state.product = actions.payload;
    },
    setSupply: (state, actions) => {
      state.supply = actions.payload;
    },
  },
});

export const { setSupply, setProduct } = itemSlice.actions;

export default itemSlice.reducer;
