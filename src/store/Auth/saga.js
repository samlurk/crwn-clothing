import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInSucess,
  signInFailed,
  signOutStart,
  signUpSucess,
  signUpFailed,
  signOutSucess,
  googleSignInStart,
  usernameSignInStart,
  checkUserSession,
  signUpStart,
} from "./reducer";
import httpService from "../../services/Http";

export function* signOut() {
  yield put(signOutSucess());
}

export function* isUserAuthenticated({ payload }) {
  try {
    const { token } = yield call(
      httpService.get,
      "auth/verify-token",
      "",
      payload
    );
    yield put(signInSucess(token));
  } catch (error) {
    yield put(signInFailed(error.message));
    yield put(signOutStart());
  }
}

export function* signUp({ payload: { firstName, lastName, email, password } }) {
  try {
    const { ACCESS_TOKEN } = yield call(httpService.post, "auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    yield put(signUpSucess(ACCESS_TOKEN));
  } catch (error) {
    yield put(signUpFailed(error.message));
  }
}

export function* signInWithGoogle({ payload }) {
  try {
    const { ACCESS_TOKEN } = yield call(httpService.post, "auth/login-google", {
      code: payload,
    });
    yield put(signInSucess(ACCESS_TOKEN));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* signInWithUsername({ payload: { username, password } }) {
  try {
    const { ACCESS_TOKEN } = yield call(httpService.post, "auth/login", {
      username,
      password,
    });
    yield put(signInSucess(ACCESS_TOKEN));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart.type, signInWithGoogle);
}

export function* onUsernameSignInStart() {
  yield takeLatest(usernameSignInStart.type, signInWithUsername);
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart.type, signUp);
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart.type, signOut);
}
export function* authSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onUsernameSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
