import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.category;

//* Categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectCategoryIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);

//* Products By Categories

const selectProductsByCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.productsByCategories
);

export const selectProductsByCategoriesMap = createSelector(
  [selectProductsByCategories],
  (productsByCategories) => {
    return productsByCategories.reduce((acc, category) => {
      const { title, products } = category;
      acc[title.toLowerCase()] = products;
      return acc;
    }, {});
  }
);
