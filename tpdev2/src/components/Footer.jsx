import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Send, 
  Check, 
  ShieldCheck, 
  Terminal,
  Globe,
  Share2,
  MessageCircle,
  Mail
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Footer({ onCategorySelect }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#161616] text-[#c6c6c6] text-xs border-t border-[#393939] font-mono">
      {/* Newsletter Bar */}
      <div className="border-b border-[#393939] bg-[#262626]">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#161616] border border-[#393939] text-[#0f62fe] text-[10px] font-bold">
                <span>// VIP HARDWARE TELEMETRY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f4] tracking-tight font-sans">
                Subscribe for private releases & 15% discount
              </h3>
              <p className="text-xs text-[#8d8d8d] max-w-md mx-auto lg:mx-0 font-sans">
                Curated technical dispatches on new physical instruments and workspace architecture.
              </p>
            </div>

            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="p-3 bg-[#161616] border border-[#24a148] text-[#24a148] flex items-center justify-center gap-2 max-w-md mx-auto lg:ml-auto">
                  <Check className="w-4 h-4 text-[#24a148] shrink-0" />
                  <span className="font-bold text-xs">
                    SUBSCRIPTION ACTIVE // USE COUPON [WELCOME] AT CHECKOUT
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto lg:ml-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER CORPORATE OR PERSONAL EMAIL"
                    className="flex-1 bg-[#161616] border border-[#393939] px-4 py-2.5 text-xs text-[#f4f4f4] outline-none focus:border-[#0f62fe]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0f62fe] hover:bg-[#0353e9] text-white font-bold text-xs uppercase flex items-center gap-2 shrink-0 transition-colors"
                  >
                    <span>DISPATCH</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#0f62fe] flex items-center justify-center text-white font-bold text-xs">
                IBM
              </div>
              <span className="text-base font-bold text-[#f4f4f4] tracking-tight font-sans">
                AURA STORE // CARBON v11
              </span>
            </div>

            <p className="text-xs text-[#8d8d8d] leading-relaxed max-w-sm font-sans font-light">
              Architected strictly under the IBM Design Language guidelines: flat 0px geometry, high-contrast monochrome gray scale, IBM Plex typography, and 100% static in-memory execution.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[#8d8d8d]">
              <a href="#" className="p-2 bg-[#262626] border border-[#393939] hover:text-[#f4f4f4] hover:border-[#0f62fe]" title="Global Link">
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-[#262626] border border-[#393939] hover:text-[#f4f4f4] hover:border-[#0f62fe]" title="Telemetry">
                <Terminal className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-[#262626] border border-[#393939] hover:text-[#f4f4f4] hover:border-[#0f62fe]" title="Concierge">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-[#262626] border border-[#393939] hover:text-[#f4f4f4] hover:border-[#0f62fe]" title="Dispatch Mail">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#f4f4f4] mb-3">
              // CATEGORIES
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      if (onCategorySelect) onCategorySelect(cat.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-[#0f62fe] transition-colors text-left"
                  >
                    {cat.name.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#f4f4f4] mb-3">
              // SUPPORT SPEC
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#0f62fe] transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#0f62fe] transition-colors">Logistics & Returns</a></li>
              <li><a href="#" className="hover:text-[#0f62fe] transition-colors">Hardware Warranty Claim</a></li>
              <li><a href="#" className="hover:text-[#0f62fe] transition-colors">Carbon Design Docs</a></li>
            </ul>
          </div>

          {/* System Specs */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#f4f4f4] mb-3">
              // ARCHITECTURE
            </h4>
            <ul className="space-y-2 text-xs text-[#8d8d8d]">
              <li className="flex items-center gap-1.5 text-[#24a148]">
                <span>●</span>
                <span>Zero Database Latency</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#24a148]">
                <span>●</span>
                <span>100% In-Memory State</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#24a148]">
                <span>●</span>
                <span>IBM Plex Sans & Mono</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#24a148]">
                <span>●</span>
                <span>0px Sharp Carbon Borders</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-6 mt-8 border-t border-[#393939] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#8d8d8d]">
          <p>© {new Date().getFullYear()} AURA STORE // IBM DESIGN LANGUAGE & CARBON DESIGN SYSTEM.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#24a148]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SIMULATED SSL 256-BIT ENCRYPTED</span>
            </span>
            <span>•</span>
            <span>TERMS // SPECIFICATION v4.2</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
