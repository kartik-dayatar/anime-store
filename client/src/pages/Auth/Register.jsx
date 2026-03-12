import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Reusing Login styles
import './Register.css'; // Specific overrides

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/account');
    };

    return (
        <main className="login-main">
            <section className="login-shell">
                <div className="login-card">
                    <h1>Join the anime universe.</h1>
                    <p className="login-subtitle">It’s free and fast.</p>

                    <form className="login-form" onSubmit={handleRegister}>
                        <label className="login-field">
                            <span className="login-label">Full Name</span>
                            <input type="text" name="fullName" placeholder="Your name" className="form-input" />
                        </label>

                        <label className="login-field">
                            <span className="login-label">Email</span>
                            <input type="email" name="email" placeholder="you@otakunation.com" className="form-input" />
                        </label>

                        <label className="login-field">
                            <span className="login-label">Phone <span className="login-label-optional">(optional)</span></span>
                            <input type="tel" name="phone" placeholder="Enter your phone number" className="form-input" />
                        </label>

                        <div className="register-fields-row">
                            <label className="login-field">
                                <span className="login-label">Password</span>
                                <input type="password" name="password" placeholder="••••••••" className="form-input" />
                            </label>
                            <label className="login-field">
                                <span className="login-label">Confirm Password</span>
                                <input type="password" name="confirmPassword" placeholder="••••••••" className="form-input" />
                            </label>
                        </div>

                        <label className="login-remember register-terms">
                            <input type="checkbox" name="terms" />
                            <span>I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="login-link-small">Terms &amp; Privacy Policy</a></span>
                        </label>

                        <button type="submit" className="btn primary login-btn-full">Create account</button>

                        <div className="login-or">
                            <span></span>
                            <p>Or</p>
                            <span></span>
                        </div>

                        <button type="button" className="login-google-btn">
                            <span className="login-google-icon-placeholder">G</span>
                            <span>Continue with Google</span>
                        </button>

                        <p className="login-bottom-text">
                            Already a member? <Link to="/login" className="login-link-small">Login</Link>
                        </p>
                    </form>
                </div>

                <div className="login-hero">
                    <div className="login-hero-content">
                        <h2>Welcome to OtakuNation</h2>
                        <p className="register-hero-copy">
                            Create your account to unlock exclusive drops, wishlists, and faster checkouts.
                        </p>
                        <div className="login-hero-images">
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}></div>
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}></div>
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
