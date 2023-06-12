import { combineReducers } from "redux";
import { userReducer } from "./User/reducer";
import { authReducer } from "./Auth/reducer";
import { categoriesReducer } from "./Categories/reducer";
import { cartReducer } from "./Cart/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  category: categoriesReducer,
  cart: cartReducer,
});
