'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Positions are percentages of the square India map.
const CITIES = [
    { name: 'Bangalore', state: 'Karnataka', x: 33.7, y: 78.6, side: 'left', hq: true },
    { name: 'Hyderabad', state: 'Telangana', x: 40.3, y: 64.1, side: 'right', hq: false },
    { name: 'Chennai', state: 'Tamil Nadu', x: 40.8, y: 81.8, side: 'right', hq: false },
    { name: 'Kochi', state: 'Kerala', x: 31.8, y: 87.3, side: 'left', hq: false },
];
const HQ = CITIES[0];
// The camera settles on the middle of the four cities.
const FOCUS = { x: 36.5, y: 76 };
const ZOOM = 2.3;

const STATS = [
    { value: 4, suffix: '', label: 'Major Cities' },
    { value: 500, suffix: '+', label: 'Projects Delivered' },
    { value: null, display: '24/7', label: 'Support Available' },
];

// A gentle arc from headquarters to a city, bowed away from the coastline.
const routePath = (to: { x: number; y: number }) => {
    const mx = (HQ.x + to.x) / 2;
    const my = (HQ.y + to.y) / 2;
    const dx = to.x - HQ.x;
    const dy = to.y - HQ.y;
    const length = Math.hypot(dx, dy);
    const bow = length * 0.28;
    return `M ${HQ.x} ${HQ.y} Q ${mx + (dy / length) * bow} ${my - (dx / length) * bow} ${to.x} ${to.y}`;
};

export default function IndiaMapSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        if (!section) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(section);
            const camera = q(".services-camera")[0];
            const pins = q('.services-pin-inner');
            const cities = q('.services-city');
            const routes = q('.services-route');
            const flows = q('.services-route-flow');

            gsap.set(flows, { opacity: 0 });

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: { trigger: section, start: 'top top', end: '+=300%', scrub: 1, pin: true },
            });

            // Story column arrives first.
            tl.from(q('.services-eyebrow'), { y: 20, opacity: 0, duration: 6 }, 0)
                .from(q('.services-heading-line'), { yPercent: 110, duration: 9, stagger: 2 }, 1)
                .from(q('.services-lede'), { y: 24, opacity: 0, duration: 8 }, 6)
                .from(cities, { x: -24, opacity: 0, duration: 7, stagger: 1.5 }, 8);

            // The lens opens on all of India...
            tl.from(q('.services-lens'), { scale: 0.82, opacity: 0, duration: 12 }, 4)
                .from(q('.services-orbit'), { rotate: -40, opacity: 0, duration: 16 }, 4)
                .fromTo(camera,
                    { scale: 0.92, x: 0, y: 0, xPercent: 0, yPercent: 0, '--zoom': 0.92 },
                    // ...then glides into the south, where every city sits.
                    { scale: ZOOM, x: 0, y: 0, xPercent: 50 - FOCUS.x, yPercent: 50 - FOCUS.y, '--zoom': ZOOM, duration: 20, ease: 'power2.inOut' },
                    18);

            // Headquarters lights up, then each route draws out to its city.
            tl.from(q('.services-radar'), { opacity: 0, duration: 8 }, 36)
                .from(pins[0], { scale: 0, opacity: 0, duration: 5, ease: 'back.out(2.2)' }, 37)
                .to(q('.services-city-bar')[0], { scaleX: 1, duration: 5 }, 37)
                .to(cities[0], { opacity: 1, duration: 5 }, 37);
            routes.forEach((route, i) => {
                const at = 44 + i * 10;
                tl.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 7, ease: 'power2.inOut' }, at)
                    .to(flows[i], { opacity: 1, duration: 3 }, at + 6)
                    .from(pins[i + 1], { scale: 0, opacity: 0, duration: 5, ease: 'back.out(2.2)' }, at + 5)
                    .to(q('.services-city-bar')[i + 1], { scaleX: 1, duration: 5 }, at + 5)
                    .to(cities[i + 1], { opacity: 1, duration: 5 }, at + 5);
            });

            // Numbers count up once the network is complete.
            tl.from(q('.services-stat'), { y: 24, opacity: 0, duration: 7, stagger: 1.5 }, 76);
            q('.services-stat-value[data-value]').forEach(el => {
                const value = Number(el.dataset.value);
                const suffix = el.dataset.suffix ?? '';
                const counter = { n: 0 };
                tl.to(counter, {
                    n: value, duration: 12, ease: 'power2.out',
                    onUpdate: () => { el.textContent = `${Math.round(counter.n)}${suffix}`; },
                }, 77);
            });
            tl.to({}, { duration: 8 });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="services-map" ref={sectionRef} aria-labelledby="services-heading">
            <div className="services-stage">
                <div className="services-backdrop" aria-hidden="true" />

                <div className="services-copy">
                    <p className="services-eyebrow"><span aria-hidden="true" />Pan South India Coverage</p>
                    <h2 id="services-heading" className="services-heading">
                        <span className="services-heading-mask"><span className="services-heading-line">Our</span></span>
                        <span className="services-heading-mask"><span className="services-heading-line services-heading-accent">Services</span></span>
                    </h2>
                    <p className="services-lede">
                        Delivering excellence across 4 major cities, from our headquarters in Bangalore.
                    </p>

                    <ol className="services-cities">
                        {CITIES.map((city, i) => (
                            <li key={city.name} className="services-city">
                                <span className="services-city-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="services-city-text">
                                    <strong>{city.name}</strong>
                                    <small>{city.state}</small>
                                </span>
                                {city.hq && <span className="services-city-tag">HQ</span>}
                                <span className="services-city-bar" aria-hidden="true" />
                            </li>
                        ))}
                    </ol>

                    <dl className="services-stats">
                        {STATS.map(stat => (
                            <div key={stat.label} className="services-stat">
                                <dt>{stat.label}</dt>
                                {stat.value === null ? (
                                    <dd className="services-stat-value">{stat.display}</dd>
                                ) : (
                                    <dd className="services-stat-value" data-value={stat.value} data-suffix={stat.suffix}>
                                        {stat.value}{stat.suffix}
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="services-visual" aria-hidden="true">
                    <div className="services-orbit" />
                    <div className="services-lens">
                        <div className="services-camera">
                            <img src="/assets/india-map.svg" alt="" className="services-map-img" draggable={false} />

                            <svg className="services-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {CITIES.slice(1).map(city => (
                                    <g key={city.name}>
                                        <path className="services-route" d={routePath(city)} pathLength={1} />
                                        <path className="services-route-flow" d={routePath(city)} pathLength={1} />
                                    </g>
                                ))}
                            </svg>

                            <div className="services-radar" style={{ left: `${HQ.x}%`, top: `${HQ.y}%` }}>
                                <span /><span /><span />
                            </div>

                            {CITIES.map(city => (
                                <div
                                    key={city.name}
                                    className={`services-pin services-pin-${city.side}${city.hq ? ' services-pin-hq' : ''}`}
                                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                                >
                                    <div className="services-pin-inner">
                                        <span className="services-pin-pulse" />
                                        <span className="services-pin-dot" />
                                        <span className="services-pin-label">{city.name}{city.hq && <em>HQ</em>}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
