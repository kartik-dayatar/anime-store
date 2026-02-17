import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

export default function Account() {
    const user = "OtakuFan"; // Mock user

    return (
        <main className="account-container">
            <div className="account-layout">
                {/* Sidebar */}
                <aside className="account-sidebar">
                    <ul className="sidebar-menu">
                        <li><Link to="/account" className="sidebar-link active">Dashboard</Link></li>
                        <li><Link to="/orders" className="sidebar-link">My Orders</Link></li>
                        <li><Link to="/wishlist" className="sidebar-link">My Wishlist</Link></li>
                        <li><Link to="#" className="sidebar-link">Addresses</Link></li>
                        <li><Link to="#" className="sidebar-link">Profile Settings</Link></li>
                        <li><Link to="/logout" className="sidebar-link" style={{ color: '#ef4444' }}>Log out</Link></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <section className="account-content">
                    <h1>My Account</h1>
                    <p className="welcome-text">Welcome back, <strong>{user}</strong> 👋! Here's what's happening with your account.</p>

                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <h3>Total Orders</h3>
                            <div className="dashboard-value">12</div>
                            <Link to="/orders" className="dashboard-link">View all orders &rarr;</Link>
                        </div>
                        <div className="dashboard-card">
                            <h3>Wishlist Items</h3>
                            <div className="dashboard-value">4</div>
                            <Link to="/wishlist" className="dashboard-link">Go to Wishlist &rarr;</Link>
                        </div>
                    </div>

                    <div className="recent-orders">
                        <h2>Recent Activity</h2>
                        <div style={{ background: '#fff', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
                            <p style={{ color: 'var(--text-muted, #64748b)', margin: 0 }}>You have no recent account notifications.</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
