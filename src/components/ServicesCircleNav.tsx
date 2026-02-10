"use client";

import { useState, useEffect } from "react";
import { servicesData } from "@/components/servicesData";

export default function ServicesCircleNav() {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Scroll Spy Logic
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -50% 0px",
                threshold: 0.2,
            }
        );

        servicesData.forEach((service) => {
            const element = document.getElementById(service.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToService = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky navbar if needed, or centering
            const headerOffset = 100; // Adjust based on navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            setActiveId(id);
        }
    };

    return (
        <section className="bg-slate-50 py-12 lg:py-24 overflow-hidden" id="services-nav">
            {/* Mobile/Tablet View (Stacked) */}
            <div className="lg:hidden mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">What we offer</h2>
                    <p className="mt-2 text-slate-600">Comprehensive healthcare services designed for your holistic well-being.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    {servicesData.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => scrollToService(service.id)}
                            className={`flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm ring-1 transition-all active:scale-95 duration-300 ${activeId === service.id
                                    ? "ring-2 ring-sky-500 shadow-md"
                                    : "ring-slate-200 hover:ring-sky-200"
                                }`}
                        >
                            <div className={`h-12 w-12 mb-3 transition-colors ${activeId === service.id ? "text-sky-600" : "text-slate-400"}`}>
                                {service.icon}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${activeId === service.id ? "text-sky-600" : "text-slate-500"}`}>{service.tag}</span>
                            <h3 className={`text-lg font-bold mb-2 transition-colors ${activeId === service.id ? "text-sky-900" : "text-slate-900"}`}>{service.navTitle}</h3>
                            <p className="text-sm text-slate-500 leading-snug">{service.microText}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop View (Circular Infographic) */}
            <div className="hidden lg:block relative w-[800px] h-[800px] mx-auto scale-[0.85] xl:scale-100 transform-gpu">
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white shadow-xl border-4 border-slate-50 ring-1 ring-slate-100 flex flex-col items-center justify-center text-center p-8 z-20">
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">What we offer</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Comprehensive healthcare services designed for your holistic well-being.
                    </p>
                </div>

                {/* Orbit Circles */}
                {servicesData.map((service, index) => {
                    const angleDeg = index * 60 - 90;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const radius = 320;
                    const x = radius * Math.cos(angleRad);
                    const y = radius * Math.sin(angleRad);
                    const isActive = activeId === service.id;

                    return (
                        <button
                            key={service.id}
                            onClick={() => scrollToService(service.id)}
                            style={{
                                transform: `translate(${x}px, ${y}px) ${isActive ? "scale(1.05)" : "scale(1)"}`,
                            }}
                            className={`absolute top-1/2 left-1/2 -mt-24 -ml-24 w-48 h-48 rounded-full bg-white shadow-lg z-10 flex flex-col items-center justify-center text-center p-4 group cursor-pointer transition-all duration-300 transform-gpu border-[3px] ${isActive
                                    ? "border-sky-500 ring-4 ring-sky-100 shadow-xl z-30"
                                    : "border-sky-100 hover:border-sky-300 hover:shadow-xl hover:-translate-y-1"
                                }`}
                        >
                            {/* Active Indicator Dot */}
                            {isActive && (
                                <div className="absolute top-4 h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                            )}

                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${isActive ? "text-sky-700" : "text-slate-500 group-hover:text-sky-600"}`} >
                                {service.tag}
                            </span>
                            <h3 className={`text-base font-bold mb-1 transition-colors ${isActive ? "text-sky-900 font-extrabold" : "text-slate-900 group-hover:text-sky-800"}`}>
                                {service.navTitle}
                            </h3>
                            <p className={`text-[11px] leading-tight px-2 transition-colors ${isActive ? "text-slate-700 font-medium" : "text-slate-500 group-hover:text-slate-600"}`}>
                                {service.microText}
                            </p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
