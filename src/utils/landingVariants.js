/**
 * Cinematic Landing Page Animations
 * Theme: Slow reveals, parallax, strict opacity/transform usage
 */

const EASE_CINEMATIC = [0.25, 0.46, 0.45, 0.94];
const EASE_OUT = [0.215, 0.61, 0.355, 1];

// --- LOADER VARIANTS ---
export const loaderContainer = {
    initial: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: { duration: 0.8, ease: EASE_CINEMATIC }
    }
};

export const loaderText = {
    hidden: { opacity: 0, scale: 0.9, letterSpacing: "0em" },
    visible: {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.2em",
        transition: { duration: 1.2, ease: EASE_OUT }
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: { duration: 0.5, ease: "easeIn" }
    }
};

export const loaderLine = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, delay: 0.5, ease: EASE_CINEMATIC }
    }
};

// --- HERO & SCROLL VARIANTS ---

// Hero Text Reveal (Staggered words/lines)
export const heroTextReveal = {
    hidden: { opacity: 0, y: 100, rotateX: 10 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: EASE_OUT
        }
    }
};

// Container Stagger
export const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

// Artwork Fade In (Slower, mist-like)
export const artworkFade = {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: EASE_CINEMATIC
        }
    }
};

// Scroll Reveal (Upward drift)
export const scrollReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE_OUT
        }
    }
};

// Diagonal Reveal
export const diagonalReveal = {
    hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
    visible: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        transition: { duration: 1, ease: EASE_CINEMATIC }
    }
};

// Interactive Elements
export const magneticHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
};

export const glowPulse = {
    hidden: { opacity: 0 },
    visible: {
        opacity: [0.5, 1, 0.5],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
};

// Page Exit (To Store)
export const landingExit = {
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(10px)",
        transition: {
            duration: 0.8,
            ease: EASE_CINEMATIC
        }
    }
};
