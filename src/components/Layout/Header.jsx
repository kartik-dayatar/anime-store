import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { badgePop, tapScale } from '../../utils/motionVariants';
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
        <motion.header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
            <div className="header-inner">
                {/* Logo */}
                <Link to="/" className="header-logo">
                    <motion.div
                        className="logo-icon"
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        ⛩️
                    </motion.div>
                    <div className="logo-text">
                        Anime<span>Store</span>
                    </div>
                </Link>

                {/* Nav */}
                <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
                    {[
                        { to: '/', label: 'Home', end: true },
                        { to: '/products', label: 'Shop' },
                        { to: '/account', label: 'Account' },
                    ].map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className="nav-link"
                            onClick={() => setMenuOpen(false)}
                            end={link.end}
                        >
                            {({ isActive }) => (
                                <motion.span
                                    className="nav-link-inner"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            className="nav-link-underline"
                                            layoutId="nav-underline"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <motion.div
                        className="header-search"
                        whileHover={{ borderColor: 'rgba(79, 70, 229, 0.5)' }}
                        whileFocus={{ boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.15)' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span>Search products...</span>
                        <kbd>⌘K</kbd>
                    </motion.div>

                    <motion.button
                        className="icon-btn"
                        onClick={toggleCart}
                        aria-label="Cart"
                        whileHover={{ scale: 1.08, backgroundColor: 'var(--color-surface-hover)' }}
                        whileTap={tapScale}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <AnimatePresence mode="wait">
                            {cartCount > 0 && (
                                <motion.div
                                    className="cart-badge"
                                    key={cartCount}
                                    variants={badgePop}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    {cartCount}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

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
        </motion.header>
    );
}

export default Header;
