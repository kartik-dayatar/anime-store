import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './Account.css';

const mockOrders = [
    {
        id: 'ANM-7F82KL',
        date: '2026-02-10',
        status: 'delivered',
        statusText: 'Delivered',
        trackingStep: 4,
        items: [products[0], products[5]],
        total: 219.98,
    },
    {
        id: 'ANM-3A91PQ',
        date: '2026-02-08',
        status: 'shipped',
        statusText: 'Shipped',
        trackingStep: 2,
        items: [products[2]],
        total: 149.99,
    },
    {
        id: 'ANM-9C45XD',
        date: '2026-02-12',
        status: 'processing',
        statusText: 'Processing',
        trackingStep: 1,
        items: [products[3], products[7], products[10]],
        total: 284.97,
    },
];

const trackingSteps = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
const tabs = [
    { id: 'orders', label: 'My Orders', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
];

function Account() {
    const [activeTab, setActiveTab] = useState('orders');
    const [expandedOrder, setExpandedOrder] = useState(null);

    return (
        <div className="account-page">
            <div className="container-wide">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-8)' }}
                >
                    My Account
                </motion.h1>

                <div className="account-layout">
                    {/* Sidebar */}
                    <motion.aside
                        className="account-sidebar"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="account-profile">
                            <div className="account-avatar">🎌</div>
                            <div className="account-name">Anime Fan</div>
                            <div className="account-email">fan@animestore.com</div>
                        </div>

                        <div className="account-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`account-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className="account-tab-icon">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </motion.aside>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="account-content"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Orders */}
                            {activeTab === 'orders' && (
                                <>
                                    <h2 className="account-section-title">My Orders</h2>
                                    <div className="order-list">
                                        {mockOrders.map((order, idx) => (
                                            <motion.div
                                                key={order.id}
                                                className="order-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <div className="order-header">
                                                    <div>
                                                        <div className="order-id">{order.id}</div>
                                                        <div className="order-date">{order.date}</div>
                                                    </div>
                                                    <span className={`order-status-badge ${order.status}`}>
                                                        {order.status === 'delivered' && '✓ '}
                                                        {order.status === 'shipped' && '🚚 '}
                                                        {order.status === 'processing' && '⏳ '}
                                                        {order.statusText}
                                                    </span>
                                                </div>

                                                <div className="order-items-row">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="order-item-thumb">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="order-item-thumb" style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            background: 'var(--color-bg-tertiary)', fontSize: 'var(--font-size-xs)',
                                                            color: 'var(--color-text-muted)', fontWeight: 700,
                                                        }}>
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tracking */}
                                                <AnimatePresence>
                                                    {(expandedOrder === order.id || order.status !== 'delivered') && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="tracking-bar">
                                                                {trackingSteps.map((step, i) => (
                                                                    <div key={step} style={{ display: 'contents' }}>
                                                                        <motion.div
                                                                            className={`tracking-step ${i < order.trackingStep ? 'done' : ''
                                                                                } ${i === order.trackingStep ? 'active' : ''}`}
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                                                                        >
                                                                            <div className="tracking-dot" />
                                                                            <div className="tracking-label">{step}</div>
                                                                        </motion.div>
                                                                        {i < trackingSteps.length - 1 && (
                                                                            <div className={`tracking-line ${i < order.trackingStep ? 'done' : ''}`} />
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <div className="order-footer">
                                                    <div className="order-total">
                                                        <span>Total:</span> ${order.total.toFixed(2)}
                                                    </div>
                                                    <button
                                                        className="btn btn-secondary"
                                                        style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-1) var(--space-3)' }}
                                                        onClick={() =>
                                                            setExpandedOrder(expandedOrder === order.id ? null : order.id)
                                                        }
                                                    >
                                                        {expandedOrder === order.id ? 'Hide Details' : 'Track Order'}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Wishlist */}
                            {activeTab === 'wishlist' && (
                                <>
                                    <h2 className="account-section-title">My Wishlist</h2>
                                    <div className="wishlist-grid">
                                        {products.slice(0, 6).map((product, i) => (
                                            <ProductCard key={product.id} product={product} index={i} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Profile */}
                            {activeTab === 'profile' && (
                                <>
                                    <h2 className="account-section-title">Profile Settings</h2>
                                    <div className="profile-form">
                                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', display: 'block' }}>First Name</label>
                                                <input className="form-input" defaultValue="Anime" style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', width: '100%' }} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', display: 'block' }}>Last Name</label>
                                                <input className="form-input" defaultValue="Fan" style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', width: '100%' }} />
                                            </div>
                                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                                <label className="form-label" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', display: 'block' }}>Email</label>
                                                <input className="form-input" type="email" defaultValue="fan@animestore.com" style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', width: '100%' }} />
                                            </div>
                                            <div style={{ gridColumn: '1 / -1', marginTop: 'var(--space-4)' }}>
                                                <button className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Account;
