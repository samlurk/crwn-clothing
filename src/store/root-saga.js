import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./Categories/saga";
import { authSaga } from "./Auth/saga";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(authSaga)]);
}
