import { createSlice } from "@reduxjs/toolkit";

const AUTH_INITIAL_STATE = {
  token: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    checkUserSession(state, _) {
      state.isLoading = true;
    },
    googleSignInStart(state, _) {
      state.isLoading = true;
    },
    usernameSignInStart(state, _) {
      state.isLoading = true;
    },
    signInFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signInSucess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
    },
    signUpStart(state, _) {
      state.isLoading = true;
    },
    signUpFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpSucess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
    },
    signOutStart(state, _) {
      state.isLoading = true;
    },
    signOutSucess(state, _) {
      state.isLoading = false;
      state.token = null;
    },
  },
});

export const {
  checkUserSession,
  googleSignInStart,
  usernameSignInStart,
  signInFailed,
  signInSucess,
  signUpStart,
  signUpFailed,
  signUpSucess,
  signOutStart,
  signOutSucess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
