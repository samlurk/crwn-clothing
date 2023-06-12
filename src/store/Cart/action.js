import { createAction } from "../../utils/Reducer";
import { CART_ACTION_TYPES } from "./types";

//* Utility functions

export const addCartItem = (cartItems, productToAdd) => {
  let [...items] = cartItems;
  const [isFound] = [
    ...cartItems.filter((item, index) => {
      if (item.id === productToAdd.id) {
        items[index].quantity++;
        return item;
      }
    }),
  ];
  if (!isFound) items = [...items, { ...productToAdd, quantity: 1 }];
  return items;
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => {
    if (item.id !== cartItemToRemove.id) {
      return item;
    } else {
      item.quantity--;
      if (item.quantity > 0) {
        return item;
      }
    }
  });
};

export const clearCartItem = (cartItems, id) => {
  return cartItems.filter((item) => item.id !== id);
};

//* Actions

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, isCartOpen);

export const updateCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const removeItemToCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, id) => {
  const newCartItems = clearCartItem(cartItems, id);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
