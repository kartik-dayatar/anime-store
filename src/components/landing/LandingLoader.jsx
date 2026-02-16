import { motion } from 'framer-motion';

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
            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                {/* Thin Ring */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0,
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%'
                    }}
                />

                {/* Rotating Arc */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0,
                        border: '1px solid transparent',
                        borderTopColor: '#38bdf8',
                        borderRadius: '50%'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />

                {/* Orbiting Dot */}
                <motion.div
                    style={{
                        position: 'absolute', top: 0, left: '50%', width: '4px', height: '4px',
                        background: '#38bdf8', borderRadius: '50%',
                        boxShadow: '0 0 8px #38bdf8',
                        marginLeft: '-2px', marginTop: '-2px'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '50% 32px' }}
                /* Note: transformOrigin needs to center on the ring. 30px radius + 2px offset = 32px? 
                   Actually, easier to rotate a container. Let's adjust structure. */
                />

                <motion.div
                    style={{
                        position: 'absolute', inset: 0
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                    <div style={{
                        position: 'absolute', top: 0, left: '50%', width: '6px', height: '6px',
                        background: '#ffffff', borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
                    }} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                    marginTop: '2rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.875rem',
                    letterSpacing: '0.2em',
                    color: '#9ca3af'
                }}
            >
                ANIMESTORE
            </motion.div>
        </motion.div>
    );
}

export default LandingLoader;
