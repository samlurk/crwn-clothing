import { createAction } from "../../utils/Reducer";
import { USER_ACTION_TYPES } from "./types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
