"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CAROUSEL_SLIDES = [
    {
        id: "telemedicine",
        image: "/hero_sl_telemedicine.png",
        title: "24/7 On-Demand Telemedical Consulting",
        subtitle: "Instant 24/7 video consults with SLMC-licensed doctors, electronic health charts, and digital prescriptions.",
        badge: "Western Medicine",
        tag: "01 / TELEMEDICINE",
        goldHighlight: "24/7 SLMC Doctors",
        link: "/services/telemedicine",
    },
    {
        id: "home-care",
        image: "/hero_sl_ayucare.png",
        title: "AyuCare Compassionate Home Care",
        subtitle: "Trusted nursing care, elder companionship, and daily support in Sinhala, Tamil, & English across Sri Lanka.",
        badge: "Home Care & Nursing",
        tag: "02 / HOME CARE",
        goldHighlight: "Trilingual Caregivers",
        link: "/services/home-care",
    },
    {
        id: "integrated-healing",
        image: "/hero_sl_ayurveda.png",
        title: "Integrated East-West Healing",
        subtitle: "Uniting evidence-based Western medicine with Ayurveda, Indigenous Deshiya Chikitsa, Vedic wisdom & Naturopathy.",
        badge: "Holistic & Clinical",
        tag: "03 / INTEGRATED HEALING",
        goldHighlight: "Deshiya Chikitsa",
        link: "/services/integrated-healing",
    },
    {
        id: "psychology",
        image: "/hero_sl_counseling.png",
        title: "Serene Counseling & Psychotherapy",
        subtitle: "A confidential sanctuary providing CBT, mindfulness, trauma-informed care, and stress management.",
        badge: "Mental Wellness",
        tag: "04 / SERENE COUNSELING",
        goldHighlight: "Mindful Resilience",
        link: "/services/psychology",
    },
    {
        id: "spiritual-care",
        image: "/hero_sl_sacredspace.png",
        title: "Sacred Space Multifaith Spiritual Healing",
        subtitle: "Multifaith sanctuary honoring Buddhism, Hinduism, Islam, & Christianity with peace rituals & chaplaincy.",
        badge: "Multifaith Care",
        tag: "05 / SPIRITUAL HEALING",
        goldHighlight: "Universal Solace",
        link: "/services/spiritual-care",
    },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    }, []);

    // Auto-advance carousel every 5 seconds unless hovered
    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(() => {
                handleNext();
            }, 5000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, handleNext]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const currentSlide = CAROUSEL_SLIDES[currentIndex];

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-[92vh] w-full overflow-hidden flex items-center z-10 pt-28 pb-16 sm:pt-32 sm:pb-20 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5]"
        >
            {/* Soft Ambient Golden & Emerald Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#E6C665]/20 via-[#D4AF37]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-gradient-to-tr from-[#54B476]/15 via-[#00A86B]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FAF3E0]/40 rounded-full blur-[160px] pointer-events-none" />

            {/* Subtle Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#002B9A 1px, transparent 1px)`,
                    backgroundSize: `32px 32px`,
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

                    {/* Left Column: Exact Headline, Text & CTAs */}
                    <div className="lg:col-span-6 flex flex-col justify-center">

                        {/* Top Category Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F4EFE2] border border-[#E2D4B5] text-[#8C6B1B] text-xs font-bold tracking-widest uppercase mb-6 w-fit shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span>Our Specialized Services • Sri Lanka</span>
                        </div>

                        {/* Exact Main Headline */}
                        <h1 className="text-5xl sm:text-7xl lg:text-[5.75rem] font-black text-[#0A1329] leading-[1.02] tracking-tight mb-6">
                            Empowering <br />
                            <span className="text-[#54B476] relative inline-block">
                                Healing.
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#54B476]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtitle Paragraph */}
                        <p className="max-w-xl text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-8">
                            Bridging western medical care and traditional holistic wisdom to provide a truly personalized care journey designed around your life.
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-1 mb-10">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#54B476] hover:bg-[#439c63] text-white px-8 py-4 text-sm sm:text-base font-bold shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Get care now</span>
                            </Link>

                            <button
                                onClick={() => {
                                    const el = document.getElementById("services");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-7 py-4 text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Learn more →</span>
                            </button>
                        </div>

                        {/* Trust Micro-Badge Section */}
                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/80">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full ring-2 ring-white bg-[#54B476] flex items-center justify-center text-white text-xs font-bold">SLMC</div>
                                    <div className="w-8 h-8 rounded-full ring-2 ring-white bg-[#002B9A] flex items-center justify-center text-white text-xs font-bold">MD</div>
                                    <div className="w-8 h-8 rounded-full ring-2 ring-white bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">AYU</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                                        {"★".repeat(5)}
                                        <span className="font-bold text-slate-800 ml-1 text-xs">4.9/5</span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium">SLMC Doctors &amp; Ayurvedic Specialists</span>
                                </div>
                            </div>

                            <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />

                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sinhala • Tamil • English</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: 5 Photo Non-Human Sri Lankan Specialized Services Carousel */}
                    <div 
                        className="lg:col-span-6 relative flex flex-col items-center justify-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Golden Ambient Glow Aura behind Carousel */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-[#F3E5AB]/30 to-[#54B476]/15 rounded-[2.5rem] blur-2xl transition-transform duration-500 ease-out"
                            style={{
                                transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
                            }}
                        />

                        {/* Main Carousel Frame Container (3:4 Ratio) */}
                        <div 
                            className="relative w-full max-w-[420px] sm:max-w-[440px] aspect-[3/4] rounded-[2.2rem] p-3 sm:p-4 bg-gradient-to-b from-white/90 via-amber-50/50 to-white/90 backdrop-blur-xl border border-[#E6D7B6] shadow-[0_25px_60px_-15px_rgba(180,140,50,0.18)] transition-transform duration-500 ease-out"
                            style={{
                                transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0) rotate(${mousePos.x * 1.5}deg)`,
                            }}
                        >
                            {/* Inner Image Container */}
                            <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden shadow-inner bg-slate-900 group">
                                {CAROUSEL_SLIDES.map((slide, index) => {
                                    const isActive = index === currentIndex;
                                    return (
                                        <div
                                            key={slide.id}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                                isActive
                                                    ? "opacity-100 scale-100 z-10 pointer-events-auto"
                                                    : "opacity-0 scale-105 z-0 pointer-events-none"
                                            }`}
                                        >
                                            <Image
                                                src={slide.image}
                                                alt={slide.title}
                                                fill
                                                priority={index === 0}
                                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 440px"
                                            />

                                            {/* Golden Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                                            {/* Top Tag & Golden Badge */}
                                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                                                <span className="px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-amber-300/30 text-amber-200 text-[11px] font-bold uppercase tracking-wider">
                                                    {slide.tag}
                                                </span>

                                                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/90 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                                                    {slide.goldHighlight}
                                                </span>
                                            </div>

                                            {/* Bottom Slide Info Card */}
                                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white z-20">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#54B476]" />
                                                        <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider">
                                                            {slide.badge}
                                                        </span>
                                                    </div>

                                                    <Link 
                                                        href={slide.link} 
                                                        className="text-[11px] font-bold text-amber-300 hover:text-white transition-colors"
                                                    >
                                                        Details ➔
                                                    </Link>
                                                </div>

                                                <h3 className="text-lg font-bold text-white leading-snug mb-1">
                                                    {slide.title}
                                                </h3>
                                                <p className="text-xs text-slate-300 font-normal line-clamp-2">
                                                    {slide.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Floating Polaroid Badge Effect */}
                                <div 
                                    className="absolute top-6 -right-6 sm:-right-8 z-30 hidden sm:flex flex-col items-center bg-white p-2.5 rounded-2xl shadow-2xl border border-amber-200/80 -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105"
                                    style={{
                                        transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0) rotate(-6deg)`,
                                    }}
                                >
                                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-amber-50">
                                        <Image 
                                            src={currentSlide.image} 
                                            alt="Preview" 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-[9px] font-extrabold uppercase text-[#8C6B1B] tracking-wider block">
                                            Sri Lanka
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-800 block">
                                            ★ 4.9 Rating
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls & Thumbnails Bar */}
                            <div className="mt-4 flex items-center justify-between gap-2 px-1">
                                {/* Thumbnail Selection Buttons for 5 Services */}
                                <div className="flex items-center gap-1.5">
                                    {CAROUSEL_SLIDES.map((slide, idx) => (
                                        <button
                                            key={slide.id}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`relative w-8 h-10 sm:w-9 sm:h-11 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                                                idx === currentIndex
                                                    ? "border-[#D4AF37] scale-105 shadow-md shadow-amber-500/20"
                                                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-100"
                                            }`}
                                            aria-label={`Go to ${slide.title}`}
                                        >
                                            <Image 
                                                src={slide.image} 
                                                alt={slide.title} 
                                                fill 
                                                className="object-cover"
                                            />
                                            {idx === currentIndex && (
                                                <div className="absolute inset-0 bg-[#D4AF37]/20 border border-amber-300" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Slide Progress & Arrows */}
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xs font-extrabold text-[#8C6B1B] tracking-wider">
                                        0{currentIndex + 1} <span className="text-slate-400 font-normal">/ 0{CAROUSEL_SLIDES.length}</span>
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={handlePrev}
                                            className="w-7 h-7 rounded-full bg-white hover:bg-amber-100 text-slate-800 border border-amber-200 flex items-center justify-center text-xs font-bold shadow-xs transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                            aria-label="Previous slide"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="w-7 h-7 rounded-full bg-[#D4AF37] hover:bg-[#c3a02e] text-slate-950 flex items-center justify-center text-xs font-black shadow-xs transition-all hover:scale-110 active:scale-95 cursor-pointer"
                                            aria-label="Next slide"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Right Rotating Circular Badge (SECURE & TRUSTED 24/7) */}
                        <div className="absolute -bottom-8 -right-4 sm:-right-8 z-30 hidden md:flex items-center justify-center pointer-events-none">
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                {/* Rotating Circular Text SVG */}
                                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <path
                                        id="circlePath"
                                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="none"
                                    />
                                    <text className="text-[8px] font-extrabold uppercase tracking-[2.5px] fill-[#8C6B1B]">
                                        <textPath href="#circlePath" startOffset="0%">
                                            SECURE & TRUSTED Care • 24/7 •
                                        </textPath>
                                    </text>
                                </svg>

                                {/* Center Gold Star Icon */}
                                <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] shadow-lg shadow-amber-600/30 flex items-center justify-center text-slate-950 border border-amber-200">
                                    <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
