import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import CartDrawer from '../CartDrawer/CartDrawer';
import { routeTransition } from '../../utils/motionVariants';
import './Layout.css';

function Layout() {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

    // Close sidebar on route change (mobile only)
    useEffect(() => {
        if (window.innerWidth <= 1024) {
            setSidebarOpen(false);
        }
    }, [location]);

    // Handle resize to auto-open/close
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                // Optional: Auto-open on desktop resize? 
                // Let's reset to true if it was closed by mobile logic? 
                // For now, respect user toggle or default.
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className={`layout-wrapper`}>
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Header onSidebarToggle={toggleSidebar} />

                <main className="page-transition-wrapper">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={routeTransition}
                            style={{ minHeight: 'calc(100vh - var(--header-height))' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>

                <Footer />
            </div>

            <CartDrawer />
        </div>
    );
}

export default Layout;
