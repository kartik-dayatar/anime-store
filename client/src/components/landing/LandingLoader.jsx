import { motion } from 'framer-motion';
import { Slab } from 'react-loading-indicators';

function LandingLoader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#0f1115',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{ position: 'relative', marginBottom: '60px', transform: 'scale(1.5)' }}>
                <Slab color="#32cd32" size="large" text="" textColor="" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(3rem, 15vw, 12rem)', // Large, responsive text
                    fontWeight: '900',
                    letterSpacing: '0.05em',
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    mixBlendMode: 'overlay' // Optional: blending for effect
                }}
            >
                OTAKUNATION
            </motion.div>
        </motion.div>
    );
}

export default LandingLoader;
