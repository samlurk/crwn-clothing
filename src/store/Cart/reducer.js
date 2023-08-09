import { createSlice } from "@reduxjs/toolkit";

//* Utility functions

export const addCartItem = (cartItems, productToAdd) => {
  let [...items] = cartItems;
  const [isFound] = [
    ...cartItems.filter((item, index) => {
      if (item.product.id === productToAdd.id) {
        items[index].quantity++;
        items[index].total = items[index].total + productToAdd.price;
        return item;
      }
    }),
  ];
  if (!isFound)
    items = [
      ...items,
      { product: { ...productToAdd }, quantity: 1, total: productToAdd.price },
    ];
  return items;
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => {
    if (item.product.id !== cartItemToRemove.id) {
      return item;
    } else {
      item.quantity--;
      item.total = item.total - cartItemToRemove.price;
      if (item.quantity > 0) {
        return item;
      }
    }
  });
};

export const clearCartItem = (cartItems, id) => {
  return cartItems.filter((item) => item.product.id !== id);
};

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  isLoading: false,
  error: null,
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
    addItemToCartStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addItemToCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addItemToCartSucess(state) {
      state.isLoading = false;
    },
    removeItemToCartStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    removeItemToCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeItemToCartSucess(state) {
      state.isLoading = false;
    },
    clearItemFromCartStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    clearItemFromCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearItemFromCartSucess(state) {
      state.isLoading = false;
    },
    clearAllItemsFromCart(state) {
      state.cartItems = [];
    },
    addItemsToCartStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addItemsToCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addItemsToCartSucess(state) {
      state.isLoading = false;
    },
    fetchCartItemsStart(state, _) {
      state.isLoading = true;
    },
    fetchCartItemsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchCartItemsSucess(state, action) {
      state.isLoading = false;
      state.cartItems = action.payload;
      state.error = null;
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemToCart,
  clearItemFromCart,
  addItemToCartStart,
  addItemsToCartStart,
  removeItemToCartStart,
  clearItemFromCartStart,
  addItemToCartFailed,
  addItemsToCartFailed,
  removeItemToCartFailed,
  clearItemFromCartFailed,
  addItemToCartSucess,
  addItemsToCartSucess,
  removeItemToCartSucess,
  clearItemFromCartSucess,
  clearAllItemsFromCart,
  fetchCartItemsStart,
  fetchCartItemsFailed,
  fetchCartItemsSucess,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
