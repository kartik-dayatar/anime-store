import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../../data/products';
import './Products.css';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
    const [activeAnime, setActiveAnime] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [sortBy, setSortBy] = useState('trending');

    // Handle Category Filter
    const toggleCategory = (cat) => {
        // Toggle behavior logic if multiple allowed, but JSP uses radio-like for category
        // JSP: category=shirt (one at a time usually, but sidebar uses checkboxes)
        // Let's assume single category selection for simplicity or array if we want multi
        // JSP logic: if (category != null) ...
        // Checkboxes imply multiple? "input type='checkbox' name='category'" => usually means multiple
        // But the JSP logic `category.equals(...)` implies single value param processing. 
        // We will stick to single for now to match JSP "equals", or allow multiple if logic permits.
        // Let's do single active category for now.
        if (activeCategory === cat) setActiveCategory('all');
        else setActiveCategory(cat);
    };

    const toggleAnime = (anime) => {
        if (activeAnime.includes(anime)) {
            setActiveAnime(activeAnime.filter(a => a !== anime));
        } else {
            setActiveAnime([...activeAnime, anime]);
        }
    };

    const togglePrice = (range) => {
        if (priceRange.includes(range)) {
            setPriceRange(priceRange.filter(r => r !== range));
        } else {
            setPriceRange([...priceRange, range]);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Category Filter
            if (activeCategory !== 'all' && p.category !== activeCategory) return false;

            // Anime Filter (mock property mainly, assuming category or name contains it?)
            // We need 'series' in our product data. Let's assume mock usage or partial match on name
            if (activeAnime.length > 0) {
                // Check if any selected anime is in product name or description (simple text match)
                const matches = activeAnime.some(anime =>
                    p.name.toLowerCase().includes(anime.replace('-', ' ')) ||
                    (p.description && p.description.toLowerCase().includes(anime.replace('-', ' ')))
                );
                if (!matches) return false;
            }

            // Price Filter
            if (priceRange.length > 0) {
                const price = p.price; // assuming INR
                // under-50 -> < 4000
                // 50-100 -> 4000 - 8000
                // over-100 -> > 8000
                const matches = priceRange.some(range => {
                    if (range === 'under-50') return price < 4000;
                    if (range === '50-100') return price >= 4000 && price <= 8000;
                    if (range === 'over-100') return price > 8000;
                    return false;
                });
                if (!matches) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'newest') return b.id - a.id;
            // trending -> random or reviews
            return b.reviews - a.reviews;
        });
    }, [activeCategory, activeAnime, priceRange, sortBy]);

    let pageTitle = "All Products";
    let pageSubtitle = "Explore our premium collection.";
    if (activeCategory !== 'all') {
        pageTitle = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + " Collection";
        pageSubtitle = "Premium " + activeCategory + " for true fans.";
    }

    return (
        <main className="shop-container">
            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
                <div className="filter-group">
                    <div className="filter-title">Categories</div>
                    <ul className="filter-list">
                        {['shirt', 't-shirt', 'pant', 'accessories', 'colab'].map(cat => (
                            <li className="filter-item" key={cat}>
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={activeCategory === cat}
                                        onChange={() => toggleCategory(cat)}
                                    />
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="filter-group">
                    <div className="filter-title">Anime</div>
                    <ul className="filter-list">
                        {['naruto', 'one-piece', 'demon-slayer', 'jujutsu-kaisen'].map(anime => (
                            <li className="filter-item" key={anime}>
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={activeAnime.includes(anime)}
                                        onChange={() => toggleAnime(anime)}
                                    />
                                    {anime.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="filter-group">
                    <div className="filter-title">Price Range</div>
                    <ul className="filter-list">
                        {[
                            { val: 'under-50', label: 'Under ₹4,000' },
                            { val: '50-100', label: '₹4,000 - ₹8,000' },
                            { val: 'over-100', label: 'Over ₹8,000' }
                        ].map(range => (
                            <li className="filter-item" key={range.val}>
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={priceRange.includes(range.val)}
                                        onChange={() => togglePrice(range.val)}
                                    />
                                    {range.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="btn ghost" style={{ width: '100%', marginTop: '10px' }} onClick={() => {
                    setActiveCategory('all');
                    setActiveAnime([]);
                    setPriceRange([]);
                }}>
                    Reset Filters
                </button>
            </aside>

            {/* Main Content */}
            <section className="shop-content">
                <div className="shop-header">
                    <div className="shop-title">
                        <h1>{pageTitle}</h1>
                        <p>{pageSubtitle}</p>
                    </div>
                    <div className="shop-actions">
                        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="trending">Sort by: Trending</option>
                            <option value="newest">Sort by: Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="shop-grid">
                    {filteredProducts.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                            <div className="image-placeholder tall" style={{ background: '#e2e8f0' }}>
                                {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <h3>{p.name}</h3>
                            <p>₹{p.price.toLocaleString()}</p>
                        </Link>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                            No products found.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button className="page-btn">←</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">→</button>
                </div>
            </section>
        </main>
    );
}
