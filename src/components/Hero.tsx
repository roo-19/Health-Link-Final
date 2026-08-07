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
            className="relative min-h-screen w-full overflow-hidden flex items-center z-10 group pt-24 pb-16 bg-slate-950"
        >
            {/* Full-bleed Background Image: hero1.png */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 w-full h-[115%] -top-[7%] transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate3d(${mousePos.x * 12}px, ${scrollY * 0.12 + mousePos.y * 12}px, 0) scale(${1.03 + Math.abs(mousePos.x) * 0.02})`
                    }}
                >
                    <Image
                        src="/hero3.png"
                        alt="Health Link - Empowering Healing"
                        fill
                        className="object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-105"
                        priority
                    />
                </div>

                {/* Gradient Overlay for Readable High-Contrast Text */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
            </div>

            {/* Hero Interactive Floating Content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left Column: Tagline, Headline & CTAs */}
                    <div className="lg:col-span-8">

                        {/* Exact Main Headline from Uploaded Design */}
                        <h1 className="text-5xl sm:text-7xl lg:text-[6.25rem] font-black text-white leading-[1.02] tracking-tight mb-6 drop-shadow-md">
                            Empowering <br />
                            <span className="text-[#54B476]">Healing.</span>
                        </h1>

                        {/* Subtitle Paragraph */}
                        <p className="max-w-xl text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8 drop-shadow-sm">
                            Bridging western medical care and traditional holistic wisdom to provide a truly personalized care journey designed around your life.
                        </p>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#54B476] hover:bg-[#45a065] text-white px-8 py-4 text-sm sm:text-base font-bold shadow-xl shadow-emerald-950/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Get care now</span>
                            </Link>

                            <button
                                onClick={() => {
                                    const el = document.getElementById("services");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-4 text-sm sm:text-base font-semibold transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>Learn more →</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Right Rotating Circular Badge (SECURE & TRUSTED 24/7) */}
            <div className="absolute bottom-8 right-8 sm:right-12 z-20 hidden md:flex items-center justify-center pointer-events-none">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Rotating Circular Text SVG */}
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                        <path
                            id="circlePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                        />
                        <text className="text-[8.5px] font-black uppercase tracking-[2.8px] fill-slate-300/80">
                            <textPath href="#circlePath" startOffset="0%">
                                SECURE & TRUSTED Care • 24/7 •
                            </textPath>
                        </text>
                    </svg>

                    {/* Center Shield Icon */}
                    <div className="absolute w-14 h-14 rounded-full bg-[#54B476] shadow-xl shadow-emerald-950/50 flex items-center justify-center text-white border border-emerald-400/40">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
