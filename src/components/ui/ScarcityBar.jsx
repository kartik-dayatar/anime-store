import { motion } from 'framer-motion';

function ScarcityBar({ sold = 0, total = 100, label = 'Sold' }) {
    const percentage = Math.min((sold / total) * 100, 100);

    // Determine color based on scarcity
    let barColor = 'var(--color-primary)';
    if (percentage > 85) barColor = 'var(--color-error)';
    else if (percentage > 60) barColor = 'var(--color-warning)';

    return (
        <div className="scarcity-container" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                <span>{label}</span>
                <span>{sold} / {total}</span>
            </div>
            <div style={{ height: '6px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    style={{
                        height: '100%',
                        backgroundColor: barColor,
                        borderRadius: '99px',
                        boxShadow: `0 0 10px ${barColor}40`
                    }}
                />
            </div>
        </div>
    );
}

export default ScarcityBar;
