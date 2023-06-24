import { takeLatest, all, call, put } from "redux-saga/effects";
import httpService from "../../services/Http";
import {
  fetchCategories,
  fetchCategoriesFailed,
  fetchCategoriesSucess,
  fetchProductsByCategories,
  fetchProductsByCategoriesFailed,
  fetchProductsByCategoriesSucess,
} from "./reducer";

export function* fetchCategoriesAsync() {
  try {
    const categoriesResponse = yield call(httpService.get, "category");
    yield put(fetchCategoriesSucess(categoriesResponse));
  } catch (error) {
    yield put(fetchCategoriesFailed(error.message));
  }
}

export function* onFetchCategories() {
  yield takeLatest(fetchCategories.type, fetchCategoriesAsync);
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
    fetchProductsByCategories.type,
    fetchProductsByCategoriesAsync
  );
}
export function* categorySaga() {
  yield all([call(onFetchCategories), call(onFetchProductsByCategories)]);
}
