import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import {
    staggerContainer, staggerItem, tapScale, hoverLift,
} from '../utils/motionVariants';
import './NewArrivals.css';

/* ── animation variants ── */
const pageEntrance = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const sectionReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const heroTextStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const heroTextChild = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

function NewArrivals() {
    const { setTheme } = useTheme();

    /* Switch to dark theme on mount, restore on unmount */
    useEffect(() => {
        setTheme('dark');
        return () => setTheme('light');
    }, [setTheme]);

    const newProducts = products.filter((p) => p.badge);
    const featuredProduct = newProducts[0];

    return (
        <motion.div
            className="na-page"
            variants={pageEntrance}
            initial="hidden"
            animate="visible"
        >
            {/* ===== HERO ===== */}
            <section className="na-hero">
                <div className="na-hero-bg">
                    <div className="na-hero-orb na-hero-orb--1" />
                    <div className="na-hero-orb na-hero-orb--2" />
                    <div className="na-hero-orb na-hero-orb--3" />
                    <div className="na-hero-noise" />
                </div>

                <div className="container-wide">
                    <div className="na-hero-grid">
                        <motion.div
                            className="na-hero-content"
                            variants={heroTextStagger}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="na-hero-badge" variants={heroTextChild}>
                                <span className="na-hero-badge-dot" />
                                Just Dropped
                            </motion.div>
                            <motion.h1 className="na-hero-title" variants={heroTextChild}>
                                New{' '}
                                <span className="na-gradient-text">Arrivals</span>
                            </motion.h1>
                            <motion.p className="na-hero-desc" variants={heroTextChild}>
                                Fresh drops from the most anticipated anime collections.
                                Limited editions, premium craftsmanship, and exclusive designs.
                            </motion.p>
                            <motion.div className="na-hero-actions" variants={heroTextChild}>
                                <motion.div whileHover={hoverLift} whileTap={tapScale}>
                                    <a href="#na-products" className="na-btn-glow">
                                        Explore Collection
                                        <span className="na-btn-glow-ring" />
                                    </a>
                                </motion.div>
                                <motion.div whileHover={hoverLift} whileTap={tapScale}>
                                    <Link to="/products" className="na-btn-outline">
                                        View All Products
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Hero featured card */}
                        {featuredProduct && (
                            <motion.div
                                className="na-hero-featured"
                                initial={{ opacity: 0, x: 50, rotateY: -8 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <div className="na-featured-card">
                                    <div className="na-featured-glow" />
                                    <img
                                        src={featuredProduct.image}
                                        alt={featuredProduct.name}
                                        className="na-featured-img"
                                    />
                                    <div className="na-featured-info">
                                        <span className="na-featured-badge">{featuredProduct.badge}</span>
                                        <h3>{featuredProduct.name}</h3>
                                        <p>${featuredProduct.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Neon accent line */}
                <div className="na-hero-accent-line" />
            </section>

            {/* ===== PRODUCT GRID ===== */}
            <section className="na-products" id="na-products">
                <div className="container-wide">
                    <motion.div
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <h2 className="na-section-title">
                            Latest <span className="na-gradient-text">Drops</span>
                        </h2>
                        <p className="na-section-subtitle">
                            Freshly curated for the dedicated collector
                        </p>
                    </motion.div>

                    <motion.div
                        className="na-products-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {newProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="na-cta">
                <div className="container-wide">
                    <motion.div
                        className="na-cta-card"
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="na-cta-glow" />
                        <h2>
                            Don't Miss the{' '}
                            <span className="na-gradient-text">Next Drop</span>
                        </h2>
                        <p>
                            Join the waitlist and get early access to limited edition releases.
                        </p>
                        <form className="na-cta-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" />
                            <motion.button
                                type="submit"
                                whileHover={{ y: -2, boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}
                                whileTap={tapScale}
                            >
                                Join Waitlist
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

export default NewArrivals;
