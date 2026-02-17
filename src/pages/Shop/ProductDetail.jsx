import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { getProductById, products } from '../../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const product = getProductById(id);
    const addItem = useCartStore((s) => s.addItem);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div className="product-details-container" style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Product not found</h2>
            <Link to="/products" className="btn primary" style={{ marginTop: '20px' }}>Back to Shop</Link>
        </div>;
    }

    const handleAdd = (e) => {
        e.preventDefault();
        for (let i = 0; i < quantity; i++) {
            addItem(product, product.sizes ? product.sizes[selectedSize] : 'M');
        }
        // Simple alert or toast could go here
    };

    return (
        <main className="product-details-container">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs">
                <Link to="/home">Home</Link> &gt;
                <Link to="/products">Shop</Link> &gt;
                <span>{product.name}</span>
            </nav>

            {/* Product Layout */}
            <div className="product-layout">
                {/* Left: Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img
                            src={product.images && product.images[selectedImage] ? product.images[selectedImage] : "assets/placeholder.png"}
                            alt={product.name}
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="thumbnail-list">
                        {product.images && product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`thumbnail ${selectedImage === i ? 'active' : ''}`}
                                onClick={() => setSelectedImage(i)}
                            >
                                <img src={img} alt={`Thumb ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="product-info">
                    <div className="product-meta">
                        <span className="category-tag">{product.category}</span>
                        <span className="separator">•</span>
                        <div className="rating">
                            ★★★★★ ({product.reviews} reviews)
                        </div>
                    </div>

                    <h1>{product.name}</h1>
                    <div className="price">₹{product.price.toLocaleString()}</div>

                    <p className="description">
                        {product.description}
                    </p>

                    {/* Variant Selector */}
                    {product.sizes && (
                        <div className="variant-selector">
                            <span className="variant-label">Select Size</span>
                            <div className="size-options">
                                {product.sizes.map((size, i) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === i ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(i)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock Status */}
                    <div className="stock-status">
                        <span className="stock-dot"></span> In Stock and ready to ship
                    </div>

                    {/* Actions */}
                    <form onSubmit={handleAdd} className="pro-actions">
                        <div className="qty-input-group">
                            <button type="button" className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <span className="qty-value">{quantity}</span>
                            <button type="button" className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button type="submit" className="btn primary" style={{ flex: 1 }}>Add to Cart</button>
                        <button type="button" className="btn ghost icon-btn">❤️</button>
                    </form>

                    {/* Trust Badges */}
                    <div className="trust-badges">
                        <div className="trust-item">
                            <span className="trust-icon">🛡️</span>
                            <span>Official Merchandise</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">🔄</span>
                            <span>30-Day Returns</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">🔒</span>
                            <span>Secure Checkout</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">⚡</span>
                            <span>Fast Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="reviews-section">
                <div className="reviews-header">
                    <h2>Customer Reviews</h2>
                </div>

                <div className="review-card">
                    <div className="review-user">OtakuKing99</div>
                    <div className="rating" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>★★★★★</div>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                        Absolutely love the quality! The print is super high resolution and the fabric feels premium. arrived in 2 days.
                    </p>
                </div>
            </section>

            {/* Related Products */}
            <section className="related-products">
                <div className="related-header">
                    <h2>You may also like</h2>
                </div>
                <div className="shop-grid">
                    {products.slice(0, 4).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                            <div className="image-placeholder tall" style={{ background: '#f1f5f9' }}>
                                {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <h3>{p.name}</h3>
                            <p>₹{p.price.toLocaleString()}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
