import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import AnimatedLoader from './components/ui/AnimatedLoader';
import { ToastProvider } from './components/ui/Toast';

// Lazy load pages for code splitting
// General Pages
const Landing = lazy(() => import('./pages/General/Landing'));
const Home = lazy(() => import('./pages/General/Home'));
const Contact = lazy(() => import('./pages/General/Contact'));
const GiftCards = lazy(() => import('./pages/General/GiftCards'));
const NotFound = lazy(() => import('./pages/General/NotFound'));

// Shop Pages
const Products = lazy(() => import('./pages/Shop/Products'));
const ProductDetail = lazy(() => import('./pages/Shop/ProductDetail'));
const NewArrivals = lazy(() => import('./pages/Shop/NewArrivals'));

// Checkout Pages
const Cart = lazy(() => import('./pages/Checkout/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Payment = lazy(() => import('./pages/Checkout/Payment'));
const OrderConfirmation = lazy(() => import('./pages/Checkout/OrderConfirmation'));

// User Pages
const Account = lazy(() => import('./pages/User/Account'));
const OrderTracking = lazy(() => import('./pages/User/OrderTracking'));
const Wishlist = lazy(() => import('./pages/User/Wishlist'));
const MyOrders = lazy(() => import('./pages/User/MyOrders'));

// Auth Pages
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

// Basic Logout component
const Logout = () => {
  window.location.href = '/login';
  return null;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Page - Outside Layout */}
        <Route path="/" element={<Landing />} />

        {/* Main Store - Inside Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth Pages - Outside Layout (usually) or Inside? 
            The user JSP had header/footer, so inside Layout is safer unless specified otherwise.
            However, Login pages often look better standalone. 
            Based on the user's "login-page" body class in the JSP, it likely shares the main CSS but maybe simpler header?
            For now, let's put Login OUTSIDE if it's a full takeover, OR inside if it needs nav. 
            The JSP includes header/footer, so let's put it INSIDE Layout.
        */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Suspense fallback={<AnimatedLoader text="Initializing..." />}>
          <AnimatedRoutes />
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
