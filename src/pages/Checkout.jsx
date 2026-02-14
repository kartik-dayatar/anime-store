import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';
import './Checkout.css';

const steps = ['Shipping', 'Payment', 'Review'];

function Checkout() {
    const { items, getTotal, clearCart } = useCartStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Form state
    const [shipping, setShipping] = useState({
        firstName: '', lastName: '', email: '', address: '', city: '', zip: '', country: '',
    });
    const [payment, setPayment] = useState({
        cardNumber: '', cardName: '', expiry: '', cvv: '',
    });

    const formatCardNumber = (val) => {
        return val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    };

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="container-wide">
                    <motion.div
                        className="checkout-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.div
                            className="success-icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            ✓
                        </motion.div>
                        <h1 className="success-title">Order Placed!</h1>
                        <p className="success-desc">
                            Thank you for your purchase. You'll receive a confirmation email shortly.
                        </p>
                        <div className="success-order-id">
                            Order #ANM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                            <Link to="/products" className="btn btn-primary btn-lg">Continue Shopping</Link>
                            <Link to="/account" className="btn btn-secondary btn-lg">View Orders</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-page" style={{ textAlign: 'center', padding: 'var(--space-20) 0' }}>
                <div className="container-wide">
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🛒</div>
                    <h2>Your cart is empty</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                        Add some items before checking out
                    </p>
                    <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-6)' }}>
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container-wide">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-8)' }}
                >
                    Checkout
                </motion.h1>

                {/* Steps */}
                <motion.div
                    className="checkout-steps"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {steps.map((step, i) => (
                        <div key={step} style={{ display: 'contents' }}>
                            <div className={`step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}>
                                <motion.div
                                    className="step-number"
                                    animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {i < currentStep ? '✓' : i + 1}
                                </motion.div>
                                <span className="step-label">{step}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`step-connector ${i < currentStep ? 'done' : ''}`} />
                            )}
                        </div>
                    ))}
                </motion.div>

                <div className="checkout-layout">
                    {/* Form */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            className="checkout-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 0 && (
                                <>
                                    <h3 className="form-title">Shipping Information</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="form-label">First Name</label>
                                            <input className="form-input" placeholder="John" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Last Name</label>
                                            <input className="form-input" placeholder="Doe" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                                        </div>
                                        <div className="form-group full">
                                            <label className="form-label">Email</label>
                                            <input className="form-input" type="email" placeholder="john@example.com" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
                                        </div>
                                        <div className="form-group full">
                                            <label className="form-label">Address</label>
                                            <input className="form-input" placeholder="123 Main St" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">City</label>
                                            <input className="form-input" placeholder="New York" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ZIP Code</label>
                                            <input className="form-input" placeholder="10001" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentStep === 1 && (
                                <>
                                    <h3 className="form-title">Payment Details</h3>
                                    {/* Card Preview */}
                                    <motion.div
                                        className="card-preview"
                                        initial={{ rotateY: 90 }}
                                        animate={{ rotateY: 0 }}
                                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <div className="card-chip" />
                                        <div className="card-number">
                                            {payment.cardNumber || '•••• •••• •••• ••••'}
                                        </div>
                                        <div className="card-bottom">
                                            <div className="card-holder">
                                                Card Holder
                                                <span>{payment.cardName || 'YOUR NAME'}</span>
                                            </div>
                                            <div className="card-expiry">
                                                Expires
                                                <span>{payment.expiry || 'MM/YY'}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="form-grid">
                                        <div className="form-group full">
                                            <label className="form-label">Card Number</label>
                                            <input className="form-input" placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })} maxLength={19} />
                                        </div>
                                        <div className="form-group full">
                                            <label className="form-label">Name on Card</label>
                                            <input className="form-input" placeholder="John Doe" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Expiry</label>
                                            <input className="form-input" placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} maxLength={5} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">CVV</label>
                                            <input className="form-input" type="password" placeholder="•••" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} maxLength={4} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <h3 className="form-title">Review Order</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                                        <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                            <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>Shipping to</h4>
                                            <p style={{ fontWeight: 600 }}>{shipping.firstName} {shipping.lastName}</p>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{shipping.address}, {shipping.city} {shipping.zip}</p>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{shipping.email}</p>
                                        </div>
                                        <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                            <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>Payment Method</h4>
                                            <p style={{ fontWeight: 600 }}>Card ending in {payment.cardNumber.slice(-4) || '••••'}</p>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{payment.cardName}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-actions">
                                {currentStep > 0 ? (
                                    <button className="form-back-btn" onClick={() => setCurrentStep(currentStep - 1)}>
                                        ← Back
                                    </button>
                                ) : (
                                    <Link to="/products" className="form-back-btn" style={{ textDecoration: 'none' }}>
                                        ← Continue Shopping
                                    </Link>
                                )}
                                {currentStep < 2 ? (
                                    <button className="form-next-btn" onClick={() => setCurrentStep(currentStep + 1)}>
                                        Continue →
                                    </button>
                                ) : (
                                    <motion.button
                                        className="form-next-btn"
                                        onClick={handlePlaceOrder}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Place Order — ${getTotal().toFixed(2)}
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Order Summary */}
                    <div className="checkout-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        {items.map((item) => (
                            <div key={`${item.id}-${item.selectedSize}`} className="summary-item">
                                <div className="summary-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="summary-item-info">
                                    <div className="summary-item-name">{item.name}</div>
                                    <div className="summary-item-meta">
                                        {item.selectedSize} × {item.quantity}
                                    </div>
                                </div>
                                <div className="summary-item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                        <div className="summary-divider" />
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${getTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>${(getTotal() * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${(getTotal() * 1.08).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
