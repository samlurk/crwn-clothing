import { all, call } from "redux-saga/effects";
import { categorySaga } from "./Categories/saga";
import { authSaga } from "./Auth/saga";
import { cartSaga } from "./Cart/saga";

export function* rootSaga() {
  yield all([call(categorySaga), call(authSaga), call(cartSaga)]);
}
