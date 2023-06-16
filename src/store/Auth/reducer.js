import { AUTH_ACTION_TYPES } from "./types";

const INITIAL_STATE = {
  token: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.SIGN_IN_SUCESS:
      return {
        ...state,
        token: payload,
      };
    case AUTH_ACTION_TYPES.SIGN_IN_FAILED:
    case AUTH_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
      };
    case AUTH_ACTION_TYPES.SIGN_OUT_SUCESS:
      return {
        ...state,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};
