/**
 * Reusable Framer Motion Variants
 * Semantic naming for consistent animations across the app.
 * Durations: hover ~150-200ms | entrance ~300-500ms | page ~400ms
 */

// ===== PAGE TRANSITIONS =====
export const routeTransition = {
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -16,
        filter: 'blur(4px)',
        transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
    },
};

// ===== ENTRANCE ANIMATIONS =====
export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const fadeInScale = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 400, damping: 20, mass: 0.8 },
    },
};

// ===== STAGGER CONTAINERS =====
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerSlow = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 24, filter: 'blur(2px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

// ===== HOVER & TAP =====
export const hoverScale = {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const hoverScaleSubtle = {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
};

export const hoverLift = {
    y: -4,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const hoverGlow = {
    boxShadow: '0 0 24px rgba(79, 70, 229, 0.35)',
    transition: { duration: 0.2 },
};

export const tapScale = {
    scale: 0.96,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
};

export const tapScaleSubtle = {
    scale: 0.98,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
};

// ===== CARD ANIMATIONS =====
export const cardHover = {
    y: -6,
    scale: 1.02,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(79, 70, 229, 0.12)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export const imageHoverZoom = {
    scale: 1.08,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ===== SLIDE ANIMATIONS =====
export const slideInRight = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: 'spring', damping: 30, stiffness: 350, mass: 0.8 },
};

export const slideInUp = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: { type: 'spring', damping: 28, stiffness: 300 },
};

// ===== OVERLAY =====
export const overlayFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ===== TOAST =====
export const toastVariant = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 500, damping: 25, mass: 0.6 },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

// ===== BADGE =====
export const badgePop = {
    initial: { scale: 0, rotate: -45 },
    animate: {
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 600, damping: 15 },
    },
    exit: {
        scale: 0,
        rotate: 45,
        transition: { duration: 0.15 },
    },
};

// ===== FLOATING =====
export const floatAnimation = {
    y: [0, -8, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

export const floatAnimationSlow = {
    y: [0, -12, 0],
    transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

// ===== PULSE =====
export const pulseGlow = {
    boxShadow: [
        '0 0 0px rgba(79, 70, 229, 0)',
        '0 0 20px rgba(79, 70, 229, 0.4)',
        '0 0 0px rgba(79, 70, 229, 0)',
    ],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

// ===== UTILITY: Spring presets =====
export const springs = {
    snappy: { type: 'spring', stiffness: 500, damping: 25 },
    gentle: { type: 'spring', stiffness: 300, damping: 20 },
    bouncy: { type: 'spring', stiffness: 400, damping: 15 },
    stiff: { type: 'spring', stiffness: 600, damping: 30 },
};

// ===== UTILITY: Custom easing =====
export const easings = {
    smooth: [0.25, 0.46, 0.45, 0.94],
    snappy: [0.55, 0, 0.1, 1],
    decel: [0, 0, 0.2, 1],
    accel: [0.4, 0, 1, 1],
};
