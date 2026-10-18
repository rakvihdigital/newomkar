'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Crop coordinates (x, y, width, height) hide source-image whitespace without changing the artwork.
const brands = [
    { slug: "calvin-klein", name: "Calvin Klein", area: "1 / 2", imageWidth: 1600, imageHeight: 362, crop: [173, 77, 1254, 208] },
    { slug: "arvind", name: "Arvind", area: "1 / 3", imageWidth: 1600, imageHeight: 386, crop: [384, 125, 832, 136] },
    { slug: "mi", name: "Mi", area: "2 / 2", imageWidth: 1599, imageHeight: 1600, crop: [0, 0, 1599, 1600] },
    { slug: "nykaa", name: "Nykaa", area: "2 / 3", imageWidth: 1600, imageHeight: 604, crop: [0, 0, 1600, 604] },
    { slug: "bajaj-finance", name: "Bajaj Finance", area: "2 / 1", imageWidth: 1600, imageHeight: 742, crop: [52, 52, 1496, 638] },
    { slug: "puravankara", name: "Puravankara", area: "4 / 1", imageWidth: 1600, imageHeight: 400, crop: [173, 119, 1254, 162] },
    { slug: "bata", name: "Bata", area: "3 / 2", imageWidth: 1600, imageHeight: 384, crop: [0, 0, 1600, 384] },
    { slug: "hafele", name: "Häfele", area: "4 / 3", imageWidth: 1600, imageHeight: 400, crop: [0, 0, 1600, 400] },
    { slug: "asian-paints", name: "Asian Paints", area: "3 / 4 / span 2 / span 2", imageWidth: 1600, imageHeight: 402, crop: [51, 56, 1514, 289] },
    { slug: "blackberrys", name: "Blackberrys", area: "2 / 5", imageWidth: 1600, imageHeight: 698, crop: [140, 113, 1320, 474] },
    { slug: "samsung", name: "Samsung", area: "2 / 4", imageWidth: 1600, imageHeight: 441, crop: [0, 0, 1600, 441] },
    { slug: "mia-by-tanishq", name: "Mia by Tanishq", area: "4 / 2", imageWidth: 1600, imageHeight: 1478, crop: [243, 150, 1114, 1178] },
    { slug: "sobha", name: "Sobha", area: "3 / 3", imageWidth: 1600, imageHeight: 570, crop: [147, 143, 1307, 284] },
    { slug: "kushals", name: "Kushal’s", area: "5 / 2", imageWidth: 1600, imageHeight: 456, crop: [330, 94, 929, 268] },
    { slug: "bkt-tyres", name: "BKT Tyres", area: "5 / 3", imageWidth: 1600, imageHeight: 743, crop: [0, 0, 1600, 743] },
    { slug: "carlsberg", name: "Carlsberg Elephant", area: "5 / 4 / span 1 / span 2", imageWidth: 1600, imageHeight: 759, crop: [0, 0, 1600, 759] },
    { slug: "soch", name: "Soch", area: "1 / 4", imageWidth: 1600, imageHeight: 1144, crop: [0, 0, 1600, 1144] },
    { slug: "tuborg", name: "Tuborg", area: "3 / 1", imageWidth: 1600, imageHeight: 488, crop: [0, 0, 1600, 488] },
];

export default function BrandsPuzzle() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Flip);

        const section = document.getElementById('brandsPuzzleSection');
        const cards = Array.from(section?.querySelectorAll<HTMLElement>('.puzzle-card') ?? []);
        const shuffleCards = cards.filter(card => !card.hasAttribute('data-shuffle-fixed'));

        if (!section || cards.length === 0) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const context = gsap.context(() => {
            if (reducedMotion) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1.2
                }
            });

            cards.forEach((card, i) => {
                gsap.set(card, {
                    opacity: 0,
                    scale: 0.2,
                    x: () => (Math.random() - 0.5) * 800,
                    y: () => (Math.random() - 0.5) * 800 + 400,
                    rotation: () => (Math.random() - 0.5) * 120
                });

                const interX = (Math.random() - 0.5) * 1000;
                const interY = (Math.random() - 0.5) * 1000;
                const interRot = (Math.random() - 0.5) * 60;

                tl.to(card, {
                    opacity: 1,
                    scale: (Math.random() * 0.4) + 0.6,
                    x: interX,
                    y: interY,
                    rotation: interRot,
                    ease: "power2.out",
                    duration: 25
                }, i * 0.5);

                tl.to(card, {
                    x: interX + (Math.random() - 0.5) * 150,
                    y: interY + (Math.random() - 0.5) * 150,
                    rotation: interRot + (Math.random() - 0.5) * 15,
                    duration: 20,
                    ease: "sine.inOut"
                }, 25);

                tl.to(card, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    ease: "power3.inOut",
                    duration: 35
                }, 45);

                tl.to(card, {
                    duration: 20
                }, 80);
            });

        }, section);

        const clickHandler = () => {
            const state = Flip.getState(shuffleCards);
            const positions = shuffleCards.map(card => ({ area: card.style.gridArea, order: card.style.order }));

            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }

            shuffleCards.forEach((c, i) => {
                c.style.gridArea = positions[i].area;
                c.style.order = positions[i].order;
            });

            Flip.from(state, {
                duration: reducedMotion ? 0 : 1.2,
                ease: "power3.inOut",
                absolute: true,
                stagger: 0.02,
                spin: !reducedMotion
            });
        };

        cards.forEach(card => {
            card.addEventListener('click', clickHandler);
        });
        
        return () => {
            cards.forEach(card => card.removeEventListener('click', clickHandler));
            context.revert();
        };
    }, []);

    return (
        <>
            <div className="brands-puzzle-section" id="brandsPuzzleSection">
                <div className="brands-puzzle-sticky">
                    <div className="brands-puzzle-content">
                        <h2 className="puzzle-heading">BRANDS THAT<br />TRUST US</h2>

                        <div className="puzzle-grid" id="puzzleGrid">
                            {brands.map((brand, index) => {
                                const [x, y, width, height] = brand.crop;
                                const ratio = width / height;
                                return (
                                    <button
                                        type="button"
                                        className="puzzle-card"
                                        key={brand.slug}
                                        style={{ gridArea: brand.area, order: index }}
                                        data-shuffle-fixed={brand.slug === 'bata' || brand.slug === 'sobha' ? '' : undefined}
                                        aria-label={`${brand.name} — shuffle brand tiles`}
                                    >
                                        <span
                                            className="puzzle-card-inner"
                                            style={{
                                                '--logo-width': `${134 * ratio / (ratio + 1)}cqmin`,
                                                '--logo-height': `${134 / (ratio + 1)}cqmin`,
                                                '--logo-ratio': ratio,
                                            } as React.CSSProperties}
                                        >
                                            <Image
                                                src={`/assets/trusted-brands/${brand.slug}.webp`}
                                                alt={brand.name}
                                                width={brand.imageWidth}
                                                height={brand.imageHeight}
                                                // Animated off-screen tiles must not defer their image requests.
                                                loading="eager"
                                                unoptimized
                                                onError={(event) => {
                                                    const image = event.currentTarget;
                                                    const fallback = `/assets/trusted-brands/${brand.slug}.jpg`;
                                                    if (image.getAttribute('src') !== fallback) {
                                                        image.src = fallback;
                                                    }
                                                }}
                                                className="puzzle-logo-img"
                                                style={{
                                                    width: `${brand.imageWidth / width * 100}%`,
                                                    height: `${brand.imageHeight / height * 100}%`,
                                                    left: `${-x / width * 100}%`,
                                                    top: `${-y / height * 100}%`,
                                                }}
                                            />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
