import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../../store/User/reducer";
import { clearAllItemsFromCart } from "../../store/Cart/reducer";

export const useSignOut = (isSignOut) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignOut) {
      dispatch(setCurrentUser(null));
      dispatch(clearAllItemsFromCart());
    }
  }, [isSignOut]);
};
