import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  addItemToCartFailed,
  addItemToCartStart,
  addItemToCartSucess,
  addItemsToCartStart,
  addItemsToCartSucess,
  clearItemFromCartFailed,
  clearItemFromCartStart,
  clearItemFromCartSucess,
  fetchCartItemsFailed,
  fetchCartItemsStart,
  fetchCartItemsSucess,
  removeItemToCartFailed,
  removeItemToCartStart,
  removeItemToCartSucess,
} from "./reducer";
import httpService from "../../services/Http/index";
import { selectToken } from "../Auth/selector";

export function* addItemsToCartAsync({ payload }) {
  try {
    const token = yield select(selectToken);
    let cartItems;
    payload.forEach((item) => {
      const itemToInsert = { id: item.product.id, quantity: item.quantity };
      cartItems = cartItems ? [...cartItems, itemToInsert] : [itemToInsert];
    });

    yield call(httpService.put, `cart-item/bulk/add`, { cartItems }, token);
  } catch (error) {
    yield put(addItemToCartFailed(error.message));
  }
}
export function* clearItemFromCartAsync({ payload }) {
  try {
    const token = yield select(selectToken);
    yield call(httpService.delete, `cart-item/clear/${payload}`, token);
  } catch (error) {
    yield put(clearItemFromCartFailed(error.message));
  }
}
export function* removeItemToCartAsync({ payload }) {
  try {
    const token = yield select(selectToken);
    yield call(httpService.get, `cart-item/remove/${payload}`, token);
  } catch (error) {
    yield put(removeItemToCartFailed(error.message));
  }
}

export function* addItemToCartAsync({ payload }) {
  try {
    const token = yield select(selectToken);
    yield call(httpService.get, `cart-item/add/${payload}`, token);
  } catch (error) {
    yield put(addItemToCartFailed(error.message));
  }
}

export function* fetchCartItems() {
  try {
    const token = yield select(selectToken);
    const cartItemsResponse = yield call(httpService.get, `cart-item`, token);
    yield put(fetchCartItemsSucess(cartItemsResponse));
  } catch (error) {
    yield put(fetchCartItemsFailed(error.message));
  }
}

export function* onAddItemsToCart() {
  yield takeLatest(addItemsToCartStart.type, addItemsToCartAsync);
}

export function* onAddItemToCart() {
  yield takeLatest(addItemToCartStart.type, addItemToCartAsync);
}

export function* onRemoveItemToCart() {
  yield takeLatest(removeItemToCartStart.type, removeItemToCartAsync);
}

export function* onClearItemFromCart() {
  yield takeLatest(clearItemFromCartStart.type, clearItemFromCartAsync);
}
export function* onFetchCartItems() {
  yield takeLatest(fetchCartItemsStart.type, fetchCartItems);
  yield takeLatest(addItemToCartSucess.type, fetchCartItems);
  yield takeLatest(addItemsToCartSucess.type, fetchCartItems);
  yield takeLatest(removeItemToCartSucess.type, fetchCartItems);
  yield takeLatest(clearItemFromCartSucess.type, fetchCartItems);
}

export function* cartSaga() {
  yield all([
    call(onFetchCartItems),
    call(onAddItemToCart),
    call(onRemoveItemToCart),
    call(onClearItemFromCart),
    call(onAddItemsToCart),
  ]);
}
