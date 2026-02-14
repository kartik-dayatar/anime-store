import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, categories } from '../data/products';
import './Products.css';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [maxPrice, setMaxPrice] = useState(300);
    const [sortBy, setSortBy] = useState('popular');

    const activeCategory = searchParams.get('category') || 'all';

    const setCategory = (cat) => {
        if (cat === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', cat);
        }
        setSearchParams(searchParams);
        setSidebarOpen(false);
    };

    const filtered = useMemo(() => {
        let result = products.filter((p) => p.price <= maxPrice);
        if (activeCategory !== 'all') {
            result = result.filter((p) => p.category === activeCategory);
        }
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                result.sort((a, b) => b.reviews - a.reviews);
        }
        return result;
    }, [activeCategory, maxPrice, sortBy]);

    return (
        <div className="products-page">
            <div className="container-wide">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 'var(--space-8)' }}
                >
                    <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-2)' }}>
                        {activeCategory !== 'all'
                            ? categories.find((c) => c.id === activeCategory)?.name || 'Shop'
                            : 'All Products'}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Discover our curated collection of premium anime merchandise
                    </p>
                </motion.div>

                <div className="products-layout">
                    {/* Sidebar */}
                    <motion.aside
                        className={`products-sidebar ${sidebarOpen ? 'open' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Mobile close */}
                        <div className="sidebar-close" style={{ display: sidebarOpen ? 'flex' : 'none' }}>
                            <h3 style={{ fontSize: 'var(--font-size-lg)' }}>Filters</h3>
                            <button onClick={() => setSidebarOpen(false)}>✕</button>
                        </div>

                        {/* Categories */}
                        <div className="sidebar-section">
                            <div className="sidebar-title">Categories</div>
                            <div className="filter-list">
                                <button
                                    className={`filter-item ${activeCategory === 'all' ? 'active' : ''}`}
                                    onClick={() => setCategory('all')}
                                >
                                    <span className="filter-item-icon">🏷️</span>
                                    All Products
                                    <span className="filter-item-count">{products.length}</span>
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`filter-item ${activeCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setCategory(cat.id)}
                                    >
                                        <span className="filter-item-icon">{cat.icon}</span>
                                        {cat.name}
                                        <span className="filter-item-count">{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="sidebar-section">
                            <div className="sidebar-title">Price Range</div>
                            <div className="price-range">
                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                                <div className="price-labels">
                                    <span>$0</span>
                                    <span>${maxPrice}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="sidebar-section">
                            <div className="sidebar-title">Sort By</div>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low → High</option>
                                <option value="price-high">Price: High → Low</option>
                            </select>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <div>
                        <div className="products-header">
                            <span className="products-count">
                                Showing {filtered.length} products
                            </span>
                            <button className="filter-toggle-btn" onClick={() => setSidebarOpen(true)}>
                                ☰ Filters
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + sortBy + maxPrice}
                                className="products-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filtered.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {filtered.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: 'var(--space-20)',
                                    color: 'var(--color-text-muted)',
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔍</div>
                                <p>No products found matching your filters.</p>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setCategory('all');
                                        setMaxPrice(300);
                                    }}
                                    style={{ marginTop: 'var(--space-4)' }}
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1400,
                    }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default Products;
