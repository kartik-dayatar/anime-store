import React from 'react';
import { Tag, User, Filter, RotateCcw } from 'lucide-react';
import './ShopSidebar.css';

const ShopSidebar = ({
    activeCategory,
    activeAnime,
    priceRange,
    toggleCategory, // unused in multi-mode, but kept for prop structure if needed
    toggleAnime,
    setPriceRange,
    resetFilters,
    sidebarCategories, // New: Array of selected categories
    toggleSidebarCategory // New: Function to toggle sidebar categories
}) => {
    return (
        <aside className="shop-sidebar">
            {/* Categories - Only visible if activeCategory is 'all' */}
            {activeCategory === 'all' && (
                <div className="sidebar-group">
                    <div className="sidebar-title">
                        <Tag size={18} className="sidebar-icon" />
                        <span>Categories</span>
                    </div>
                    <ul className="sidebar-list">
                        {['apparel', 'figures', 'manga', 'accessories', 'footwear', 'home-decor', 'ukiyo-district'].map(cat => (
                            <li className="sidebar-item" key={cat}>
                                <label className={`sidebar-label ${sidebarCategories.includes(cat) ? 'active' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={sidebarCategories.includes(cat)}
                                        onChange={() => toggleSidebarCategory(cat)}
                                        className="sidebar-checkbox"
                                    />
                                    <span className="label-text">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Anime Series */}
            <div className="sidebar-group">
                <div className="sidebar-title">
                    <User size={18} className="sidebar-icon" />
                    <span>Anime Series</span>
                </div>
                <ul className="sidebar-list">
                    {['naruto', 'one-piece', 'demon-slayer', 'jujutsu-kaisen'].map(anime => (
                        <li className="sidebar-item" key={anime}>
                            <label className={`sidebar-label ${activeAnime.includes(anime) ? 'active' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={activeAnime.includes(anime)}
                                    onChange={() => toggleAnime(anime)}
                                    className="sidebar-checkbox"
                                />
                                <span className="label-text">
                                    {anime.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range Slider */}
            <div className="sidebar-group">
                <div className="sidebar-title">
                    <Filter size={18} className="sidebar-icon" />
                    <span>Max Price: ₹{priceRange.toLocaleString()}</span>
                </div>
                <div className="price-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="price-slider"
                        style={{
                            background: `linear-gradient(to right, #9333ea ${(priceRange / 20000) * 100}%, #e2e8f0 ${(priceRange / 20000) * 100}%)`
                        }}
                    />
                    <div className="price-labels">
                        <span>₹0</span>
                        <span>₹20,000+</span>
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <button className="reset-btn" onClick={resetFilters}>
                <RotateCcw size={16} />
                <span>Reset Filters</span>
            </button>
        </aside>
    );
};

export default ShopSidebar;
