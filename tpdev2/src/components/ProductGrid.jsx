import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Search, 
  ChevronDown,
  ArrowUpDown,
  Filter
} from 'lucide-react';

export default function ProductGrid({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  isMobileFilterOpen,
  setIsMobileFilterOpen
}) {
  const [selectedSort, setSelectedSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Filter calculations
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTag = item.tagline.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesTag && !matchesCat && !matchesDesc) {
          return false;
        }
      }
      if (item.price > maxPrice) return false;
      if (onlyInStock && !item.inStock) return false;
      if (item.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating-desc') return b.rating - a.rating;
      if (selectedSort === 'reviews-desc') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, minRating, selectedSort]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1000);
    setOnlyInStock(false);
    setMinRating(0);
    setSelectedSort('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    searchQuery.trim() !== '' || 
    maxPrice < 1000 || 
    onlyInStock || 
    minRating > 0 || 
    selectedSort !== 'featured';

  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    categories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter(p => p.category === cat.id).length;
      }
    });
    return counts;
  }, [products, categories]);

  // Carbon Filter Sidebar
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      {/* Category List */}
      <div>
        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8d8d8d] mb-3 flex items-center justify-between">
          <span>// CATEGORIES</span>
          <span>[{categories.length}]</span>
        </h4>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors text-left border-l-2 ${
                  isSelected
                    ? 'border-[#0f62fe] bg-[#353535] text-[#f4f4f4] font-bold'
                    : 'border-transparent text-[#c6c6c6] hover:bg-[#353535]/60 hover:text-[#f4f4f4]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] text-[#8d8d8d]">
                  [{count}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Filter */}
      <div className="border-t border-[#393939] pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8d8d8d]">
            // MAXIMUM PRICE
          </h4>
          <span className="text-xs font-mono font-bold text-[#0f62fe]">
            ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="1000"
          step="25"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-[#393939] appearance-none cursor-pointer accent-[#0f62fe]"
        />
        <div className="flex justify-between text-[10px] font-mono text-[#8d8d8d] mt-1">
          <span>$50</span>
          <span>$500</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="border-t border-[#393939] pt-4">
        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8d8d8d] mb-2.5">
          // MINIMUM RATING
        </h4>
        <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
          {[
            { label: 'ALL', val: 0 },
            { label: '4.7★', val: 4.7 },
            { label: '4.9★', val: 4.9 }
          ].map((r) => (
            <button
              key={r.val}
              onClick={() => setMinRating(r.val)}
              className={`py-1.5 px-2 border text-center transition-colors ${
                minRating === r.val
                  ? 'bg-[#0f62fe] text-white border-[#0f62fe] font-bold'
                  : 'bg-[#262626] text-[#c6c6c6] border-[#393939] hover:bg-[#353535]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Availability Toggle */}
      <div className="border-t border-[#393939] pt-4">
        <label className="flex items-center justify-between cursor-pointer group select-none">
          <span className="text-xs font-mono text-[#c6c6c6] group-hover:text-[#f4f4f4]">
            IN STOCK ONLY
          </span>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 bg-[#262626] border border-[#6f6f6f] checked:bg-[#0f62fe] cursor-pointer"
          />
        </label>
      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <div className="border-t border-[#393939] pt-4">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-[#393939] bg-[#262626] text-xs font-mono text-[#c6c6c6] hover:bg-[#353535] hover:text-[#f4f4f4] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#0f62fe]" />
            <span>RESET FILTERS</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div id="products-catalog" className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Catalog Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#393939]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#f4f4f4] tracking-tight">
              Hardware Catalog
            </h2>
            <span className="font-mono text-xs text-[#0f62fe] bg-[#0f62fe]/10 border border-[#0f62fe]/30 px-2 py-0.5">
              [{filteredProducts.length} ITEMS]
            </span>
          </div>
          <p className="text-xs text-[#8d8d8d] font-mono mt-0.5">
            // FILTERING AT HARDWARE SPEED • ZERO EXTERNAL DEPENDENCY
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#262626] border border-[#393939] text-xs font-mono text-[#f4f4f4]"
          >
            <Filter className="w-3.5 h-3.5 text-[#0f62fe]" />
            <span>FILTERS {hasActiveFilters ? '• ACTIVE' : ''}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#262626] px-3 py-1.5 border border-[#393939]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8d8d8d]" />
            <span className="text-[11px] font-mono text-[#8d8d8d] hidden sm:inline">SORT:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="text-xs font-mono font-semibold text-[#f4f4f4] bg-transparent border-none outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-[#262626] text-[#f4f4f4]">Featured Standard</option>
              <option value="price-asc" className="bg-[#262626] text-[#f4f4f4]">Price: Ascending</option>
              <option value="price-desc" className="bg-[#262626] text-[#f4f4f4]">Price: Descending</option>
              <option value="rating-desc" className="bg-[#262626] text-[#f4f4f4]">Rating: Highest</option>
              <option value="reviews-desc" className="bg-[#262626] text-[#f4f4f4]">Reviews: Most</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-3 font-mono text-xs">
          <span className="text-[#8d8d8d]">FILTERS APPLIED:</span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262626] text-[#f4f4f4] border border-[#393939]">
              CATEGORY: {categories.find(c => c.id === selectedCategory)?.name.toUpperCase()}
              <button onClick={() => setSelectedCategory('all')} className="hover:text-[#da1e28]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262626] text-[#f4f4f4] border border-[#393939]">
              QUERY: "{searchQuery.toUpperCase()}"
              <button onClick={() => setSearchQuery('')} className="hover:text-[#da1e28]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxPrice < 1000 && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262626] text-[#f4f4f4] border border-[#393939]">
              MAX: ${maxPrice}
              <button onClick={() => setMaxPrice(1000)} className="hover:text-[#da1e28]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262626] text-[#f4f4f4] border border-[#393939]">
              IN-STOCK ONLY
              <button onClick={() => setOnlyInStock(false)} className="hover:text-[#da1e28]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262626] text-[#f4f4f4] border border-[#393939]">
              RATING: {minRating}★+
              <button onClick={() => setMinRating(0)} className="hover:text-[#da1e28]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[#da1e28] hover:underline uppercase text-[11px] ml-1"
          >
            [CLEAR ALL]
          </button>
        </div>
      )}

      {/* Main Catalog 2x Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 bg-[#262626] p-4 border border-[#393939]">
            <FilterSidebarContent />
          </div>
        </aside>

        {/* Product Grid (9 cols) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#262626] border border-[#393939] p-12 text-center max-w-lg mx-auto my-6 font-mono">
              <Search className="w-8 h-8 text-[#8d8d8d] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#f4f4f4]">NO MATCHING HARDWARE</h3>
              <p className="text-xs text-[#8d8d8d] mt-1">
                Zero products matched the active filter parameters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#0f62fe] text-white text-xs font-bold uppercase hover:bg-[#0353e9]"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs"
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#161616] h-full border-l border-[#393939] shadow-2xl flex flex-col p-5 z-10 animate-carbon-drawer overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#393939]">
              <h3 className="font-mono text-sm font-bold text-[#f4f4f4] uppercase">
                // FILTER CATALOG
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#8d8d8d] hover:text-[#f4f4f4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <FilterSidebarContent />
            </div>

            <div className="mt-auto pt-4 border-t border-[#393939]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white font-mono text-xs uppercase py-3"
              >
                VIEW {filteredProducts.length} RESULTS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
