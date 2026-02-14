import { motion } from 'framer-motion';
import { badgeGlowPulse } from '../../utils/motionVariants';

function CollectorBadge({ serial = '001', total = '500', label = 'Limited Edition' }) {
    return (
        <motion.div
            className="collector-badge"
            animate={badgeGlowPulse}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(79, 70, 229, 0.2)',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
                userSelect: 'none'
            }}
        >
            <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                boxShadow: '0 0 8px var(--color-secondary)'
            }} />
            <span style={{ letterSpacing: '0.02em' }}>{label}</span>
            <span style={{
                height: '14px',
                width: '1px',
                backgroundColor: 'var(--color-border-hover)'
            }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.85em' }}>
                #{serial}/{total}
            </span>
        </motion.div>
    );
}

export default CollectorBadge;
