import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import './CartDrawer.css';

function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getCount } =
        useCartStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                    >
                        {/* Header */}
                        <div className="cart-header">
                            <h3>
                                Your Cart
                                <span className="cart-header-count">({getCount()} items)</span>
                            </h3>
                            <button className="cart-close" onClick={closeCart}>
                                ✕
                            </button>
                        </div>

                        {/* Items */}
                        <div className="cart-items">
                            {items.length === 0 ? (
                                <div className="cart-empty">
                                    <div className="cart-empty-icon">🛒</div>
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-secondary" onClick={closeCart}>
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.selectedSize}`}
                                            className="cart-item"
                                            layout
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, padding: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-name">{item.name}</div>
                                                <div className="cart-item-size">Size: {item.selectedSize}</div>
                                                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                                <div className="cart-item-controls">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                                                        }
                                                    >
                                                        −
                                                    </button>
                                                    <span className="cart-item-qty">{item.quantity}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        className="cart-item-remove"
                                                        onClick={() => removeItem(item.id, item.selectedSize)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Summary */}
                        {items.length > 0 && (
                            <div className="cart-summary">
                                <div className="cart-summary-row">
                                    <span>Subtotal</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="cart-summary-total">
                                    <span>Total</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <button className="cart-checkout-btn" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                                <button className="cart-continue" onClick={closeCart}>
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CartDrawer;
