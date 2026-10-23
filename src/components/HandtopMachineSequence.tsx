'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 216;
const FRAME_PATH = '/assets/handtop-turbo/frame_';
const PREFETCH_RADIUS = 12;
const MAX_IN_FLIGHT = 4;
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
    const frames = new Map<number, HTMLImageElement>();
    const inFlight = new Map<number, HTMLImageElement>();
    const failed = new Set<number>();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameRequest = 0;
    let active = false;
    let disposed = false;
    let target = 0;
    let current = 0;
    let lastTime = 0;
    let lastDrawn: HTMLImageElement | undefined;

    const ready = (frame?: HTMLImageElement): frame is HTMLImageElement =>
      Boolean(frame?.complete && frame.naturalWidth > 0);
    const draw = (image: HTMLImageElement) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const schedule = () => {
      if (frameRequest || disposed) return;
      lastTime = performance.now();
      frameRequest = requestAnimationFrame(render);
    };
    const requestFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || frames.has(index) || inFlight.has(index) || failed.has(index)) return;
      const image = new Image();
      image.decoding = 'async';
      inFlight.set(index, image);
      image.onload = () => {
        inFlight.delete(index);
        if (disposed) return;
        if (active) {
          frames.set(index, image);
          prepareFrames(Math.round(current * (FRAME_COUNT - 1)), Math.round(target * (FRAME_COUNT - 1)));
        }
        schedule();
      };
      image.onerror = () => {
        inFlight.delete(index);
        failed.add(index);
        if (!disposed) schedule();
      };
      image.src = `${FRAME_PATH}${String(index + 1).padStart(6, '0')}.webp`;
    };
    const prepareFrames = (currentIndex: number, targetIndex: number) => {
      if (!active) return;
      // Keep only frames near the visible playhead and the scroll destination.
      for (const index of frames.keys()) {
        if (Math.abs(index - currentIndex) > PREFETCH_RADIUS + 2 &&
            Math.abs(index - targetIndex) > PREFETCH_RADIUS + 2) frames.delete(index);
      }
      for (let distance = 0; distance <= PREFETCH_RADIUS && inFlight.size < MAX_IN_FLIGHT; distance++) {
        for (const center of [currentIndex, targetIndex]) {
          for (const index of distance ? [center + distance, center - distance] : [center]) {
            if (inFlight.size >= MAX_IN_FLIGHT) break;
            requestFrame(index);
          }
        }
      }
    };

    const render = (now: number) => {
      frameRequest = 0;
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      target = travel > 0 ? clamp(-rect.top / travel) : 0;
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        current = target;
        return;
      }

      // Ease the film toward the scroll position so wheel steps glide instead of jump.
      const elapsed = Math.min(64, now - lastTime || 16.7);
      lastTime = now;
      if (reducedMotion.matches) current = target;
      else current += (target - current) * (1 - Math.pow(1 - 0.12, elapsed / 16.7));
      if (Math.abs(target - current) < 0.0002) current = target;
      const progress = current;

      const index = Math.round(progress * (FRAME_COUNT - 1));
      prepareFrames(index, Math.round(target * (FRAME_COUNT - 1)));
      let base = frames.get(index);
      if (!ready(base)) {
        // Hold the previous picture until a nearby frame is ready.
        let nearestDistance = Infinity;
        for (const [loadedIndex, image] of frames) {
          const distance = Math.abs(loadedIndex - index);
          if (ready(image) && distance < nearestDistance) {
            base = image;
            nearestDistance = distance;
          }
        }
      }
      base ??= lastDrawn;
      if (base) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        draw(base);
        lastDrawn = base;
      }

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
      if (current !== target) frameRequest = requestAnimationFrame(render);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 768 ? 2 : 1);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };
    const observer = new IntersectionObserver(entries => {
      active = entries[0].isIntersecting;
      if (active) {
        const rect = section.getBoundingClientRect();
        const travel = section.offsetHeight - window.innerHeight;
        const index = Math.round((travel > 0 ? clamp(-rect.top / travel) : 0) * (FRAME_COUNT - 1));
        prepareFrames(index, index);
      } else frames.clear();
      schedule();
    }, { rootMargin: '200% 0px' });
    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    reducedMotion.addEventListener('change', schedule);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRequest);
      observer.disconnect();
      inFlight.forEach(frame => { frame.onload = null; frame.onerror = null; });
      inFlight.clear();
      frames.clear();
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
