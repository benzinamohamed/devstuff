import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_CODES } from '../data/products';

const CartContext = createContext();

const STORAGE_KEYS = {
  CART: 'aura_cart_items',
  WISHLIST: 'aura_wishlist_items',
  PROMO: 'aura_promo_code'
};

export const CartProvider = ({ children }) => {
  // Cart state persisted to localStorage (with static fallback)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Active promo code
  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PROMO) || '';
    } catch (e) {
      return '';
    }
  });

  // UI Modal / Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(STORAGE_KEYS.PROMO, promoCode);
      } else {
        localStorage.removeItem(STORAGE_KEYS.PROMO);
      }
    } catch (e) {}
  }, [promoCode]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, color = null) => {
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockCount || 99)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: Math.min(quantity, product.stockCount || 99),
            color: selectedColor,
            addedAt: Date.now()
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${selectedColor}) to your cart!`, 'success');
  };

  const removeFromCart = (productId, color) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.color === color)));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, color);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.color === color) {
        const maxStock = item.product.stockCount || 99;
        return {
          ...item,
          quantity: Math.min(newQuantity, maxStock)
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isSaved = wishlist.some(item => item.id === product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.name} to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Promo code validation
  const applyPromo = (code) => {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper]) {
      setPromoCode(upper);
      showToast(`Promo "${upper}" applied successfully!`, 'success');
      return { success: true };
    } else {
      showToast(`Invalid promo code: "${code}"`, 'error');
      return { success: false, error: 'Invalid or expired code' };
    }
  };

  const removePromo = () => {
    setPromoCode('');
    showToast('Promo code removed', 'info');
  };

  // Financial calculations
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  let discountAmount = 0;
  if (promoCode && PROMO_CODES[promoCode]) {
    const promo = PROMO_CODES[promoCode];
    if (promo.discountPercent) {
      discountAmount = (subtotal * promo.discountPercent) / 100;
    } else if (promo.discountAmount) {
      discountAmount = Math.min(promo.discountAmount, subtotal);
    }
  }

  const shippingThreshold = 150;
  const shippingAmount = subtotal === 0 || subtotal >= shippingThreshold ? 0 : 15;
  const taxAmount = (subtotal - discountAmount) * 0.085; // 8.5% static tax
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingAmount + taxAmount);

  // Complete static checkout
  const completeOrder = (customerData) => {
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

    setLastOrder(orderReceipt);
    clearCart();
    setPromoCode('');
    setIsCheckoutOpen(false);
    showToast(`Order #${orderNumber} placed successfully!`, 'success');
    return orderReceipt;
  };

  return (
    <CartContext.Provider
      value={{
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
        shippingThreshold,
        taxAmount,
        finalTotal,
        completeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
