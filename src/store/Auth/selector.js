import { createSelector } from "@reduxjs/toolkit";

//* Utility Types

const selectAuthenticatedReducer = (state) => state.auth;

export const selectToken = createSelector(
  [selectAuthenticatedReducer],
  (authSlice) => authSlice.token
);
