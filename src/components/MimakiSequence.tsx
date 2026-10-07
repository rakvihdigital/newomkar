'use client';

import React, { useEffect, useRef, useState } from 'react';

const FRAMES_MIMAKI = 295;
const PATH_MIMAKI = '/assets/mimaki_frames/ezgif-frame-';
const FRAME_EXT = '.jpg';
const SKIP_STEP = 2;
const LOAD_MIMAKI = Math.ceil(FRAMES_MIMAKI / SKIP_STEP);

function padFrame(num: number) {
    return String(num).padStart(3, '0');
}

export default function MimakiSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const images: HTMLImageElement[] = new Array(LOAD_MIMAKI);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let idx = 0;
        for (let i = 1; i <= FRAMES_MIMAKI; i += SKIP_STEP) {
            const img = new Image();
            img.src = `${PATH_MIMAKI}${padFrame(i)}${FRAME_EXT}`;
            images[idx] = img;
            idx++;
        }


        const drawImageRaw = (img: HTMLImageElement) => {
            if (!ctx || !img || !img.complete || !img.naturalWidth) return;
            const canvasW = canvas.width / (window.devicePixelRatio || 1);
            const canvasH = canvas.height / (window.devicePixelRatio || 1);
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvasW / canvasH;
            let drawW, drawH, drawX, drawY;

            if (canvasRatio > imgRatio) {
                drawW = canvasW;
                drawH = canvasW / imgRatio;
                drawX = 0;
                drawY = (canvasH - drawH) / 2;
            } else {
                drawH = canvasH;
                drawW = canvasH * imgRatio;
                drawX = (canvasW - drawW) / 2;
                drawY = 0;
            }

            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        };

        const updateOverlays = (progress: number) => {
            if (!sectionRef.current) return;
            const overlays = sectionRef.current.querySelectorAll('.hero-text-overlay') as NodeListOf<HTMLElement>;
            const numOverlays = 10;
            const slotDur = 1 / numOverlays;
            const fadeDur = slotDur * 0.28;

            overlays.forEach((overlay, i) => {
                const wStart = i * slotDur;
                const wEnd = (i + 1) * slotDur;
                const isFirst = (i === 0);

                let opacity = 0;
                let yOffset = 0;
                let scale = 1;

                if (progress >= wStart && progress <= wEnd) {
                    if (isFirst) {
                        const holdEnd = wStart + slotDur * 0.65;
                        const fadeOutStart = wEnd - fadeDur - (slotDur * 0.05);

                        if (progress <= holdEnd) {
                            opacity = 1;
                            yOffset = 0;
                            scale = 1;
                        } else if (progress <= wEnd) {
                            const fadeProgress = Math.min(1, (progress - fadeOutStart) / fadeDur);
                            opacity = Math.max(0, 1 - fadeProgress);
                            yOffset = -25 * fadeProgress;
                            scale = 1 + 0.02 * fadeProgress;
                        }
                    } else {
                        const fadeInEnd = wStart + fadeDur;
                        const fadeOutStart = wEnd - fadeDur - (slotDur * 0.05);

                        if (progress >= wStart && progress < fadeInEnd) {
                            const fadeProgress = (progress - wStart) / fadeDur;
                            opacity = fadeProgress;
                            yOffset = 25 * (1 - fadeProgress);
                            scale = 0.98 + 0.02 * fadeProgress;
                        } else if (progress >= fadeInEnd && progress < fadeOutStart) {
                            opacity = 1;
                            yOffset = 0;
                            scale = 1;
                        } else if (progress >= fadeOutStart && progress <= wEnd) {
                            const fadeProgress = (progress - fadeOutStart) / fadeDur;
                            opacity = Math.max(0, 1 - fadeProgress);
                            yOffset = -25 * fadeProgress;
                            scale = 1 + 0.02 * fadeProgress;
                        }
                    }
                }
                overlay.style.opacity = opacity.toString();
                overlay.style.transform = `translateY(${yOffset}px) scale(${scale})`;
                overlay.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
            });

            const panel = document.getElementById('finalSlidePanel');
            if (panel) {
                const start = (numOverlays - 1) * slotDur;
                if (progress >= start) {
                    const slide = (progress - start) / slotDur;
                    panel.style.transform = `translateX(${-100 * (1 - slide)}%)`;
                } else {
                    panel.style.transform = `translateX(-100%)`;
                }
            }
        };

        const onScroll = () => {
            if (!sectionRef.current) return;
            const el = sectionRef.current;
            const rect = el.getBoundingClientRect();
            const sectionHeight = el.offsetHeight - window.innerHeight;
            if (sectionHeight <= 0) return;
            
            const scrolled = -rect.top;
            let progress = scrolled / sectionHeight;
            progress = Math.max(0, Math.min(1, progress));

            const maxIdx = images.length - 1;
            const frameIndex = Math.max(0, Math.min(maxIdx, Math.floor(progress * maxIdx)));
            const img = images[frameIndex];
            if (img) {
                drawImageRaw(img);
            }

            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (canvas) canvas.style.visibility = 'visible';
                updateOverlays(progress);
            } else {
                if (canvas) canvas.style.visibility = 'hidden';
                updateOverlays(progress > 0.5 ? 1 : 0);
            }
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            onScroll();
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Polling until loaded
        const interval = setInterval(() => {
            if (images[0] && images[0].complete) {
                onScroll();
            }
        }, 100);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', resize);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className="interstitial-gap">
                <h2 className="interstitial-title">MIMAKI JFX600-2513</h2>
                <p className="interstitial-desc">Ultra-High Speed UV Flatbed 16 Head Technology</p>
            </div>

            <div className="scroll-section" id="section-1" ref={sectionRef} style={{ height: "600vh" }}>
                <div className="sticky-wrapper">
                    <canvas ref={canvasRef} className="hero-canvas"></canvas>
                    
                    <div className="hero-text-overlay text-first" data-index="0">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Omkar Enterprises</span>
                        </div>
                        <h1 className="hero-title-bold">
                            <span className="text-accent">MIMAKI</span> <span className="text-white">JFX600-2513</span>
                        </h1>
                        <p className="hero-desc">Step into the future of UV flatbed printing with unmatched precision and power.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right" data-index="1">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Industrial Scale</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">MASSIVE</span> <span className="text-white">FORMAT</span>
                        </h2>
                        <p className="hero-desc">2500 × 1300mm print area engineered for large-format production demands.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="2">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Precision Print</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">1200 DPI</span> <span className="text-white">CLARITY</span>
                        </h2>
                        <p className="hero-desc">Photographic-quality resolution that captures the finest details with stunning accuracy.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right" data-index="3">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Speed</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">RAPID</span> <span className="text-white">OUTPUT</span>
                        </h2>
                        <p className="hero-desc">Up to 27.2 m²/h production speed that redefines workflow efficiency.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="4">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Print Head</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">PIEZO</span> <span className="text-white">INKJET</span>
                        </h2>
                        <p className="hero-desc">Advanced piezoelectric print head assembly with micron-level precision movement.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right" data-index="5">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">UV Technology</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">LED UV</span> <span className="text-white">CURING</span>
                        </h2>
                        <p className="hero-desc">Energy-efficient instant drying with vibrant, durable prints and exceptional color gamut.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="6">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Ink System</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">6 COLOR</span> <span className="text-white">SYSTEM</span>
                        </h2>
                        <p className="hero-desc">CMYK plus White and Clear inks for textured, embossed, and layered effects.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right" data-index="7">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Innovation</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">MAPS4</span> <span className="text-white">TECH</span>
                        </h2>
                        <p className="hero-desc">Mimaki Advanced Pass System eliminates banding for seamless photographic output.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="8">
                        <div className="hero-accent-line">
                            <div className="accent-bar"></div>
                            <span className="accent-label">Texture</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span className="text-accent">2.5D</span> <span className="text-white">PRINT</span>
                        </h2>
                        <p className="hero-desc">Create tactile textures and embossed effects with layered clear ink application.</p>
                    </div>

                    <div className="final-slide-panel" id="finalSlidePanel">
                        <div className="panel-content">
                            <h2 className="panel-title">MIMAKI - JFX600-2513</h2>
                            <h3 className="panel-subtitle">UV FLATBED 16 HEAD MACHINE</h3>

                            <ul className="panel-features">
                                <li>Amazingly high productivity: Up to 330% higher speed</li>
                                <li>Rich color expression: 6 color inks, including light colors</li>
                                <li>Supporting media as thick as 80 mm</li>
                                <li>"2.5D Texture Maker" Smooth expression of bumpy textures can be achieved using multiple layers of UV ink.</li>
                                <li>This allows you to create realistic and eye-catching graphics</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
