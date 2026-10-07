'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WORDS = ['THANK', 'YOU'];
const ADDRESS = [
  'Special APMC For Fruits and Vegetables,',
  'Block-C, 1st Floor, Binnipete Agrahara,',
  'Tank Bund Road, Binnypete,',
  'Bangalore – 560 023, Karnataka. INDIA',
];
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Omkar Enterprises, ${ADDRESS.join(' ')}`)}`;

const Icon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="thanks-icon"><path d={path} /></svg>
);
const ICONS = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
};

export default function ThankYouSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sticky = section.querySelector<HTMLElement>('.thanks-sticky')!;
    const layout = section.querySelector<HTMLElement>('.thanks-layout')!;
    const title = section.querySelector<HTMLElement>('.thanks-title')!;
    const q = gsap.utils.selector(section);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeline: gsap.core.Timeline | null = null;
    let frame = 0;

    const progress = () => {
      const rect = section.getBoundingClientRect();
      return Math.max(0, Math.min(1, -rect.top / Math.max(1, section.offsetHeight - window.innerHeight)));
    };

    const build = () => {
      timeline?.kill();
      timeline = null;
      gsap.set([layout, title, ...q('.thanks-letter, .thanks-rule, .thanks-about, .thanks-card, .thanks-card-item, .thanks-glow')], { clearProps: 'all' });
      if (preference.matches) return;

      // Shrink the finished layout to fit short screens instead of clipping the cards.
      const { paddingTop, paddingBottom } = getComputedStyle(sticky);
      const room = sticky.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom) - 32;
      const fit = Math.min(1, room / layout.scrollHeight);
      gsap.set(layout, { scale: fit, transformOrigin: '50% 50%' });
      // Start with the title alone in the middle of the screen, larger than its resting size.
      const titleCentre = (title.offsetTop + title.offsetHeight / 2 - layout.offsetHeight / 2) * fit + layout.offsetTop + layout.offsetHeight / 2;
      const lift = sticky.clientHeight / 2 - titleCentre;
      const mobile = window.innerWidth <= 768;
      // Grow the opening title as much as the screen allows, never past its edges.
      const words = title.querySelectorAll<HTMLElement>('.thanks-word');
      const textWidth = words[words.length - 1].getBoundingClientRect().right - words[0].getBoundingClientRect().left;
      const intro = Math.max(1, Math.min(mobile ? 1.25 : 1.6, (window.innerWidth - 32) / Math.max(1, textWidth)));

      timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .fromTo(q('.thanks-glow'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 30 }, 0)
        .fromTo(title, { y: lift / fit, scale: intro }, { y: lift / fit, scale: intro, duration: 0.01 }, 0)
        .from(q('.thanks-letter'), { yPercent: 115, rotate: 10, opacity: 0, duration: 16, stagger: 1.6 }, 2)
        .to(title, { y: 0, scale: 1, duration: 18, ease: 'power2.inOut' }, 40)
        .from(q('.thanks-rule'), { scaleX: 0, duration: 12 }, 52)
        .from(q('.thanks-about'), { y: 40, opacity: 0, duration: 14 }, 56)
        .from(q('.thanks-card-contact'), { x: mobile ? 0 : -90, y: mobile ? 50 : 30, opacity: 0, duration: 16 }, 66)
        .from(q('.thanks-card-address'), { x: mobile ? 0 : 90, y: mobile ? 50 : 30, opacity: 0, duration: 16 }, 70)
        .from(q('.thanks-card-item'), { y: 18, opacity: 0, duration: 10, stagger: 1.4 }, 72)
        .to({}, { duration: 8 });
      timeline.progress(progress());
    };

    const update = () => {
      frame = 0;
      // Ease toward the scroll position so the sequence glides rather than ticks.
      if (timeline) gsap.to(timeline, { progress: progress(), duration: 0.6, ease: 'power2.out', overwrite: true });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const rebuild = () => { build(); schedule(); };

    build();
    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(sticky);
    window.addEventListener('scroll', schedule, { passive: true });
    preference.addEventListener('change', rebuild);
    return () => {
      cancelAnimationFrame(frame);
      timeline?.kill();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      preference.removeEventListener('change', rebuild);
    };
  }, []);

  return (
    <section ref={sectionRef} className="thanks-section" aria-labelledby="thanks-heading">
      <div className="thanks-sticky">
        <div className="thanks-glow" aria-hidden="true" />
        <div className="thanks-layout">
          <h2 id="thanks-heading" className="thanks-title" aria-label="Thank You">
            {WORDS.map(word => (
              <span key={word} className="thanks-word" aria-hidden="true">
                {[...word].map((char, index) => (
                  <span key={index} className="thanks-mask"><span className="thanks-letter">{char}</span></span>
                ))}
              </span>
            ))}
          </h2>
          <span className="thanks-rule" aria-hidden="true" />
          <p className="thanks-about">
            Omkar Enterprises&apos; journey is fueled by offering integrated branding solutions, from concept development
            to flawless execution, delivering cost-effective results across pan India without compromising on quality.
          </p>

          <div className="thanks-cards">
            <article className="thanks-card thanks-card-contact">
              <h3 className="thanks-card-item">Contact Info</h3>
              <ul>
                <li className="thanks-card-item"><Icon path={ICONS.user} /><strong>Rajesh Y K</strong></li>
                <li className="thanks-card-item"><Icon path={ICONS.phone} /><a href="tel:+919902714333">+91 99027 14333</a></li>
                <li className="thanks-card-item"><Icon path={ICONS.mail} /><a href="mailto:rajesh@omkarblr.com">rajesh@omkarblr.com</a></li>
                <li className="thanks-card-item"><Icon path={ICONS.clock} /><span>Mon – Fri: 9.00 AM – 9.00 PM<br /><em>Holiday: Closed</em></span></li>
              </ul>
            </article>

            <article className="thanks-card thanks-card-address">
              <h3 className="thanks-card-item">Office Address</h3>
              <div className="thanks-card-item thanks-address-row">
                <Icon path={ICONS.pin} />
                <address>{ADDRESS.map(line => <span key={line}>{line}</span>)}</address>
              </div>
              <a className="thanks-card-item thanks-directions" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                Get directions <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
