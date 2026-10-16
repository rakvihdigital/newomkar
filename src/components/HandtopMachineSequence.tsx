'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 120;
const FRAME_PATH = '/assets/handtop-clean/frame_';
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

const scenes = [
  { start: 0.02, end: 0.29 },
  { start: 0.31, end: 0.53 },
  { start: 0.55, end: 0.76 },
];

export default function HandtopMachineSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const panel = panelRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !canvas || !panel || !ctx) return;

    const overlays = [...section.querySelectorAll<HTMLElement>('.handtop-machine-copy')];
    const frames: HTMLImageElement[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameRequest = 0;
    let loaded = false;

    const draw = (image: HTMLImageElement) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const render = () => {
      frameRequest = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const travel = section.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? clamp(-rect.top / travel) : 0;
      const index = Math.round(progress * (FRAME_COUNT - 1));
      let image = frames[index];
      if (!image?.complete || !image.naturalWidth) image = frames[0];
      if (image?.complete && image.naturalWidth) draw(image);

      overlays.forEach((overlay, position) => {
        const scene = scenes[position];
        const appear = ease((progress - scene.start) / 0.065);
        const disappear = 1 - ease((progress - (scene.end - 0.065)) / 0.065);
        const visible = clamp(appear * disappear);
        overlay.style.opacity = String(visible);
        overlay.style.visibility = visible > 0.01 ? 'visible' : 'hidden';
        overlay.style.transform = reducedMotion.matches
          ? 'none'
          : `translate3d(0, ${22 * (1 - appear) - 14 * (1 - disappear)}px, 0)`;
      });

      const panelProgress = clamp((progress - 0.78) / 0.17);
      panel.style.transform = `translateX(${-100 * (1 - panelProgress)}%)`;
    };
    const schedule = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(render);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };
    const loadFrames = () => {
      if (loaded) return;
      loaded = true;
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const image = new Image();
        image.decoding = 'async';
        image.onload = schedule;
        image.src = `${FRAME_PATH}${String(i).padStart(6, '0')}.webp`;
        frames.push(image);
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadFrames();
      schedule();
    }, { rootMargin: '200% 0px' });
    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    reducedMotion.addEventListener('change', schedule);
    resize();

    return () => {
      cancelAnimationFrame(frameRequest);
      observer.disconnect();
      frames.forEach(frame => { frame.onload = null; });
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <>
      <div className="interstitial-gap">
        <h2 className="interstitial-title">HANDTOP TURBO</h2>
        <p className="interstitial-desc">10 ft UV Print · Eco-Friendly UV Curing Ink</p>
      </div>

      <section id="handtop-machine" className="scroll-section handtop-machine-section" ref={sectionRef} aria-label="Handtop UV printing machinery">
        <div className="sticky-wrapper handtop-machine-stage">
          <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
          <div className="handtop-machine-shade" aria-hidden="true" />

          <div className="hero-text-overlay precision-machine-copy handtop-machine-copy precision-copy-first">
            <span className="precision-eyebrow">Wide format UV printing</span>
            <h3>HANDTOP <span>TURBO</span></h3>
            <p>10 feet of print width for large scale visual work.</p>
          </div>

          <div className="hero-text-overlay precision-machine-copy handtop-machine-copy precision-copy-second">
            <span className="precision-eyebrow">Production speed</span>
            <h3>500–600 <span>SQ FT / HOUR</span></h3>
            <p>High output with eco friendly UV curing ink.</p>
          </div>

          <div className="hero-text-overlay precision-machine-copy handtop-machine-copy precision-copy-third">
            <span className="precision-eyebrow">Print precision</span>
            <h3>360 × 3600 <span>DPI</span></h3>
            <p>Printing across UV Sanfa, fabric, vinyl and translate media.</p>
          </div>

          <div className="seq4-slide-panel precision-slide-panel handtop-slide-panel" ref={panelRef}>
            <div className="panel-content">
              <h2 className="panel-title">HANDTOP</h2>
              <h3 className="panel-subtitle">10 FEET UV PRINT · TURBO</h3>
              <p className="panel-spec">ECO FRIENDLY UV CURING INK</p>
              <ul className="panel-features">
                <li>Print speed: 500–600 sq ft / hour</li>
                <li>Resolution: 360 × 3600 DPI</li>
                <li>Media: UV Sanfa, fabric, vinyl and translate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
