'use client';

import { useEffect, useRef } from 'react';

const WORDS = [
  { text: 'OUR', accent: false },
  { text: 'MACHINERY', accent: true },
];

export default function MachineryTitle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const letters = [...section.querySelectorAll<HTMLElement>('.machinery-letter')];
    const eyebrow = section.querySelector<HTMLElement>('.machinery-eyebrow')!;
    const line = section.querySelector<HTMLElement>('.machinery-line')!;
    const ghost = section.querySelector<HTMLElement>('.machinery-ghost')!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
    let frame = 0;

    const render = () => {
      frame = 0;
      if (preference.matches) {
        [eyebrow, line, ghost, ...letters].forEach(element => {
          element.style.removeProperty('transform');
          element.style.removeProperty('opacity');
        });
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 as the section's top enters the screen, 1 once the title sits in the middle.
      const reveal = clamp((viewport - rect.top) / (viewport * 0.75));
      // Runs across the whole pass so the backdrop keeps drifting while the title is visible.
      const pass = clamp((viewport - rect.top) / (viewport + rect.height));

      const eyebrowEase = ease(reveal / 0.35);
      eyebrow.style.opacity = String(eyebrowEase);
      eyebrow.style.transform = `translate3d(0,${18 * (1 - eyebrowEase)}px,0)`;
      letters.forEach((letter, index) => {
        // Letters rise out of their mask one after another.
        const start = 0.12 + index * 0.045;
        const letterEase = ease((reveal - start) / 0.35);
        letter.style.opacity = String(letterEase);
        letter.style.transform = `translate3d(0,${110 * (1 - letterEase)}%,0) rotate(${8 * (1 - letterEase)}deg)`;
      });
      line.style.transform = `scaleX(${ease((reveal - 0.55) / 0.4)})`;
      ghost.style.opacity = String(0.06 * ease(reveal / 0.6));
      ghost.style.transform = `translate3d(${12 - 24 * pass}%,-50%,0)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} className="machinery-title" aria-labelledby="machinery-title-heading">
      <span className="machinery-ghost" aria-hidden="true">MACHINERY</span>
      <div className="machinery-inner">
        <p className="machinery-eyebrow"><span aria-hidden="true" />In-House Production<span aria-hidden="true" /></p>
        <h2 id="machinery-title-heading" aria-label="Our Machinery">
          {WORDS.map(word => (
            <span key={word.text} className={`machinery-word${word.accent ? ' machinery-word-accent' : ''}`} aria-hidden="true">
              {[...word.text].map((char, index) => (
                <span key={index} className="machinery-mask"><span className="machinery-letter">{char}</span></span>
              ))}
            </span>
          ))}
        </h2>
        <span className="machinery-line" aria-hidden="true" />
      </div>
    </section>
  );
}
