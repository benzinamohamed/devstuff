# Benzina Mohamed - Web Developer Portfolio

A responsive, and interactive personal portfolio website for **Benzina Mohamed**, Web Developer with 2 years of experience. Built with **Pure JavaScript (Vanilla ES6+)**, **HTML5**, and **Modern CSS3** — zero external frameworks or heavy libraries.

---

## 🌟 Key Features

### 💻 Pure JavaScript Features
- **Hero Typing Animation**: Dynamic auto-typing & backspacing effect with variable speed.
- **Light / Dark Mode Theme Switcher**: Instant theme swap with persistence stored in `localStorage`.
- **Animated Number Counter**: Eased statistical counters that trigger smoothly when scrolled into view.
- **Interactive Skills Filter**: Category-based filtering (Frontend, Backend, Tools) with animated skill level indicators.
- **Project Showcase & Filter**: Filter projects by type with smooth transition animations.
- **Interactive Project Modal**: Deep-dive popup for individual project details, key technical accomplishments, and links.
- **Responsive Navigation & ScrollSpy**:
  - Sticky frosted-glass navbar on scroll.
  - Active link highlight matching the current viewport section.
  - Accessible mobile hamburger menu drawer with smooth backdrop blur.
- **Form Validation & Toast Notification Engine**:
  - Client-side validation with real-time error clearance.
  - Floating toast notifications for feedback (success / error states).
- **Back to Top Floating Button**: Smooth scrolling navigation.

### 🎨 Design & CSS
- **Design System**: CSS Custom Properties (`--variables`) for colors, shadows, and spacing.
- **Mobile-First & Fully Responsive**: Optimized across smartphones, tablets, laptops, and ultra-wide screens.
- **Modern UI Elements**: Glassmorphism, floating tech badges, soft glow gradients, and subtle micro-interactions.
- **Typography & Icons**: Styled with Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*) and FontAwesome icons.

---

## 📁 File Structure

```text
├── index.html        # Semantic HTML5 markup, structured sections, and SEO meta tags
├── styles.css        # Responsive styling, CSS variables, dark/light themes, animations
├── script.js         # Pure Vanilla JS (theme toggle, scrollspy, modal, typing, form validation)
└── README.md         # Documentation & setup guide
```

---

## 🚀 How to Run Locally

You don't need any complex build tools. You can run it with any static server or simply open `index.html` in your web browser:

### Option 1: Direct File Opening
Double-click `index.html` or open it with Google Chrome, Firefox, Safari, or Edge.

### Option 2: Using Python HTTP Server
```bash
# In the project directory:
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Using Node / npx
```bash
npx serve .
```

---

## 🛠️ Customization Guide

1. **Personal Information**:
   - Update your name, title, bio, email, and social links in [`index.html`](file:///home/hamoda/tpdev1/index.html).
2. **Projects**:
   - Customize project data, demo links, and descriptions in [`script.js`](file:///home/hamoda/tpdev1/script.js#L265-L355) under `projectsData`.
3. **Themes & Colors**:
   - Adjust primary and accent colors in [`styles.css`](file:///home/hamoda/tpdev1/styles.css#L7-L50) inside `:root` and `[data-theme="light"]`.

---

## 📄 License
MIT License. Free to use and customize for personal portfolios.
