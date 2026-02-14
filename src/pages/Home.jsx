import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { categories, getTrendingProducts } from '../data/products';
import {
    staggerContainer, staggerItem, fadeInUp, fadeInScale,
    hoverScale, hoverLift, tapScale, floatAnimation, floatAnimationSlow,
} from '../utils/motionVariants';
import './Home.css';

const heroStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

function Home() {
    const trending = getTrendingProducts();

    return (
        <div className="home">
            {/* ===== HERO ===== */}
            <section className="home-hero">
                <div className="hero-bg">
                    <div className="hero-gradient-loop" />
                </div>
                <div className="container-wide">
                    <div className="hero-grid">
                        {/* Left – Content */}
                        <motion.div
                            className="hero-content"
                            variants={heroStagger}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="hero-badge" variants={heroItem}>
                                ✨ New Collection 2026
                            </motion.div>
                            <motion.h1 className="hero-title" variants={heroItem}>
                                Discover Premium{' '}
                                <span className="gradient">Anime</span>{' '}
                                Merchandise
                            </motion.h1>
                            <motion.p className="hero-desc" variants={heroItem}>
                                From limited-edition figures to exclusive apparel — curated for true anime fans
                                and premium collectors.
                            </motion.p>
                            <motion.div className="hero-actions" variants={heroItem}>
                                <motion.div whileHover={hoverLift} whileTap={tapScale}>
                                    <Link to="/products" className="btn btn-primary btn-lg">
                                        Shop Collection
                                        <span>→</span>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={hoverLift} whileTap={tapScale}>
                                    <Link to="/products?category=figures" className="btn btn-secondary btn-lg">
                                        View Figures
                                    </Link>
                                </motion.div>
                            </motion.div>
                            <motion.div className="hero-stats" variants={heroItem}>
                                {[
                                    { value: '2K+', label: 'Products' },
                                    { value: '50K+', label: 'Happy Fans' },
                                    { value: '4.9★', label: 'Average Rating' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        className="hero-stat"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                                    >
                                        <div className="hero-stat-value">{stat.value}</div>
                                        <div className="hero-stat-label">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right – Visual */}
                        <motion.div
                            className="hero-visual"
                            initial={{ opacity: 0, scale: 0.92, x: 40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="hero-image-wrapper">
                                <motion.div
                                    className="hero-image-card"
                                    whileHover={{ scale: 1.02, rotate: -0.5 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <img
                                        src="https://picsum.photos/seed/anime-hero/600/800"
                                        alt="Anime figure showcase"
                                    />
                                </motion.div>
                                <motion.div
                                    className="hero-float-card top-right"
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <motion.div animate={floatAnimation}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <div className="float-icon">🔥</div>
                                            <div>
                                                <div className="float-value">Trending Now</div>
                                                <div className="float-label">284 items sold today</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="hero-float-card bottom-left"
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <motion.div animate={floatAnimationSlow}>
                                        <div className="float-label">⭐ Top Rated</div>
                                        <div className="float-value">Gojo Premium Figure</div>
                                        <div className="float-label">$189.99 · 4.9★</div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORIES ===== */}
            <section className="categories-section">
                <div className="container-wide">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <motion.h2 className="section-title" variants={staggerItem}>Shop by Category</motion.h2>
                        <motion.p className="section-subtitle" variants={staggerItem}>
                            Browse our curated collections
                        </motion.p>
                    </motion.div>
                    <div className="categories-scroll">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.08,
                                    duration: 0.4,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            >
                                <motion.div
                                    whileHover={{ y: -6, borderColor: 'rgba(79, 70, 229, 0.5)', boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
                                    whileTap={tapScale}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <Link to={`/products?category=${cat.id}`} className="category-card">
                                        <motion.span
                                            className="category-icon"
                                            whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {cat.icon}
                                        </motion.span>
                                        <div className="category-name">{cat.name}</div>
                                        <div className="category-count">{cat.count} items</div>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRENDING ===== */}
            <section className="trending-section">
                <div className="container-wide">
                    <div className="trending-header">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h2 className="section-title" variants={staggerItem}>
                                Trending Now 🔥
                            </motion.h2>
                            <motion.p
                                className="section-subtitle"
                                variants={staggerItem}
                                style={{ marginBottom: 0 }}
                            >
                                Most popular picks this week
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div whileHover={hoverLift} whileTap={tapScale}>
                                <Link to="/products" className="btn btn-secondary">
                                    View All →
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="trending-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {trending.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== NEWSLETTER ===== */}
            <section className="newsletter-section">
                <div className="container-wide">
                    <motion.div
                        className="newsletter-card"
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <h2>
                            Stay in the <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Loop</span>
                        </h2>
                        <p>Get exclusive drops, limited edition alerts, and 10% off your first order.</p>
                        <form className="newsletter-form-wrapper" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" />
                            <motion.button
                                type="submit"
                                whileHover={{ y: -2, boxShadow: '0 0 30px rgba(79, 70, 229, 0.4)' }}
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
