import { CATEGORIES_ACTION_TYPES } from "./types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  productsByCategories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_SUCESS:
      return { ...state, isLoading: false, productsByCategories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
