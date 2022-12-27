import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null, // {type: string, location: string, message: string}
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, actions) => {
      state.alert = actions.payload;
    },
    cleanAlert: (state, actions) => {
      state.alert = null;
    },
  },
});

export const { setAlert, cleanAlert } = alertSlice.actions;

export default alertSlice.reducer;
