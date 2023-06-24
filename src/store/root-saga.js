import { all, call } from "redux-saga/effects";
import { categorySaga } from "./Categories/saga";
import { authSaga } from "./Auth/saga";
import { userSaga } from "./User/saga";

export function* rootSaga() {
  yield all([call(categorySaga), call(authSaga), call(userSaga)]);
}
