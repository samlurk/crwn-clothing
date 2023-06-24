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
  cartItems.reduce((total, carItem) => total + carItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
