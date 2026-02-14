import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import ScarcityBar from '../components/ui/ScarcityBar';
import DropCountdown from '../components/ui/DropCountdown';
import CollectorBadge from '../components/ui/CollectorBadge';
import { categories, getTrendingProducts } from '../data/products';
import {
    staggerContainer, staggerContainerSlow, staggerItem,
    heroCardEntrance, floatAnimation, sectionReveal,
    hoverScaleSubtle, hoverLift, tapScale
} from '../utils/motionVariants';
import './Home.css';

function Home() {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const trending = getTrendingProducts();

    return (
        <div className="home-dashboard" ref={scrollRef}>
            {/* ===== HERO DASHBOARD CARD ===== */}
            <section className="home-hero-wrapper">
                <div className="container-wide">
                    <motion.div
                        className="hero-card glass"
                        variants={heroCardEntrance}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="hero-content">
                            <motion.div
                                className="hero-badge"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <CollectorBadge serial="001" total="500" label="Satoru Gojo — Exclusive Drop" />
                            </motion.div>

                            <motion.h1
                                className="hero-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                The <span className="gradient-text">Infinite Void</span> Collection
                            </motion.h1>

                            <motion.p
                                className="hero-subtitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Premium 1/7 scale figures featuring translucent domain expansion effects.
                                Only 500 units available worldwide.
                            </motion.p>

                            <motion.div
                                className="hero-actions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Link to="/products?category=figures" className="btn btn-primary btn-lg">
                                    Shop Collection
                                </Link>
                                <Link to="/new-arrivals" className="btn btn-secondary btn-lg">
                                    View Lookbook
                                </Link>
                            </motion.div>

                            <motion.div
                                className="hero-availability"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <ScarcityBar sold={423} total={500} label="Claimed Units" />
                            </motion.div>
                        </div>

                        <div className="hero-visual">
                            <motion.div
                                className="hero-image-container"
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
                            >
                                <img
                                    src="https://picsum.photos/seed/gojo-hero/800/1000"
                                    alt="Premiums Figure Showcase"
                                    className="hero-image"
                                />
                                <div className="hero-overlay-gradient" />
                            </motion.div>

                            {/* Floating Metadata Cards */}
                            {/* Floating Metadata Cards */}
                            <motion.div
                                className="float-card-wrapper"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                style={{ position: 'absolute', top: '10%', right: '-20px', zIndex: 3 }}
                            >
                                <motion.div
                                    className="float-card glass"
                                    animate={floatAnimation}
                                >
                                    <span className="float-label">Resale Value</span>
                                    <span className="float-value">↗ +240%</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTINUE SHOPPING / CATEGORIES ===== */}
            <section className="section-continue">
                <div className="container-wide">
                    <motion.h3
                        className="section-label"
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Browse Categories
                    </motion.h3>

                    <motion.div
                        className="category-scroll-container"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {categories.map((cat) => (
                            <motion.div key={cat.id} variants={staggerItem}>
                                <Link to={`/products?category=${cat.id}`} className="category-pill-card">
                                    <span className="cat-icon">{cat.icon}</span>
                                    <span className="cat-name">{cat.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== TRENDING DROPS ===== */}
            <section className="section section-alt">
                <div className="container-wide">
                    <div className="section-header">
                        <motion.h2
                            className="section-title"
                            variants={sectionReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Trending Drops
                        </motion.h2>
                        <Link to="/products" className="btn btn-ghost">View All →</Link>
                    </div>

                    <motion.div
                        className="product-grid"
                        variants={staggerContainerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        {trending.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== PREMIUM COLLECTOR SECTION ===== */}
            <section className="section collector-section">
                <div className="container-wide">
                    <div className="collector-grid">
                        <motion.div
                            className="collector-info"
                            variants={sectionReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className="badge badge-warning">Coming Soon</span>
                            <h2 className="section-title" style={{ marginTop: '1rem' }}>
                                Next Major Drop
                            </h2>
                            <p className="section-subtitle">
                                The highly anticipated Chainsaw Man collection drops in standard and limited collector's editions.
                            </p>

                            <div className="countdown-wrapper">
                                <DropCountdown targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} />
                            </div>

                            <motion.button
                                className="btn btn-primary btn-lg"
                                style={{ marginTop: '2rem', width: '100%' }}
                                whileHover={hoverLift}
                                whileTap={tapScale}
                            >
                                Join Waitlist
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="collector-preview-card glass"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="preview-image-wrapper">
                                <img src="https://picsum.photos/seed/pochita/600/600" alt="Preview" />
                                <div className="preview-overlay">
                                    <CollectorBadge serial="???" total="Limited" label="Prototype" />
                                </div>
                            </div>
                            <div className="preview-details">
                                <h3>Pochita Life-Size Plush</h3>
                                <p>Authentic dimensions, premium fabric.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== NEWSLETTER CTA ===== */}
            <section className="section section-alt newsletter-wrapper">
                <div className="container-wide">
                    <motion.div
                        className="newsletter-dashboard-card glass"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="newsletter-content">
                            <h2>Join the Inner Circle</h2>
                            <p>Get early access code for every major drop. No spam, just anime.</p>
                        </div>
                        <form className="newsletter-form">
                            <input type="email" placeholder="collector@bgmail.com" />
                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.02 }}
                                whileTap={tapScale}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;
