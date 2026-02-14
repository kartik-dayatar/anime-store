import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import './Header.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const cartCount = useCartStore((s) => s.getCount());
    const toggleCart = useCartStore((s) => s.toggleCart);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-inner">
                {/* Logo */}
                <Link to="/" className="header-logo">
                    <div className="logo-icon">⛩️</div>
                    <div className="logo-text">
                        Anime<span>Store</span>
                    </div>
                </Link>

                {/* Nav */}
                <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)} end>
                        Home
                    </NavLink>
                    <NavLink to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
                        Shop
                    </NavLink>
                    <NavLink to="/account" className="nav-link" onClick={() => setMenuOpen(false)}>
                        Account
                    </NavLink>
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <div className="header-search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span>Search products...</span>
                        <kbd>⌘K</kbd>
                    </div>

                    <button className="icon-btn" onClick={toggleCart} aria-label="Cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.div
                                    className="cart-badge"
                                    key={cartCount}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                >
                                    {cartCount}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
