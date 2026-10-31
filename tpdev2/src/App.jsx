import React, { useState } from 'react';
import { STATIC_PRODUCTS, CATEGORIES } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleExploreClick = () => {
    const catalogElement = document.getElementById('products-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#161616] flex flex-col text-[#f4f4f4] font-['IBM_Plex_Sans',sans-serif] selection:bg-[#0f62fe] selection:text-white">
        
        {/* Sticky Carbon Header */}
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
          onOpenFiltersMobile={() => setIsMobileFilterOpen(true)}
        />

        {/* Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Trust & Guarantee Badges */}
        <TrustBadges />

        {/* Main Products Grid, Sidebar Filters & Search */}
        <main className="flex-1 bg-[#161616]">
          <ProductGrid
            products={STATIC_PRODUCTS}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
          />
        </main>

        {/* Global Drawers & Modals */}
        <ProductModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <Toast />

        {/* Footer */}
        <Footer onCategorySelect={(catId) => setSelectedCategory(catId)} />

      </div>
  );
}
