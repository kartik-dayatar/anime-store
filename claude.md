# OtakuNation — Anime Merchandise Store (Full Project Context)

> **One-file project brief.** Give this to any AI agent to get full context on the codebase in a single shot.

---

## 1. What Is This?

A **premium anime merchandise e-commerce storefront** called **OtakuNation** (sometimes referred to as "AnimeStore"). It is a **frontend-only** React SPA — there is **no backend yet** (the `server/` directory is empty). All data is hardcoded mock JSON in `src/data/`. The app sells figures, apparel, manga, accessories, footwear, home décor, and traditional Japanese-style ("Ukiyo District") merch from popular anime series.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.2 |
| Bundler | Vite | 7.3 |
| Routing | React Router DOM | 7.13 |
| State | Zustand | 5.0 |
| Animations | Framer Motion + GSAP | 12.34 / 3.14 |
| 3D | Three.js | 0.182 |
| Icons | Lucide React | 0.574 |
| HTTP | Axios (unused — no backend) | 1.13 |
| Styling | Vanilla CSS (no Tailwind) | — |
| Font | Inter (Google Fonts) | — |
| Theme | Light by default; dark mode exists via `[data-theme="dark"]` but only used for `NewArrivals` page | — |

---

## 3. Project Root

```
anime_store/
├── README.md
├── client/                ← All code lives here
│   ├── package.json
│   ├── vite.config.js     (bare-bones, just react() plugin)
│   ├── index.html
│   ├── public/
│   │   ├── vite.svg
│   │   └── assets/One_piece/   (product images served statically)
│   └── src/               ← Main source tree
└── server/                ← EMPTY — no backend implemented
```

**Running the app:** `cd client && npm install && npm run dev`

---

## 4. Source Tree (`client/src/`)

```
src/
├── main.jsx               Entry point: StrictMode → ThemeProvider → App
├── App.jsx                 BrowserRouter → ToastProvider → Suspense → AnimatedRoutes
├── index.css               Design system: CSS custom properties, reset, utility classes
├── main.css                Page-specific global CSS (26KB — large shared stylesheet)
│
├── assets/
│   ├── images/hero/        Hero floating character PNGs (10 files: demon_slayer, jjk, etc.)
│   └── One_piece/          Zoro figure product images (9 PNGs), Luffy, keychain, wanted poster
│
├── components/
│   ├── CartDrawer/         CartDrawer.jsx + .css — slide-out cart panel
│   ├── Layout/
│   │   ├── Layout.jsx      Main layout shell: Header → Outlet → Footer + CartDrawer
│   │   ├── Header.jsx      Top bar: logo, search, nav links, auth buttons, cart badge
│   │   ├── Footer.jsx      4-column footer with toast support for URL params
│   │   ├── Sidebar.jsx     Animated mobile sidebar (categories, browse, account links)
│   │   ├── Admin/
│   │   │   └── AdminLayout.jsx  Admin panel shell with sidebar nav + Outlet
│   │   └── *.css           All corresponding CSS files
│   ├── Shop/
│   │   ├── ProductCard.jsx Product card with gradient bg placeholder, badge, wishlist/cart actions
│   │   ├── CategoryBar.jsx Horizontal scrollable category pills
│   │   └── ShopSidebar.jsx Filterable sidebar (category, price range, rating, sort)
│   ├── landing/
│   │   ├── LandingLoader.jsx  Fullscreen cinematic landing preloader
│   │   └── ParticleLoader.jsx 3D particle animation loader (uses Three.js)
│   └── ui/
│       ├── AnimatedLoader.jsx  Generic loading spinner with text
│       ├── TextEncrypted.jsx   Text reveal/encrypt animation effect
│       └── Toast.jsx           Toast notification system (context-based)
│
├── context/
│   └── ThemeContext.jsx    React Context: { theme, setTheme } — defaults to 'light'
│
├── data/
│   ├── products.js         7 categories + 15 product objects (see "Data Models" below)
│   └── homeData.js         Hero slides, stats, anime list, trending, fresh drops, reviews, news, blog
│
├── pages/
│   ├── General/
│   │   ├── Landing.jsx     Cinematic fullscreen entry page (ParticleLoader → hero → scroll)
│   │   ├── Home.jsx        Main store homepage (hero carousel, categories, trending, fresh drops, reviews, news)
│   │   ├── Contact.jsx     Contact form page
│   │   ├── GiftCards.jsx   Gift cards listing page
│   │   └── NotFound.jsx    404 page
│   ├── Shop/
│   │   ├── Products.jsx    Product listing with sidebar filters + category bar + URL query support
│   │   ├── ProductDetail.jsx  Full PDP with image gallery, specs, reviews, size selector, add-to-cart
│   │   └── NewArrivals.jsx    Dedicated new arrivals showcase (switches to dark theme)
│   ├── Checkout/
│   │   ├── Cart.jsx        Full cart page with quantity controls, totals, checkout CTA
│   │   ├── Checkout.jsx    Multi-step checkout form (shipping → payment → review)
│   │   ├── Payment.jsx     Payment method selection + processing
│   │   └── OrderConfirmation.jsx  Post-purchase confirmation screen
│   ├── User/
│   │   ├── Account.jsx     User profile dashboard (editable fields, order history, addresses)
│   │   ├── OrderTracking.jsx  Visual order tracking timeline
│   │   ├── Wishlist.jsx    Saved items grid with remove + add-to-cart actions
│   │   └── MyOrders.jsx    Order history list with status badges
│   ├── Auth/
│   │   ├── Login.jsx       Login form (no real auth — demo only)
│   │   └── Register.jsx    Registration form (no real auth — demo only)
│   └── Admin/
│       ├── Dashboard.jsx   Admin KPI cards (total revenue, orders, products, users)
│       ├── Inventory.jsx   Product table with search, delete, edit/add links
│       └── ProductForm.jsx Add/edit product form (reads from + writes to productStore)
│
├── store/
│   ├── cartStore.js        Zustand store for cart (see "Stores" below)
│   └── productStore.js     Zustand store for products (see "Stores" below)
│
├── styles/
│   └── theme.js            Light/dark theme token objects (JS, mirrors CSS vars)
│
└── utils/
    └── motionVariants.js   Reusable Framer Motion animation variants library
```

---

## 5. Routing Map

All routes are lazy-loaded via `React.lazy()`. `Layout` wraps most routes (Header + Footer + CartDrawer).

| Path | Component | Layout | Notes |
|---|---|---|---|
| `/` | `Landing` | None | Cinematic fullscreen entry |
| `/home` | `Home` | `Layout` | Main storefront |
| `/products` | `Products` | `Layout` | Supports `?search=`, `?category=` queries |
| `/product/:id` | `ProductDetail` | `Layout` | Dynamic product page |
| `/new-arrivals` | `NewArrivals` | `Layout` | Switches to dark theme |
| `/cart` | `Cart` | `Layout` | Full cart view |
| `/checkout` | `Checkout` | `Layout` | Multi-step checkout |
| `/payment` | `Payment` | `Layout` | Payment processing |
| `/order-confirmation` | `OrderConfirmation` | `Layout` | Post-purchase |
| `/account` | `Account` | `Layout` | User profile |
| `/order-tracking` | `OrderTracking` | `Layout` | Visual timeline |
| `/wishlist` | `Wishlist` | `Layout` | Saved items |
| `/orders` | `MyOrders` | `Layout` | Order history |
| `/contact` | `Contact` | `Layout` | Contact form |
| `/gift-cards` | `GiftCards` | `Layout` | Gift cards |
| `/login` | `Login` | `Layout` | Demo login |
| `/register` | `Register` | `Layout` | Demo register |
| `/logout` | `Logout` | `Layout` | Redirects to `/login` |
| `/admin` | `Dashboard` | `AdminLayout` | Admin home |
| `/admin/inventory` | `Inventory` | `AdminLayout` | Product management |
| `/admin/inventory/new` | `ProductForm` | `AdminLayout` | Add product |
| `/admin/inventory/edit/:id` | `ProductForm` | `AdminLayout` | Edit product |
| `*` | `NotFound` | `Layout` | 404 page |

---

## 6. Data Models

### Product (from `src/data/products.js`)

```js
{
  id: Number,              // Unique integer
  name: String,
  price: Number,           // Current price (USD)
  originalPrice: Number|null, // Crossed-out price if on sale
  image: String,           // Primary image URL (picsum or local asset)
  images: [String],        // Gallery images array
  category: String,        // e.g. 'figures', 'apparel', 'manga', 'accessories', 'footwear', 'home-decor', 'ukiyo-district', 'posters', 'plushies'
  subCategory: String,     // e.g. 'Premium PVC', 'Jackets', 'Box Sets'
  rating: Number,          // 0-5 stars
  reviews: Number,         // Review count
  description: String,     // Product description text
  sizes: [String],         // e.g. ['S', 'M', 'L', 'XL'] or ['Standard', 'Deluxe']
  badge: String|null,      // e.g. 'Best Seller', 'New Arrival', 'Exclusive', 'Fan Favorite', 'Hot Deal'
  inStock: Boolean,
  // Optional (only on some products):
  specifications: Object,  // { Material, Dimensions, Scale, Series, etc. }
  reviewsList: [{ user, rating, date, comment }]
}
```

**Categories** (also exported from `products.js`):
`apparel`, `figures`, `manga`, `accessories`, `footwear`, `home-decor`, `ukiyo-district`

**15 products exist currently.** Some use `picsum.photos` placeholder URLs, one (Zoro figure #3) uses actual local images in `assets/One_piece/`.

### Home Page Data (from `src/data/homeData.js`)

Exports: `heroSlides` (3), `statsData` (5), `animeList` (9), `trendingProducts` (8), `freshDrops` (3), `whyUsData` (4), `reviewsData` (3), `newsData` (4), `blogData` (3). These are all hardcoded display data for the Home page sections. Prices are in INR (₹).

---

## 7. State Management (Zustand)

### `cartStore.js` — `useCartStore`

| Property/Action | Type | Description |
|---|---|---|
| `items` | `Array` | Cart items `[{ ...product, selectedSize, quantity }]` |
| `isOpen` | `Boolean` | Cart drawer visibility |
| `toggleCart()` | Action | Toggle drawer |
| `openCart()` / `closeCart()` | Action | Explicit open/close |
| `addItem(product, selectedSize)` | Action | Add or increment quantity; auto-opens drawer |
| `removeItem(id, selectedSize)` | Action | Remove by id + size combo |
| `updateQuantity(id, selectedSize, qty)` | Action | Set quantity; removes if ≤ 0 |
| `getTotal()` | Derived | Sum of `price * quantity` |
| `getCount()` | Derived | Sum of all `quantity` values |
| `clearCart()` | Action | Empty the cart |

### `productStore.js` — `useProductStore`

| Property/Action | Type | Description |
|---|---|---|
| `products` | `Array` | Initialized from `data/products.js` |
| `getProductById(id)` | Derived | Find by `parseInt(id)` |
| `getProductsByCategory(cat)` | Derived | Filter; `'all'` returns everything |
| `getTrendingProducts()` | Derived | Products with a `badge`, max 8 |
| `getNewArrivals()` | Derived | Sorted by ID desc, first 4 |
| `addProduct(newProduct)` | Action | Auto-increments ID, sets `reviews: 0, rating: 0` |
| `updateProduct(id, fields)` | Action | Merge fields into existing product |
| `deleteProduct(id)` | Action | Filter out by ID |

---

## 8. Styling Architecture

- **Design system** lives in `index.css` with CSS custom properties on `:root`
- **Font**: Inter (300–800 weights via Google Fonts CDN)
- **Color palette**: Indigo/violet accent system (`--color-primary: #4f46e5`) on light background (`--color-bg: #fafafa`)
- **Dark theme**: Defined in `[data-theme="dark"]` block, currently only activated by `NewArrivals` page
- **Spacing**: 8px grid system (`--space-1` through `--space-24`)
- **Border radius**: Design tokens from `--radius-sm` (8px) to `--radius-full` (999px)
- **Shadow system**: 6-level shadow scale from `--shadow-xs` to `--shadow-xl`, plus glow variants
- **Glassmorphism**: `.glass` utility class with `backdrop-filter: blur(20px)`
- **Button variants**: `.btn-primary` (gradient), `.btn-secondary` (bordered), `.btn-ghost` (transparent)
- **Component styles**: Each component has a co-located `.css` file (e.g., `Header.css` next to `Header.jsx`)
- **`main.css`**: Large 26KB shared stylesheet with page-level styles
- **`theme.js`**: JS mirror of theme tokens (used for JS-driven theming, not directly consumed by components much)

### Key CSS Variables (Light Theme Defaults)

```css
--color-primary: #4f46e5;          /* Indigo */
--color-primary-light: #6366f1;
--color-secondary: #7c3aed;        /* Violet */
--color-bg: #fafafa;
--color-surface: #ffffff;
--color-text: #1a1a2e;
--color-text-secondary: #4a4a5e;
--color-text-muted: #8a8a9e;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--header-height: 68px;
--max-width: 1280px;
```

---

## 9. Animation System

### Framer Motion Variants (`utils/motionVariants.js`)

Comprehensive animation library with categorized presets:

- **Page transitions**: `routeTransition` (350ms fade+slide)
- **Entrances**: `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `fadeInScale`, `scaleIn`, `heroCardEntrance`, `sectionReveal`
- **Stagger**: `staggerContainer` (80ms delay), `staggerContainerSlow` (120ms), `staggerItem`
- **Hover/Tap**: `hoverScale`, `hoverScaleSubtle`, `hoverLift`, `hoverGlow`, `tapScale`, `tapScaleSubtle`
- **Cards**: `cardHover` (lift + shadow + scale), `imageHoverZoom`
- **Slides**: `slideInRight`, `slideInUp`, `sidebarSlide`
- **Overlays**: `overlayFade`
- **Toasts**: `toastVariant`
- **Badges**: `badgePop`, `badgeGlowPulse`
- **Floating**: `floatAnimation` (3s loop), `floatAnimationSlow` (5s loop)
- **Pulse**: `pulseGlow`
- **Countdown**: `countdownFlip`
- **Spring presets**: `springs.snappy`, `.gentle`, `.bouncy`, `.stiff`
- **Easing presets**: `easings.smooth`, `.decel`, `.snappy`, `.accel`

**Animation rules**: hover 150–200ms, entrance 400–500ms, stagger 80ms, max 700ms, prefer `transform + opacity`.

### GSAP

Used primarily in `Landing.jsx` and `ParticleLoader.jsx` for cinematic timeline-based animations and scroll-driven effects.

### Three.js

Used in `ParticleLoader.jsx` for 3D particle animation on the landing page preloader.

---

## 10. Key Components Detail

### Layout Components

| Component | File | Purpose |
|---|---|---|
| `Layout` | `components/Layout/Layout.jsx` | Shell: `Header → <main><Outlet/></main> → Footer + CartDrawer`. No sidebar in the main layout currently. |
| `Header` | `components/Layout/Header.jsx` | Top bar with logo (⚡ icon + tagline), search form, nav links (Home, Shop, New Arrivals, Contact), auth buttons (Sign In/Up or Account), wishlist + cart icons. Cart badge shows count from `useCartStore`. |
| `Footer` | `components/Layout/Footer.jsx` | 4-column grid: Brand, Shop links, Support links, Social. Detects `?toast=added` URL param. |
| `Sidebar` | `components/Layout/Sidebar.jsx` | Animated mobile sidebar with Browse section, Categories list, Account links. Not currently rendered in Layout (previously removed). |
| `AdminLayout` | `components/Layout/Admin/AdminLayout.jsx` | Split layout: dark sidebar (Dashboard, Inventory, Orders, Settings nav) + main content area with admin topbar. Uses Lucide icons. |

### Shop Components

| Component | File | Purpose |
|---|---|---|
| `ProductCard` | `components/Shop/ProductCard.jsx` | Card linking to `/product/:id`. Uses gradient background (12 rotating gradients by product ID). Shows badge, category, rating, price (₹). Floating wishlist + cart action buttons. |
| `CategoryBar` | `components/Shop/CategoryBar.jsx` | Horizontal scrollable category filter pills |
| `ShopSidebar` | `components/Shop/ShopSidebar.jsx` | Desktop filter panel: category checkboxes, price range slider, rating filter, sort options |

### UI Primitives

| Component | File | Purpose |
|---|---|---|
| `AnimatedLoader` | `components/ui/AnimatedLoader.jsx` | Fullscreen loader overlay with animated dots + custom text |
| `TextEncrypted` | `components/ui/TextEncrypted.jsx` | Character-by-character text reveal animation (slot machine effect) |
| `Toast` | `components/ui/Toast.jsx` | Context-based toast notification system with auto-dismiss. Used via `useToast()` → `addToast(message, type)` |

### Landing Components

| Component | File | Purpose |
|---|---|---|
| `LandingLoader` | `components/landing/LandingLoader.jsx` | Simple cinematic loading screen for Landing page |
| `ParticleLoader` | `components/landing/ParticleLoader.jsx` | Three.js-powered 3D particle animation loader with GSAP timeline |

---

## 11. Context & Providers

Provider tree (from `main.jsx`):
```
StrictMode → ThemeProvider → App (BrowserRouter → ToastProvider → Suspense → AnimatedRoutes)
```

- **ThemeProvider** (`context/ThemeContext.jsx`): Manages `data-theme` attribute on `<html>`. Defaults to `'light'`. Exposes `{ theme, setTheme }` via `useTheme()`.
- **ToastProvider** (`components/ui/Toast.jsx`): Manages toast notification queue. Exposes `{ addToast }` via `useToast()`.

---

## 12. Assets

### Local Images

```
src/assets/
├── images/hero/              10 floating character PNGs for hero carousel
│   ├── demon_slayer_float.png
│   ├── jjk_float.png
│   ├── one_piece_float.png
│   ├── aot_float.png
│   ├── spy_family_float.png
│   ├── mha_float.png
│   ├── naruto_float.png
│   ├── dbz_float.png
│   ├── csm_float.png
│   └── jujutsi_kaisen_poster.png
│
└── One_piece/                Product images for Zoro figure
    ├── zoro-action-figure(p0-p4).png  (5 gallery shots)
    ├── zoro-action-figure2.png
    ├── luffy-gear5-action-figure.png
    ├── one-piece-keychain.png
    └── one-piece-wantedposter.png
```

### External Images

Most products use `https://picsum.photos/seed/{name}/400/500` as placeholder images. The admin avatar uses `ui-avatars.com`. The footer references `/assets/Logo.png` (may not exist).

---

## 13. Known Issues & Quirks

1. **No backend**: The `server/` directory is empty. All data is mock. Axios is installed but unused.
2. **No real auth**: Login/Register pages are UI-only. `isLoggedIn` is hardcoded to `false` in Header.
3. **Mixed currencies**: Products in `products.js` use USD ($), while `homeData.js` trending products use INR (₹). `ProductCard` renders with ₹ prefix.
4. **Duplicate `<main>` tag**: `Layout.jsx` has a nested `<main>` inside `<main>` (minor HTML semantic issue).
5. **Product images commented out**: `ProductCard.jsx` has actual `<img>` rendering commented out, showing gradient placeholders instead.
6. **Sidebar not rendered**: `Sidebar.jsx` exists but is not imported/rendered in `Layout.jsx` (previously removed).
7. **Logo.png may be missing**: Footer references `/assets/Logo.png`, Header uses ⚡ emoji as logo fallback.
8. **Dark theme scope**: Dark theme CSS is defined but only actively used by the `NewArrivals` page.
9. **No persistence**: Cart and product changes are lost on page reload (no localStorage/sessionStorage).
10. **Legacy comments**: Several files contain verbose JSP-migration comments from a Java-to-React port.

---

## 14. Design Conventions

- **Aesthetic**: Premium matte light theme with indigo/violet accent system. Clean, minimal, editorial feel.
- **Typography**: Inter font, tight letter-spacing on headings (`-0.02em`), prominent weight contrasts (300–800).
- **Cards**: Rounded (`16px radius`), subtle layered shadows, gradient backgrounds, hover lift effects.
- **Animations**: Framer Motion for all UI animations. Hover ≤200ms, entrance ≤500ms, stagger 80ms. Prefer `transform` + `opacity`.
- **Responsive breakpoint**: Main breakpoint at `768px`. Container max-width `1280px` (wide: `1440px`).
- **File organization**: Component + CSS co-located. Pages organized by domain (General, Shop, Checkout, User, Auth, Admin).
- **No Tailwind**: All styling is vanilla CSS with custom properties design system.

---

## 15. Development Commands

```bash
cd client
npm install        # Install dependencies
npm run dev        # Start Vite dev server (defaults to localhost:5173)
npm run build      # Production build to client/dist/
npm run preview    # Preview production build
npm run lint       # ESLint
```

---

## 16. What Needs to Be Built Next (Backlog)

These items are not implemented or partially done:

- [ ] **Backend API** (Node.js/Express + MongoDB) — full REST API for products, auth, orders
- [ ] **Real authentication** — JWT/session-based login/register flow
- [ ] **Cart persistence** — localStorage or server sync
- [ ] **Product images** — replace gradient placeholders with actual product photography
- [ ] **Search functionality** — currently navigates to `/products?search=` but filtering is client-side only
- [ ] **Payment integration** — Stripe/Razorpay integration for the Payment page
- [ ] **Order management** — backend order creation, tracking, status updates
- [ ] **Wishlist persistence** — currently re-renders with empty state on reload
- [ ] **Admin CRUD operations** — connect to backend API instead of in-memory Zustand mutationsn
- [ ] **Responsive polish** — some pages may need additional mobile testing
- [ ] **SEO** — meta tags, Open Graph, structured data
- [ ] **Logo asset** — provide actual Logo.png for header/footer
