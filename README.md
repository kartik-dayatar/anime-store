# Anime Store

![Anime Store Banner](https://img.shields.io/badge/Status-Development-blue.svg) ![React](https://img.shields.io/badge/React-19.0.0-blue.svg) ![Vite](https://img.shields.io/badge/Vite-7.3.1-orange.svg) ![GSAP](https://img.shields.io/badge/Animation-GSAP%20&%20Framer-green.svg)

A modern, premium anime merchandise web store built with React and Vite. It features a sleek, cinematic interface using GSAP and Framer Motion for high-performance animations. The application is designed to be fully responsive, visually striking, and technically robust.

## 🚀 Features

- **Storefront & Catalog**: Browse premium figures, apparel, manga, and traditional styles (Ukiyo).
- **Interactive UI**: Rich micro-animations, cinematic transitions, and custom 3D elements powered by Three.js and GSAP.
- **Global State**: Efficient cart and state management using Zustand.
- **Dynamic Routing**: Segregated layout structure for main store, checkout flow, auth, and user dashboard using React Router DOM.
- **High Performance**: Optimized loading screens, code-splitting (lazy loading) for routes, and preloader optimizations.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Premium Matte Aesthetic)
- **State Management**: Zustand
- **Animations**: GSAP, Framer Motion
- **3D Graphics**: Three.js
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Data Fetching**: Axios

## 📂 Project Structure

```text
src/
├── assets/         # Static media (images, videos, fonts)
├── components/     # Reusable UI components
│   ├── CartDrawer/ # Cart slide-out drawer
│   ├── Layout/     # App layout elements (Header, Footer, Sidebar)
│   ├── ProductCard/# Reusable product display components
│   ├── Shop/       # Shop-specific UI parts
│   ├── landing/    # Landing page specific components
│   └── ui/         # Generic UI primitives (Buttons, Loaders, ScarcityBar, etc.)
├── context/        # React contexts for specific app domains
├── data/           # Mock data and configuration (products.js, homeData.js)
├── pages/          # Application routes mapped by domain
│   ├── Auth/       # Login, Register
│   ├── Checkout/   # Cart, Payment, OrderConfirmation
│   ├── General/    # Home, Landing, Contact
│   ├── Shop/       # Products list, Product detail
│   └── User/       # User Account, Wishlist, OrderTracking
├── store/          # Zustand global state (cartStore.js)
├── styles/         # Global shared CSS modules
└── utils/          # Utility scripts and animation definitions
```

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed:

```bash
node -v # Ensure it's active
npm -v
```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🔧 Current Development Status

- **UI Refinement**: Ongoing work prioritizing smooth landing animations, cinematic fullscreen trailer UI, and order tracking enhancements.
- **Data Source**: The project currently relies on hardcoded mock JSON objects (`src/data/products.js`).
- **Cleanup**: Unnecessary project files (e.g., legacy UI variants, redundant JSP-to-React components) are being actively pruned using internal cleanup tools.
- **Note**: The backend (Node/MongoDB) is currently decoupled from this frontend layer, as the current repository serves purely as the presentation interface.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
