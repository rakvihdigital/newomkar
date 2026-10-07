'use client';

import React, { useEffect, useRef, useState } from 'react';

const FRAMES_FACILITY = 600;
const PATH_FACILITY = '/assets/facility_frames/frame_';
const FRAME_EXT = '.webp';
const SKIP_STEP = 2;
// The footage opens on the OM GROUP sign; earlier frames are skipped.
const FIRST_FRAME = 49;
const LOAD_FACILITY = Math.ceil((FRAMES_FACILITY - FIRST_FRAME + 1) / SKIP_STEP);
// Scroll milestones (share of the section): the logo docks, then the black curtain lifts.
const LOGO_DOCKED = 0.06;
const CURTAIN_FADE = 0.05;
const FOOTAGE_START = LOGO_DOCKED + 0.015;

function padFrame(num: number) {
    return String(num).padStart(6, '0');
}

export default function FacilityHeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const introVeilRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
        const images: HTMLImageElement[] = new Array(LOAD_FACILITY);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let loadedCount = 0;
        const QUICK_LOAD = 60; // Show first frame quickly then load rest in background
        let dismissed = false;

        const checkProgress = () => {
            loadedCount++;
            const percent = Math.min(100, Math.round((loadedCount / QUICK_LOAD) * 100));
            setProgressPercent(percent);

            if (loadedCount >= QUICK_LOAD && !dismissed) {
                dismissed = true;
                setTimeout(() => setIsReady(true), 250);
            }
        };

        // Frames are 2560px wide, so the canvas never needs more pixels than that.
        let dpr = 1;
        const loaded: boolean[] = new Array(LOAD_FACILITY).fill(false);
        let lastDrawn = -1;
        let wanted = 0;

        for (let idx = 0, i = FIRST_FRAME; i <= FRAMES_FACILITY; i += SKIP_STEP, idx++) {
            const img = new Image();
            const frame = idx;
            img.src = `${PATH_FACILITY}${padFrame(i)}${FRAME_EXT}`;
            img.onload = () => {
                // Decode up front so drawing a frame mid-scroll never stalls on decoding.
                img.decode().catch(() => {}).finally(() => {
                    loaded[frame] = true;
                    checkProgress();
                    if (frame === wanted && lastDrawn !== wanted) drawFrame(wanted);
                });
            };
            img.onerror = checkProgress;
            images[idx] = img;
        }

        const drawImageRaw = (img: HTMLImageElement) => {
            const canvasW = canvas.width / dpr;
            const canvasH = canvas.height / dpr;
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

        // Draw the requested frame, or the closest one already loaded, so the picture never freezes.
        const drawFrame = (index: number) => {
            wanted = index;
            for (let offset = 0; offset < images.length; offset++) {
                for (const candidate of offset ? [index - offset, index + offset] : [index]) {
                    if (candidate < 0 || candidate >= images.length || !loaded[candidate]) continue;
                    if (candidate !== lastDrawn) {
                        drawImageRaw(images[candidate]);
                        lastDrawn = candidate;
                    }
                    return;
                }
            }
        };

        // `progress` is measured on the original 600-frame timeline, so each caption stays
        // pinned to the same footage regardless of where playback starts.
        const updateOverlays = (progress: number) => {
            if (!sectionRef.current) return;
            const overlays = sectionRef.current.querySelectorAll('.hero-text-overlay') as NodeListOf<HTMLElement>;
            const totalSlots = overlays.length;
            if (totalSlots === 0) return;
            const slotDur = 1 / totalSlots;
            const fadeDur = slotDur * 0.28;

            overlays.forEach((overlay, i) => {
                const isLast = i === totalSlots - 1;
                // The headquarters title waits for the full building (fades in ~frame 105,
                // fully shown ~117) and clears at the glass entrance (~frame 153).
                const w = i === 0
                    ? { start: 0.175, shown: 0.195, hide: 0.235, end: 0.255 }
                    : i === 1
                    ? { start: 0.26, shown: 0.295, hide: 0.4 - fadeDur, end: 0.4 }
                    : (() => {
                        const start = i * slotDur;
                        const end = (i + 1) * slotDur;
                        return { start, shown: start + fadeDur, hide: isLast ? Infinity : end - fadeDur, end: isLast ? Infinity : end };
                    })();

                let opacity = 0;
                let yOffset = 0;
                let scale = 1;
                if (progress >= w.start && progress < w.shown) {
                    const fade = (progress - w.start) / (w.shown - w.start);
                    opacity = fade;
                    yOffset = 25 * (1 - fade);
                    scale = 0.98 + 0.02 * fade;
                } else if (progress >= w.shown && progress < w.hide) {
                    opacity = 1;
                } else if (progress >= w.hide && progress < w.end) {
                    const fade = (progress - w.hide) / (w.end - w.hide);
                    opacity = 1 - fade;
                    yOffset = -25 * fade;
                    scale = 1 + 0.02 * fade;
                }

                overlay.style.opacity = opacity.toString();
                overlay.style.transform = `translateY(${yOffset}px) scale(${scale})`;
                overlay.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
            });
        };

        let target = 0;
        let current = 0;
        let inView = true;
        let lastTravel = -1;
        let frameRequest = 0;
        let lastTime = 0;

        const readScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const sectionHeight = el.offsetHeight - window.innerHeight;
            if (sectionHeight <= 0) return;
            target = Math.max(0, Math.min(1, -rect.top / sectionHeight));
            inView = rect.top <= window.innerHeight && rect.bottom >= 0;
            // Off screen there is nothing to glide through, so settle immediately.
            if (!inView) current = target;
        };

        const updateLogo = (progress: number) => {
            const logo = logoRef.current;
            if (!logo) return;
            const travel = Math.min(1, progress / LOGO_DOCKED);
            const easedTravel = travel * travel * (3 - 2 * travel);
            // The page stays black while the logo travels, then the curtain lifts slowly.
            if (introVeilRef.current) {
                introVeilRef.current.style.opacity = `${1 - Math.max(0, Math.min(1, (progress - LOGO_DOCKED) / CURTAIN_FADE))}`;
            }
            if (easedTravel === lastTravel) return;
            lastTravel = easedTravel;
            const mobile = window.innerWidth <= 768;
            const startWidth = Math.min(320, window.innerWidth * 0.68);
            const endWidth = mobile ? 72 : 88;
            logo.style.setProperty('--intro-logo-width', `${startWidth + (endWidth - startWidth) * easedTravel}px`);
            const startCaptionWidth = Math.min(440, window.innerWidth - 64);
            const endCaptionWidth = mobile ? 172 : 196;
            logo.style.setProperty('--intro-caption-width', `${startCaptionWidth + (endCaptionWidth - startCaptionWidth) * easedTravel}px`);
            logo.style.setProperty('--intro-caption-size', `${(mobile ? 0.75 : 0.9) * (1 - easedTravel) + (mobile ? 0.5 : 0.52) * easedTravel}rem`);
            // Tighten the card's spacing as it docks so the corner badge stays compact.
            logo.style.setProperty('--intro-logo-pad', `${18 - 6 * easedTravel}px`);
            logo.style.setProperty('--intro-logo-gap', `${20 - 10 * easedTravel}px`);
            logo.style.setProperty('--intro-divider-height', `${48 - 18 * easedTravel}px`);
            logo.style.setProperty('--logo-card-opacity', `${Math.max(0, (easedTravel - 0.65) / 0.35)}`);
            const centerLeft = (window.innerWidth - logo.offsetWidth) / 2;
            const centerTop = (window.innerHeight - logo.offsetHeight) / 2;
            logo.style.left = `${centerLeft + ((mobile ? 16 : 28) - centerLeft) * easedTravel}px`;
            logo.style.top = `${centerTop + ((mobile ? 16 : 24) - centerTop) * easedTravel}px`;
            logo.style.transform = 'none';
        };

        const render = (progress: number) => {
            updateLogo(progress);
            canvas.style.visibility = inView ? 'visible' : 'hidden';
            if (inView) {
                // Footage only starts once the logo has settled in the corner.
                const footage = Math.max(0, Math.min(1, (progress - FOOTAGE_START) / (1 - FOOTAGE_START)));
                drawFrame(Math.round(footage * (images.length - 1)));
                updateOverlays((FIRST_FRAME - 1 + footage * (FRAMES_FACILITY - FIRST_FRAME + 1)) / FRAMES_FACILITY);
            } else {
                updateOverlays(progress > 0.5 ? 1 : 0);
            }
            const scrollIndicator = document.getElementById('scrollIndicator');
            scrollIndicator?.classList.toggle('hidden', window.scrollY > 20);
        };

        // Ease the playhead toward the scroll position each frame, so wheel steps
        // glide through the footage instead of jumping several frames at once.
        const tick = (now: number) => {
            const elapsed = Math.min(64, now - lastTime || 16.7);
            lastTime = now;
            current += (target - current) * (1 - Math.pow(1 - 0.12, elapsed / 16.7));
            if (Math.abs(target - current) < 0.0002) current = target;
            render(current);
            frameRequest = current === target ? 0 : requestAnimationFrame(tick);
        };

        const onScroll = () => {
            readScroll();
            if (!frameRequest) {
                lastTime = performance.now();
                frameRequest = requestAnimationFrame(tick);
            }
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2560 / window.innerWidth, 2);
            dpr = Math.max(1, dpr);
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingQuality = 'high';
            lastDrawn = -1;
            lastTravel = -1;
            readScroll();
            current = target;
            render(current);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(frameRequest);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <>
            {/* Preloader */}
            <div id="preloader" className={isReady ? 'loaded' : ''}>
                <div className="preloader-inner">
                    <div className="preloader-ring"></div>
                    <div className="preloader-ring"></div>
                    <div className="preloader-ring"></div>
                    <p className="preloader-text">Experience Omkar Enterprises</p>
                    <p className="preloader-percent" id="preloaderPercent">{progressPercent}%</p>
                </div>
            </div>

            {/* Logo — Fixed Top Left with dynamic intro position */}
            <a href="#" className={`nav-logo facility-intro-logo${isReady ? ' intro-ready' : ''}`} id="navLogo" ref={logoRef}>
                <img src="/assets/logo.png" alt="Omkar Enterprises Logo" className="logo-img" />
                <span className="logo-captions">
                    <span className="logo-caption-mask logo-caption-left">
                        <span className="logo-desc">Our Professional<br /><strong>Portfolio</strong></span>
                    </span>
                    <span className="logo-caption-divider" aria-hidden="true" />
                    <span className="logo-caption-mask logo-caption-right">
                        <span className="logo-desc logo-experience"><span className="logo-years">15 Years</span><br />Serving This Industry</span>
                    </span>
                </span>
            </a>

            {/* Section 0: Grand Facility & Headquarters Sequence */}
            <div className="scroll-section" id="section-0" ref={sectionRef} style={{ height: "1000vh", position: "relative" }}>
                <div className="sticky-wrapper" style={{ background: "transparent" }}>
                    <canvas ref={canvasRef} className="hero-canvas"></canvas>
                    <div className="facility-intro-veil" ref={introVeilRef} aria-hidden="true" />

                    {/* Scroll Indicator at very bottom of screen on initial load */}
                    <div className="scroll-indicator" id="scrollIndicator">
                        <div className="scroll-line"></div>
                        <span className="scroll-text">Scroll to Explore</span>
                    </div>

                    {/* Overlay 0: Exterior OM GROUP & Motto */}
                    <div className="hero-text-overlay pos-center text-center" data-index="0">
                        <div className="hero-stat-box" style={{ maxWidth: "760px" }}>
                            <h1 className="hero-title-bold" style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", marginBottom: "0.85rem", whiteSpace: "normal" }}>
                                <span style={{ color: "#4FC3A0" }}>OM GROUP</span> <span className="text-white">HEADQUARTERS</span>
                            </h1>
                            <p className="hero-stat-subtitle">
                                THINK • CREATE • DELIVER
                            </p>
                        </div>
                    </div>

                    {/* Overlay 1: Inside Office — 1st Stat */}
                    <div className="hero-text-overlay pos-center text-center" data-index="1">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">25k+</div>
                            <div className="hero-stat-label">OFFICE SPACE - SQFT</div>
                        </div>
                    </div>

                    {/* Overlay 2: Inside Office — 2nd Stat */}
                    <div className="hero-text-overlay pos-center text-center" data-index="2">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">115+</div>
                            <div className="hero-stat-label">EMPLOYEE HEAD COUNT</div>
                        </div>
                    </div>

                    {/* Overlay 3: Inside Facility — 3rd Stat */}
                    <div className="hero-text-overlay pos-center text-center" data-index="3">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">1000+</div>
                            <div className="hero-stat-label">PROJECTS</div>
                        </div>
                    </div>

                    {/* Overlay 4: Final Centered Ending Title — OUR WORKS */}
                    <div className="hero-text-overlay pos-center text-center" data-index="4">
                        <div className="hero-stat-box works-intro" style={{ maxWidth: "960px" }}>
                            <h2 className="hero-title-bold works-intro-title">
                                <span className="text-white">OUR</span> <span style={{ color: "#4FC3A0" }}>WORKS</span>
                            </h2>
                            <p className="works-intro-description">
                                Explore Our Works and Brands
                            </p>
                            <p className="works-intro-scroll">Scroll to see our works <span aria-hidden="true">↓</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
