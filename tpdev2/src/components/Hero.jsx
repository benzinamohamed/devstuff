import React from 'react';
import { ArrowRight, Terminal, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedProduct, addToCart } from '../store';
import { STATIC_PRODUCTS } from '../data/products';

export default function Hero({ onExploreClick }) {
  const dispatch = useDispatch();
  const featuredProduct = STATIC_PRODUCTS[0]; // AcousticPro Studio Wireless

  return (
    <section className="relative bg-[#161616] border-b border-[#393939] text-[#f4f4f4] py-12 md:py-16">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): IBM Design Statements */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#262626] border border-[#393939] text-xs font-mono text-[#0f62fe]">
              <Terminal className="w-3.5 h-3.5" />
              <span>IBM DESIGN LANGUAGE // CARBON v11 SYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f4f4f4] leading-[1.1]">
              Engineered with <br />
              <span className="text-[#0f62fe] font-light">
                Carbon Precision.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#c6c6c6] max-w-2xl font-light leading-relaxed">
              Curated hardware designed around the principles of simplicity, clarity, and rational architecture. Zero database latency, 100% static client execution, and strict 2x grid geometry.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="h-12 px-6 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white font-mono text-xs uppercase tracking-wider flex items-center gap-3 transition-colors"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => dispatch(setSelectedProduct(featuredProduct))}
                className="h-12 px-6 bg-[#262626] hover:bg-[#353535] border border-[#393939] text-[#f4f4f4] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Inspect Spotlight Spec</span>
              </button>
            </div>

            {/* IBM Metric Grid */}
            <div className="pt-6 border-t border-[#393939] grid grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#262626]/60 border border-[#393939]">
                <span className="text-[10px] text-[#8d8d8d] uppercase block">Hardware Items</span>
                <span className="text-xl font-bold text-[#f4f4f4]">12 UNITS</span>
              </div>
              <div className="p-3 bg-[#262626]/60 border border-[#393939]">
                <span className="text-[10px] text-[#8d8d8d] uppercase block">Carbon Grid</span>
                <span className="text-xl font-bold text-[#f4f4f4]">2X PRECISION</span>
              </div>
              <div className="p-3 bg-[#262626]/60 border border-[#393939]">
                <span className="text-[10px] text-[#8d8d8d] uppercase block">Server Latency</span>
                <span className="text-xl font-bold text-[#24a148]">0.0 MS</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Spotlight Carbon Tile */}
          <div className="lg:col-span-5">
            <div className="bg-[#262626] border border-[#393939] p-5 relative group hover:border-[#0f62fe] transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-[#393939] text-[11px] font-mono">
                <span className="text-[#0f62fe] font-bold uppercase tracking-wider">
                  FEATURED HARDWARE // SKU {featuredProduct.id}
                </span>
                <span className="text-[#24a148] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#24a148] inline-block" />
                  AVAILABLE
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#161616] my-4 border border-[#393939] overflow-hidden">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#161616] border border-[#393939] px-2 py-0.5 text-[10px] font-mono text-[#f4f4f4]">
                  40MM TITANIUM ANC
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-[#f4f4f4]">
                    {featuredProduct.name}
                  </h3>
                  <div className="font-mono text-right">
                    <span className="text-xl font-bold text-[#f4f4f4]">
                      ${featuredProduct.price}
                    </span>
                    <span className="ml-2 text-xs text-[#8d8d8d] line-through">
                      ${featuredProduct.originalPrice}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#c6c6c6] font-light leading-relaxed">
                  {featuredProduct.tagline}
                </p>

                <div className="pt-3 flex gap-2">
                  <button
                    onClick={() => dispatch(addToCart(featuredProduct, 1))}
                    className="flex-1 h-10 bg-[#0f62fe] hover:bg-[#0353e9] text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Add to Order</span>
                    <span className="font-bold">| ${featuredProduct.price}</span>
                  </button>
                  <button
                    onClick={() => dispatch(setSelectedProduct(featuredProduct))}
                    className="h-10 px-4 bg-[#393939] hover:bg-[#525252] text-[#f4f4f4] font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    Specs
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
