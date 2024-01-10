import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: {
      productName: "",
    },
    initialized: false,
  },
  reducers: {
    setProductName: (state, action) => {
      state.productData = state.productData || {};
      state.productData.productName = action.payload;
    },
    initializeProduct: (state, action) => {
      if (!state.initialized) {
        console.log('>>>>>>>',action);
        state.productData.productName = action.payload.productName || "";
        state.initialized = true;
      }
    },
  },
});

export const { setProductName, initializeProduct } = productSlice.actions;

export default productSlice.reducer;
