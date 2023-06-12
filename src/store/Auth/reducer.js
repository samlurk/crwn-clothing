import { AUTH_ACTION_TYPES } from "./types";

const INITIAL_STATE = {
  token: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    default:
      return state;
  }
};
