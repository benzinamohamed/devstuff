import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck,
  Terminal
} from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    subtotal,
    discountAmount,
    shippingAmount,
    shippingThreshold,
    taxAmount,
    finalTotal,
    promoCode,
    applyPromo,
    removePromo,
    setIsCheckoutOpen
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError(res.error);
    }
  };

  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161616] border-l border-[#393939] shadow-2xl flex flex-col animate-carbon-drawer">
          
          {/* Drawer Header */}
          <div className="h-12 px-5 border-b border-[#393939] flex items-center justify-between bg-[#262626]">
            <div className="flex items-center gap-2 font-mono text-xs">
              <ShoppingBag className="w-4 h-4 text-[#0f62fe]" />
              <span className="font-bold text-[#f4f4f4] uppercase">ORDER CART SPECIFICATION</span>
              <span className="bg-[#0f62fe]/20 text-[#0f62fe] px-1.5 py-0.5 font-bold border border-[#0f62fe]/40">
                {cart.reduce((a, b) => a + b.quantity, 0)} UNITS
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-12 h-12 flex items-center justify-center text-[#8d8d8d] hover:text-[#f4f4f4] hover:bg-[#353535] transition-colors -mr-5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Meter */}
          <div className="bg-[#262626] px-5 py-3 border-b border-[#393939] font-mono text-xs">
            <div className="flex items-center justify-between text-[#c6c6c6] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#0f62fe]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#24a148] font-bold">COMPLIMENTARY SHIPPING UNLOCKED</span>
                ) : (
                  <span>ADD <strong className="text-[#0f62fe]">${remainingForFreeShipping.toFixed(0)}</strong> FOR FREE SHIP</span>
                )}
              </span>
              <span className="text-[#8d8d8d]">[{freeShippingProgress.toFixed(0)}%]</span>
            </div>
            <div className="w-full h-1 bg-[#161616] overflow-hidden">
              <div 
                className="h-full bg-[#0f62fe] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#393939]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 font-mono">
                <ShoppingBag className="w-10 h-10 text-[#8d8d8d]" />
                <div>
                  <h4 className="font-bold text-[#f4f4f4] text-sm">CART IS EMPTY</h4>
                  <p className="text-xs text-[#8d8d8d] mt-1 max-w-xs font-sans">
                    No hardware specifications have been staged in this session.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#0f62fe] text-white text-xs font-bold uppercase hover:bg-[#0353e9]"
                >
                  BROWSE SPECIFICATIONS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.color}`} className="py-4 flex gap-4 items-start first:pt-0 last:pb-0">
                  <div className="relative w-16 h-16 bg-[#262626] border border-[#393939] shrink-0 overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover grayscale contrast-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#f4f4f4] leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.color)}
                        className="text-[#8d8d8d] hover:text-[#da1e28] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-[#8d8d8d] mt-0.5">
                      FINISH: <strong className="text-[#c6c6c6]">{item.color}</strong>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#393939] bg-[#262626] font-mono text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#c6c6c6] hover:bg-[#353535]"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-[#f4f4f4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#c6c6c6] hover:bg-[#353535]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-[#f4f4f4]">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#393939] bg-[#262626] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#161616] border border-[#24a148] text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#24a148]">
                      <Tag className="w-4 h-4" />
                      <span>COUPON [{promoCode}] ACTIVE</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs font-bold text-[#da1e28] hover:underline"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5 font-mono">
                    <div className="flex">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="ENTER COUPON (AURA10)"
                        className="flex-1 bg-[#161616] border border-[#393939] px-3 py-2 text-xs text-[#f4f4f4] uppercase outline-none focus:border-[#0f62fe]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#393939] hover:bg-[#525252] text-white text-xs font-bold uppercase"
                      >
                        APPLY
                      </button>
                    </div>
                    {promoError && <p className="text-[11px] text-[#da1e28]">{promoError}</p>}
                    
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#8d8d8d]">
                      <span>TRY:</span>
                      {Object.keys(PROMO_CODES).map(code => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => applyPromo(code)}
                          className="font-bold text-[#0f62fe] hover:underline bg-[#161616] px-1.5 py-0.5 border border-[#393939]"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </form>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1 text-xs font-mono text-[#c6c6c6] pt-1">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-[#f4f4f4]">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#24a148]">
                    <span>DISCOUNT</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>LOGISTICS</span>
                  <span>{shippingAmount === 0 ? <strong className="text-[#24a148]">COMPLIMENTARY</strong> : `$${shippingAmount.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>TAX (8.5%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#393939] text-sm font-bold text-[#f4f4f4]">
                  <span>ORDER TOTAL</span>
                  <span className="text-[#0f62fe] text-base font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1 font-mono">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full h-11 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>EXECUTE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-center text-xs text-[#8d8d8d] px-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-[#da1e28] transition-colors"
                  >
                    [CLEAR CART]
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="hover:text-[#f4f4f4]"
                  >
                    [CONTINUE BROWSING]
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
