"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CAROUSEL_SLIDES = [
    {
        id: "telemedicine",
        image: "/1.png",
        title: "24/7 On-Demand Telemedical Consulting",
    },
    {
        id: "home-care",
        image: "/2.png",
        title: "AyuCare Compassionate Home Care",
    },
    {
        id: "spiritual-care",
        image: "/3.png",
        title: "Sacred Space Multifaith Spiritual Healing",
    },
    {
        id: "psychology",
        image: "/4.png",
        title: "Serene Counseling & Psychotherapy",
    },
    {
        id: "integrated-healing",
        image: "/5.png",
        title: "Integrated East-West Healing",
    },
    {
        id: "community",
        image: "/6.png",
        title: "Wellness Community & Shared Stories",
    },
];

const SLIDE_DURATION = 4000; // 4 seconds per photo
const TICKER_ITEMS = Array(6).fill("Your Trusted Wellness Partner");

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, []);

    // Listen to window scroll for smooth parallax scrolling animation
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-advance carousel continuously every 4 seconds
    useEffect(() => {
        timerRef.current = setInterval(() => {
            handleNext();
        }, SLIDE_DURATION);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [handleNext]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - -2;
        const y = (e.clientY - rect.top) / rect.height - 6;
        setMousePos({ x, y });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex items-center z-10 pt-28 sm:pt-32 pb-20 lg:py-0 bg-[#FAF8F5]"
        >
            {/* Global Keyframes & Slide Transition Styles */}
            <style>{`
                @keyframes marquee-loop {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-seamless-marquee {
                    display: flex;
                    width: max-content;
                    flex-wrap: nowrap;
                    animation: marquee-loop 25s linear infinite;
                }
                .animate-seamless-marquee:hover {
                    animation-play-state: paused;
                }
                .hero-slide-transition {
                    transition:
                        opacity 1800ms ease-in-out,
                        transform 1800ms ease-in-out;
                    will-change: opacity, transform;
                    backface-visibility: hidden;
                }
            `}</style>

            {/* Subtle Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
                style={{
                    backgroundImage: `radial-gradient(#002B9A 1px, transparent 1px)`,
                    backgroundSize: `36px 36px`,
                }}
            />

            {/* ── RIGHT SIDE FULL IMAGE CONTAINER (Responsive: 100% on mobile, 65% on Desktop) ── */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] h-full z-0 overflow-hidden">
                <div 
                    className="relative w-full h-[115%] -top-[7%] transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate3d(${mousePos.x * 18}px, ${scrollY * 0.16 + mousePos.y * 18}px, 0) scale(${1.02 + Math.min(scrollY * 0.0003, 0.06)})`
                    }}
                >
                    {CAROUSEL_SLIDES.map((slide, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 hero-slide-transition ${
                                    isActive
                                        ? "opacity-100 scale-[1.01] z-10"
    : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                                }`}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    unoptimized
                                    priority={index === 0}
                                    className="object-cover object-center sm:object-center transition-transform duration-[1000ms] ease-out hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 65vw"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* ── ORGANIC SHAPED TRANSPARENCY GRADIENT OVERLAYS ── */}
                {/* 1. Edge blend gradient: heavy on mobile for text contrast, soft organic blend on desktop */}
                <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/92 lg:via-[#FAF8F5]/85 to-transparent z-20 pointer-events-none" />

                {/* 2. Top and bottom soft fade gradients */}
                <div className="absolute inset-x-0 top-0 h-32 sm:h-36 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/75 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/75 to-transparent z-20 pointer-events-none" />

                {/* 3. Organic Fluid Curved Mask (Desktop view) */}
                <svg 
                    className="absolute inset-y-0 -left-1 h-full w-56 text-[#FAF8F5] z-25 pointer-events-none hidden lg:block"
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path d="M0,0 Q60,25 30,50 T0,100 L0,0 Z" fill="currentColor" opacity="0.95" />
                    <path d="M0,0 Q90,35 45,65 T0,100 L0,0 Z" fill="currentColor" opacity="0.4" />
                </svg>

            </div>

            {/* ── LEFT COLUMN: HERO TEXT ── */}
            <div 
                className="relative z-30 mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-12 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate3d(0, ${scrollY * -0.06}px, 0)`
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-5 flex flex-col justify-center text-left">

                        {/* Exact Main Headline (Responsive typography for mobile screens) */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-black text-[#0A1329] leading-[1.06] sm:leading-[1.02] tracking-tight mb-4 sm:mb-6">
                            Empowering <br />
                            <span className="text-[#54B476] relative inline-block">
                                Healing.
                                <svg className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#54B476]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtitle Paragraph */}
                        <p className="max-w-xl text-sm sm:text-lg md:text-xl text-slate-700 sm:text-slate-600 font-medium sm:font-normal leading-relaxed mb-6 sm:mb-8">
                            Bridging western medical care and traditional holistic wisdom to provide a truly personalized care journey designed around your life.
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#54B476] hover:bg-[#439c63] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-bold shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Get care now</span>
                            </Link>

                            <button
                                onClick={() => {
                                    const el = document.getElementById("services");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 hover:bg-slate-50 border border-slate-200/90 text-slate-800 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-base font-semibold shadow-xs transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Learn more →</span>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* ── SEAMLESS TICKER BANNER (Full width spanning bottom of hero screen) ── */}
            <div className="absolute bottom-0 left-0 w-full bg-white/50 backdrop-blur-md text-slate-800 py-2.5 sm:py-3 z-30 font-semibold text-xs sm:text-sm shadow-xs overflow-hidden whitespace-nowrap border-t border-slate-200/60">
                <div className="animate-seamless-marquee flex items-center">
                    {/* Primary Track Set */}
                    <div className="flex items-center gap-8 shrink-0 pr-8">
                        {TICKER_ITEMS.map((text, i) => (
                            <div key={`hero-ticker-set1-${i}`} className="flex items-center gap-8 shrink-0">
                                <span className="inline-flex items-center gap-2 text-slate-800 font-semibold">
                                    <svg className="w-4 h-4 text-[#54B476] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    {text}
                                </span>
                                <span className="text-emerald-500/50">✦</span>
                            </div>
                        ))}
                    </div>

                    {/* Identical Duplicate Track Set for Seamless Looping */}
                    <div className="flex items-center gap-8 shrink-0 pr-8">
                        {TICKER_ITEMS.map((text, i) => (
                            <div key={`hero-ticker-set2-${i}`} className="flex items-center gap-8 shrink-0">
                                <span className="inline-flex items-center gap-2 text-slate-800 font-semibold">
                                    <svg className="w-4 h-4 text-[#54B476] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    {text}
                                </span>
                                <span className="text-emerald-500/50">✦</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
