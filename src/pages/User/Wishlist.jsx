import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { products } from '../../data/products';
import './Wishlist.css';

export default function Wishlist() {
    // Mock wishlist data - using real products
    const [wishlist, setWishlist] = useState(products.slice(0, 6));

    const addItem = useCartStore((state) => state.addItem);

    const handleRemove = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const handleAddToCart = (item) => {
        addItem(item, item.sizes ? item.sizes[0] : 'M'); // Default to M or first size
        // Optionally remove from wishlist? Let's keep it for now.
    };

    return (
        <main className="wishlist-main">
            <section className="wishlist-hero">
                <div className="wishlist-heading">
                    <h1><span className="wishlist-heart">❤</span>My Wishlist</h1>
                    <p>Your saved anime favourites in one place.</p>
                </div>

                <div className="wishlist-shell">
                    {wishlist.length > 0 ? (
                        <div className="wishlist-grid">
                            {wishlist.map(item => (
                                <article className="wishlist-card" key={item.id}>
                                    <div className="wishlist-image-slot">
                                        <div
                                            className="wishlist-gradient"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                background: `linear-gradient(135deg, ${['#0f172a', '#1e3a5f', '#3b1d6e', '#0c1220', '#ef4444', '#8b5cf6'][item.id % 6]} 0%, ${['#2563eb', '#7c3aed', '#334155', '#b91c1c', '#6d28d9', '#dc2626'][item.id % 6]} 100%)`
                                            }}
                                        />
                                    </div>
                                    <div className="wishlist-content">
                                        <Link to={`/product/${item.id}`} className="wishlist-title-link">
                                            <h2>{item.name}</h2>
                                        </Link>
                                        <p className="wishlist-price">₹{item.price.toLocaleString()}</p>

                                        <div className="stock-indicator">
                                            <span className={`dot ${item.inStock ? 'green' : 'red'}`}></span>
                                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                    </div>

                                    <div className="wishlist-actions">
                                        <button
                                            className="btn primary"
                                            onClick={() => handleAddToCart(item)}
                                            disabled={!item.inStock}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn ghost wishlist-remove"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">❤️</div>
                            <h2>Your wishlist is empty</h2>
                            <p>Save items you love here for later.</p>
                            <Link to="/products" className="btn primary">Start Browsing</Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
