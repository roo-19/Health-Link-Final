"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden bg-[#fefcf8] flex items-center z-10 group pt-20 pb-12"
        >
            {/* Cozy Immersive Sunlit Background Image (Simple Hospital + Yoga Scene) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute inset-0 w-full h-[115%] -top-[7%] transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate3d(${mousePos.x * 15}px, ${scrollY * 0.15 + mousePos.y * 15}px, 0) scale(${1.04 + Math.abs(mousePos.x) * 0.03})`
                    }}
                >
                    <Image
                        src="/images/health_link_cozy_hero.png"
                        alt="Medical Care & Spiritual Yoga Harmony"
                        fill
                        className="object-cover object-center lg:object-right transition-transform duration-[2s] ease-out group-hover:scale-105"
                        priority
                    />
                </div>

                {/* Soft Warm Sunlight Gradient Overlays (NO Dark Overlays, NO Dots) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#fefcf8] via-[#fefcf8]/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fefcf8] via-transparent to-[#fefcf8]/30" />
            </div>

            {/* Cozy Mind-Relaxing Floating Content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    
                    {/* Left Column: Taglines & CTAs */}
                    <div className="lg:col-span-7">
                        
                        {/* Checkmark Badge Pill */}
                        <div className="inline-flex items-center gap-2.5 rounded-full bg-accent/80 border border-secondary/20 backdrop-blur-md px-4 py-2 mb-6 text-xs font-bold text-secondary shadow-sm">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white font-black text-[10px]">
                                ✓
                            </span>
                            <span>24/7 Clinical Care &amp; Mindful Wellness</span>
                        </div>

                        {/* Original Tagline Headline (Cozy & Legible) */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold text-primary leading-[1.04] tracking-tight mb-8">
                            Empowering <br />
                            <span className="font-serif italic font-normal text-secondary">Healing</span> <span className="font-serif italic font-normal text-slate-700">across</span> <br />
                            Body, Mind &amp; Spirit.
                        </h1>

                        {/* Action CTA Block */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-2">
                            <Link
                                href="/signup"
                                className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4.5 text-base font-bold text-white shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all duration-300 hover:scale-105"
                            >
                                <span>Get care now</span>
                                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                            </Link>

                            <p className="max-w-xs text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                Bridging western medical care and traditional holistic wisdom to provide a truly personalized care journey designed around your life.
                            </p>
                        </div>

                        {/* Trust Features Strip */}
                        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-semibold">
                            <span className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                On-Demand Doctors Active
                            </span>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <span>Multifaith Spiritual Chaplaincy</span>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <span>100% Encrypted &amp; Confidential</span>
                        </div>
                    </div>

                    {/* Right Column: Cozy Glassmorphic Highlight Card */}
                    <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-center">
                        <div 
                            className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-xl max-w-sm transition-all duration-500 hover:scale-105 hover:border-secondary/40"
                            style={{
                                transform: `translate3d(${-mousePos.x * 12}px, ${-mousePos.y * 12}px, 0)`
                            }}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-12 w-12 rounded-2xl bg-accent border border-secondary/20 flex items-center justify-center text-secondary text-2xl shadow-sm">
                                    🩺 🧘‍♀️
                                </div>
                                <div>
                                    <h3 className="text-sm font-extrabold text-primary">Medical &amp; Yoga Harmony</h3>
                                    <p className="text-xs text-secondary font-bold">Comprehensive Circle of Care</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                24/7 Licensed Medical Doctors, Home Nursing, Mindfulness &amp; Sacred Space Multifaith Care.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
