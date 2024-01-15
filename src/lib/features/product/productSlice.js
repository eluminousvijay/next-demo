import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    initialized: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    initializeUser: (state, action) => {
      if (!state.initialized) {
        state.userData = action.payload || "";
        state.initialized = true;
      }
    },
  },
});

export const { setUserData, initializeUser } = productSlice.actions;

export default productSlice.reducer;
