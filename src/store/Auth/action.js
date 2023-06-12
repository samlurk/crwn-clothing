import { createAction } from "../../utils/Reducer";
import { AUTH_ACTION_TYPES } from "./types";

export const login = (token) =>
  createAction(AUTH_ACTION_TYPES.SET_TOKEN, token);

export const logout = () => createAction(AUTH_ACTION_TYPES.SET_TOKEN, null);
