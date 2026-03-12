import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { overlayFade, tapScale, springs } from '../../utils/motionVariants';
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
                        variants={overlayFade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 35,
                            stiffness: 400,
                            mass: 0.8,
                        }}
                    >
                        {/* Header */}
                        <motion.div
                            className="cart-header"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                        >
                            <h3>
                                Your Cart
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={getCount()}
                                        className="cart-header-count"
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        ({getCount()} items)
                                    </motion.span>
                                </AnimatePresence>
                            </h3>
                            <motion.button
                                className="cart-close"
                                onClick={closeCart}
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={tapScale}
                                transition={{ duration: 0.2 }}
                            >
                                ✕
                            </motion.button>
                        </motion.div>

                        {/* Items */}
                        <div className="cart-items">
                            {items.length === 0 ? (
                                <motion.div
                                    className="cart-empty"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <motion.div
                                        className="cart-empty-icon"
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        🛒
                                    </motion.div>
                                    <p>Your cart is empty</p>
                                    <motion.button
                                        className="btn btn-secondary"
                                        onClick={closeCart}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={tapScale}
                                    >
                                        Continue Shopping
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={`${item.id}-${item.selectedSize}`}
                                            className="cart-item"
                                            layout
                                            initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{
                                                opacity: 0,
                                                x: 60,
                                                scale: 0.8,
                                                height: 0,
                                                marginBottom: 0,
                                                padding: 0,
                                                transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
                                            }}
                                            transition={{
                                                layout: springs.gentle,
                                                delay: idx * 0.05,
                                                duration: 0.3,
                                            }}
                                        >
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-name">{item.name}</div>
                                                <div className="cart-item-size">Size: {item.selectedSize}</div>
                                                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                                <div className="cart-item-controls">
                                                    <motion.button
                                                        className="qty-btn"
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={tapScale}
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                                                        }
                                                    >
                                                        −
                                                    </motion.button>
                                                    <AnimatePresence mode="wait">
                                                        <motion.span
                                                            key={item.quantity}
                                                            className="cart-item-qty"
                                                            initial={{ y: -8, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            exit={{ y: 8, opacity: 0 }}
                                                            transition={{ duration: 0.15 }}
                                                        >
                                                            {item.quantity}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                    <motion.button
                                                        className="qty-btn"
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={tapScale}
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                                                        }
                                                    >
                                                        +
                                                    </motion.button>
                                                    <motion.button
                                                        className="cart-item-remove"
                                                        onClick={() => removeItem(item.id, item.selectedSize)}
                                                        whileHover={{ color: '#ef4444', x: 2 }}
                                                        whileTap={tapScale}
                                                    >
                                                        Remove
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Summary */}
                        {items.length > 0 && (
                            <motion.div
                                className="cart-summary"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <div className="cart-summary-row">
                                    <span>Subtotal</span>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={getTotal()}
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            ${getTotal().toFixed(2)}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="cart-summary-total">
                                    <span>Total</span>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={getTotal()}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            ${getTotal().toFixed(2)}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <motion.button
                                    className="cart-checkout-btn"
                                    onClick={handleCheckout}
                                    whileHover={{ y: -2, boxShadow: '0 0 30px rgba(79, 70, 229, 0.4)' }}
                                    whileTap={tapScale}
                                >
                                    Proceed to Checkout
                                </motion.button>
                                <motion.button
                                    className="cart-continue"
                                    onClick={closeCart}
                                    whileHover={{ color: 'var(--color-text)' }}
                                >
                                    Continue Shopping
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CartDrawer;
