import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import './Header.css';

function Header({ onSidebarToggle }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const cartCount = useCartStore((state) => state.getCount());
    const toggleCart = useCartStore((state) => state.toggleCart);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container-wide header-container">
                {/* Left: Sidebar Toggle & Logo */}
                <div className="header-left">
                    <button
                        className="sidebar-toggle-btn"
                        onClick={onSidebarToggle}
                        aria-label="Toggle Sidebar"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <Link to="/" className="header-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">AnimeStore</span>
                    </Link>
                </div>

                {/* Center: Search Bar */}
                <div className="header-search-wrapper">
                    <div className="header-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input type="text" placeholder="Search..." />
                        <span className="search-shortcut">⌘K</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="header-actions">
                    <button className="icon-btn" aria-label="Notifications">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="notification-dot" />
                    </button>

                    <button className="icon-btn cart-btn" onClick={toggleCart} aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    key="cart-count"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="cart-badge"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <Link to="/account" className="user-avatar-btn">
                        <div className="header-avatar">KD</div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
