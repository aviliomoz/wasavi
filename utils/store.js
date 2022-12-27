import { configureStore } from "@reduxjs/toolkit";

// Slices
import alertSlice from "./slices/alertSlice";
import itemSlice from "./slices/itemSlice";

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    item: itemSlice,
  },
});
