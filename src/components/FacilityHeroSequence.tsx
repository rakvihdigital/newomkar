'use client';

import React, { useEffect, useRef, useState } from 'react';

// Scroll milestones (share of the section): the opening logo fades away,
// then the curtain lifts as the footage starts and the corner badge quietly appears.
const LOGO_GONE = 0.05;
const CURTAIN_FADE = 0.05;
const FOOTAGE_START = LOGO_GONE + 0.015;
const CORNER_IN = [LOGO_GONE + 0.01, LOGO_GONE + 0.06];
// Both videos are encoded with a seek point on every source frame.
const FALLBACK_FIRST_SECONDS = 10;
const FALLBACK_CONTINUATION_SECONDS = 10;
const FRAME_SECONDS = 1 / 24;
// A seek still pending after this long is treated as stuck and issued again.
const SEEK_STALL_MS = 600;
// The two films meet on almost the same shot, so a short crossfade hides the join.
const JOIN_BLEND_SECONDS = 0.25;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp01(value); return t * t * (3 - 2 * t); };

export default function FacilityHeroSequence() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const continuationRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const openingRef = useRef<HTMLDivElement>(null);
    const introVeilRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        const continuation = continuationRef.current;
        if (!video || !continuation) return;

        let readyTimeout = 0;
        let readyShown = false;
        const showHero = () => {
            if (readyShown) return;
            readyShown = true;
            window.clearTimeout(fallbackTimeout);
            setProgressPercent(100);
            readyTimeout = window.setTimeout(() => setIsReady(true), 250);
            render(current);
        };
        // Phones often hold back video data until playback starts, so open the page as soon as
        // the video is known (the poster covers it until frames arrive) and never wait forever.
        const READY_EVENTS = ['loadedmetadata', 'loadeddata', 'canplay', 'error'];
        READY_EVENTS.forEach(type => video.addEventListener(type, showHero));
        const fallbackTimeout = window.setTimeout(showHero, 4000);

        // Phones (portrait or landscape) get lighter 720p cuts of the same footage.
        const suffix = window.matchMedia('(max-width: 768px), (pointer: coarse) and (max-height: 500px)').matches ? '-mobile' : '';
        const setSource = (media: HTMLVideoElement, name: string) => {
            const src = `/assets/${name}${suffix}.mp4`;
            if (media.getAttribute('src') !== src) media.src = src;
        };
        // A muted play and pause nudges mobile browsers into loading the footage.
        const nudge = (media: HTMLVideoElement) => {
            media.play()?.then(() => {
                media.pause();
                render(current);
            }).catch(() => {});
        };
        setSource(video, 'welcome-generated-1');
        nudge(video);
        // The second film waits until the first can play through (or the visitor is well into it),
        // so the opening gets the whole connection first.
        let continuationStarted = false;
        const startContinuation = () => {
            if (continuationStarted) return;
            continuationStarted = true;
            window.clearTimeout(continuationTimeout);
            setSource(continuation, 'welcome-generated-2');
            nudge(continuation);
        };
        video.addEventListener('canplaythrough', startContinuation);
        const continuationTimeout = window.setTimeout(startContinuation, 5000);

        const updateOverlays = (progress: number) => {
            if (!sectionRef.current) return;
            const overlays = sectionRef.current.querySelectorAll('.hero-text-overlay') as NodeListOf<HTMLElement>;
            // Team size follows the entrance into the building; work area waits
            // for the exterior pullback in the second film.
            // The name waits until the camera has pulled back far enough for the real sign
            // to sit above it, so the two never overlap.
            const windows = [
                { start: 0.165, shown: 0.185, hide: 0.245, end: 0.265 },
                { start: 0.28, shown: 0.30, hide: 0.40, end: 0.425 },
                { start: 0.45, shown: 0.48, hide: 0.66, end: 0.69 },
                { start: 0.78, shown: 0.81, hide: 0.90, end: 0.925 },
                { start: 0.93, shown: 0.96, hide: Infinity, end: Infinity },
            ];

            overlays.forEach((overlay, i) => {
                const w = windows[i];
                if (!w) return;

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
        let frameRequest = 0;
        let lastTime = 0;
        let continuationReady = continuation.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;

        const seekStarted = new WeakMap<HTMLVideoElement, number>();
        const seekFrame = (media: HTMLVideoElement, time: number) => {
            // A seek is asynchronous. Let the current frame finish decoding before
            // requesting the newest scroll position, instead of cancelling it on
            // every animation frame. Safari can leave a seek hanging (notably after a
            // window resize), so a seek that outlives SEEK_STALL_MS is replaced.
            if (media.readyState < HTMLMediaElement.HAVE_METADATA) return;
            const stalled = media.seeking && performance.now() - (seekStarted.get(media) ?? 0) > SEEK_STALL_MS;
            if (media.seeking && !stalled) return;
            const lastFrame = Math.max(0, media.duration - FRAME_SECONDS);
            const frameTime = Math.round(Math.min(time, lastFrame) / FRAME_SECONDS) * FRAME_SECONDS;
            if (stalled || Math.abs(media.currentTime - frameTime) >= FRAME_SECONDS * 0.75) {
                seekStarted.set(media, performance.now());
                media.currentTime = frameTime;
            }
        };

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

        const opening = openingRef.current;
        const openingMark = opening?.querySelector<HTMLElement>('.logo-img') ?? null;
        const openingCaptions = opening?.querySelector<HTMLElement>('.logo-captions') ?? null;
        const openingSides = opening ? [...opening.querySelectorAll<HTMLElement>('.logo-caption-mask')] : [];
        const markFilter = openingMark ? getComputedStyle(openingMark).filter.replace('none', '') : '';
        let lastOut = -1;

        const updateIntro = (progress: number) => {
            // The opening logo dissolves in place: captions part first, then the mark lifts and blurs away.
            const out = clamp01(progress / LOGO_GONE);
            if (opening && out !== lastOut) {
                lastOut = out;
                const captions = smooth(out / 0.6);
                const mark = smooth((out - 0.2) / 0.8);
                opening.style.visibility = out >= 1 ? 'hidden' : 'visible';
                if (openingCaptions) openingCaptions.style.opacity = `${1 - captions}`;
                openingSides.forEach((side, i) => {
                    side.style.transform = `translate3d(${(i ? 36 : -36) * captions}px,0,0)`;
                });
                if (openingMark) {
                    openingMark.style.opacity = `${1 - mark}`;
                    openingMark.style.transform = `translate3d(0,${-14 * mark}px,0) scale(${1 + 0.12 * mark})`;
                    openingMark.style.filter = `${markFilter} blur(${9 * mark}px)`;
                }
            }
            // The opening backdrop stays until the logo has gone, then lifts slowly.
            if (introVeilRef.current) {
                introVeilRef.current.style.opacity = `${1 - clamp01((progress - LOGO_GONE) / CURTAIN_FADE)}`;
            }
            // The corner badge fades in with the footage, so it is simply there once the scene opens.
            const logo = logoRef.current;
            if (logo) {
                const corner = smooth((progress - CORNER_IN[0]) / (CORNER_IN[1] - CORNER_IN[0]));
                logo.style.opacity = `${corner}`;
                logo.style.visibility = corner > 0.001 ? 'visible' : 'hidden';
            }
        };

        const render = (progress: number) => {
            updateIntro(progress);
            video.style.visibility = inView ? 'visible' : 'hidden';
            continuation.style.visibility = inView ? 'visible' : 'hidden';
            if (inView) {
                // Footage only starts once the opening logo has gone.
                const footage = clamp01((progress - FOOTAGE_START) / (1 - FOOTAGE_START));
                if (footage > 0.2) startContinuation();
                const firstDuration = Number.isFinite(video.duration) && video.duration > 0
                    ? video.duration : FALLBACK_FIRST_SECONDS;
                const continuationDuration = Number.isFinite(continuation.duration) && continuation.duration > 0
                    ? continuation.duration : FALLBACK_CONTINUATION_SECONDS;
                const timelineTime = footage * (firstDuration + continuationDuration);
                const continuationTime = Math.max(0, timelineTime - firstDuration);
                seekFrame(video, timelineTime);
                seekFrame(continuation, continuationTime);
                continuation.style.opacity = continuationReady
                    ? `${smooth((timelineTime - firstDuration + JOIN_BLEND_SECONDS / 2) / JOIN_BLEND_SECONDS)}`
                    : '0';
                updateOverlays(footage);
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
            lastOut = -1;
            readScroll();
            current = target;
            // A resize can make Safari drop the decoded frame; nudge it back into loading.
            [video, continuation].forEach(media => {
                if (media.getAttribute('src') && media.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) nudge(media);
            });
            render(current);
        };

        resize();
        const syncContinuation = () => {
            continuationReady = true;
            render(current);
        };
        const syncFrame = () => render(current);
        continuation.addEventListener('loadeddata', syncContinuation);
        video.addEventListener('seeked', syncFrame);
        continuation.addEventListener('seeked', syncFrame);
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) showHero();

        return () => {
            cancelAnimationFrame(frameRequest);
            window.clearTimeout(readyTimeout);
            window.clearTimeout(fallbackTimeout);
            READY_EVENTS.forEach(type => video.removeEventListener(type, showHero));
            window.clearTimeout(continuationTimeout);
            video.removeEventListener('canplaythrough', startContinuation);
            continuation.removeEventListener('loadeddata', syncContinuation);
            video.removeEventListener('seeked', syncFrame);
            continuation.removeEventListener('seeked', syncFrame);
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

            {/* Corner badge — fixed top left, fades in as the hero footage starts */}
            <a href="#" className={`nav-logo facility-intro-logo${isReady ? ' intro-ready' : ''}`} id="navLogo" ref={logoRef}>
                <img src="/assets/logo.png" alt="Omkar Enterprises Logo" className="logo-img" />
                <span className="logo-captions">
                    <span className="logo-caption-mask logo-caption-left">
                        <span className="logo-desc">Our Professional<br /><strong>Portfolio</strong></span>
                    </span>
                    <span className="logo-caption-divider" aria-hidden="true" />
                    <span className="logo-caption-mask logo-caption-right">
                        <span className="logo-desc logo-experience"><span className="logo-years">17 Years</span><br />Of Industry Excellence</span>
                    </span>
                </span>
            </a>

            {/* Section 0: Grand Facility & Headquarters Sequence */}
            <div className="scroll-section" id="section-0" ref={sectionRef} style={{ height: "1000vh", position: "relative" }}>
                <div className="sticky-wrapper" style={{ background: "transparent" }}>
                    <video
                        ref={videoRef}
                        className="hero-canvas"
                        poster="/assets/welcome-generated-poster.jpg"
                        preload="auto"
                        muted
                        playsInline
                        aria-hidden="true"
                    />
                    <video
                        ref={continuationRef}
                        className="hero-canvas hero-continuation"
                        preload="auto"
                        muted
                        playsInline
                        aria-hidden="true"
                    />
                    <div className="facility-intro-veil" ref={introVeilRef} aria-hidden="true" />

                    {/* Opening logo dissolves as scrolling begins */}
                    <div className={`facility-intro-logo opening-logo${isReady ? ' intro-ready' : ''}`} ref={openingRef}>
                        <img src="/assets/logo.png" alt="Omkar Enterprises" className="logo-img" />
                        <span className="logo-captions">
                            <span className="logo-caption-mask logo-caption-left">
                                <span className="logo-desc">Our Professional<br /><strong>Portfolio</strong></span>
                            </span>
                            <span className="logo-caption-divider" aria-hidden="true" />
                            <span className="logo-caption-mask logo-caption-right">
                                <span className="logo-desc logo-experience"><span className="logo-years">17 Years</span> Of<br />Industry Excellence</span>
                            </span>
                        </span>
                    </div>

                    {/* Points visitors at the Auto Scroll pill below; clicking the hint starts it too. */}
                    <button
                        type="button"
                        className="scroll-indicator"
                        id="scrollIndicator"
                        onClick={() => document.querySelector<HTMLButtonElement>('.autoscroll:not(.autoscroll-top) .autoscroll-action')?.click()}
                    >
                        <span className="scroll-text">
                            <span className="hint-click">Click</span><span className="hint-tap">Tap</span> below to <strong>Auto Scroll</strong>
                        </span>
                        <span className="hint-arrows" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                            <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                    </button>

                    {/* Overlay 0: Exterior OMKAR ENTERPRISES & Motto */}
                    <div className="hero-text-overlay pos-center text-center" data-index="0">
                        <div className="hero-stat-box" style={{ maxWidth: "760px" }}>
                            <h1 className="hero-title-bold" style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", marginBottom: "0.85rem", whiteSpace: "normal" }}>
                                <span style={{ color: "#4FC3A0" }}>OMKAR</span> <span className="text-white">ENTERPRISES</span>
                            </h1>
                            <p className="hero-stat-subtitle">
                                THINK • CREATE • DELIVER
                            </p>
                        </div>
                    </div>

                    {/* Overlay 1: Team size while entering the building */}
                    <div className="hero-text-overlay pos-center text-center" data-index="1">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">200+</div>
                            <div className="hero-stat-label">TEAM SIZE</div>
                        </div>
                    </div>

                    {/* Overlay 2: Production volume inside the facility */}
                    <div className="hero-text-overlay pos-center text-center" data-index="2">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">1000+</div>
                            <div className="hero-stat-label">PROJECTS</div>
                        </div>
                    </div>

                    {/* Overlay 3: Work area during the exterior pullback */}
                    <div className="hero-text-overlay pos-center text-center" data-index="3">
                        <div className="hero-stat-box">
                            <div className="hero-stat-number">20K</div>
                            <div className="hero-stat-label">TOTAL WORK SQFT</div>
                        </div>
                    </div>

                    {/* Overlay 4: Final centered ending title */}
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
