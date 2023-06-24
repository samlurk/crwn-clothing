import { createSlice } from "@reduxjs/toolkit";

export const CATEGORY_INITIAL_STATE = {
  categories: [],
  productsByCategories: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: CATEGORY_INITIAL_STATE,
  reducers: {
    fetchCategories(state, _) {
      state.isLoading = true;
    },
    fetchCategoriesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchCategoriesSucess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchProductsByCategories(state, _) {
      state.isLoading = true;
    },
    fetchProductsByCategoriesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchProductsByCategoriesSucess(state, action) {
      state.isLoading = false;
      state.productsByCategories = action.payload;
    },
  },
});

export const {
  fetchCategories,
  fetchCategoriesFailed,
  fetchCategoriesSucess,
  fetchProductsByCategories,
  fetchProductsByCategoriesFailed,
  fetchProductsByCategoriesSucess,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
