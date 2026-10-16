'use client';

import React, { useEffect, useRef } from 'react';

const FRAMES_SEQ4 = 236;
const PATH_SEQ4 = '/assets/frames-2k-20/frame_';
const FRAME_EXT = '.webp';
const SKIP_STEP = 2;
const LOAD_SEQ4 = Math.ceil(FRAMES_SEQ4 / SKIP_STEP);

function padFrame(num: number) {
    return String(num).padStart(6, '0');
}

export default function UltimateMachineSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const images: HTMLImageElement[] = new Array(LOAD_SEQ4);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Frames download only once the section is near, so they don't compete with earlier sections.
        let loaded = false;
        const loadFrames = () => {
            if (loaded) return;
            loaded = true;
            let idx = 0;
            for (let i = 1; i <= FRAMES_SEQ4; i += SKIP_STEP) {
                const img = new Image();
                img.decoding = 'async';
                img.onload = schedule;
                img.src = `${PATH_SEQ4}${padFrame(i)}${FRAME_EXT}`;
                images[idx] = img;
                idx++;
            }
        };


        const canvasScale = () => Math.min(window.devicePixelRatio || 1, 2);

        const drawImageRaw = (img: HTMLImageElement) => {
            if (!ctx || !img || !img.complete || !img.naturalWidth) return;
            const canvasW = canvas.width / canvasScale();
            const canvasH = canvas.height / canvasScale();
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
            const numOverlays = 5;
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

            const panel = document.getElementById('seq4SlidePanel');
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
            const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
            const img = images[frameIndex];
            if (inView && img) {
                drawImageRaw(img);
            }

            if (inView) {
                if (canvas) canvas.style.visibility = 'visible';
                updateOverlays(progress);
            } else {
                if (canvas) canvas.style.visibility = 'hidden';
                updateOverlays(progress > 0.5 ? 1 : 0);
            }
        };

        const resize = () => {
            const dpr = canvasScale();
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            onScroll();
        };

        // Redraw at most once per animation frame, on scroll or when a frame finishes loading.
        let frameRequest = 0;
        function schedule() {
            if (!frameRequest) frameRequest = requestAnimationFrame(() => { frameRequest = 0; onScroll(); });
        }
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) loadFrames();
        }, { rootMargin: '200% 0px' });
        if (sectionRef.current) observer.observe(sectionRef.current);

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', schedule, { passive: true });

        return () => {
            cancelAnimationFrame(frameRequest);
            observer.disconnect();
            images.forEach(img => { if (img) img.onload = null; });
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <>
            <div className="interstitial-gap">
                <h2 className="interstitial-title">LASER VMA1325R</h2>
                <p className="interstitial-desc">Laser Engraving &amp; Cutting · 1300 × 2500 mm</p>
            </div>

            <div className="scroll-section" id="section-4" ref={sectionRef} style={{ height: "500vh" }}>
                <div className="sticky-wrapper">
                    <canvas ref={canvasRef} className="hero-canvas"></canvas>

                    <div className="hero-text-overlay text-first" data-index="20">
                        <div className="hero-accent-line">
                            <div className="accent-bar" style={{ background: "#eab308" }}></div>
                            <span className="accent-label" style={{ color: "#eab308" }}>Model VMA1325R</span>
                        </div>
                        <h1 className="hero-title-bold">
                            <span style={{ color: "#eab308" }}>LASER</span> <span className="text-white">ENGRAVING</span>
                        </h1>
                        <p className="hero-desc">Laser engraving and cutting in one machine.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="21">
                        <div className="hero-accent-line">
                            <div className="accent-bar" style={{ background: "#eab308" }}></div>
                            <span className="accent-label" style={{ color: "#eab308" }}>Engraving</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span style={{ color: "#eab308" }}>LOGOS</span> <span className="text-white">&amp; LETTERING</span>
                        </h2>
                        <p className="hero-desc">Crisp logos and lettering engraved straight into the sheet.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right" data-index="22">
                        <div className="hero-accent-line">
                            <div className="accent-bar" style={{ background: "#eab308" }}></div>
                            <span className="accent-label" style={{ color: "#eab308" }}>Cutting</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span style={{ color: "#eab308" }}>CLEAN</span> <span className="text-white">CUTS</span>
                        </h2>
                        <p className="hero-desc">Accurate shapes and cut-outs for signage and displays.</p>
                    </div>

                    <div className="hero-text-overlay hero-text-right pos-top-right" data-index="23">
                        <div className="hero-accent-line">
                            <div className="accent-bar" style={{ background: "#eab308" }}></div>
                            <span className="accent-label" style={{ color: "#eab308" }}>Working Area</span>
                        </div>
                        <h2 className="hero-title-bold hero-title-md">
                            <span style={{ color: "#eab308" }}>1300 × 2500</span> <span className="text-white">MM</span>
                        </h2>
                        <p className="hero-desc">A full size bed that takes large sheets in one go.</p>
                    </div>

                    <div className="seq4-slide-panel" id="seq4SlidePanel">
                        <div className="panel-content">
                            <h2 className="panel-title">VMA1325R</h2>
                            <h3 className="panel-subtitle">LASER ENGRAVING &amp; CUTTING MACHINE</h3>

                            <p className="panel-spec">WORKING AREA - 1300 X 2500 MM</p>

                            <ul className="panel-features">
                                <li>Laser engraving and cutting in one machine</li>
                                <li>Logos, lettering and shapes for signage and displays</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
