'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CITIES = [
    { name: 'Bangalore', x: 33.7, y: 78.6, align: 'left' },
    { name: 'Hyderabad', x: 40.3, y: 64.1, align: 'right' },
    { name: 'Chennai',   x: 40.8, y: 81.8, align: 'right' },
    { name: 'Kochi',     x: 31.8, y: 87.3, align: 'left' },
];

export default function IndiaMapSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const mapWrapper = section.querySelector('.india-map-wrapper') as HTMLElement;
        const pins = gsap.utils.toArray('.map-pin-group') as HTMLElement[];
        const servingItems = gsap.utils.toArray('.serving-item') as HTMLElement[];
        const servingTitle = section.querySelector('.serving-title') as HTMLElement;
        const heading = section.querySelector('.map-section-heading') as HTMLElement;
        const subheading = section.querySelector('.map-section-subheading') as HTMLElement;
        const statsRow = section.querySelector('.map-stats-row') as HTMLElement;
        const radarRings = gsap.utils.toArray('.radar-ring') as HTMLElement[];

        // Initial states
        gsap.set(mapWrapper, { opacity: 0, scale: 0.8, y: 60 });
        gsap.set(pins, { opacity: 0, scale: 0, y: -40 });
        gsap.set(servingTitle, { opacity: 0, x: 30 });
        gsap.set(servingItems, { opacity: 0, x: 40 });
        gsap.set(heading, { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' });
        gsap.set(subheading, { opacity: 0, y: 30 });
        gsap.set(statsRow, { opacity: 0, y: 40, scale: 0.95 });
        gsap.set(radarRings, { opacity: 0, scale: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=300%",
                scrub: 1.2,
                pin: true,
            }
        });

        // Phase 1: Title reveal
        tl.to(heading, {
            opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
            duration: 10, ease: "power3.out"
        }, 0);
        tl.to(subheading, {
            opacity: 1, y: 0,
            duration: 8, ease: "power3.out"
        }, 4);

        // Phase 2: Map emerges
        tl.to(mapWrapper, {
            opacity: 1, scale: 1, y: 0,
            duration: 15, ease: "power2.out"
        }, 10);

        // Phase 3: Radar rings emanate from Bangalore (HQ)
        radarRings.forEach((ring, i) => {
            tl.to(ring, {
                opacity: 0.4, scale: 1 + i * 0.5,
                duration: 8, ease: "power1.out"
            }, 22 + i * 3);
        });

        // Phase 4: Pins drop one by one
        pins.forEach((pin, i) => {
            const startTime = 28 + (i * 10);

            tl.to(pin, {
                opacity: 1, scale: 1, y: 0,
                duration: 8, ease: "back.out(2.5)"
            }, startTime);
        });

        // Phase 5: Serving Cities List emerges
        tl.to(servingTitle, {
            opacity: 1, x: 0,
            duration: 8, ease: "power2.out"
        }, 40);

        servingItems.forEach((item, i) => {
            tl.to(item, {
                opacity: 1, x: 0,
                duration: 6, ease: "back.out(1.5)"
            }, 44 + (i * 4));
        });

        // Phase 6: Stats row
        tl.to(statsRow, {
            opacity: 1, y: 0, scale: 1,
            duration: 10, ease: "power3.out"
        }, 75);

        // Continuous pulse animations for pins
        const pulseAnims: gsap.core.Timeline[] = [];
        pins.forEach((pin) => {
            const pulse = pin.querySelector('.pin-ring');
            if (pulse) {
                const ptl = gsap.timeline({ repeat: -1, paused: true });
                ptl.fromTo(pulse,
                    { scale: 0.5, opacity: 0.8 },
                    { scale: 2.5, opacity: 0, duration: 2, ease: "power1.out" }
                );
                pulseAnims.push(ptl);
            }
        });

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=300%",
            onUpdate: (self) => {
                if (self.progress > 0.28) {
                    pulseAnims.forEach(p => p.play());
                }
            }
        });

        return () => {
            pulseAnims.forEach(p => p.kill());
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === section) trigger.kill();
            });
        };
    }, []);

    return (
        <>
            <section className="india-map-section" ref={sectionRef}>
                <div className="india-map-sticky">
                    <h2 className="map-section-heading">
                        OUR <span className="text-accent-green">SERVICES</span>
                    </h2>
                    <p className="map-section-subheading">
                        Pan South India Coverage — Delivering Excellence Across 4 Major Cities
                    </p>

                    <div className="india-map-wrapper">
                        {/* Ambient glow */}
                        <div className="map-ambient-glow"></div>

                        <div className="india-map-container">
                            {/* India map image */}
                            <img
                                src="/assets/india-map.svg"
                                alt="India Map"
                                className="india-map-img"
                                draggable={false}
                            />

                            {/* Radar rings emanating from Bangalore HQ */}
                            <div className="radar-center" style={{ left: `${CITIES[0].x}%`, top: `${CITIES[0].y}%` }}>
                                <div className="radar-ring"></div>
                                <div className="radar-ring"></div>
                                <div className="radar-ring"></div>
                            </div>

                            {/* City Pins */}
                            {CITIES.map((city, i) => (
                                <div
                                    key={city.name}
                                    className="map-pin-group"
                                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                                >
                                    {/* Pulse ring */}
                                    <div className="pin-ring"></div>

                                    {/* Pin marker */}
                                    <div className={`pin-marker ${i === 0 ? 'pin-hq' : ''}`}>
                                        <div className="pin-dot"></div>
                                    </div>

                                    {/* City info card */}
                                    <div className={`city-card card-${city.align}`}>
                                        <div className="card-connector"></div>
                                        <div className="card-body">
                                            <span className="card-city">{city.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Floating dots */}
                            <div className="map-particles">
                                {[
                                    { l: 22, t: 18, d: 0.2, dur: 5.1 },
                                    { l: 38, t: 42, d: 1.4, dur: 4.3 },
                                    { l: 55, t: 25, d: 2.8, dur: 6.2 },
                                    { l: 70, t: 65, d: 0.7, dur: 3.8 },
                                    { l: 30, t: 75, d: 3.1, dur: 5.5 },
                                    { l: 62, t: 35, d: 1.9, dur: 4.7 },
                                    { l: 45, t: 55, d: 3.5, dur: 6.8 },
                                    { l: 78, t: 30, d: 0.5, dur: 3.4 },
                                ].map((p, i) => (
                                    <div
                                        key={i}
                                        className="map-particle"
                                        style={{
                                            left: `${p.l}%`,
                                            top: `${p.t}%`,
                                            animationDelay: `${p.d}s`,
                                            animationDuration: `${p.dur}s`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Serving Cities Panel on Right */}
                        <div className="serving-cities-panel">
                            <h3 className="serving-title">SERVING CITIES</h3>
                            <ul className="serving-list">
                                {CITIES.map((city, i) => (
                                    <li key={city.name} className="serving-item">
                                        <div className="serving-bullet">
                                            <div className="serving-bullet-core"></div>
                                        </div>
                                        <span className="serving-name">{city.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="map-stats-row">
                        <div className="map-stat">
                            <span className="map-stat-number">4</span>
                            <span className="map-stat-label">Major Cities</span>
                        </div>
                        <div className="map-stat-divider"></div>
                        <div className="map-stat">
                            <span className="map-stat-number">500+</span>
                            <span className="map-stat-label">Projects Delivered</span>
                        </div>
                        <div className="map-stat-divider"></div>
                        <div className="map-stat">
                            <span className="map-stat-number">24/7</span>
                            <span className="map-stat-label">Support Available</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
