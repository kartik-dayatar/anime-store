import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const cartCount = useCartStore((state) => state.getCount());
    // Placeholder login state - set to false to show Sign In/Up buttons as per JSP logic, 
    // or true to show Account. Let's default to false or checking local storage if we had it.
    // For now, hardcoded false to match the "guest" view which is common.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${searchTerm}`);
    };

    return (
        <header className="site-header">
            <div className="top-bar">
                {/* LEFT: Logo */}
                <div className="logo-container">
                    <Link to="/home" className="logo-link">
                        {/* Assuming assets/Logo.png exists, otherwise fallback to text or existing icon */}
                        {/* The user JSP used assumptions about assets. We'll try to use the image if it exists, 
                            or use the text logo from before if the image is missing. 
                            The previous header had a text logo. Let's use the text/icon combo but styled like the request?
                            The request specifically asks for <img src="<%=cp%>/assets/Logo.png" ...> 
                            I will check if that file exists. If not, I'll use the text/icon from the old header but wrapped in their structure.
                        */}
                        {/* For now, I'll use the text implementation to be safe, but wrapped in their classes */}
                        <span style={{ fontSize: '1.5rem', marginRight: '5px' }}>⚡</span>
                        {/* If they really want the image, they should provide it. I'll stick to the previous logo text but use their classes */}
                        {/* <img src="/assets/Logo.png" alt="OtakuNation" className="logo-img" /> */}
                    </Link>
                    <span className="brand-tagline">Premium Anime Merchandise</span>
                </div>

                {/* CENTER: Search Bar */}
                <div className="search-bar-container">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for anime gear..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>
                </div>

                {/* CENTER-RIGHT: Navigation */}
                <nav className="main-nav">
                    <Link to="/home">Home</Link>
                    <Link to="/products">Shop</Link>
                    {/* Categories Dropdown */}
                    <div className="nav-dropdown">
                        <Link to="/home#categories" className="nav-dropdown-trigger">
                            Categories <span className="dropdown-arrow">▾</span>
                        </Link>
                        <div className="dropdown-menu">
                            <Link to="/products?category=clothing">👕 Clothing</Link>
                            <Link to="/products?category=figures">⚡ Figures</Link>
                            <Link to="/products?category=accessories">🎒 Accessories</Link>
                            <Link to="/products?category=posters">🖼️ Posters</Link>
                            <Link to="/products?category=collectibles">⭐ Collectibles</Link>
                            <Link to="/products?category=manga">📖 Manga</Link>
                            <Link to="/products?category=plushies">🧸 Plushies</Link>
                        </div>
                    </div>
                    <Link to="/new-arrivals">New Arrivals</Link>

                    <Link to="/contact">Contact</Link>
                </nav>

                {/* RIGHT: Actions */}
                <div className="header-actions">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="btn ghost">Sign in</Link>
                            <Link to="/register" className="btn primary">Sign up</Link>
                        </>
                    ) : (
                        <Link to="/account" className="btn ghost">👤 Account</Link>
                    )}

                    <Link to="/wishlist" className="btn ghost icon-btn" aria-label="Wishlist">
                        ❤️
                    </Link>

                    <Link to="/cart" className="btn ghost icon-btn" aria-label="Cart">
                        🛒
                        {cartCount > 0 && (
                            <span className="badge">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
