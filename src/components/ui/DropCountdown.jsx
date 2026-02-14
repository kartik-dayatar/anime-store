import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countdownFlip } from '../../utils/motionVariants';

const CountdownUnit = ({ value, label }) => (
    <div className="countdown-unit" style={{ textAlign: 'center' }}>
        <div className="countdown-card" style={{
            position: 'relative',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-3)',
            minWidth: '48px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={value}
                    variants={countdownFlip}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1
                    }}
                >
                    {value.toString().padStart(2, '0')}
                </motion.span>
            </AnimatePresence>
        </div>
        <span style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 600,
            marginTop: '4px',
            display: 'block',
            letterSpacing: '0.05em'
        }}>
            {label}
        </span>
    </div>
);

function DropCountdown({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="drop-countdown" style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hrs" />
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
            <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
}

export default DropCountdown;
