import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { cardHover, imageHoverZoom, tapScale, badgeGlowPulse } from '../../utils/motionVariants';
import './ProductCard.css';

function ProductCard({ product, index = 0 }) {
    const [added, setAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addItem(product, product.sizes[0]);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={cardHover}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="product-card-image-wrapper">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    animate={isHovered ? imageHoverZoom : { scale: 1 }}
                />
                <div className="product-image-overlay" />

                {/* Badge */}
                {product.badge && (
                    <motion.div
                        className={`product-badge ${product.badge.toLowerCase().includes('limit') ? 'badge-limited' : ''}`}
                        animate={product.badge.toLowerCase().includes('limit') ? badgeGlowPulse : undefined}
                    >
                        {product.badge}
                    </motion.div>
                )}

                {/* Floating Actions (Visible on Hover) */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="product-floating-actions"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.button
                                className="action-btn wishlist-btn"
                                onClick={(e) => e.stopPropagation()}
                                whileTap={tapScale}
                                title="Add to Wishlist"
                            >
                                ♡
                            </motion.button>
                            <motion.button
                                className="action-btn quick-view-btn"
                                onClick={(e) => e.stopPropagation()}
                                whileTap={tapScale}
                                title="Quick View"
                            >
                                👁
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="product-info-wrapper">
                <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <div className="product-rating">
                        <span className="star">★</span> {product.rating}
                    </div>
                </div>

                <h3 className="product-name">{product.name}</h3>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <motion.button
                        className={`add-cart-btn ${added ? 'added' : ''}`}
                        onClick={handleAddToCart}
                        whileTap={tapScale}
                    >
                        {added ? 'Added' : 'Add'}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
