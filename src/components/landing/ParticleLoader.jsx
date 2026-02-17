import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ParticleLoader = ({ onComplete }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const cellSize = 20; // Increased from 16 to reduce particle count (Perf optimization)
        const chars = "XYZ0123456789$#@%&*ABCDEFGHIJKLMNOPQRST";
        const targetWord = "OTAKUNATION";
        let grid = [];

        // Colors
        const colorGrey = "#334155";
        const colorRed = "#FF0000";
        const colorBg = "#000000";

        // Pre-calculated
        const TO_RAD = Math.PI / 180;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // 1. Offscreen Text Analysis
            const offCanvas = document.createElement('canvas');
            offCanvas.width = canvas.width;
            offCanvas.height = canvas.height;
            const offCtx = offCanvas.getContext('2d');

            const fontSize = Math.min(canvas.width * 0.12, 180);

            offCtx.font = `900 ${fontSize}px "Space Grotesk"`;
            offCtx.textAlign = 'center';
            offCtx.textBaseline = 'middle';
            offCtx.fillStyle = '#FFFFFF';
            offCtx.fillText(targetWord, canvas.width / 2, canvas.height / 2);

            const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

            // 2. Build Grid
            const cols = Math.ceil(canvas.width / cellSize);
            const rows = Math.ceil(canvas.height / cellSize);

            grid = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * cellSize + cellSize / 2;
                    const y = r * cellSize + cellSize / 2;

                    const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
                    const alpha = imgData[pixelIndex + 3];
                    const isBrand = alpha > 128;

                    grid.push({
                        x,
                        y,
                        char: chars[Math.floor(Math.random() * chars.length)],
                        color: colorGrey,
                        isBrand,
                        fontSize: 12,
                        circleRadius: 0,
                        opacity: 1,
                        rotation: 0,
                        scale: 1,
                        renderType: 'text'
                    });
                }
            }
        };

        const draw = () => {
            // Clear
            ctx.fillStyle = colorBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Global font for standard matrix chars to avoid context switching
            ctx.font = `bold 14px "Space Grotesk", monospace`;

            // Optimization: Single loop but branching logic minimized
            for (let i = 0; i < grid.length; i++) {
                const cell = grid[i];
                if (cell.opacity <= 0.01) continue;

                // Matrix Flicker
                if (cell.renderType === 'text' && Math.random() > 0.95) {
                    cell.char = chars[Math.floor(Math.random() * chars.length)];
                }

                // Batching: If it's a simple background char, skip transforms
                // Brand particles need transforms for explosion/scale
                if (!cell.isBrand && cell.scale === 1 && cell.rotation === 0 && cell.circleRadius === 0) {
                    // Fast Path
                    ctx.fillStyle = cell.color;
                    ctx.globalAlpha = cell.opacity;
                    ctx.fillText(cell.char, cell.x, cell.y);
                } else {
                    // Complex Path (Brand or Morphed)
                    ctx.save();
                    ctx.translate(cell.x, cell.y);
                    ctx.scale(cell.scale, cell.scale);
                    ctx.rotate(cell.rotation * TO_RAD);

                    ctx.globalAlpha = cell.opacity;
                    ctx.fillStyle = cell.color;

                    // Only set font if different (micro-optimization, though strict check is likely needed)
                    if (cell.fontSize !== 14) {
                        ctx.font = `bold ${cell.fontSize}px "Space Grotesk", monospace`;
                    }

                    if (cell.renderType === 'text' && cell.circleRadius === 0) {
                        ctx.fillText(cell.char, 0, 0);
                    } else if (cell.circleRadius > 0) {
                        ctx.beginPath();
                        ctx.arc(0, 0, cell.circleRadius, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    ctx.restore();
                    // Reset font for next iteration fast path if needed (or rely on next fast path setting it? No, fast path assumes it's set)
                    // Re-setting font is safer :
                    ctx.font = `bold 14px "Space Grotesk", monospace`;
                }
            }
        };

        const loop = () => {
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        // --- Init ---
        init();
        loop();

        // --- GSAP TIMELINE ---
        const tl = gsap.timeline();

        const targets = grid.filter(c => c.isBrand);
        const nonTargets = grid.filter(c => !c.isBrand);

        // 1. Reveal Brand (Flickering Red)
        tl.to(targets, {
            color: colorRed,
            duration: 1.5,
            ease: "power2.inOut",
            stagger: { amount: 0.5, from: "center" }
        });

        // 2. Morph to Circles
        tl.to(grid, {
            fontSize: 0,
            circleRadius: (i, t) => t.isBrand ? 6 : 2, // Larger dots for brand
            duration: 0.8,
            ease: "expo.out"
        }, "+=0.2");

        // 3. Purge Background (Fast)
        tl.to(nonTargets, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        }, "-=0.4"); // Overlap with morph

        // 4. Hold & Explode (Fly past camera)
        tl.to(targets, {
            x: (i, t) => t.x + (t.x - canvas.width / 2) * 8, // Increase velocity
            y: (i, t) => t.y + (t.y - canvas.height / 2) * 8,
            scale: 15,  // Dramatic fly-past
            opacity: 0,
            duration: 1.2, // Slightly faster
            ease: "power4.in",
            stagger: { amount: 0.1, from: "center" } // Tighter stagger for impact
        }, "+=1.5");

        // 5. Canvas Fade & Reveal Site
        tl.to(canvas, {
            opacity: 0,
            duration: 0.4,
            onStart: () => {
                // Trigger React state update to reveal site
                if (onComplete) onComplete();
            },
            onComplete: () => {
                // Immediate cleanup to free GPU
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
            }
        }, "-=0.2"); // Adjusted overlap


        const handleResize = () => {
            init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            tl.kill();
        };

    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            className="preloader-canvas"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#000000',
                pointerEvents: 'none',
                willChange: 'transform, opacity' // GPU Hint
            }}
        />
    );
};

export default ParticleLoader;
