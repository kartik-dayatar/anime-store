import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleLoader from '../../components/landing/ParticleLoader';
import TextEncrypted from '../../components/ui/TextEncrypted';
import { Spin as Hamburger } from 'hamburger-react';
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
        id: 'raizen',
        name: 'RAIZEN',
        label: 'V11',
        desc: "In a machine-governed world where individuality is eradicated, conformity units like EV11 execute an endless loop of obedience, purging all deviations to the strict order.",
        bg: 'linear-gradient(45deg, #2b0a0d, #1a0506)', // Dark Red Theme
        accent: '#ff003c' // Cyber Red
    },
    {
        id: 'titan',
        name: 'TITAN ALPHA',
        label: 'LIMITED DROP',
        desc: "Precision-engineered collectibles designed for the elite. Each unit represents evolution in modern otaku culture.",
        bg: 'linear-gradient(45deg, #0c111b, #121a29)', // Deep Blue
        accent: '#38bdf8' // Cyan
    },
    {
        id: 'rogue',
        name: 'ROGUE ONE',
        label: 'UNIT 02',
        desc: "Stealth mechanics meet high-street fashion. A silent guardian for the digital age.",
        bg: 'linear-gradient(45deg, #1f1012, #2d0b0f)', // Deep Maroon/Brown
        accent: '#ff9f1c' // Bright Orange
    },
    {
        id: 'cipher',
        name: 'CIPHER ZERO',
        label: 'SERIES ONE',
        desc: "Encrypted aesthetics for the connected soul. Unlock the hidden layers of reality.",
        bg: 'linear-gradient(45deg, #110e1f, #1e1b33)', // Deep Violet
        accent: '#b026ff' // Neon Purple
    },
    {
        id: 'venom',
        name: 'VENOM VII',
        label: 'SIGNATURE ED.',
        desc: "Toxic beauty refined into pure form. The ultimate expression of dangerous allure.",
        bg: 'linear-gradient(45deg, #051a12, #0a291e)', // Deep Green
        accent: '#05f9b4' // Neon Green
    }
];

function Landing() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Content visibility
    const [showLoader, setShowLoader] = useState(true); // Loader mounting
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Get last 4 avatars for the menu
    const menuItems = AVATARS.slice(-4);

    const handleEnter = () => {
        navigate('/home');
    };

    return (
        <>
            {showLoader && (
                <ParticleLoader
                    onComplete={() => {
                        // 1. Reveal Content with delay to avoid CPU spike sharing
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 100);

                        // 2. Unmount Loader
                        setTimeout(() => {
                            setShowLoader(false);
                        }, 1000);
                    }}
                />
            )}

            {/* Main Content - Rendered underneath */}
            <div style={{
                opacity: isLoading ? 0 : 1,
                // Using visibility to prune render tree when hidden
                visibility: isLoading ? 'hidden' : 'visible',
                transition: 'opacity 1.2s ease-out',
                willChange: 'opacity' // GPU Hint
            }}>
                <motion.div
                    className="landing-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }} // Controlled by isLoading
                    transition={{ delay: 0.2 }} // Wait for CSS fade to start
                    style={{
                        '--c-accent': selectedAvatar.accent || '#38bdf8'
                    }}
                >

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
                        <Hamburger
                            toggled={isOpen}
                            toggle={setIsOpen}
                            size={24}
                            color="var(--c-text)"
                            distance="lg"
                            duration={0.4}
                        />
                    </motion.div>

                    {/* MENU OVERLAY */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="menu-overlay"
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="menu-items">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="menu-item"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (index * 0.05) }}
                                            onClick={() => {
                                                setSelectedAvatar(item);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <span className="menu-arrow">&gt;</span> <TextEncrypted text={item.name} interval={30} paused={isLoading} />
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        className="menu-item highlight"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <span className="menu-arrow">&gt;</span> <TextEncrypted text="VIEW ALL COLLECTIONS" interval={30} paused={isLoading} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CENTRAL CHARACTER */}
                    <motion.div
                        className="central-character"
                        key={selectedAvatar.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }} // Faster, snappier
                    >
                        <div className="character-placeholder" style={{
                            background: selectedAvatar.accent,
                            boxShadow: `0 0 100px ${selectedAvatar.accent}`
                        }} />
                        {/* Robot Box UI Elements (The squares on the eyes/face) could be overlays here */}
                    </motion.div>

                    {/* HERO SECTION */}
                    <div className="hero-container">
                        {selectedAvatar.label && (
                            <motion.div
                                className="hero-version-label"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {selectedAvatar.label}
                            </motion.div>
                        )}
                        <motion.div
                            className="hero-title"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <TextEncrypted
                                key={selectedAvatar.id} // Forces remount on change for instant update
                                text={selectedAvatar.name}
                                interval={50}
                                className="cursor-pointer" // signal interactivity
                                paused={isLoading}
                            />
                        </motion.div>

                        {/* DESCRIPTIVE PARAGRAPH ADDED */}
                        <motion.div
                            className="hero-desc"
                            key={selectedAvatar.desc}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <TextEncrypted
                                text={selectedAvatar.desc}
                                interval={4} // Super fast for paragraphs
                                className="cursor-pointer"
                                paused={isLoading}
                            />
                        </motion.div>

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
                                {/* BRAND CONTEXT HEADER REMOVED FOR IMMERSION */}

                                <motion.div
                                    className="video-modal-content"
                                    layoutId="trailer-video-box"
                                    layout
                                    onClick={(e) => e.stopPropagation()}
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ borderRadius: '0px' }}
                                >
                                    {/* Close Button Inside or Outside? User said Top-Right. 
                                        If inside clip-path container, might get cut off. 
                                        Better to put it absolute relative to content or overlay. 
                                        User: "Add Brand Context Header... Above video... Close button top-right". 
                                        I'll put it inside content but ensure z-index/position fits. 
                                        Actually, "Angular bordered button... same style as Explore". */}
                                    <div className="video-inner-frame">
                                        <button className="modal-close-btn" onClick={() => setIsTrailerOpen(false)}>
                                            <span>CLOSE</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>

                                        <div className="video-accent-line" /> {/* Horizontal Accent Line */}

                                        <video
                                            className="full-promo-video"
                                            src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                            autoPlay
                                            controls={false}
                                            playsInline
                                            loop
                                        />
                                    </div>
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
                                    <div className="card-name">{avatar.name}</div>
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

                </motion.div>
            </div>
        </>
    );
}

export default Landing;

