import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  Printer
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    discountAmount, 
    shippingAmount, 
    taxAmount, 
    finalTotal, 
    promoCode,
    completeOrder,
    lastOrder,
    setLastOrder
  } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@ibm-enterprise.demo',
    phone: '+1 (555) 019-2834',
    address: '1 New Orchard Road',
    city: 'Armonk',
    state: 'NY',
    zip: '10504',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    cardName: 'Alex Morgan'
  });

  if (!isCheckoutOpen && !lastOrder) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      completeOrder(formData);
      setStep(3);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastOrder(null);
    setStep(1);
  };

  // Order Confirmation / Receipt
  if (lastOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div 
          onClick={handleClose}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs transition-opacity" 
        />

        <div className="relative w-full max-w-2xl bg-[#161616] border border-[#393939] z-10 p-6 sm:p-8 animate-carbon-fade my-8 max-h-[92vh] overflow-y-auto shadow-2xl">
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-[#8d8d8d] hover:text-[#f4f4f4] p-2"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Receipt Header */}
          <div className="border-b border-[#393939] pb-5 font-mono">
            <div className="flex items-center gap-2 text-[#24a148] text-xs font-bold mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>IBM CARBON TRANSACTION // RECORD COMMITTED</span>
            </div>
            <h2 className="text-2xl font-bold text-[#f4f4f4] tracking-tight">
              Order Specification #{lastOrder.orderNumber}
            </h2>
            <p className="text-xs text-[#8d8d8d] mt-1">
              STATUS: CONFIRMED • RUNTIME: STATIC CLIENT • LOCAL STORAGE SYNCED
            </p>
          </div>

          {/* Telemetry Grid */}
          <div className="py-5 space-y-5 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#262626] border border-[#393939] p-3 text-xs">
              <div>
                <span className="text-[#8d8d8d] block text-[10px]">TIMESTAMP</span>
                <span className="font-bold text-[#f4f4f4]">{lastOrder.date}</span>
              </div>
              <div>
                <span className="text-[#8d8d8d] block text-[10px]">TRANSIT ESTIMATE</span>
                <span className="font-bold text-[#f4f4f4]">2-3 BUSINESS DAYS</span>
              </div>
              <div>
                <span className="text-[#8d8d8d] block text-[10px]">PAYMENT METHOD</span>
                <span className="font-bold text-[#f4f4f4] uppercase">{lastOrder.customer.paymentMethod}</span>
              </div>
              <div>
                <span className="text-[#8d8d8d] block text-[10px]">TOTAL SETTLED</span>
                <span className="font-bold text-[#0f62fe]">${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="text-[11px] font-bold uppercase text-[#8d8d8d] mb-2">
                // SPECIFICATION ITEMS [{lastOrder.items.length}]
              </h4>
              <div className="divide-y divide-[#393939] border border-[#393939] bg-[#262626]">
                {lastOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover border border-[#393939]" />
                      <div>
                        <p className="font-bold text-[#f4f4f4] font-sans">{item.product.name}</p>
                        <p className="text-[#8d8d8d] text-[11px]">FINISH: {item.color.toUpperCase()} • QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#f4f4f4]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="p-3 bg-[#262626] border border-[#393939] space-y-1 text-xs text-[#c6c6c6]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span>${lastOrder.subtotal.toFixed(2)}</span>
              </div>
              {lastOrder.discountAmount > 0 && (
                <div className="flex justify-between text-[#24a148]">
                  <span>DISCOUNT [{lastOrder.promoApplied}]</span>
                  <span>-${lastOrder.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>LOGISTICS</span>
                <span>{lastOrder.shippingAmount === 0 ? 'COMPLIMENTARY' : `$${lastOrder.shippingAmount.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>TAXES</span>
                <span>${lastOrder.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#393939] text-sm font-bold text-[#f4f4f4]">
                <span>FINAL AUTHORIZED TOTAL</span>
                <span className="text-[#0f62fe]">${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Destination */}
            <div className="bg-[#262626] p-3 border border-[#393939] text-[#c6c6c6]">
              <span className="text-[#8d8d8d] block text-[10px] uppercase font-bold mb-1">// DISPATCH DESTINATION</span>
              <p className="text-[#f4f4f4]">{lastOrder.customer.firstName} {lastOrder.customer.lastName}</p>
              <p>{lastOrder.customer.address}, {lastOrder.customer.city}, {lastOrder.customer.state} {lastOrder.customer.zip}, {lastOrder.customer.country}</p>
              <p className="text-[#8d8d8d] text-[11px] mt-1">CONTACT: {lastOrder.customer.email} | {lastOrder.customer.phone}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto h-11 px-5 border border-[#393939] bg-[#262626] hover:bg-[#353535] text-[#f4f4f4] font-bold flex items-center justify-center gap-2 uppercase"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT ORDER RECEIPT</span>
            </button>
            <button
              onClick={handleClose}
              className="w-full sm:flex-1 h-11 px-6 bg-[#0f62fe] hover:bg-[#0353e9] text-white font-bold uppercase tracking-wider"
            >
              RETURN TO CATALOG
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Dialog
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-3xl bg-[#161616] border border-[#393939] z-10 shadow-2xl animate-carbon-fade my-8 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="h-12 px-6 bg-[#262626] border-b border-[#393939] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0f62fe]">
            <Lock className="w-4 h-4" />
            <span className="font-bold text-[#f4f4f4]">IBM CARBON // TRANSACTION TERMINAL</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-12 h-12 flex items-center justify-center text-[#8d8d8d] hover:text-[#f4f4f4] hover:bg-[#353535] transition-colors -mr-6"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-2 text-xs font-mono font-bold border-b border-[#393939] text-center">
          <div className={`py-3 flex items-center justify-center gap-2 border-r border-[#393939] ${
            step === 1 ? 'bg-[#353535] text-[#f4f4f4] border-b-2 border-b-[#0f62fe]' : 'bg-[#262626] text-[#8d8d8d]'
          }`}>
            <span>01 // SHIPPING DISPATCH</span>
          </div>

          <div className={`py-3 flex items-center justify-center gap-2 ${
            step === 2 ? 'bg-[#353535] text-[#f4f4f4] border-b-2 border-b-[#0f62fe]' : 'bg-[#262626] text-[#8d8d8d]'
          }`}>
            <span>02 // PAYMENT SIMULATION</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-mono">
          <form onSubmit={handleNextStep} id="checkout-form" className="space-y-5">
            
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#0f62fe] uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>// CUSTOMER & DISPATCH PARAMETERS</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">State</label>
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Postal Code</label>
                    <input
                      required
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full text-xs bg-[#262626] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#0f62fe] uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>// TRANSACTION SETTLEMENT METHOD</span>
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {['card', 'applepay', 'cod'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, paymentMethod: method }))}
                      className={`p-3 border text-xs font-mono font-bold text-center transition-colors ${
                        formData.paymentMethod === method
                          ? 'border-[#0f62fe] bg-[#0f62fe] text-white'
                          : 'border-[#393939] bg-[#262626] text-[#c6c6c6] hover:bg-[#353535]'
                      }`}
                    >
                      {method === 'card' && 'CREDIT CARD'}
                      {method === 'applepay' && 'APPLE PAY'}
                      {method === 'cod' && 'PAY ON RECEIPT'}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-4 bg-[#262626] border border-[#393939] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#f4f4f4]">CARD CREDENTIALS</span>
                      <span className="text-[#24a148] text-[10px] font-bold">
                        SIMULATION SAFE MODE
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full text-xs bg-[#161616] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full text-xs bg-[#161616] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">Expiration</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleChange}
                          className="w-full text-xs bg-[#161616] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#8d8d8d] uppercase mb-1">CVC / Security</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className="w-full text-xs bg-[#161616] border border-[#393939] p-2.5 text-[#f4f4f4] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'applepay' && (
                  <div className="p-6 bg-[#262626] border border-[#393939] text-center space-y-2">
                    <p className="font-bold text-xs text-[#f4f4f4]">APPLE PAY BIOMETRIC PASS</p>
                    <p className="text-xs text-[#8d8d8d]">Execute authorization below to commit the transaction.</p>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#262626] border border-[#393939] text-xs">
                    <p className="font-bold text-[#f4f4f4]">PAY ON LOGISTICS RECEIPT</p>
                    <p className="text-[#8d8d8d] mt-0.5">Settle with courier via contactless payment terminal or currency upon arrival.</p>
                  </div>
                )}
              </div>
            )}

            {/* Price Preview */}
            <div className="p-3 bg-[#262626] border border-[#393939] flex items-center justify-between text-xs">
              <span className="text-[#c6c6c6]">SETTLEMENT TOTAL ({cart.length} ITEMS):</span>
              <span className="text-base font-bold text-[#0f62fe]">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-2">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-11 px-4 border border-[#393939] bg-[#262626] hover:bg-[#353535] text-[#f4f4f4] text-xs font-bold uppercase flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>PREVIOUS STEP</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="h-11 px-6 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>{step === 1 ? 'CONTINUE TO PAYMENT' : `COMMIT ORDER • $${finalTotal.toFixed(2)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
