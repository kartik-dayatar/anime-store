import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/ProductCard/ProductCard';
import { getProductById, products } from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const product = getProductById(id);
    const addItem = useCartStore((s) => s.addItem);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="product-detail" style={{ textAlign: 'center', padding: 'var(--space-20)' }}>
                <div className="container-wide">
                    <h2>Product not found</h2>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const handleAdd = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product, product.sizes[selectedSize]);
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="product-detail">
            <div className="container-wide">
                <Link to="/products" className="pd-back">← Back to Shop</Link>

                <div className="product-detail-grid">
                    {/* Gallery */}
                    <motion.div
                        className="pd-gallery"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="pd-main-image">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="pd-thumbnails">
                            {product.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`pd-thumb ${selectedImage === i ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(i)}
                                >
                                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        className="pd-info"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <div className="pd-breadcrumb">
                            <Link to="/">Home</Link>
                            <span>/</span>
                            <Link to="/products">Shop</Link>
                            <span>/</span>
                            <Link to={`/products?category=${product.category}`}>{product.category}</Link>
                        </div>

                        {product.badge && <div className="pd-badge">✦ {product.badge}</div>}

                        <h1 className="pd-title">{product.name}</h1>

                        <div className="pd-rating">
                            <div className="pd-stars">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className="pd-rating-text">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        <div className="pd-price-row">
                            <span className="pd-current-price">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="pd-original-price">${product.originalPrice.toFixed(2)}</span>
                            )}
                            {discount && <span className="pd-discount">-{discount}%</span>}
                        </div>

                        <p className="pd-description">{product.description}</p>

                        {/* Size */}
                        <div className="pd-sizes">
                            <span className="pd-sizes-label">
                                Size / Option: <strong>{product.sizes[selectedSize]}</strong>
                            </span>
                            <div className="pd-sizes-list">
                                {product.sizes.map((size, i) => (
                                    <motion.button
                                        key={size}
                                        className={`pd-size-btn ${selectedSize === i ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(i)}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pd-actions">
                            <div className="pd-qty">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <motion.button
                                className={`pd-add-btn ${added ? 'added' : ''}`}
                                onClick={handleAdd}
                                whileTap={{ scale: 0.97 }}
                            >
                                {added ? '✓ Added to Cart' : 'Add to Cart'}
                            </motion.button>
                        </div>

                        {/* Features */}
                        <div className="pd-features">
                            <div className="pd-feature">
                                <span className="pd-feature-icon">🚚</span>
                                <div className="pd-feature-text">
                                    <strong>Free Shipping</strong>
                                    Orders over $50
                                </div>
                            </div>
                            <div className="pd-feature">
                                <span className="pd-feature-icon">🔄</span>
                                <div className="pd-feature-text">
                                    <strong>Easy Returns</strong>
                                    30-day policy
                                </div>
                            </div>
                            <div className="pd-feature">
                                <span className="pd-feature-icon">🛡️</span>
                                <div className="pd-feature-text">
                                    <strong>Authentic</strong>
                                    100% genuine
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <motion.div
                        className="pd-related"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>You May Also Like</h2>
                        <div className="pd-related-grid">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
