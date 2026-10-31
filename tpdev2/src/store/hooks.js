import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectPromoCode,
  selectTotalItemCount,
  selectSubtotal,
  selectDiscountAmount,
  selectShippingAmount,
  SHIPPING_THRESHOLD,
  selectTaxAmount,
  selectFinalTotal,
  addToCart as addToCartThunk,
  removeFromCart as removeFromCartThunk,
  updateQuantity as updateQuantityThunk,
  clearCart as clearCartThunk,
  applyPromo as applyPromoThunk,
  removePromo as removePromoThunk
} from './cartSlice';
import {
  selectWishlist,
  toggleWishlist as toggleWishlistThunk
} from './wishlistSlice';
import {
  setIsCartOpen as setIsCartOpenAction,
  setIsWishlistOpen as setIsWishlistOpenAction,
  setSelectedProduct as setSelectedProductAction,
  setIsCheckoutOpen as setIsCheckoutOpenAction,
  setLastOrder as setLastOrderAction,
  completeOrder as completeOrderThunk
} from './uiSlice';
import {
  selectToasts,
  showToast as showToastThunk,
  removeToast as removeToastThunk
} from './toastSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useCart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCartItems);
  const promoCode = useSelector(selectPromoCode);
  const totalItemCount = useSelector(selectTotalItemCount);
  const subtotal = useSelector(selectSubtotal);
  const discountAmount = useSelector(selectDiscountAmount);
  const shippingAmount = useSelector(selectShippingAmount);
  const taxAmount = useSelector(selectTaxAmount);
  const finalTotal = useSelector(selectFinalTotal);

  const wishlist = useSelector(selectWishlist);

  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const isWishlistOpen = useSelector((state) => state.ui.isWishlistOpen);
  const selectedProduct = useSelector((state) => state.ui.selectedProduct);
  const isCheckoutOpen = useSelector((state) => state.ui.isCheckoutOpen);
  const lastOrder = useSelector((state) => state.ui.lastOrder);

  const toasts = useSelector(selectToasts);

  const setIsCartOpen = useCallback((open) => dispatch(setIsCartOpenAction(open)), [dispatch]);
  const setIsWishlistOpen = useCallback((open) => dispatch(setIsWishlistOpenAction(open)), [dispatch]);
  const setSelectedProduct = useCallback((product) => dispatch(setSelectedProductAction(product)), [dispatch]);
  const setIsCheckoutOpen = useCallback((open) => dispatch(setIsCheckoutOpenAction(open)), [dispatch]);
  const setLastOrder = useCallback((order) => dispatch(setLastOrderAction(order)), [dispatch]);

  const addToCart = useCallback((product, qty, color) => dispatch(addToCartThunk(product, qty, color)), [dispatch]);
  const removeFromCart = useCallback((productId, color) => dispatch(removeFromCartThunk(productId, color)), [dispatch]);
  const updateQuantity = useCallback((productId, color, qty) => dispatch(updateQuantityThunk(productId, color, qty)), [dispatch]);
  const clearCart = useCallback(() => dispatch(clearCartThunk()), [dispatch]);

  const toggleWishlist = useCallback((product) => dispatch(toggleWishlistThunk(product)), [dispatch]);
  const isInWishlist = useCallback((productId) => wishlist.some((item) => item.id === productId), [wishlist]);

  const applyPromo = useCallback((code) => dispatch(applyPromoThunk(code)), [dispatch]);
  const removePromo = useCallback(() => dispatch(removePromoThunk()), [dispatch]);

  const showToast = useCallback((msg, type) => dispatch(showToastThunk(msg, type)), [dispatch]);
  const removeToast = useCallback((id) => dispatch(removeToastThunk(id)), [dispatch]);

  const completeOrder = useCallback((customerData) => dispatch(completeOrderThunk(customerData)), [dispatch]);

  return {
    cart,
    wishlist,
    promoCode,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    selectedProduct,
    setSelectedProduct,
    isCheckoutOpen,
    setIsCheckoutOpen,
    lastOrder,
    setLastOrder,
    toasts,
    showToast,
    removeToast,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    applyPromo,
    removePromo,
    totalItemCount,
    subtotal,
    discountAmount,
    shippingAmount,
    shippingThreshold: SHIPPING_THRESHOLD,
    taxAmount,
    finalTotal,
    completeOrder
  };
};
