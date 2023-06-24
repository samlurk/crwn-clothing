import { takeLatest, all, call, put } from "redux-saga/effects";
import { signInSucess, signOutStart, signUpSucess } from "../Auth/reducer";
import { setCurrentUser } from "../User/reducer";
import jwtDecode from "jwt-decode";

export function* clearCurrentUser() {
  yield put(setCurrentUser(null));
}

export function* setUser({ payload }) {
  yield put(setCurrentUser(jwtDecode(payload)));
}

export function* onSetCurrentUserAfterSignIn() {
  yield takeLatest(signInSucess.type, setUser);
}
export function* onSetCurrentUserAfterSignUp() {
  yield takeLatest(signUpSucess.type, setUser);
}

export function* onClearCurrentUserWhenSignOutStart() {
  yield takeLatest(signOutStart.type, clearCurrentUser);
}

export function* userSaga() {
  yield all([
    call(onSetCurrentUserAfterSignUp),
    call(onSetCurrentUserAfterSignIn),
    call(onClearCurrentUserWhenSignOutStart),
  ]);
}
