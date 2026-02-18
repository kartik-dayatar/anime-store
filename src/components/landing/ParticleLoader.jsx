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
            // Clear - Use clearRect for performance instead of fillRect with bg color if possible, 
            // but since we want a black bg, fillRect is fine. optimize by not changing fillStyle if already set?
            // Actually, clearRect is often faster and we can set canvas bg in CSS.
            // Let's use clearRect and let CSS handle background color for the canvas element.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Optimization: Set global styles once
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `bold 14px "Space Grotesk", monospace`;
            ctx.fillStyle = colorGrey; // Default color

            // Optimization: Reduce object lookups
            const len = grid.length;

            for (let i = 0; i < len; i++) {
                const cell = grid[i];
                if (cell.opacity <= 0.01) continue;

                // Matrix Flicker
                if (cell.renderType === 'text' && Math.random() > 0.95) {
                    cell.char = chars[Math.floor(Math.random() * chars.length)];
                }

                // Batching: We assume most particles are default (grey, scale 1, etc.)
                // If it's a simple background char, skip transforms & state changes
                if (!cell.isBrand && cell.scale === 1 && cell.rotation === 0 && cell.circleRadius === 0) {
                    // Fast Path
                    // Only change alpha/color if needed. 
                    // However, we just set fillStyle to colorGrey above.
                    // We only need to set globalAlpha.
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

                    // Only set font if different
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
                    // Reset font implies we need to be careful. 
                    // Save/Restore handles font reset for us in the next iteration's fast path?
                    // Yes, ctx.restore() brings back the context state (including font) to what it was at ctx.save().
                    // But we set global font *before* the loop. 
                    // Wait, ctx.save() saves the state *at that moment*.
                    // So if we set font to 14 before loop, save(), change font, restore() -> font is back to 14.
                    // So we DON'T need to manually reset font here.
                    // However, we DO need to reset fillStyle if we changed it in complex path? 
                    // yes, ctx.restore() resets fillStyle too.
                    // But wait, we set fillStyle = cell.color in complex path. 
                    // In fast path, we rely on ctx.fillStyle being colorGrey.
                    // ctx.restore() will revert fillStyle to whatever it was before ctx.save().
                    // Before ctx.save(), fillStyle was colorGrey (set at top of loop or previous iteration?)
                    // It was set at top of draw function.
                    // So fast path is safe.
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
