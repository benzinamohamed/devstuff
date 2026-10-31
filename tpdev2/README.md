# AURA Store - Static React E-Commerce Application

A modern, curated, high-performance e-commerce store built entirely with **React**, **Tailwind CSS**, and **Vite**. Everything is statically rendered and client-side managed—zero external database, zero API latency, and 100% offline-ready with `localStorage` persistence.

---

## 🌟 Key Features

- **100% Static & Client-Side**:
  - Full product catalog with high-resolution imagery, detailed tech specs, customer reviews, and finish/color options.
  - Sub-millisecond instant search across product titles, tags, and descriptions.
  - Multi-category navigation (Audio, Wearables, Workspace, Lifestyle, Cameras).
  - Price range slider, customer rating filter (4.7★+, 4.9★+), and stock availability filter ("In Stock Only").
  - Multi-criteria sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated, Most Reviews).

- **Rich Product Quick View / Detail Modal**:
  - Interactive multi-photo gallery thumbnail switcher.
  - Color finish picker with real-time swatch feedback.
  - Dynamic quantity stepper.
  - Tabbed interface switching between **Features**, **Technical Specs**, and **Customer Reviews**.
  - Direct "Add to Cart" and "Save to Wishlist" actions.

- **Full-Featured Cart Drawer**:
  - Slide-out cart drawer with item count and live totals.
  - Free Worldwide Shipping progress bar with dynamic target ($150 threshold).
  - Quantity controls (`+` / `-`) and item removal with confirmation.
  - Active static coupon code engine supporting discount percentages and dollar discounts:
    - `AURA10` — 10% Off Everything
    - `SUPER20` — 20% Off Spring Sale
    - `WELCOME` — $15 Welcome Gift
  - Clear cart and price breakdown (Subtotal, Discount, Shipping, Tax, Total).

- **Wishlist Drawer**:
  - Save items with the heart button.
  - Move wishlisted items directly to cart.
  - Quick remove and clear actions.

- **Simulated 2-Step Checkout & Printable Receipt**:
  - **Step 1**: Shipping & contact details form.
  - **Step 2**: Payment method selector (Credit Card simulation with demo credentials, Apple Pay simulation, Cash on Delivery).
  - **Step 3**: Generates a complete order confirmation receipt with simulated Order ID (`#AURA-XXXXXX`), timestamps, itemized receipts, customer delivery summary, and browser print/save receipt support.

- **Toast Notifications System**:
  - Real-time feedback for cart updates, wishlist changes, and coupon validations.

---

## 🚀 Quick Start

### 1. Development Server
To launch the development server on `http://localhost:3000`:
```bash
npm run dev
```

### 2. Production Build
To create an optimized production build:
```bash
npm run build
```

### 3. Production Preview
To preview the generated static build locally:
```bash
npm run preview
```

---

## 📁 Project Architecture

```
tpdev2/
├── index.html                 # App shell with Google Fonts & Meta tags
├── package.json               # Dependencies (React 18, Lucide React, Tailwind, Vite)
├── tailwind.config.js         # Custom colors and typography config
├── vite.config.js             # Vite configuration with React plugin
├── src/
│   ├── main.jsx               # React DOM entrypoint
│   ├── App.jsx                # Main layout orchestrator
│   ├── index.css              # Tailwind directives and custom scrollbar animations
│   ├── data/
│   │   └── products.js        # Static products, categories & coupon codes data
│   ├── context/
│   │   └── CartContext.jsx    # Client-side state (Cart, Wishlist, Coupons, Orders, Toasts)
│   └── components/
│       ├── Navbar.jsx         # Header with search, categories, cart/wishlist counters
│       ├── Hero.jsx           # Banner spotlighting featured hero product
│       ├── TrustBadges.jsx    # Value proposition guarantees
│       ├── ProductCard.jsx    # Individual product card with swatches and actions
│       ├── ProductGrid.jsx    # Filter sidebar + product listing + empty states
│       ├── ProductModal.jsx   # Deep-dive Quick View modal with tabs and gallery
│       ├── CartDrawer.jsx     # Slide-over cart with shipping meter and promo codes
│       ├── WishlistDrawer.jsx # Slide-over wishlist manager
│       ├── CheckoutModal.jsx  # Multi-step checkout simulation & order receipt
│       ├── Toast.jsx          # Non-blocking floating status alerts
│       └── Footer.jsx         # Newsletter signup and static specs info
```

---

## 🛠️ Adding New Static Products

To add or modify products, edit [src/data/products.js](src/data/products.js):

```javascript
{
  id: 'prod-013',
  name: 'Your Product Name',
  tagline: 'Short catchy subtitle',
  category: 'audio', // or 'wearables', 'workspace', 'lifestyle', 'cameras'
  price: 199,
  originalPrice: 249,
  rating: 4.9,
  reviewCount: 35,
  inStock: true,
  stockCount: 15,
  badge: 'New Release',
  badgeColor: 'bg-indigo-600',
  image: 'https://images.unsplash.com/...',
  gallery: ['https://images.unsplash.com/...'],
  colors: [
    { name: 'Matte Black', hex: '#1c1917' },
    { name: 'Silver', hex: '#cbd5e1' }
  ],
  description: 'Detailed product description...',
  features: ['Feature 1', 'Feature 2'],
  specs: { 'Battery': '30 Hours', 'Weight': '210g' },
  reviews: [...]
}
```
