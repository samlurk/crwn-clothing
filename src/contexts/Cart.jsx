import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/Reducer";
import {
  addCartItem,
  addCartItemsOnLocalStorage,
  clearCartItem,
  removeCartItem,
} from "../utils/Cart";

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCart: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCart: 0,
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, totalCart }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) updateCartItemsReducer(JSON.parse(cartItems));
  }, []);

  const updateCartItemsReducer = (newCartItems) => {
    const newTotalCart = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    const newCartCount = newCartItems.reduce(
      (total, carItem) => total + carItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalCart: newTotalCart,
      })
    );
  };
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    addCartItemsOnLocalStorage(newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    addCartItemsOnLocalStorage(newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (id) => {
    const newCartItems = clearCartItem(cartItems, id);
    addCartItemsOnLocalStorage(newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  };
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const value = {
    isCartOpen,
    setIsCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    totalCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
