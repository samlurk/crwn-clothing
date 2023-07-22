import { useEffect, useRef } from "react";
import { setIsCartOpen } from "../../store/Cart/reducer";
import { selectIsCartOpen } from "../../store/Cart/selector";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const isCartOpen = useSelector(selectIsCartOpen);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        event.target.contains(cartRef.current) &&
        event.target !== cartRef.current
      ) {
        dispatch(setIsCartOpen(!isCartOpen));
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return [cartRef];
};
