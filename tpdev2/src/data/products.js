export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'audio', name: 'Premium Audio', icon: 'Headphones' },
  { id: 'wearables', name: 'Wearables', icon: 'Watch' },
  { id: 'workspace', name: 'Desk & Workspace', icon: 'Laptop' },
  { id: 'lifestyle', name: 'Everyday Carry', icon: 'Package' },
  { id: 'cameras', name: 'Photography', icon: 'Camera' }
];

export const PROMO_CODES = {
  'AURA10': { discountPercent: 10, label: '10% Off Everything' },
  'SUPER20': { discountPercent: 20, label: '20% Off Spring Sale' },
  'WELCOME': { discountAmount: 15, label: '$15 Welcome Gift (Min $50)' }
};

export const STATIC_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'AcousticPro Studio Wireless',
    tagline: 'Lossless spatial audio with active noise cancellation',
    category: 'audio',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 18,
    badge: 'Bestseller',
    badgeColor: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1c1917' },
      { name: 'Lunar Silver', hex: '#cbd5e1' },
      { name: 'Midnight Navy', hex: '#1e293b' }
    ],
    description: 'Precision engineered 40mm titanium drivers deliver transcendent acoustics. Featuring 4-tier adaptive active noise cancellation, transparency mode, and ultra-plush memory foam cushions for all-day comfort.',
    features: [
      'Custom tuned 40mm beryllium diaphragm drivers',
      'Adaptive Hybrid Active Noise Cancelling (ANC)',
      'Up to 45 hours battery life with quick-charge (3 hrs on 10 min)',
      'Multi-point Bluetooth 5.3 connection with zero lag',
      'Aircraft-grade aluminum headband with vegan leather'
    ],
    specs: {
      'Driver Size': '40mm Titanium Dome',
      'Frequency Response': '10Hz – 40,000Hz',
      'Battery Life': '45 hours (ANC off) / 36 hours (ANC on)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux & USB-C Audio',
      'Weight': '255g',
      'Warranty': '2 Years Replacement'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Elena Rostova',
        rating: 5,
        date: '2 days ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        comment: 'The soundstage is breathtaking. ANC easily beats my old pairs on long haul flights. Superb build quality!'
      },
      {
        id: 'r2',
        author: 'Marcus Vance',
        rating: 5,
        date: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        comment: 'Incredible clarity across mids and highs, punchy bass without being muddy. Battery life is easily 40+ hours.'
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Chronos Horizon Smartwatch',
    tagline: 'Titanium chassis with sapphire AMOLED display',
    category: 'wearables',
    price: 389,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockCount: 12,
    badge: 'Staff Pick',
    badgeColor: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Brushed Titanium', hex: '#64748b' },
      { name: 'Obsidian Black', hex: '#09090b' },
      { name: 'Rose Gold', hex: '#e2b3a3' }
    ],
    description: 'Forged from aerospace-grade titanium with an always-on 1.43” AMOLED sapphire crystal touchscreen. Features dual-frequency GPS, biometric sensors, and waterproof depth rating to 50 meters.',
    features: [
      'Grade 5 Titanium casing with sapphire scratch-proof glass',
      'Continuous ECG, SpO2, HRV, and sleep phase monitoring',
      'Up to 14 days normal battery life or 38 hours continuous GPS',
      'Water resistant to 5 ATM (50m immersion)',
      'Offline maps navigation & voice assistant support'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466 (1000 nits)',
      'Case Material': 'Grade 5 Aerospace Titanium',
      'Water Resistance': '5 ATM / 50 meters',
      'Sensors': 'Optical heart rate, SpO2, ECG, Barometer, Gyroscope',
      'Battery': '420mAh (Up to 14 days)',
      'Compatibility': 'iOS & Android'
    },
    reviews: [
      {
        id: 'r3',
        author: 'Liam Chen',
        rating: 5,
        date: '3 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        comment: 'Finally a smartwatch that looks like high horology while providing exact GPS tracking on trails.'
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'Lumio Minimal Mechanical Keyboard',
    tagline: 'Gasket-mounted hot-swap wireless keyboard',
    category: 'workspace',
    price: 179,
    originalPrice: 219,
    rating: 4.9,
    reviewCount: 215,
    inStock: true,
    stockCount: 24,
    badge: 'Popular',
    badgeColor: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Retro Grey', hex: '#71717a' },
      { name: 'Chalk White', hex: '#f8fafc' },
      { name: 'Nordic Navy', hex: '#1e3a8a' }
    ],
    description: 'Designed for effortless typing acoustics. Featuring CNC-machined anodized aluminum, poron gasket sound dampeners, pre-lubed linear switches, and dye-sublimated PBT keycaps.',
    features: [
      'Gasket mount structure with 5-layer acoustic dampening',
      'Hot-swappable PCB compatible with 3-pin and 5-pin switches',
      'Tri-mode connection: 2.4GHz wireless, Bluetooth 5.1, USB-C wired',
      'South-facing RGB backlighting with 18 dynamic effects',
      'Double-shot PBT keycaps resistant to shine and oils'
    ],
    specs: {
      'Layout': '75% Compact (82 keys + rotary knob)',
      'Switches': 'Factory-lubed Gateron Yellow Pro Linear',
      'Weight': '1.35 kg (Anodized Aluminum Case)',
      'Battery': '4000mAh (Up to 200 hours backlights off)',
      'Connectivity': '2.4GHz Dongle, BT 5.1, Type-C'
    },
    reviews: [
      {
        id: 'r4',
        author: 'Sophie Martin',
        rating: 5,
        date: '4 days ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        comment: 'The typing sound is deep and marbly straight out of the box. No rattles on the spacebar at all.'
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Terra Leather Everyday Pack',
    tagline: 'Full-grain vegetable-tanned leather 22L commuter pack',
    category: 'lifestyle',
    price: 245,
    originalPrice: 290,
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    stockCount: 8,
    badge: 'Handcrafted',
    badgeColor: 'bg-amber-700',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#9a3412' },
      { name: 'Charcoal Black', hex: '#18181b' },
      { name: 'Hunter Green', hex: '#14532d' }
    ],
    description: 'Handcrafted from full-grain Tuscan leather that patinas richly over time. Fits up to a 16-inch laptop with padded fleece lining, quick-access magnetic closures, and hidden luggage pass-through.',
    features: [
      'Full-grain vegetable-tanned Italian leather',
      'Dedicated padded 16" MacBook compartment',
      'YKK Excella weather-resistant brass zippers',
      'Magnetic Fidlock sternum strap & luggage sleeve',
      'Lifetime repair guarantee on craftsmanship'
    ],
    specs: {
      'Capacity': '22 Liters',
      'Dimensions': '46cm x 31cm x 15cm',
      'Laptop Pocket': 'Up to 16-inch laptops',
      'Hardware': 'Solid Brass with Gunmetal finish',
      'Weight': '1.18 kg'
    },
    reviews: [
      {
        id: 'r5',
        author: 'Julian Thorne',
        rating: 5,
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        comment: 'Leather smell is divine and construction is indestructible. Already getting tons of compliments at the office.'
      }
    ]
  },
  {
    id: 'prod-005',
    name: 'Apex 35mm Rangefinder Camera',
    tagline: 'Modern retro compact with 40MP full-frame sensor',
    category: 'cameras',
    price: 899,
    originalPrice: 999,
    rating: 4.95,
    reviewCount: 52,
    inStock: true,
    stockCount: 5,
    badge: 'Limited Stock',
    badgeColor: 'bg-rose-600',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Silver Chrome', hex: '#e2e8f0' },
      { name: 'Matte Stealth', hex: '#27272a' }
    ],
    description: 'A tribute to classical photojournalism. Featuring a tactile manual shutter dial, integrated electronic viewfinder with optical overlay, and built-in film simulation profiles for timeless tones.',
    features: [
      '40.2 MP BSI CMOS sensor with 5-axis IBIS',
      'Hybrid rangefinder viewfinder (OLED + Optical)',
      'Machined brass mechanical controls and aperture ring',
      'Built-in 4-stop ND filter and film simulation presets',
      'Dual UHS-II SD slots & high-speed Wi-Fi transfer'
    ],
    specs: {
      'Sensor': '40.2 MP Full-Frame BSI CMOS',
      'Lens Mount': 'M-Mount compatible / 35mm F/2.0 Prime',
      'ISO Range': '64 – 51,200',
      'Video': '4K Cinema 60p 10-bit',
      'Weight': '495g (with battery)'
    },
    reviews: [
      {
        id: 'r6',
        author: 'Camille Delacroix',
        rating: 5,
        date: '1 month ago',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        comment: 'Pure joy to shoot with. The physical dials make you slow down and compose with intention.'
      }
    ]
  },
  {
    id: 'prod-006',
    name: 'AuraPod ANC True Wireless',
    tagline: 'Hi-Res certified wireless earbuds with spatial audio',
    category: 'audio',
    price: 149,
    originalPrice: 189,
    rating: 4.8,
    reviewCount: 310,
    inStock: true,
    stockCount: 35,
    badge: 'Hot Deal',
    badgeColor: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Ceramic White', hex: '#fafaf9' },
      { name: 'Space Grey', hex: '#3f3f46' },
      { name: 'Sage Mist', hex: '#a7b7a6' }
    ],
    description: 'Compact wireless earbuds with monster acoustics. Custom LDAC codec support brings studio-grade 24-bit audio directly to your pocket with 32 hours total playtime.',
    features: [
      'Custom 11mm coaxial dual drivers with dynamic bass',
      'Adaptive active noise cancellation reduces noise up to 48dB',
      '6 beamforming mics with AI wind-noise suppression',
      'IP54 dust and splash resistant rating',
      'Qi wireless charging case with magnetic lid'
    ],
    specs: {
      'Playtime': '8.5h (buds) / 32h (with charging case)',
      'Waterproof': 'IP54 splash & sweatproof',
      'Codecs': 'LDAC, AAC, SBC, aptX Adaptive',
      'Charging': 'USB-C + Qi Wireless charging',
      'Weight': '4.8g per earbud'
    },
    reviews: [
      {
        id: 'r7',
        author: 'David K.',
        rating: 5,
        date: '5 days ago',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        comment: 'Call quality is remarkably clear even on windy streets. The sound isolation is fantastic.'
      }
    ]
  },
  {
    id: 'prod-007',
    name: 'Artisan Walnut Monitor Stand & Hub',
    tagline: 'Solid American walnut stand with integrated 100W GaN hub',
    category: 'workspace',
    price: 139,
    originalPrice: 165,
    rating: 4.85,
    reviewCount: 78,
    inStock: true,
    stockCount: 15,
    badge: 'Eco-Craft',
    badgeColor: 'bg-emerald-700',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Dark Walnut', hex: '#5c3d2e' },
      { name: 'Natural Oak', hex: '#d4a373' }
    ],
    description: 'Elevate your display to the ergonomic sweet spot while decluttering your desk. Crafted from solid sustainable American walnut with integrated USB-C 100W power delivery and HDMI 2.1 ports.',
    features: [
      'Solid hardwood harvested from FSC-certified forests',
      'Integrated hidden 6-in-1 USB-C Hub (4K 120Hz HDMI, USB 3.2, SD)',
      'Accommodates dual monitors or single Ultrawide displays',
      'Cork base pads prevent scratches and vibration',
      'Hand-finished with natural organic Danish oil'
    ],
    specs: {
      'Material': 'Solid American Walnut / Aluminum Accent',
      'Weight Capacity': '45 kg / 100 lbs',
      'Dimensions': '108cm x 23cm x 11cm',
      'Ports': '2x USB-C PD, 2x USB-A 3.2, 1x HDMI 2.1, MicroSD'
    },
    reviews: [
      {
        id: 'r8',
        author: 'Hannah Brooks',
        rating: 5,
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        comment: 'Transformative for my desk setup. The wood grain is gorgeous and the built-in USB-C hub is invisible.'
      }
    ]
  },
  {
    id: 'prod-008',
    name: 'Strata Precision Sunglasses',
    tagline: 'Polarized Carl Zeiss lenses in aerospace titanium frames',
    category: 'lifestyle',
    price: 195,
    originalPrice: 220,
    rating: 4.75,
    reviewCount: 43,
    inStock: true,
    stockCount: 20,
    badge: 'UV400 Polarized',
    badgeColor: 'bg-sky-600',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Brushed Gunmetal', hex: '#374151' },
      { name: 'Warm Gold', hex: '#ca8a04' },
      { name: 'Matte Onyx', hex: '#111827' }
    ],
    description: 'Featherlight 18-gram titanium frames fitted with German Carl Zeiss polarized optics. Eliminates glare while providing crisp optical clarity in harsh sunlight.',
    features: [
      'Carl Zeiss anti-reflective oleophobic polarized lenses',
      'Beta-titanium flexible memory temples',
      'Medical-grade silicone hypoallergenic nose pads',
      '100% protection against UVA, UVB, and harmful blue light',
      'Includes crushproof magnetic leather travel case'
    ],
    specs: {
      'Frame Material': 'Beta-Titanium Alloy',
      'Lens Type': 'Zeiss Polarized Tri-Acetate',
      'Weight': '18.5 grams',
      'UV Protection': 'UV400 (100% UVA/UVB)',
      'Dimensions': '51-19-145mm'
    },
    reviews: [
      {
        id: 'r9',
        author: 'Noah Bennett',
        rating: 5,
        date: '3 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
        comment: 'So light you forget you are wearing them. The clarity while driving through direct sun is uncanny.'
      }
    ]
  },
  {
    id: 'prod-009',
    name: 'Vortex Soundbar & Subwoofer Mini',
    tagline: 'Dolby Atmos 3.1 spatial audio in a minimal architectural form',
    category: 'audio',
    price: 349,
    originalPrice: 399,
    rating: 4.88,
    reviewCount: 89,
    inStock: true,
    stockCount: 10,
    badge: 'Dolby Atmos',
    badgeColor: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Graphite Grey', hex: '#334155' },
      { name: 'Crisp White', hex: '#f8fafc' }
    ],
    description: 'Immersive cinema audio engineered for modern living rooms and desktop suites. Dedicated center channel delivers crystal-clear dialogue with punchy wireless low-end subwoofer.',
    features: [
      'Dolby Atmos and DTS:X virtual surround sound processing',
      'Wireless compact down-firing subwoofer (sub 35Hz response)',
      'eARC HDMI passthrough with 4K HDR and Apple AirPlay 2',
      'Room-calibration acoustics using internal mic array',
      'Kvadrat acoustic fabric cover with brushed aluminum endcaps'
    ],
    specs: {
      'Channels': '3.1 Channel Dolby Atmos',
      'Total Power': '240W Peak',
      'Inputs': 'HDMI eARC, Optical, AUX, Bluetooth 5.2, Wi-Fi',
      'Soundbar Dimensions': '65cm x 7cm x 10cm'
    },
    reviews: [
      {
        id: 'r10',
        author: 'Rachel Adams',
        rating: 5,
        date: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        comment: 'Dialogue clarity in movies improved instantly. Incredible sound output for such a sleek footprint.'
      }
    ]
  },
  {
    id: 'prod-010',
    name: 'Orbit Smart Ring Tracker',
    tagline: 'Ultralight titanium health tracking for sleep, HRV & recovery',
    category: 'wearables',
    price: 279,
    originalPrice: 319,
    rating: 4.65,
    reviewCount: 112,
    inStock: false,
    stockCount: 0,
    badge: 'Restocking Soon',
    badgeColor: 'bg-slate-600',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Polished Silver', hex: '#cbd5e1' },
      { name: 'Rose Gold', hex: '#fbcfe8' }
    ],
    description: 'All your body’s vital signs captured seamlessly from your finger. No screens, no distractions, just pure biomarker intelligence synced directly to your phone.',
    features: [
      'Medical-grade PPG sensors for heart rate and SpO2 tracking',
      'Body temperature trend monitoring and sleep stage evaluation',
      'Waterproof up to 100 meters (surfs, pools, saunas)',
      'Featherweight 3-gram aerospace titanium shell',
      'Up to 7 days battery with fast magnetic charging cradle'
    ],
    specs: {
      'Weight': '3.2g',
      'Material': 'Aerospace Grade Titanium with DLC coating',
      'Water Resistance': '100m (10 ATM)',
      'Battery': '7 days between charges',
      'Sizes': 'US sizes 6 through 13 available'
    },
    reviews: [
      {
        id: 'r11',
        author: 'Alexandre Roy',
        rating: 4,
        date: '3 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        comment: 'Love that I do not need a glowing screen on my wrist while sleeping. Readiness scores are very accurate.'
      }
    ]
  },
  {
    id: 'prod-011',
    name: 'Nomad MagSafe PowerBank 10K',
    tagline: 'Anodized aluminum fast-charging magnetic battery',
    category: 'lifestyle',
    price: 69,
    originalPrice: 85,
    rating: 4.82,
    reviewCount: 175,
    inStock: true,
    stockCount: 42,
    badge: 'Popular',
    badgeColor: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Space Grey', hex: '#475569' },
      { name: 'Alpine Silver', hex: '#e2e8f0' }
    ],
    description: 'Snap on and charge wirelessly at up to 15W. Ultra-slim profile slips directly into your pocket while charging, with pass-through capability and USB-C 30W bi-directional power delivery.',
    features: [
      '10,000mAh capacity (charges iPhone up to 2.4 times)',
      '15W Qi2 / MagSafe certified magnetic alignment',
      '30W USB-C PD fast port charges MacBook Air or iPad',
      'OLED battery percentage and discharge rate indicator',
      'Aircraft-grade machined aluminum enclosure'
    ],
    specs: {
      'Capacity': '10,000 mAh / 38.5Wh',
      'Output': '15W Wireless + 30W USB-C PD',
      'Weight': '210 grams',
      'Dimensions': '102mm x 66mm x 14.5mm'
    },
    reviews: [
      {
        id: 'r12',
        author: 'Samantha Lee',
        rating: 5,
        date: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        comment: 'Strong magnets that stay firmly on my phone in my purse. Charges super fast.'
      }
    ]
  },
  {
    id: 'prod-012',
    name: 'Solace Ergonomic Desk Task Chair',
    tagline: 'Self-adjusting dynamic lumbar with breathable mesh',
    category: 'workspace',
    price: 499,
    originalPrice: 599,
    rating: 4.91,
    reviewCount: 84,
    inStock: true,
    stockCount: 7,
    badge: 'Ergonomic Choice',
    badgeColor: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1580481077195-c228c46002f5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481077195-c228c46002f5?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#1e293b' },
      { name: 'Slate Grey', hex: '#64748b' }
    ],
    description: 'Engineered for 12+ hour focus sessions. Features synchronized recline kinematics, 4D adjustable armrests, and tensioned elastomer weave that conforms automatically to posture changes.',
    features: [
      'Auto-calibrated dynamic lumbar spine curve support',
      'Breathable German woven elastomeric cooling mesh',
      '4D multi-directional soft armrests (height, depth, angle, width)',
      'Heavy-duty cast aluminum base with rollerblade caster wheels',
      '10-year comprehensive mechanical warranty'
    ],
    specs: {
      'Max Weight': '150 kg / 330 lbs',
      'Adjustability': 'Pneumatic height, tilt-lock (4 angles), seat-depth',
      'Frame': 'Cast Aluminum & Engineered Polymer',
      'Casters': 'Hardwood and carpet safe silent wheels'
    },
    reviews: [
      {
        id: 'r13',
        author: 'Daniel Craig',
        rating: 5,
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        comment: 'Cured my lower back fatigue within three days. Outstanding build quality and silent recline.'
      }
    ]
  }
];
