import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import './Wishlist.css';

export default function Wishlist() {
    // Mock wishlist data
    const [wishlist, setWishlist] = useState([
        { id: 1, name: "One Piece Wanted Poster", price: 1499, imageEmoji: "🏴☠️" },
        { id: 2, name: "Demon Slayer Katana", price: 4999, imageEmoji: "⚔️" },
        { id: 3, name: "Naruto Toad Wallet", price: 599, imageEmoji: "🐸" },
        { id: 4, name: "Demon Slayer Haori", price: 2499, imageEmoji: "👘" },
    ]);

    const addItem = useCartStore((state) => state.addItem);

    const handleRemove = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const handleAddToCart = (item) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            images: [], // Mock no image
            sizes: ['M'] // Default size
        }, 'M');
        // Optionally remove from wishlist or keep it
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
                                        <span style={{ fontSize: '2rem' }}>{item.imageEmoji}</span>
                                    </div>
                                    <h2>{item.name}</h2>
                                    <p className="wishlist-price"><span className="wishlist-star">★</span> {item.price}</p>
                                    <div className="wishlist-actions">
                                        <button
                                            className="btn primary"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to cart
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
