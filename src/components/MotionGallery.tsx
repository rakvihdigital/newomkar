'use client';

import { useEffect, useRef } from 'react';

type GalleryImage = { src: string; alt: string; caption?: string };

// How each photograph enters, given its eased progress e (0 = waiting, 1 = settled).
type Look = { opacity: number; transform: string; clip?: string };
const VARIANTS = {
  // Drifts in from the lower right with a slight tilt.
  drift: { origin: '50% 80%', look: (e: number): Look => ({ opacity: e, transform: `translate3d(${180 * (1 - e)}px,${110 * (1 - e)}px,0) rotate(${6 * (1 - e)}deg) scale(${0.9 + 0.1 * e})` }) },
  // Rises while being unveiled from the bottom, like letters lighting up.
  rise: { origin: '50% 100%', look: (e: number): Look => ({ opacity: Math.min(1, e * 1.6), transform: `translate3d(0,${140 * (1 - e)}px,0) scale(${0.92 + 0.08 * e})`, clip: `inset(${100 * (1 - e)}% 0 0 0)` }) },
  // Swings open like a door on its left hinge.
  door: { origin: '0% 50%', look: (e: number): Look => ({ opacity: Math.min(1, e * 2), transform: `perspective(1400px) translate3d(${60 * (1 - e)}px,0,0) rotateY(${-75 * (1 - e)}deg)` }) },
  // Opens with a circular spotlight, like a store launch.
  iris: { origin: '50% 50%', look: (e: number): Look => ({ opacity: 1, transform: `scale(${1.15 - 0.15 * e})`, clip: `circle(${e * 75}% at 50% 50%)` }) },
  // Curtains part from the centre outwards.
  curtain: { origin: '50% 50%', look: (e: number): Look => ({ opacity: Math.min(1, e * 3), transform: `scale(${1.08 - 0.08 * e})`, clip: `inset(0 ${50 * (1 - e)}% 0 ${50 * (1 - e)}%)` }) },
  // Drops in from above with a gentle swing, like a hanging display.
  drop: { origin: '50% 0%', look: (e: number): Look => ({ opacity: e, transform: `translate3d(0,${-160 * (1 - e)}px,0) rotate(${-5 * (1 - e)}deg)` }) },
  // Stands up from the floor, like a booth being raised.
  standup: { origin: '50% 100%', look: (e: number): Look => ({ opacity: Math.min(1, e * 1.5), transform: `perspective(1200px) translate3d(0,${60 * (1 - e)}px,0) rotateX(${60 * (1 - e)}deg)` }) },
  // Revealed through a rising arch.
  arch: { origin: '50% 100%', look: (e: number): Look => ({ opacity: Math.min(1, e * 3), transform: `translate3d(0,${30 * (1 - e)}px,0)`, clip: `inset(${100 * (1 - e)}% 0 0 0 round ${45 * (1 - e)}% ${45 * (1 - e)}% 0 0)` }) },
  // A diagonal wipe sweeps the photo in from the left.
  wipe: { origin: '50% 50%', look: (e: number): Look => ({ opacity: 1, transform: `translate3d(${-60 * (1 - e)}px,0,0)`, clip: `polygon(0 0, ${e * 125}% 0, ${e * 125 - 25}% 100%, 0 100%)` }) },
};
export type GalleryVariant = keyof typeof VARIANTS;

export default function MotionGallery({ id, title, description, images, dark = false, variant = 'drift' }: {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
  dark?: boolean;
  variant?: GalleryVariant;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const track = section.querySelector<HTMLElement>('.motion-gallery-track')!;
    const stage = section.querySelector<HTMLElement>('.motion-gallery-stage')!;
    const heading = section.querySelector<HTMLElement>('.motion-gallery-heading')!;
    const title = heading.querySelector<HTMLElement>('h2')!;
    const description = heading.querySelector<HTMLElement>('p')!;
    const figures = [...section.querySelectorAll<HTMLElement>('figure')];
    const counter = section.querySelector<HTMLElement>('.motion-gallery-counter')!;
    const bar = section.querySelector<HTMLElement>('.motion-gallery-progress i')!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const easeInOut = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };
    const motion = VARIANTS[variant];
    figures.forEach(figure => { figure.style.transformOrigin = motion.origin; });
    let frame = 0;
    let distance = 0;
    let active = false;

    const render = () => {
      frame = 0;
      if (preference.matches || !active) return;
      const top = section.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const scroll = -top;
      // Reserve the first viewport of scrolling for the title and first photo.
      // The horizontal strip only starts after that entrance has finished.
      const pinnedRange = section.offsetHeight - stage.offsetHeight;
      const finishHold = viewport * 0.45;
      const travel = clamp((scroll - viewport) / Math.max(1, pinnedRange - viewport - finishHold));
      const offset = travel * distance;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
      bar.style.transform = `scaleX(${travel})`;
      counter.textContent = `${String(1 + Math.round(travel * (images.length - 1))).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

      const titleEase = easeInOut((scroll + viewport * 0.12) / (viewport * 0.45));
      const descriptionEase = easeInOut((scroll - viewport * 0.08) / (viewport * 0.4));
      title.style.opacity = String(titleEase);
      title.style.transform = `translate3d(${-85 * (1 - titleEase)}px,${25 * (1 - titleEase)}px,0)`;
      description.style.opacity = String(descriptionEase * 0.7);
      description.style.transform = `translate3d(0,${25 * (1 - descriptionEase)}px,0)`;
      counter.style.opacity = String(descriptionEase);
      const width = window.innerWidth;
      figures.forEach((figure, index) => {
        // Each photograph settles as it enters the visible strip, including later images.
        const left = figure.offsetLeft - offset;
        // Photos that rest right of the usual settle point finish exactly as the strip stops.
        const restingLeft = figure.offsetLeft - distance;
        const settleSpan = Math.max(width * 0.15, Math.min(width * 0.6, width * 0.85 - restingLeft));
        const entry = index === 0
          ? (scroll - viewport * 0.2) / (viewport * 0.65)
          : scroll < viewport || !distance ? 0 : (width * 0.85 - left) / settleSpan;
        // Finish every entrance before the pinned stage releases, even after a resize.
        const finalSettle = distance ? clamp((travel - 0.85) / 0.15) : travel;
        const ease = easeInOut(Math.max(entry, finalSettle));
        const look = motion.look(ease);
        const settled = ease >= 0.999;
        figure.style.opacity = String(look.opacity);
        figure.style.transform = settled ? 'none' : look.transform;
        figure.style.clipPath = settled || !look.clip ? '' : look.clip;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const measure = () => {
      // On phones each frame hugs its photo (height: auto), so size from a target photo height instead.
      const compact = window.matchMedia('(max-width: 768px)').matches;
      figures.forEach(figure => {
        const image = figure.querySelector('img')!;
        if (image.naturalWidth && !preference.matches) {
          const caption = figure.querySelector('figcaption');
          const photoHeight = compact
            ? Math.max(180, window.innerHeight * 0.5)
            : figure.clientHeight - (caption?.getBoundingClientRect().height ?? 0);
          const widthCap = section.clientWidth * (compact ? 0.86 : 0.88);
          figure.style.width = `${Math.min(widthCap, photoHeight * image.naturalWidth / image.naturalHeight)}px`;
        } else if (preference.matches) {
          figure.style.removeProperty('width');
        }
      });
      // Stop when the last photo meets the right margin, so no empty space trails it.
      distance = Math.max(0, track.offsetWidth - section.clientWidth);
      const travelLength = Math.max(distance * 1.6, window.innerHeight * 0.6);
      section.style.height = preference.matches ? 'auto' : `${stage.offsetHeight + window.innerHeight * 1.45 + travelLength}px`;
      section.toggleAttribute('data-motion-ready', !preference.matches);
      if (preference.matches) {
        [track, title, description, counter, ...figures].forEach(element => {
          element.style.removeProperty('transform');
          element.style.removeProperty('opacity');
          element.style.removeProperty('clip-path');
        });
      }
      schedule();
    };
    const observer = new IntersectionObserver(entries => {
      active = entries[0].isIntersecting;
      if (active) {
        track.querySelectorAll('img').forEach(photo => { photo.loading = 'eager'; });
        schedule();
      }
    }, { rootMargin: '100% 0px' });
    observer.observe(section);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    const photos = [...track.querySelectorAll('img')];
    photos.forEach(photo => photo.addEventListener('load', measure));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    preference.addEventListener('change', measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      photos.forEach(photo => photo.removeEventListener('load', measure));
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      preference.removeEventListener('change', measure);
      section.removeAttribute('data-motion-ready');
    };
  }, [images, variant]);

  return (
    <section ref={sectionRef} className={`motion-gallery${dark ? ' motion-gallery-dark' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="motion-gallery-stage">
        <div className="motion-gallery-heading">
          <div>
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{description}</p>
          </div>
          <span className="motion-gallery-counter" aria-hidden="true">01 / {String(images.length).padStart(2, '0')}</span>
        </div>
        <div className="motion-gallery-track">
          {images.map(image => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
        <div className="motion-gallery-progress" aria-hidden="true"><i /></div>
        <p className="motion-gallery-hint" aria-hidden="true">Scroll to explore <span>→</span></p>
      </div>
    </section>
  );
}
