import { createAction } from "../../utils/Reducer";
import { AUTH_ACTION_TYPES } from "./types";

export const checkUserSession = (token) =>
  createAction(AUTH_ACTION_TYPES.CHECK_USER_SESSION, token);

export const googleSignInStart = ({ code }) =>
  createAction(AUTH_ACTION_TYPES.GOOGLE_SIGN_IN_START, code);

export const usernameSignInStart = (credentials) => {
  return createAction(AUTH_ACTION_TYPES.USERNAME_SIGN_IN_START, credentials);
};

export const signInSucess = (token) =>
  createAction(AUTH_ACTION_TYPES.SIGN_IN_SUCESS, token);

export const signInFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (data) =>
  createAction(AUTH_ACTION_TYPES.SIGN_UP_START, data);

export const signUpSucess = (token) =>
  createAction(AUTH_ACTION_TYPES.SIGN_UP_SUCESS, token);

export const signUpFailed = (error) => {
  createAction(AUTH_ACTION_TYPES.SIGN_UP_FAILED, error);
};

export const signOutStart = () =>
  createAction(AUTH_ACTION_TYPES.SIGN_OUT_START);

export const signOutSucess = () =>
  createAction(AUTH_ACTION_TYPES.SIGN_OUT_SUCESS);
