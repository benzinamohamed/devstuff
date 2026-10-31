import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectIsWishlistOpen, 
  setIsWishlistOpen, 
  selectWishlist, 
  toggleWishlist, 
  addToCart, 
  setSelectedProduct 
} from '../store';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const dispatch = useDispatch();
  const isWishlistOpen = useSelector(selectIsWishlistOpen);
  const wishlist = useSelector(selectWishlist);

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => dispatch(setIsWishlistOpen(false))}
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161616] border-l border-[#393939] shadow-2xl flex flex-col animate-carbon-drawer">
          
          {/* Header */}
          <div className="h-12 px-5 border-b border-[#393939] flex items-center justify-between bg-[#262626]">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Heart className="w-4 h-4 text-[#ee5396] fill-[#ee5396]" />
              <span className="font-bold text-[#f4f4f4] uppercase">SAVED SPECIFICATIONS</span>
              <span className="bg-[#ee5396]/20 text-[#ee5396] px-1.5 py-0.5 font-bold border border-[#ee5396]/40">
                {wishlist.length} ITEMS
              </span>
            </div>
            <button
              onClick={() => dispatch(setIsWishlistOpen(false))}
              className="w-12 h-12 flex items-center justify-center text-[#8d8d8d] hover:text-[#f4f4f4] hover:bg-[#353535] transition-colors -mr-5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#393939]">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 font-mono">
                <Heart className="w-10 h-10 text-[#8d8d8d]" />
                <div>
                  <h4 className="font-bold text-[#f4f4f4] text-sm">NO SAVED ITEMS</h4>
                  <p className="text-xs text-[#8d8d8d] mt-1 max-w-xs font-sans">
                    Flag any hardware item to keep track of its specification here.
                  </p>
                </div>
                <button
                  onClick={() => dispatch(setIsWishlistOpen(false))}
                  className="px-5 py-2.5 bg-[#0f62fe] text-white text-xs font-bold uppercase hover:bg-[#0353e9]"
                >
                  EXPLORE HARDWARE
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-center first:pt-0 last:pb-0">
                  <div 
                    onClick={() => {
                      dispatch(setSelectedProduct(product));
                      dispatch(setIsWishlistOpen(false));
                    }}
                    className="relative w-16 h-16 bg-[#262626] border border-[#393939] shrink-0 cursor-pointer overflow-hidden group"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        dispatch(setSelectedProduct(product));
                        dispatch(setIsWishlistOpen(false));
                      }}
                      className="text-xs font-bold text-[#f4f4f4] leading-snug truncate hover:text-[#0f62fe] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#8d8d8d] mt-0.5 line-clamp-1">
                      SKU: {product.id} // {product.tagline}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2 font-mono">
                      <span className="text-xs font-bold text-[#f4f4f4]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#8d8d8d] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 font-mono">
                      <button
                        onClick={() => {
                          dispatch(addToCart(product, 1));
                        }}
                        disabled={!product.inStock}
                        className={`h-7 px-3 text-xs uppercase flex items-center gap-1.5 transition-colors ${
                          product.inStock
                            ? 'bg-[#0f62fe] hover:bg-[#0353e9] text-white'
                            : 'bg-[#393939] text-[#8d8d8d] cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>{product.inStock ? 'MOVE TO CART' : 'BACKORDER'}</span>
                      </button>

                      <button
                        onClick={() => dispatch(toggleWishlist(product))}
                        className="p-1.5 text-[#8d8d8d] hover:text-[#da1e28] transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-[#393939] bg-[#262626]">
              <button
                onClick={() => {
                  wishlist.forEach((p) => {
                    if (p.inStock) dispatch(addToCart(p, 1));
                  });
                }}
                className="w-full h-10 bg-[#0f62fe] hover:bg-[#0353e9] text-white font-mono text-xs uppercase font-bold"
              >
                STAGE ALL AVAILABLE TO CART
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
