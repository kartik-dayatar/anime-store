import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

function MagneticButton({ children, onClick, className = '' }) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Calculate center
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Move button slightly towards mouse
        x.set((clientX - centerX) * 0.2); // Strength of magnet
        y.set((clientY - centerY) * 0.2);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            className={`magnetic-btn ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="btn-text">{children}</span>
            <motion.div
                className="btn-glow"
                animate={{ opacity: isHovered ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
            />
            {/* Animated border gradient */}
            <motion.div
                className="btn-border"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
            />
        </motion.button>
    );
}

export default MagneticButton;
