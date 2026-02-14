import { motion } from 'framer-motion';
import { routeTransition } from '../../utils/motionVariants';

/**
 * Wraps any page in a smooth fade+slide+blur transition.
 * Use inside Layout's <Outlet /> replacement via AnimatedOutlet.
 */
function PageTransition({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={routeTransition}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
}

export default PageTransition;
