import { combineReducers } from "redux";
import { userReducer } from "./User/reducer";
import { authReducer } from "./Auth/reducer";
import { categoryReducer } from "./Categories/reducer";
import { cartReducer } from "./Cart/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  category: categoryReducer,
  cart: cartReducer,
});
