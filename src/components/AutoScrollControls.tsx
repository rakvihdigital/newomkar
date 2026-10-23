'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | null;

// Auto-scroll glides at half a screen per second, easing in and out over about a quarter second.
const SCREENS_PER_SECOND = 0.5;
const EASE_SECONDS = 0.25;
const KEYS_THAT_TAKE_OVER = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'];

const Chevron = ({ up }: { up?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={up ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AutoScrollControls() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Direction>(null);
  // Once it has glided down, the label says whether auto scroll is on or off.
  const [hasRun, setHasRun] = useState(false);
  const [hasRunBack, setHasRunBack] = useState(false);
  const [edge, setEdge] = useState<'top' | 'bottom' | null>('top');
  const steer = useRef<(direction: Direction, immediate?: boolean) => void>(() => {});

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const check = () => {
      if (!preloader || preloader.classList.contains('loaded')) setVisible(true);
    };
    check();
    if (!preloader) return;
    const observer = new MutationObserver(check);
    observer.observe(preloader, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let target = 0;
    let velocity = 0;
    let carry = 0;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      // The first frame can be stamped a moment before the click that started it, so never step backwards.
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)) || 1 / 60;
      last = now;
      velocity += (target - velocity) * (1 - Math.exp(-dt / EASE_SECONDS));
      if (!target && Math.abs(velocity) < 0.01) velocity = 0;
      // Whole pixels only; the remainder carries into the next frame so slow speeds stay even.
      carry += velocity * window.innerHeight * SCREENS_PER_SECOND * dt;
      const step = Math.trunc(carry);
      if (step) {
        window.scrollBy({ top: step, behavior: 'instant' });
        carry -= step;
      }
      const end = document.documentElement.scrollHeight - window.innerHeight;
      // Stop at either end (ignoring a page that has not laid out yet).
      if ((velocity > 0 && end > 0 && window.scrollY >= end - 1) || (velocity < 0 && window.scrollY <= 0)) {
        set(null, true);
        return;
      }
      frame = target || velocity ? requestAnimationFrame(tick) : 0;
    };

    function set(direction: Direction, immediate = false) {
      target = direction === 'down' ? 1 : direction === 'up' ? -1 : 0;
      if (immediate) {
        velocity = 0;
        carry = 0;
      }
      setActive(direction);
      if (direction === 'down') setHasRun(true);
      if (direction === 'up') setHasRunBack(true);
      if (!target && !velocity) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    steer.current = set;

    // Any wheel, touch or scrolling key hands control straight back to the visitor.
    const takeOver = (event: Event) => {
      if ((event.target as Element | null)?.closest?.('.autoscroll')) return;
      if (target || velocity) set(null, true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (KEYS_THAT_TAKE_OVER.includes(event.key)) takeOver(event);
    };

    let edgeFrame = 0;
    const readEdge = () => {
      edgeFrame = 0;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      setEdge(window.scrollY <= 2 ? 'top' : window.scrollY >= end - 2 ? 'bottom' : null);
    };
    const onScroll = () => {
      if (!edgeFrame) edgeFrame = requestAnimationFrame(readEdge);
    };

    window.addEventListener('wheel', takeOver, { passive: true });
    window.addEventListener('touchstart', takeOver, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    readEdge();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(edgeFrame);
      window.removeEventListener('wheel', takeOver);
      window.removeEventListener('touchstart', takeOver);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggle = (direction: Exclude<Direction, null>) => steer.current(active === direction ? null : direction);

  const scrollingBack = active === 'up';
  // Auto Scroll Back only appears once there is somewhere to go back to.
  const backShown = visible && (edge !== 'top' || scrollingBack);

  return (
    <>
      <div
        className={`autoscroll autoscroll-top${backShown ? ' is-visible' : ''}${scrollingBack ? ' is-on' : hasRunBack ? ' is-off' : ''}`}
        role="group"
        aria-label="Auto scroll back"
        aria-hidden={!backShown}
      >
        <span className="autoscroll-label" onClick={() => toggle('up')}>
          <i className="autoscroll-dot" aria-hidden="true" />
          {/* Phones only have room beside the logo card for "Back". */}
          <span className="autoscroll-long">Auto Scroll </span>Back
          {hasRunBack && (
            <b key={scrollingBack ? 'on' : 'off'} className="autoscroll-state" aria-live="polite">
              {scrollingBack ? 'On' : 'Off'}
            </b>
          )}
        </span>
        <button
          type="button"
          className="autoscroll-button autoscroll-action"
          onClick={() => toggle('up')}
          tabIndex={backShown ? 0 : -1}
          aria-pressed={scrollingBack}
          aria-label={scrollingBack ? 'Stop auto scroll back' : 'Auto scroll back up'}
          title={scrollingBack ? 'Stop' : 'Auto scroll back up'}
        >
          {/* Two arrows flow upward one after the other. */}
          <span className="autoscroll-cascade is-up">
            <Chevron up />
            <Chevron up />
          </span>
        </button>
      </div>

      <div
        className={`autoscroll${visible ? ' is-visible' : ''}${active === 'down' ? ' is-on' : hasRun ? ' is-off' : ''}`}
        role="group"
        aria-label="Auto scroll"
      >
        {/* The name doubles as a shortcut for the main action: gliding down. */}
        <span className="autoscroll-label" onClick={() => edge !== 'bottom' && toggle('down')}>
          <i className="autoscroll-dot" aria-hidden="true" />
          Auto Scroll
          {hasRun && (
            <b key={active === 'down' ? 'on' : 'off'} className="autoscroll-state" aria-live="polite">
              {active === 'down' ? 'On' : 'Off'}
            </b>
          )}
        </span>
        <button
          type="button"
          className="autoscroll-button autoscroll-action"
          onClick={() => toggle('down')}
          disabled={edge === 'bottom' && active !== 'down'}
          aria-pressed={active === 'down'}
          aria-label={active === 'down' ? 'Stop auto scroll' : 'Auto scroll down'}
          title={active === 'down' ? 'Stop' : 'Auto scroll down'}
        >
          {/* Two arrows flow downward one after the other, like a scroll cue. */}
          <span className="autoscroll-cascade">
            <Chevron />
            <Chevron />
          </span>
        </button>
      </div>
    </>
  );
}
