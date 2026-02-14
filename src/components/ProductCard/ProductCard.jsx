import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import './ProductCard.css';

function ProductCard({ product, index = 0 }) {
    const [added, setAdded] = useState(false);
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="product-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <div className="product-card-badge">{product.badge}</div>}
                <div className="product-card-actions">
                    <motion.button
                        className={`product-card-add-btn ${added ? 'added' : ''}`}
                        onClick={handleAddToCart}
                        whileTap={{ scale: 0.9 }}
                    >
                        {added ? '✓ Added' : '+ Add to Cart'}
                    </motion.button>
                </div>
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
