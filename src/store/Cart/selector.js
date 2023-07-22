import { createSelector } from "@reduxjs/toolkit";

const getIsCartOpen = (state) => state.cart.isCartOpen;

const getCartItems = (state) => state.cart.cartItems;

export const selectCartItems = createSelector(
  [getCartItems],
  (cartItems) => cartItems
);

export const selectIsCartOpen = createSelector(
  [getIsCartOpen],
  (isCartOpen) => isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.length
    ? cartItems.reduce((total, carItem) => total + carItem.quantity, 0)
    : 0
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.length
    ? cartItems.reduce((total, cartItem) => total + cartItem.total, 0)
    : 0
);
