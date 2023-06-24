import { createSlice } from "@reduxjs/toolkit";

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

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemToCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemToCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
