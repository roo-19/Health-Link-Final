"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/components/servicesData";

export default function ServicesCircleNav() {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const activeService = servicesData[activeIdx];

    return (
        <section className="bg-background py-24 sm:py-32 relative overflow-hidden" id="services">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/3 pointer-events-none" />

            {/* Grid watermark background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,43,154,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,43,154,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 relative z-10">
                {/* Header Section */}
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">
                        Our Specialized Services
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
                        Healthcare & Wellness designed around your life.
                    </h2>
                </div>

                {/* Interactive Split Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-200/30">
                    
                    {/* Left Navigation Panel (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-3 pr-0 lg:pr-6 lg:border-r border-slate-100 justify-center">
                        {servicesData.map((service, idx) => {
                            const isActive = activeIdx === idx;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`w-full flex items-center justify-between text-left p-5 rounded-2xl border transition-all duration-300 group focus:outline-none cursor-pointer
                                        ${isActive 
                                            ? "bg-accent border-secondary/20 shadow-sm text-primary" 
                                            : "bg-transparent border-transparent hover:bg-slate-50/80 text-slate-600"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Icon Wrapper */}
                                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300
                                            ${isActive 
                                                ? "bg-white text-secondary ring-1 ring-secondary/10 shadow-sm" 
                                                : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-primary group-hover:ring-1 group-hover:ring-slate-200"
                                            }
                                        `}>
                                            {service.icon}
                                        </div>
                                        <div>
                                            <p className={`text-base font-bold transition-colors
                                                ${isActive ? "text-primary" : "text-slate-800 group-hover:text-primary"}
                                            `}>
                                                {service.navTitle}
                                            </p>
                                            <p className="text-xs text-slate-400 font-light mt-0.5 group-hover:text-slate-500 transition-colors">
                                                {service.tag}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Active Arrow Indicator */}
                                    <span className={`transition-all duration-300
                                        ${isActive 
                                            ? "translate-x-0 opacity-100 text-secondary" 
                                            : "-translate-x-2 opacity-0 text-slate-300 group-hover:opacity-100 group-hover:translate-x-0"
                                        }
                                    `}>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Details Panel (8 Cols) */}
                    <div className="lg:col-span-8 flex flex-col justify-between p-2 sm:p-6 min-h-[500px]">
                        
                        {/* Service Landscape Image Banner */}
                        <div className="relative w-full h-[260px] sm:h-[340px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-md group border border-slate-100">
                            <Image
                                src={activeService.image}
                                alt={activeService.navTitle}
                                fill
                                className="object-cover object-center transition-transform duration-[1s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                            
                            {/* Theme Badge overlay */}
                            <div className="absolute top-6 right-6">
                                <span className="inline-flex items-center rounded-full bg-slate-950/40 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/10">
                                    {activeService.badge || activeService.tags[0]}
                                </span>
                            </div>
                        </div>

                        {/* Text and Feature Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-8">
                            
                            {/* Copy details */}
                            <div className="md:col-span-7">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    {activeService.tags.map((t) => (
                                        <span 
                                            key={t}
                                            className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-bold text-secondary border border-secondary/10"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-extrabold text-primary mb-4 leading-snug">
                                    {activeService.title}
                                </h3>
                                <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
                                    {activeService.intro}
                                </p>
                            </div>

                            {/* Features & CTA */}
                            <div className="md:col-span-5 flex flex-col justify-between gap-6 self-stretch border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                        Service Features
                                    </h4>
                                    <ul className="space-y-3">
                                        {activeService.features.map((feature) => (
                                            <li 
                                                key={feature} 
                                                className="flex items-center gap-3 text-xs text-slate-700 font-semibold bg-accent/20 border border-secondary/5 px-4 py-2.5 rounded-xl"
                                            >
                                                <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-secondary text-white text-[9px]">
                                                    ✓
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 border-t border-slate-100/80">
                                    <Link
                                        href={activeService.detailLink}
                                        className="w-full text-center block rounded-full bg-secondary px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-secondary/15 hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Explore Details
                                    </Link>
                                    <p className="text-[10px] text-slate-400 font-semibold text-center mt-3">
                                        {activeService.trust}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
