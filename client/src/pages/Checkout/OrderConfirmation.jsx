import React from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css'; // Reusing Checkout styles for steps
import './OrderConfirmation.css'; // Specific styles

export default function OrderConfirmation() {
    return (
        <main className="checkout-container" style={{ display: 'block', minHeight: '80vh' }}>
            {/* Progress Steps: Cart -> Address -> Payment -> Confirmation */}
            <div className="checkout-steps">
                <div className="step completed">
                    <div className="step-circle">✓</div>
                    <div className="step-label">Cart</div>
                </div>
                <div className="step completed">
                    <div className="step-circle">✓</div>
                    <div className="step-label">Address</div>
                </div>
                <div className="step completed">
                    <div className="step-circle">✓</div>
                    <div className="step-label">Payment</div>
                </div>
                <div className="step completed">
                    <div className="step-circle">✓</div>
                    <div className="step-label">Confirm</div>
                </div>
            </div>

            <div className="form-card success-container">
                <div className="checkmark-circle">
                    <div className="checkmark"></div>
                </div>

                <h1 className="success-title">Order Placed!</h1>
                <p className="success-message">
                    Thank you for shopping with OtakuNation. Your order <strong>#ON-8824</strong> has been confirmed and
                    will be shipped soon.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
                    <Link to="/orders" className="btn ghost">View My Orders</Link>
                    <Link to="/home" className="btn primary">Continue Shopping</Link>
                </div>
            </div>
        </main>
    );
}
