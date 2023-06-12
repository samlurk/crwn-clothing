import jwtDecode from "jwt-decode";
import { createSelector } from "reselect";

//* Utility Types

const selectAuthenticatedReducer = (state) => state.auth;

export const selectToken = createSelector(
  [selectAuthenticatedReducer],
  (authSlice) => authSlice.token
);

export const selectIsAuthenticated = createSelector([selectToken], (token) => {
  if (token) {
    const payload = jwtDecode(token);
    const expirationDate = new Date(payload.exp * 1000);
    if (expirationDate > new Date()) {
      return true;
    }
  }
  return false;
});
