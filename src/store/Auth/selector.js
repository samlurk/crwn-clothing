import jwtDecode from "jwt-decode";
import { createSelector } from "reselect";

//* Utility Types

const selectAuthenticatedReducer = (state) => state.auth;

export const selectToken = createSelector(
  [selectAuthenticatedReducer],
  (authSlice) => authSlice.token
);
