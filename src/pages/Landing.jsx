import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingLoader from '../components/landing/LandingLoader';
import './Landing.css';

/* 
   REFINED DATA STRUCTURE 
   - 2-Word Names
   - Descriptions
   - Card Labels
   - Backgrounds kept
*/
const AVATARS = [
    {
        id: 'titan',
        name: 'TITAN ALPHA',
        label: 'LIMITED DROP',
        desc: "Precision-engineered collectibles designed for the elite. Each unit represents evolution in modern otaku culture.",
        bg: 'linear-gradient(45deg, #0c111b, #121a29)'
    },
    {
        id: 'rogue',
        name: 'ROGUE ONE',
        label: 'UNIT 02',
        desc: "Stealth mechanics meet high-street fashion. A silent guardian for the digital age.",
        bg: 'linear-gradient(45deg, #1f1012, #2d0b0f)'
    },
    {
        id: 'cipher',
        name: 'CIPHER ZERO',
        label: 'SERIES ONE',
        desc: "Encrypted aesthetics for the connected soul. Unlock the hidden layers of reality.",
        bg: 'linear-gradient(45deg, #110e1f, #1e1b33)'
    },
    {
        id: 'venom',
        name: 'VENOM VII',
        label: 'SIGNATURE ED.',
        desc: "Toxic beauty refined into pure form. The ultimate expression of dangerous allure.",
        bg: 'linear-gradient(45deg, #051a12, #0a291e)'
    },
    {
        id: 'ghost',
        name: 'GHOST PROXY',
        label: 'PROTOTYPE',
        desc: "Existing between dimensions. A fleeting glimpse of the future of design.",
        bg: 'linear-gradient(45deg, #18181b, #27272a)'
    }
];

function Landing() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1400);
        return () => clearTimeout(timer);
    }, []);

    const handleEnter = () => {
        navigate('/home');
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LandingLoader key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="landing-page">

                    {/* BACKGROUND SYSTEM */}
                    <div className="landing-bg-container">
                        {AVATARS.map((avatar) => (
                            <div
                                key={avatar.id}
                                className={`bg-layer ${selectedAvatar.id === avatar.id ? 'active' : ''}`}
                                style={{ background: avatar.bg }}
                            />
                        ))}
                    </div>
                    <div className="grain-overlay" />
                    <div className="light-sweep" />
                    <div className="vignette" />

                    {/* FRAME REPLICA */}
                    <div className="landing-frame-container">
                        <div className="frame-border" />
                    </div>

                    {/* LOGO AREA - Top Left Notch */}
                    <motion.div
                        className="logo-area"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="logo-text">OtakuNation</div>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.7, color: '#9ea6b8' }}>オタクナシオン</div>
                    </motion.div>

                    {/* TOP RIGHT UI */}
                    <motion.div
                        className="top-right-ui"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button className="btn-login-frame" onClick={handleEnter}>Login</button>
                        <div className="hamburger">
                            <span />
                            <span />
                            <span />
                        </div>
                    </motion.div>

                    {/* HERO SECTION */}
                    <div className="hero-container">
                        <motion.h1
                            className="hero-title"
                            key={selectedAvatar.name}
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {selectedAvatar.name}
                        </motion.h1>

                        {/* DESCRIPTIVE PARAGRAPH ADDED */}
                        <motion.p
                            className="hero-desc"
                            key={selectedAvatar.desc}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {selectedAvatar.desc}
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <button className="btn-shop-collection" onClick={handleEnter}>
                                EXPLORE COLLECTION
                            </button>
                            <div className="hero-line-extension" />
                        </motion.div>
                    </div>

                    {/* RIGHT TRAILER BOX - SHARED LAYOUT */}
                    <motion.div
                        className="trailer-box-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {!isTrailerOpen && (
                            <motion.div
                                className="trailer-box"
                                layoutId="trailer-video-box"
                                layout
                                onClick={() => setIsTrailerOpen(true)}
                                role="button"
                                style={{ borderRadius: '0px' }}
                            >
                                <video
                                    className="trailer-video-teaser"
                                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                    muted
                                    autoPlay
                                    loop
                                    playsInline
                                    onTimeUpdate={(e) => {
                                        if (e.target.currentTime >= 12) {
                                            e.target.currentTime = 5;
                                        }
                                    }}
                                    onLoadedMetadata={(e) => {
                                        e.target.currentTime = 5;
                                    }}
                                />
                                <div className="trailer-overlay" />
                            </motion.div>
                        )}
                        <div className="trailer-label">
                            <span style={{ color: 'var(--c-accent)' }}>&gt;</span> view the intro
                        </div>
                    </motion.div>

                    {/* VIDEO MODAL OVERLAY */}
                    <AnimatePresence>
                        {isTrailerOpen && (
                            <motion.div
                                className="video-modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsTrailerOpen(false)}
                            >
                                {/* BRAND CONTEXT HEADER */}
                                <motion.div
                                    className="modal-header"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="modal-label">LIMITED DROP 07</div>
                                    <h2 className="modal-title">TITAN ALPHA – OFFICIAL PROMO</h2>
                                    <p className="modal-desc">Precision-engineered collectibles. Verified authenticity. Elite release.</p>
                                </motion.div>

                                <motion.div
                                    className="video-modal-content"
                                    layoutId="trailer-video-box"
                                    layout
                                    onClick={(e) => e.stopPropagation()}
                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                    style={{ borderRadius: '0px' }}
                                >
                                    {/* Close Button Inside or Outside? User said Top-Right. 
                                        If inside clip-path container, might get cut off. 
                                        Better to put it absolute relative to content or overlay. 
                                        User: "Add Brand Context Header... Above video... Close button top-right". 
                                        I'll put it inside content but ensure z-index/position fits. 
                                        Actually, "Angular bordered button... same style as Explore". */}
                                    <button className="modal-close-btn" onClick={() => setIsTrailerOpen(false)}>
                                        <span>CLOSE</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>

                                    <div className="video-accent-line" /> {/* Horizontal Accent Line */}

                                    <video
                                        className="full-promo-video"
                                        src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                        autoPlay
                                        controls
                                        playsInline
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* BOTTOM LEFT CARDS (5) */}
                    <div className="bottom-cards-container">
                        {AVATARS.map((avatar, index) => (
                            <motion.div
                                key={avatar.id}
                                className={`card-outline ${selectedAvatar.id === avatar.id ? 'active' : ''}`}
                                onClick={() => setSelectedAvatar(avatar)}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + (index * 0.1) }}
                            >
                                {/* TEXT INSIDE CARDS ADDED */}
                                <div className="card-content">
                                    <div className="card-name">{avatar.name.split(' ')[0]}</div>
                                    <div className="card-sub">{avatar.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* BOTTOM RIGHT EQUALIZER */}
                    <motion.div
                        className="equalizer-widget"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    >
                        <div className="equalizer-bars">
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                        </div>
                        <div className="eq-labels">
                            <span>On</span>
                            <span>Off</span>
                        </div>
                    </motion.div>

                </div>
            )}
        </>
    );
}

export default Landing;
