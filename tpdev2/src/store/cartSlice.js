import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PROMO_CODES } from '../data/products';
import { showToast } from './toastSlice';

export const SHIPPING_THRESHOLD = 150;

const loadInitialCart = () => {
  try {
    const saved = localStorage.getItem('aura_cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const loadInitialPromo = () => {
  try {
    return localStorage.getItem('aura_promo_code') || '';
  } catch (e) {
    return '';
  }
};

const initialState = {
  items: loadInitialCart(),
  promoCode: loadInitialPromo()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded: (state, action) => {
      const { product, quantity = 1, color } = action.payload;
      const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
      const maxStock = product.stockCount || 99;

      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const newQty = state.items[existingIndex].quantity + quantity;
        state.items[existingIndex].quantity = Math.min(newQty, maxStock);
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, maxStock),
          color: selectedColor,
          addedAt: Date.now()
        });
      }
    },
    itemRemoved: (state, action) => {
      const { productId, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.color === color)
      );
    },
    quantityUpdated: (state, action) => {
      const { productId, color, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => !(item.product.id === productId && item.color === color)
        );
        return;
      }
      const item = state.items.find(
        (item) => item.product.id === productId && item.color === color
      );
      if (item) {
        const maxStock = item.product.stockCount || 99;
        item.quantity = Math.min(quantity, maxStock);
      }
    },
    cartCleared: (state) => {
      state.items = [];
    },
    promoApplied: (state, action) => {
      state.promoCode = action.payload;
    },
    promoRemoved: (state) => {
      state.promoCode = '';
    }
  }
});

export const {
  itemAdded,
  itemRemoved,
  quantityUpdated,
  cartCleared,
  promoApplied,
  promoRemoved
} = cartSlice.actions;

// Thunks with notifications
export const addToCart = (product, quantity = 1, color = null) => (dispatch) => {
  const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
  dispatch(itemAdded({ product, quantity, color: selectedColor }));
  dispatch(showToast(`Added ${product.name} (${selectedColor}) to your cart!`, 'success'));
};

export const removeFromCart = (productId, color) => (dispatch) => {
  dispatch(itemRemoved({ productId, color }));
  dispatch(showToast('Item removed from cart', 'info'));
};

export const updateQuantity = (productId, color, newQuantity) => (dispatch) => {
  if (newQuantity <= 0) {
    dispatch(removeFromCart(productId, color));
    return;
  }
  dispatch(quantityUpdated({ productId, color, quantity: newQuantity }));
};

export const clearCart = () => (dispatch) => {
  dispatch(cartCleared());
};

export const applyPromo = (code) => (dispatch) => {
  const upper = code.trim().toUpperCase();
  if (PROMO_CODES[upper]) {
    dispatch(promoApplied(upper));
    dispatch(showToast(`Promo "${upper}" applied successfully!`, 'success'));
    return { success: true };
  } else {
    dispatch(showToast(`Invalid promo code: "${code}"`, 'error'));
    return { success: false, error: 'Invalid or expired code' };
  }
};

export const removePromo = () => (dispatch) => {
  dispatch(promoRemoved());
  dispatch(showToast('Promo code removed', 'info'));
};

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectPromoCode = (state) => state.cart.promoCode;

export const selectTotalItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
);

export const selectDiscountAmount = createSelector(
  [selectSubtotal, selectPromoCode],
  (subtotal, promoCode) => {
    if (!promoCode || !PROMO_CODES[promoCode]) return 0;
    const promo = PROMO_CODES[promoCode];
    if (promo.discountPercent) {
      return (subtotal * promo.discountPercent) / 100;
    }
    if (promo.discountAmount) {
      return Math.min(promo.discountAmount, subtotal);
    }
    return 0;
  }
);

export const selectShippingAmount = createSelector(
  [selectSubtotal],
  (subtotal) => (subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : 15)
);

export const selectTaxAmount = createSelector(
  [selectSubtotal, selectDiscountAmount],
  (subtotal, discountAmount) => (subtotal - discountAmount) * 0.085
);

export const selectFinalTotal = createSelector(
  [selectSubtotal, selectDiscountAmount, selectShippingAmount, selectTaxAmount],
  (subtotal, discountAmount, shippingAmount, taxAmount) =>
    Math.max(0, subtotal - discountAmount + shippingAmount + taxAmount)
);

export default cartSlice.reducer;
