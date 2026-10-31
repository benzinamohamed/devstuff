import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  toggleWishlist, 
  selectWishlist, 
  setSelectedProduct 
} from '../store';
import { Heart, Eye, ShoppingCart, Star, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : null
  );
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isFavorited = wishlist.some((item) => item.id === product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    dispatch(addToCart(product, 1, selectedColor));
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleOpenModal = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div 
      onClick={handleOpenModal}
      className="group bg-[#262626] border border-[#393939] hover:border-[#0f62fe] transition-colors flex flex-col cursor-pointer relative"
    >
      {/* Top Header: SKU & Status */}
      <div className="flex items-center justify-between p-3 border-b border-[#393939] text-[10px] font-mono text-[#8d8d8d]">
        <span className="uppercase text-[#0f62fe] font-bold">
          {product.category} // {product.id}
        </span>
        <div className="flex items-center gap-1.5">
          {product.inStock ? (
            <span className="text-[#24a148] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#24a148] inline-block" />
              IN-STOCK [{product.stockCount}]
            </span>
          ) : (
            <span className="text-[#da1e28] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#da1e28] inline-block" />
              SOLD OUT
            </span>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#161616] overflow-hidden border-b border-[#393939]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-300"
        />

        {/* Badges in Carbon Tag Style */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#161616] border border-[#393939] text-[#f4f4f4]">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#da1e28] text-white">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2 right-2 p-2 transition-colors z-10 border ${
            isFavorited
              ? 'bg-[#161616] text-[#ee5396] border-[#ee5396]'
              : 'bg-[#161616]/90 text-[#c6c6c6] border-[#393939] hover:text-[#f4f4f4] hover:border-[#6f6f6f]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#ee5396]' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            className="w-full bg-[#161616] hover:bg-[#353535] text-[#f4f4f4] text-[11px] font-mono uppercase tracking-wider py-1.5 px-3 border border-[#393939] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#0f62fe]" />
            <span>Inspect Specification</span>
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-[#161616]/80 flex items-center justify-center z-20">
            <span className="bg-[#da1e28] text-white font-mono font-bold text-xs uppercase px-3 py-1">
              BACKORDER ONLY
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8d8d8d] mb-1">
            <div className="flex items-center gap-1 text-[#f4f4f4]">
              <Star className="w-3.5 h-3.5 text-[#f1c21b] fill-[#f1c21b]" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-[#8d8d8d]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-bold text-[#f4f4f4] text-sm group-hover:text-[#0f62fe] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#c6c6c6] mt-1 line-clamp-2 font-light leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-mono text-[#8d8d8d]">FINISH:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-3.5 h-3.5 border transition-all ${
                        isSelected 
                          ? 'border-[#0f62fe] ring-1 ring-[#0f62fe] scale-110' 
                          : 'border-[#6f6f6f] hover:border-[#f4f4f4]'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-[#393939] flex items-center justify-between gap-3">
          <div className="font-mono">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#f4f4f4]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#8d8d8d] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`h-9 px-3 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors border ${
              !product.inStock
                ? 'bg-[#393939] text-[#8d8d8d] border-transparent cursor-not-allowed'
                : isAddedAnim
                ? 'bg-[#24a148] text-white border-transparent'
                : 'bg-[#0f62fe] hover:bg-[#0353e9] text-white border-transparent active:bg-[#002d9c]'
            }`}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
