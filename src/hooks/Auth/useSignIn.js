import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/Auth/selector";
import { useEffect } from "react";
import { setCurrentUser } from "../../store/User/reducer";
import jwtDecode from "jwt-decode";
import {
  addItemsToCartStart,
  fetchCartItemsStart,
} from "../../store/Cart/reducer";
import { selectCartItems } from "../../store/Cart/selector";

export const useSignIn = (isSignIn, isSignInFirstTime) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (isSignIn) {
      dispatch(setCurrentUser(jwtDecode(token)));
      dispatch(fetchCartItemsStart());
    }

    if (isSignInFirstTime && cartItems.length !== 0) {
      dispatch(addItemsToCartStart(cartItems));
    }
  }, [isSignIn]);
};
