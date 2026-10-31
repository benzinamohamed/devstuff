import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import uiReducer from './uiSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    toast: toastReducer
  }
});

// Subscribe to store updates for localStorage persistence
let prevCart = store.getState().cart.items;
let prevWishlist = store.getState().wishlist.items;
let prevPromo = store.getState().cart.promoCode;

store.subscribe(() => {
  const state = store.getState();

  if (state.cart.items !== prevCart) {
    prevCart = state.cart.items;
    try {
      localStorage.setItem('aura_cart_items', JSON.stringify(state.cart.items));
    } catch (e) {}
  }

  if (state.wishlist.items !== prevWishlist) {
    prevWishlist = state.wishlist.items;
    try {
      localStorage.setItem('aura_wishlist_items', JSON.stringify(state.wishlist.items));
    } catch (e) {}
  }

  if (state.cart.promoCode !== prevPromo) {
    prevPromo = state.cart.promoCode;
    try {
      if (state.cart.promoCode) {
        localStorage.setItem('aura_promo_code', state.cart.promoCode);
      } else {
        localStorage.removeItem('aura_promo_code');
      }
    } catch (e) {}
  }
});

export default store;
export * from './cartSlice';
export * from './wishlistSlice';
export * from './uiSlice';
export * from './toastSlice';
export * from './hooks';
