import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../CartDrawer/CartDrawer';
import { routeTransition } from '../../utils/motionVariants';
import './Layout.css';



function Layout() {
    const location = useLocation();

    return (
        <div className="layout-wrapper">
            {/* Main Content - No Sidebar anymore */}
            <div className="main-content">
                <Header />

                <main className="page-transition-wrapper">
                    <main className="page-transition-wrapper">
                        <Outlet />
                    </main>

                </main>

                <Footer />
            </div>

            <CartDrawer />
        </div>
    );
}

export default Layout;
