'use client';

import React, { useEffect, useRef } from 'react';

const VIDEO_NAME = '/assets/laser-vma1325r';
// Phones (portrait or landscape) get a lighter 720p cut of the same footage.
const PHONE_QUERY = '(max-width: 768px), (pointer: coarse) and (max-height: 500px)';
const FRAME_SECONDS = 1 / 24;
// A seek still pending after this long is treated as stuck and issued again.
const SEEK_STALL_MS = 600;

export default function UltimateMachineSequence() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

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

        let target = 0;
        let current = 0;
        let inView = false;
        let frameRequest = 0;
        let lastTime = 0;
        let sourceStarted = false;

        let seekStarted = 0;
        const seekFrame = (progress: number) => {
            if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;
            // Let a seek finish before the next one, unless Safari has left it hanging
            // (it can after a window resize); then replace it rather than freeze.
            const stalled = video.seeking && performance.now() - seekStarted > SEEK_STALL_MS;
            if (video.seeking && !stalled) return;
            const lastFrame = Math.max(0, video.duration - FRAME_SECONDS);
            const frameTime = Math.round((progress * lastFrame) / FRAME_SECONDS) * FRAME_SECONDS;
            if (stalled || Math.abs(video.currentTime - frameTime) >= FRAME_SECONDS * 0.75) {
                seekStarted = performance.now();
                video.currentTime = frameTime;
            }
        };

        const render = (progress: number) => {
            video.style.visibility = inView ? 'visible' : 'hidden';
            if (inView) seekFrame(progress);
            updateOverlays(inView ? progress : progress > 0.5 ? 1 : 0);
        };

        const startVideo = () => {
            if (sourceStarted) return;
            sourceStarted = true;
            video.src = `${VIDEO_NAME}${window.matchMedia(PHONE_QUERY).matches ? '-mobile' : ''}.mp4`;
            video.load();
            // A muted play/pause helps mobile browsers make frames available for seeking.
            video.play()?.then(() => {
                video.pause();
                render(current);
            }).catch(() => {});
        };

        const readScroll = () => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight - window.innerHeight;
            if (sectionHeight <= 0) return;
            target = Math.max(0, Math.min(1, -rect.top / sectionHeight));
            inView = rect.top <= window.innerHeight && rect.bottom >= 0;
            if (!inView) current = target;
        };

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
            if (inView) startVideo();
            if (!frameRequest) {
                lastTime = performance.now();
                frameRequest = requestAnimationFrame(tick);
            }
        };

        const resize = () => {
            readScroll();
            current = target;
            // A resize can make Safari drop the decoded frame; nudge it back into loading.
            if (sourceStarted && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
                video.play()?.then(() => {
                    video.pause();
                    render(current);
                }).catch(() => {});
            }
            render(current);
        };

        const onVideoFrame = () => render(current);
        const observer = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting) startVideo();
        }, { rootMargin: '200% 0px' });
        observer.observe(section);
        video.addEventListener('loadedmetadata', onVideoFrame);
        video.addEventListener('loadeddata', onVideoFrame);
        video.addEventListener('seeked', onVideoFrame);
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(frameRequest);
            observer.disconnect();
            video.removeEventListener('loadedmetadata', onVideoFrame);
            video.removeEventListener('loadeddata', onVideoFrame);
            video.removeEventListener('seeked', onVideoFrame);
            window.removeEventListener('scroll', onScroll);
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
                    <video
                        ref={videoRef}
                        className="hero-canvas"
                        poster="/assets/laser-vma1325r-poster.jpg"
                        preload="none"
                        muted
                        playsInline
                        aria-hidden="true"
                    />

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
