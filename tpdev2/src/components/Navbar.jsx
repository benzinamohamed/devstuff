import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectTotalItemCount, 
  selectSubtotal, 
  selectWishlist, 
  setIsCartOpen, 
  setIsWishlistOpen 
} from '../store';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal,
  Terminal,
  Grid,
  ChevronRight,
  X
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  categories,
  onOpenFiltersMobile
}) {
  const dispatch = useDispatch();
  const totalItemCount = useSelector(selectTotalItemCount);
  const subtotal = useSelector(selectSubtotal);
  const wishlist = useSelector(selectWishlist);

  return (
    <header className="sticky top-0 z-40 bg-[#161616] border-b border-[#393939] select-none">
      {/* Carbon Top System Bar */}
      <div className="bg-[#262626] border-b border-[#393939] text-[#c6c6c6] text-[11px] font-mono py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#24a148] inline-block" />
          <span className="text-[#f4f4f4] font-semibold">IBM CARBON E-COMMERCE</span>
          <span className="text-[#8d8d8d] hidden sm:inline">| SPECIFICATION v4.2 // 100% STATIC IN-MEMORY</span>
        </div>
        <div className="flex items-center gap-4 text-[#8d8d8d]">
          <span className="hidden md:inline">PROMO: <strong className="text-[#0f62fe] font-mono">AURA10</strong> [-10%] • <strong className="text-[#0f62fe] font-mono">SUPER20</strong> [-20%]</span>
          <span className="font-mono text-[#f4f4f4]">FREE SHIP &gt; $150</span>
        </div>
      </div>

      {/* Main 48px Carbon UI Shell Header */}
      <div className="max-w-[1580px] mx-auto px-4">
        <div className="flex items-center justify-between h-12 gap-4">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-[#0f62fe] flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider">
                IBM
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-[#f4f4f4] tracking-tight">
                  AURA
                </span>
                <span className="font-light text-base text-[#c6c6c6]">
                  Store
                </span>
                <span className="font-mono text-[10px] text-[#0f62fe] px-1 py-0.5 bg-[#0f62fe]/10 border border-[#0f62fe]/30 ml-1">
                  CARBON v11
                </span>
              </div>
            </a>
          </div>

          {/* Center: Search Box in Carbon styling */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8d8d8d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog by hardware name, SKU, or specs..."
                className="w-full bg-[#262626] text-[#f4f4f4] text-xs font-mono pl-9 pr-16 py-2 border border-[#393939] focus:border-[#0f62fe] focus:bg-[#161616] outline-none placeholder:text-[#6f6f6f] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#8d8d8d] hover:text-[#f4f4f4] bg-[#393939] px-2 py-0.5 uppercase"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions (Wishlist & Cart Buttons) */}
          <div className="flex items-center">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={onOpenFiltersMobile}
              className="md:hidden h-12 px-3 flex items-center gap-1.5 text-[#c6c6c6] hover:bg-[#353535] hover:text-[#f4f4f4] border-l border-[#393939]"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => dispatch(setIsWishlistOpen(true))}
              className="h-12 px-3.5 flex items-center gap-2 text-[#c6c6c6] hover:bg-[#353535] hover:text-[#f4f4f4] border-l border-[#393939] transition-colors relative"
              title="Saved Items"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-[#ee5396] fill-[#ee5396]' : ''}`} />
              <span className="font-mono text-xs">
                [{wishlist.length}]
              </span>
            </button>

            {/* Cart Button (Carbon Primary Action) */}
            <button
              onClick={() => dispatch(setIsCartOpen(true))}
              className="h-12 px-4 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white flex items-center gap-2.5 transition-colors border-l border-[#0043ce]"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="flex items-baseline gap-2 font-mono text-xs">
                <span className="font-bold">CART</span>
                <span className="bg-[#002d9c] px-1.5 py-0.2 text-[11px] font-semibold">
                  {totalItemCount}
                </span>
                <span className="font-bold text-[#f4f4f4] hidden sm:inline">
                  ${subtotal.toFixed(0)}
                </span>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden py-2 border-t border-[#393939]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8d8d8d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-[#262626] text-[#f4f4f4] text-xs font-mono pl-8 pr-12 py-1.5 border border-[#393939] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#8d8d8d] bg-[#393939] px-1.5 py-0.5"
              >
                X
              </button>
            )}
          </div>
        </div>

        {/* Carbon Horizontal Category Tabs */}
        <div className="flex items-center overflow-x-auto no-scrollbar border-t border-[#393939] -mx-4 px-4 bg-[#161616]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-10 px-4 text-xs font-sans whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                  isActive
                    ? 'border-[#0f62fe] bg-[#262626] text-[#f4f4f4] font-semibold'
                    : 'border-transparent text-[#c6c6c6] hover:text-[#f4f4f4] hover:bg-[#262626]/60'
                }`}
              >
                <span>{cat.name}</span>
                {isActive && <span className="w-1.5 h-1.5 bg-[#0f62fe] inline-block" />}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
