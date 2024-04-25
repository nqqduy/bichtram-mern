import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    currentProduct: null,
    listCategory: [],
    isEditing: false,
    showPopup: false,
    isLoading: false,
  },
  reducers: {
    addingProduct: (state) => {
      state.isEditing = false;
      state.currentProduct = null;
    },
    editingProduct: (state, action) => {
      state.isEditing = true;
      state.currentProduct = action.payload;
    },
  },
});

export const { addingProduct, editingProduct } = productSlice.actions;

export default productSlice.reducer;
