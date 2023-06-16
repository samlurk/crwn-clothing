import { takeLatest, put, all, call } from "redux-saga/effects";
import { AUTH_ACTION_TYPES } from "./types";
import {
  signInSucess,
  signInFailed,
  signOutStart,
  signUpSucess,
  signUpFailed,
  signOutSucess,
} from "./action";
import httpService from "../../services/Http";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "../User/action";

export function* setCurrentUserAfterSignInOrSignUp({ payload }) {
  yield put(setCurrentUser(jwtDecode(payload)));
}

export function* signOut() {
  yield put(setCurrentUser(null));
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
  yield takeLatest(AUTH_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onUsernameSignInStart() {
  yield takeLatest(
    AUTH_ACTION_TYPES.USERNAME_SIGN_IN_START,
    signInWithUsername
  );
}

export function* onSignInSucess() {
  yield takeLatest(
    AUTH_ACTION_TYPES.SIGN_IN_SUCESS,
    setCurrentUserAfterSignInOrSignUp
  );
}

export function* onSignUpSucess() {
  yield takeLatest(
    AUTH_ACTION_TYPES.SIGN_UP_SUCESS,
    setCurrentUserAfterSignInOrSignUp
  );
}

export function* onCheckUserSession() {
  yield takeLatest(AUTH_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(AUTH_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield takeLatest(AUTH_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* authSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onUsernameSignInStart),
    call(onSignInSucess),
    call(onSignUpStart),
    call(onSignUpSucess),
    call(onSignOutStart),
  ]);
}
