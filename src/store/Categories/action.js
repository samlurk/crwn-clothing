import httpService from "../../services/Http";
import { createAction } from "../../utils/Reducer";
import { CATEGORIES_ACTION_TYPES } from "./types";

//* Categories

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSucess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    let categoriesResponse = await httpService.get("category");
    dispatch(fetchCategoriesSucess(categoriesResponse));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error.message));
  }
};

//* ProductsByCategories

export const fetchProductsByCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_START);

export const fetchProductsByCategoriesSucess = (productsByCategories) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_SUCESS,
    productsByCategories
  );

export const fetchProductsByCategoriesFailed = (error) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_FAILED,
    error
  );

export const fetchProductsByCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchProductsByCategoriesStart());
  try {
    let productsByCategoriesResponse = await httpService.get(
      "category/products"
    );
    dispatch(fetchProductsByCategoriesSucess(productsByCategoriesResponse));
  } catch (error) {
    dispatch(fetchProductsByCategoriesFailed(error.message));
  }
};
