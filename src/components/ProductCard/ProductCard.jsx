import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { staggerItem, cardHover, imageHoverZoom, tapScale } from '../../utils/motionVariants';
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
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <motion.div
            className="product-card"
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={cardHover}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="product-card-image">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    animate={isHovered ? imageHoverZoom : { scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {product.badge && (
                    <motion.div
                        className="product-card-badge"
                        initial={{ opacity: 0, scale: 0.8, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        {product.badge}
                    </motion.div>
                )}
                <motion.div
                    className="product-card-actions"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.button
                        className={`product-card-add-btn ${added ? 'added' : ''}`}
                        onClick={handleAddToCart}
                        whileTap={tapScale}
                    >
                        {added ? '✓ Added' : '+ Add to Cart'}
                    </motion.button>
                    <motion.button
                        className="product-card-wish-btn"
                        onClick={(e) => e.stopPropagation()}
                        whileTap={tapScale}
                    >
                        ♡
                    </motion.button>
                </motion.div>
            </div>
            <div className="product-card-info">
                <div className="product-card-category">{product.category}</div>
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-bottom">
                    <div className="product-card-price">
                        <span className="current">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                    <div className="product-card-rating">
                        <span className="star">★</span>
                        <span>{product.rating}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
