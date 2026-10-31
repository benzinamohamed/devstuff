import { createSlice } from '@reduxjs/toolkit';
import { 
  cartCleared, 
  promoRemoved, 
  selectCartItems, 
  selectSubtotal, 
  selectDiscountAmount, 
  selectShippingAmount, 
  selectTaxAmount, 
  selectFinalTotal, 
  selectPromoCode 
} from './cartSlice';
import { showToast } from './toastSlice';

const initialState = {
  isCartOpen: false,
  isWishlistOpen: false,
  selectedProduct: null,
  isCheckoutOpen: false,
  lastOrder: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    setIsWishlistOpen: (state, action) => {
      state.isWishlistOpen = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setIsCheckoutOpen: (state, action) => {
      state.isCheckoutOpen = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    }
  }
});

export const {
  setIsCartOpen,
  setIsWishlistOpen,
  setSelectedProduct,
  setIsCheckoutOpen,
  setLastOrder
} = uiSlice.actions;

export const completeOrder = (customerData) => (dispatch, getState) => {
  const state = getState();
  const cart = selectCartItems(state);
  const subtotal = selectSubtotal(state);
  const discountAmount = selectDiscountAmount(state);
  const shippingAmount = selectShippingAmount(state);
  const taxAmount = selectTaxAmount(state);
  const finalTotal = selectFinalTotal(state);
  const promoCode = selectPromoCode(state);

  const orderNumber = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
  const orderReceipt = {
    orderNumber,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    items: [...cart],
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    total: finalTotal,
    promoApplied: promoCode,
    customer: customerData
  };

  dispatch(setLastOrder(orderReceipt));
  dispatch(cartCleared());
  dispatch(promoRemoved());
  dispatch(setIsCheckoutOpen(false));
  dispatch(showToast(`Order #${orderNumber} placed successfully!`, 'success'));
  return orderReceipt;
};

export const selectIsCartOpen = (state) => state.ui.isCartOpen;
export const selectIsWishlistOpen = (state) => state.ui.isWishlistOpen;
export const selectSelectedProduct = (state) => state.ui.selectedProduct;
export const selectIsCheckoutOpen = (state) => state.ui.isCheckoutOpen;
export const selectLastOrder = (state) => state.ui.lastOrder;

export default uiSlice.reducer;
