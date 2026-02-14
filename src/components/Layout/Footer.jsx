import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container-wide">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">⛩️</div>
                            <div className="footer-logo-text">
                                Anime<span>Store</span>
                            </div>
                        </Link>
                        <p className="footer-desc">
                            Your ultimate destination for premium anime merchandise. From collectible figures to
                            stylish apparel, we bring your favorite anime worlds to life.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                            <a href="#" className="social-link" aria-label="Instagram">📷</a>
                            <a href="#" className="social-link" aria-label="Discord">💬</a>
                            <a href="#" className="social-link" aria-label="YouTube">▶</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Shop</h4>
                        <div className="footer-links">
                            <Link to="/products">All Products</Link>
                            <Link to="/products?category=figures">Figures</Link>
                            <Link to="/products?category=apparel">Apparel</Link>
                            <Link to="/products?category=manga">Manga</Link>
                            <Link to="/products?category=accessories">Accessories</Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="footer-column">
                        <h4>Support</h4>
                        <div className="footer-links">
                            <a href="#">Help Center</a>
                            <a href="#">Shipping Info</a>
                            <a href="#">Returns</a>
                            <a href="#">Order Tracking</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-column">
                        <h4>Stay Updated</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)', lineHeight: '1.6' }}>
                            Get the latest drops, exclusive deals, and anime news delivered to your inbox.
                        </p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                className="newsletter-input"
                                placeholder="your@email.com"
                            />
                            <button type="submit" className="newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2026 AnimeStore. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
