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

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
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
                @keyframes countdownFill {
    0% { width: 100%; }
    100% { width: 0%; }
}

.animate-progress-countdown {
    animation: countdownFill 4000ms linear forwards;
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

                {/* ── CENTERED CONTROLS (Centered at bottom on mobile, right-aligned on desktop) ── */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 z-30 flex flex-col gap-2.5 items-center w-[92%] sm:w-auto max-w-sm">
                    {/* Thicker 3px progress line in light neutral tone */}
                    <div className="w-full sm:w-[260px] max-w-[280px] h-[3px] bg-slate-300/40 rounded-full overflow-hidden mx-auto">
                        <div
                            key={currentIndex}
                            className="h-full bg-slate-400/90 rounded-full animate-progress-countdown"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-2.5 sm:gap-3 bg-white/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-full">
                        {/* 6 Minimal Borderless Thumbnail Buttons */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                            {CAROUSEL_SLIDES.map((slide, idx) => (
                                <button
                                    key={slide.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative w-5.5 h-7 sm:w-6 sm:h-8 rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
                                        idx === currentIndex
                                            ? "opacity-100 scale-105 shadow-xs"
                                            : "opacity-35 hover:opacity-85"
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    <Image 
                                        src={slide.image} 
                                        alt={slide.title} 
                                        fill 
                                        unoptimized
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="h-3 w-[1px] bg-slate-300/60" />

                        {/* Minimal Counter & Borderless Clean Arrows */}
                        <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-slate-700">
                            <span className="text-[10px] font-mono text-slate-700">
                                0{currentIndex + 1}/0{CAROUSEL_SLIDES.length}
                            </span>
                            <button
                                onClick={handlePrev}
                                className="w-5 h-5 rounded-full hover:bg-slate-200/50 active:bg-slate-300/60 text-slate-800 flex items-center justify-center text-[10px] font-bold transition-colors cursor-pointer"
                                aria-label="Previous slide"
                            >
                                ←
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-5 h-5 rounded-full hover:bg-slate-200/50 active:bg-slate-300/60 text-slate-800 flex items-center justify-center text-[10px] font-bold transition-colors cursor-pointer"
                                aria-label="Next slide"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
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
        </section>
    );
}
