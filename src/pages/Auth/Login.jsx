import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Verify login logic here
        console.log("Logging in with", email, password);
        navigate('/home');
    };

    return (
        <main className="login-main">
            <section className="login-shell">
                <div className="login-card">
                    <h1>Login to OtakuNation</h1>
                    <p className="login-subtitle">Welcome back! Enter your details.</p>

                    <form className="login-form" onSubmit={handleLogin}>
                        <label className="login-field">
                            <span className="login-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="otakunation@gmail.com"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label className="login-field">
                            <span className="login-label">Password</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <div className="login-row-between">
                            <label className="login-remember">
                                <input type="checkbox" name="remember" />
                                <span>Remember me</span>
                            </label>
                            <Link to="#" onClick={(e) => e.preventDefault()} className="login-link-small">Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn primary login-btn-full">Login</button>

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
                            New here? <Link to="/register" className="login-link-small">Create account</Link>
                        </p>
                    </form>
                </div>

                <div className="login-hero">
                    <div className="login-hero-content">
                        <h2>Where every Otaku belongs.<br />Welcome to OtakuNation</h2>
                        <div className="login-hero-images">
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #60a5fa, #2563eb)' }}></div>
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #f472b6, #db2777)' }}></div>
                            <div className="login-hero-image-slot" style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
