import { motion } from 'framer-motion';
import './AnimatedLoader.css';

/**
 * Anime-inspired loading spinner with bouncing dots and ring pulse.
 */
function AnimatedLoader({ text = 'Loading...' }) {
    return (
        <div className="animated-loader">
            <div className="loader-ring-wrapper">
                <motion.div
                    className="loader-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="loader-ring-pulse"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="loader-icon">⛩️</div>
            </div>
            <div className="loader-dots">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="loader-dot"
                        animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
            {text && (
                <motion.p
                    className="loader-text"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
}

export default AnimatedLoader;
