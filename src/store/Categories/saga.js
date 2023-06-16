import { takeLatest, all, call, put } from "redux-saga/effects";
import httpService from "../../services/Http";
import {
  fetchCategoriesSucess,
  fetchCategoriesFailed,
  fetchProductsByCategoriesSucess,
  fetchProductsByCategoriesFailed,
} from "./action";
import { CATEGORIES_ACTION_TYPES } from "./types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesResponse = yield call(httpService.get, "category");
    yield put(fetchCategoriesSucess(categoriesResponse));
  } catch (error) {
    yield put(fetchCategoriesFailed(error.message));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* fetchProductsByCategoriesAsync() {
  try {
    const productsByCategories = yield call(
      httpService.get,
      "category/products"
    );
    yield put(fetchProductsByCategoriesSucess(productsByCategories));
  } catch (error) {
    yield put(fetchProductsByCategoriesFailed(error.message));
  }
}

export function* onFetchProductsByCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORIES_START,
    fetchProductsByCategoriesAsync
  );
}
export function* categoriesSaga() {
  yield all([call(onFetchCategories), call(onFetchProductsByCategories)]);
}
