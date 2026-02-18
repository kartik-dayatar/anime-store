import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories } from '../../data/products';
import ShopSidebar from '../../components/Shop/ShopSidebar';
import CategoryBar from '../../components/Shop/CategoryBar';
import ProductCard from '../../components/Shop/ProductCard';
import { staggerContainer, fadeInUp } from '../../utils/motionVariants';
import './Products.css';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
    const [sidebarCategories, setSidebarCategories] = useState([]); // For multi-select when 'all'
    const [activeAnime, setActiveAnime] = useState([]);
    const [priceRange, setPriceRange] = useState(20000); // Max price default
    const [sortBy, setSortBy] = useState('trending');

    // Handle Category Filter (Top Navbar)
    const toggleCategory = (cat) => {
        // This is controlled by the navbar, so we just set it.
        // It's unidirectional from the navbar.
        setActiveCategory(cat);
    };

    // Handle Sidebar Category Toggle (Multi-select)
    const toggleSidebarCategory = (cat) => {
        if (sidebarCategories.includes(cat)) {
            setSidebarCategories(sidebarCategories.filter(c => c !== cat));
        } else {
            setSidebarCategories([...sidebarCategories, cat]);
        }
    };

    const toggleAnime = (anime) => {
        if (activeAnime.includes(anime)) {
            setActiveAnime(activeAnime.filter(a => a !== anime));
        } else {
            setActiveAnime([...activeAnime, anime]);
        }
    };

    // Reset Filters
    const resetFilters = () => {
        setActiveCategory('all');
        setSidebarCategories([]);
        setActiveAnime([]);
        setPriceRange(20000);
    };

    // Debug Logging
    console.log('--- Filter State ---');
    console.log('Category:', activeCategory);
    console.log('Anime:', activeAnime);
    console.log('Price:', priceRange);

    const filteredProducts = useMemo(() => {
        const result = products.filter(p => {
            // Category Filter Logic
            if (activeCategory && activeCategory !== 'all') {
                // Single Category Mode (Top Navbar)
                if (p.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
            } else {
                // Multi-Category Mode (Sidebar)
                // If sidebarCategories has items, we MUST match at least one of them.
                if (sidebarCategories.length > 0) {
                    // Check if the product's category exists in the selected sidebar categories
                    // Ensure both are compared in lower case for safety
                    const isMatch = sidebarCategories.some(cat => cat.toLowerCase() === p.category.toLowerCase());
                    if (!isMatch) return false;
                }
            }

            // Anime Filter
            if (activeAnime.length > 0) {
                const matches = activeAnime.some(anime =>
                    p.name.toLowerCase().includes(anime.replace('-', ' ')) ||
                    (p.description && p.description.toLowerCase().includes(anime.replace('-', ' ')))
                );
                if (!matches) return false;
            }

            // Price Filter (Range Slider)
            if (p.price > priceRange) return false;

            return true;
        });

        console.log('Filtered Products Count:', result.length);

        return result.sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'newest') return b.id - a.id;
            return b.reviews - a.reviews;
        });
    }, [activeCategory, activeAnime, priceRange, sortBy, sidebarCategories]);

    let pageTitle = "All Products";
    let pageSubtitle = "Explore our premium collection.";
    if (activeCategory !== 'all') {
        pageTitle = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + " Collection";
        pageSubtitle = "Premium " + activeCategory + " for true fans.";
    }



    // Sync state with URL params
    useEffect(() => {
        const category = searchParams.get('category') || 'all';
        setActiveCategory(category);
    }, [searchParams]);

    return (
        <main className="shop-container">
            {/* Category Sub-Navbar */}
            <CategoryBar />

            <div className="shop-layout">
                {/* Sidebar Filters */}
                <ShopSidebar
                    activeCategory={activeCategory}
                    activeAnime={activeAnime}
                    priceRange={priceRange}
                    toggleCategory={toggleCategory}
                    toggleAnime={toggleAnime}
                    setPriceRange={setPriceRange}
                    resetFilters={resetFilters}
                    sidebarCategories={sidebarCategories}
                    toggleSidebarCategory={toggleSidebarCategory}
                />

                {/* Product Grid */}
                <section className="product-grid-section">
                    <div className="shop-header">
                        <h2 className="shop-title">
                            {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
                            <span className="product-count">({filteredProducts.length} items)</span>
                        </h2>

                        <div className="sort-container">
                            <span className="sort-label">Sort by:</span>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="trending">Trending</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="products-grid">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No products found based on your filters.</p>
                            <button onClick={resetFilters} className="clear-filters-btn">
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
