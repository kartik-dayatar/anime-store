import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { categories, getTrendingProducts } from '../data/products';
import './Home.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
    }),
};

function Home() {
    const trending = getTrendingProducts();

    return (
        <div className="home">
            {/* ===== HERO ===== */}
            <section className="home-hero">
                <div className="hero-bg" />
                <div className="container-wide">
                    <div className="hero-grid">
                        {/* Left – Content */}
                        <motion.div
                            className="hero-content"
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="hero-badge" variants={fadeUp} custom={0}>
                                ✨ New Collection 2026
                            </motion.div>
                            <motion.h1 className="hero-title" variants={fadeUp} custom={1}>
                                Discover Premium{' '}
                                <span className="gradient">Anime</span>{' '}
                                Merchandise
                            </motion.h1>
                            <motion.p className="hero-desc" variants={fadeUp} custom={2}>
                                From limited-edition figures to exclusive apparel — curated for true anime fans
                                and premium collectors.
                            </motion.p>
                            <motion.div className="hero-actions" variants={fadeUp} custom={3}>
                                <Link to="/products" className="btn btn-primary btn-lg">
                                    Shop Collection
                                    <span>→</span>
                                </Link>
                                <Link to="/products?category=figures" className="btn btn-secondary btn-lg">
                                    View Figures
                                </Link>
                            </motion.div>
                            <motion.div className="hero-stats" variants={fadeUp} custom={4}>
                                <div className="hero-stat">
                                    <div className="hero-stat-value">2K+</div>
                                    <div className="hero-stat-label">Products</div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-value">50K+</div>
                                    <div className="hero-stat-label">Happy Fans</div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-value">4.9★</div>
                                    <div className="hero-stat-label">Average Rating</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right – Visual */}
                        <motion.div
                            className="hero-visual"
                            initial={{ opacity: 0, scale: 0.9, x: 40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="hero-image-wrapper">
                                <div className="hero-image-card">
                                    <img
                                        src="https://picsum.photos/seed/anime-hero/600/800"
                                        alt="Anime figure showcase"
                                    />
                                </div>
                                <motion.div
                                    className="hero-float-card top-right"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <div className="float-icon">🔥</div>
                                    <div>
                                        <div className="float-value">Trending Now</div>
                                        <div className="float-label">284 items sold today</div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="hero-float-card bottom-left"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    <div className="float-label">⭐ Top Rated</div>
                                    <div className="float-value">Gojo Premium Figure</div>
                                    <div className="float-label">$189.99 · 4.9★</div>
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <motion.h2 className="section-title" variants={fadeUp}>Shop by Category</motion.h2>
                        <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
                            Browse our curated collections
                        </motion.p>
                    </motion.div>
                    <div className="categories-scroll">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                <Link to={`/products?category=${cat.id}`} className="category-card">
                                    <span className="category-icon">{cat.icon}</span>
                                    <div className="category-name">{cat.name}</div>
                                    <div className="category-count">{cat.count} items</div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRENDING ===== */}
            <section className="trending-section">
                <div className="container-wide">
                    <div className="trending-header">
                        <div>
                            <motion.h2
                                className="section-title"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Trending Now 🔥
                            </motion.h2>
                            <motion.p
                                className="section-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                style={{ marginBottom: 0 }}
                            >
                                Most popular picks this week
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <Link to="/products" className="btn btn-secondary">
                                View All →
                            </Link>
                        </motion.div>
                    </div>
                    <div className="trending-grid">
                        {trending.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEWSLETTER ===== */}
            <section className="newsletter-section">
                <div className="container-wide">
                    <motion.div
                        className="newsletter-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>
                            Stay in the <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Loop</span>
                        </h2>
                        <p>Get exclusive drops, limited edition alerts, and 10% off your first order.</p>
                        <form className="newsletter-form-wrapper" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;
