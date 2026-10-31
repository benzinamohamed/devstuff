import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectSelectedProduct, 
  setSelectedProduct, 
  addToCart, 
  toggleWishlist, 
  selectWishlist 
} from '../store';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Terminal
} from 'lucide-react';

export default function ProductModal() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const wishlist = useSelector(selectWishlist);

  if (!selectedProduct) return null;

  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors && selectedProduct.colors.length > 0
      ? selectedProduct.colors[0].name
      : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
      setSelectedColor(
        selectedProduct.colors && selectedProduct.colors.length > 0
          ? selectedProduct.colors[0].name
          : 'Default'
      );
      setQuantity(1);
      setActiveTab('features');
      setIsAdded(false);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') dispatch(setSelectedProduct(null));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const isFavorited = wishlist.some((item) => item.id === selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedProduct.inStock) return;
    dispatch(addToCart(selectedProduct, quantity, selectedColor));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const galleryImages = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => dispatch(setSelectedProduct(null))}
        className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#161616] border border-[#393939] z-10 my-8 max-h-[92vh] flex flex-col shadow-2xl animate-carbon-fade">
        
        {/* Carbon Modal Header */}
        <div className="h-12 px-6 bg-[#262626] border-b border-[#393939] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0f62fe]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">HARDWARE SPECIFICATION // SKU: {selectedProduct.id}</span>
          </div>
          <button
            onClick={() => dispatch(setSelectedProduct(null))}
            className="w-12 h-12 flex items-center justify-center text-[#8d8d8d] hover:text-[#f4f4f4] hover:bg-[#353535] transition-colors -mr-6"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square w-full bg-[#262626] border border-[#393939] overflow-hidden">
                <img
                  src={activeImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-2 left-2 text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#161616] text-[#f4f4f4] border border-[#393939]">
                    {selectedProduct.badge}
                  </span>
                )}
                {!selectedProduct.inStock && (
                  <div className="absolute inset-0 bg-[#161616]/80 flex items-center justify-center">
                    <span className="bg-[#da1e28] text-white font-mono font-bold text-xs uppercase px-3 py-1">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 border-2 transition-all shrink-0 bg-[#262626] ${
                        activeImage === img ? 'border-[#0f62fe]' : 'border-[#393939] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="bg-[#262626] border border-[#393939] p-4 space-y-2 text-xs font-mono text-[#c6c6c6]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0f62fe] shrink-0" />
                  <span>Free express courier dispatch in 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#0f62fe] shrink-0" />
                  <span>30-Day unconditional money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0f62fe] shrink-0" />
                  <span>2-Year manufacturer replacement warranty</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Actions (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="font-mono text-xs text-[#0f62fe] uppercase tracking-wider mb-1">
                  {selectedProduct.category} // MODEL REF: {selectedProduct.id}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f4f4] tracking-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm text-[#c6c6c6] mt-1 font-light leading-relaxed">
                  {selectedProduct.tagline}
                </p>

                {/* Rating Bar */}
                <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                  <div className="flex items-center text-[#f1c21b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f1c21b]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#f4f4f4]">{selectedProduct.rating}</span>
                  <span className="text-[#8d8d8d]">({selectedProduct.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="flex items-baseline gap-3 p-4 bg-[#262626] border border-[#393939]">
                <span className="text-3xl font-mono font-bold text-[#f4f4f4]">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <>
                    <span className="text-sm font-mono text-[#8d8d8d] line-through">
                      ${selectedProduct.originalPrice}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#da1e28]">
                      [-{discountPercent}% OFF]
                    </span>
                  </>
                )}
                <div className="ml-auto font-mono text-xs">
                  {selectedProduct.inStock ? (
                    <span className="text-[#24a148]">
                      IN-STOCK [{selectedProduct.stockCount} UNITS]
                    </span>
                  ) : (
                    <span className="text-[#da1e28]">
                      BACKORDER ONLY
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#c6c6c6] font-light leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="text-[11px] font-mono font-bold text-[#8d8d8d] uppercase tracking-wider block mb-2">
                    FINISH OPTION: <span className="text-[#f4f4f4]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-colors ${
                          selectedColor === color.name
                            ? 'border-[#0f62fe] bg-[#353535] text-[#f4f4f4]'
                            : 'border-[#393939] bg-[#262626] text-[#c6c6c6] hover:bg-[#353535]'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 border border-[#6f6f6f]" 
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-[#393939] bg-[#262626]">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !selectedProduct.inStock}
                    className="w-9 h-9 bg-[#262626] hover:bg-[#353535] text-[#f4f4f4] disabled:opacity-30 flex items-center justify-center font-mono font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-xs text-[#f4f4f4]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(selectedProduct.stockCount || 99, q + 1))}
                    disabled={quantity >= (selectedProduct.stockCount || 99) || !selectedProduct.inStock}
                    className="w-9 h-9 bg-[#262626] hover:bg-[#353535] text-[#f4f4f4] disabled:opacity-30 flex items-center justify-center font-mono font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className={`flex-1 h-11 px-6 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    !selectedProduct.inStock
                      ? 'bg-[#393939] text-[#8d8d8d] cursor-not-allowed'
                      : isAdded
                      ? 'bg-[#24a148] text-white'
                      : 'bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ORDER SPECIFICATION ADDED</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>ADD TO CART • ${(selectedProduct.price * quantity).toFixed(0)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => dispatch(toggleWishlist(selectedProduct))}
                  className={`h-11 w-11 flex items-center justify-center border transition-colors ${
                    isFavorited
                      ? 'bg-[#161616] text-[#ee5396] border-[#ee5396]'
                      : 'bg-[#262626] hover:bg-[#353535] text-[#c6c6c6] border-[#393939]'
                  }`}
                  title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#ee5396]' : ''}`} />
                </button>
              </div>

              {/* Carbon Tabs: Features / Specs / Reviews */}
              <div className="pt-4 border-t border-[#393939]">
                <div className="flex border-b border-[#393939]">
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`h-9 px-4 text-xs font-mono font-bold transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'features'
                        ? 'border-[#0f62fe] text-[#f4f4f4] bg-[#262626]'
                        : 'border-transparent text-[#8d8d8d] hover:text-[#f4f4f4]'
                    }`}
                  >
                    FEATURES
                  </button>

                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`h-9 px-4 text-xs font-mono font-bold transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'specs'
                        ? 'border-[#0f62fe] text-[#f4f4f4] bg-[#262626]'
                        : 'border-transparent text-[#8d8d8d] hover:text-[#f4f4f4]'
                    }`}
                  >
                    TECHNICAL SPECS
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`h-9 px-4 text-xs font-mono font-bold transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'reviews'
                        ? 'border-[#0f62fe] text-[#f4f4f4] bg-[#262626]'
                        : 'border-transparent text-[#8d8d8d] hover:text-[#f4f4f4]'
                    }`}
                  >
                    REVIEWS ({selectedProduct.reviews?.length || 0})
                  </button>
                </div>

                <div className="pt-4">
                  {/* Features Tab */}
                  {activeTab === 'features' && selectedProduct.features && (
                    <ul className="space-y-2.5">
                      {selectedProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#c6c6c6]">
                          <span className="text-[#0f62fe] font-mono font-bold shrink-0 mt-0.5">▶</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Specs Tab */}
                  {activeTab === 'specs' && selectedProduct.specs && (
                    <div className="divide-y divide-[#393939] border border-[#393939] text-xs font-mono">
                      {Object.entries(selectedProduct.specs).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-2 p-2.5 bg-[#262626]/60">
                          <span className="text-[#8d8d8d] uppercase">{key}</span>
                          <span className="text-[#f4f4f4]">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-3 font-mono">
                      {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-[#262626] border border-[#393939] text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#f4f4f4]">{rev.author}</span>
                              <span className="text-[10px] text-[#8d8d8d]">{rev.date}</span>
                            </div>
                            <div className="flex text-[#f1c21b] text-xs">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-[#f1c21b]" />
                              ))}
                            </div>
                            <p className="text-[#c6c6c6] font-sans font-light">{rev.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[#8d8d8d] italic">No reviews recorded for this specification.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
