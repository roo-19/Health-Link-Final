"use client";

import { ServiceData } from "@/components/servicesData";
import { useState, useEffect, useCallback } from "react";

interface ServiceTestimonialsProps {
    service: ServiceData;
}

export default function ServiceTestimonials({ service }: ServiceTestimonialsProps) {
    if (!service.testimonials || service.testimonials.length === 0) return null;

    const testimonials = service.testimonials;

    // For fewer than 2 testimonials, just show them all statically
    if (testimonials.length < 2) {
        return (
            <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 translate-x-1/2 pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 border border-sky-200 mb-6">
                            <span className="text-xs font-bold uppercase tracking-wide text-sky-700">Real Stories</span>
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Trusted by our clients</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                        {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
                    </div>
                </div>
            </section>
        );
    }

    return <TestimonialsSlideshow testimonials={testimonials} />;
}

/* ─── Types ─────────────────────────────────────────────── */
interface Testimonial {
    quote: string;
    name: string;
    title: string;
}

/* ─── Slideshow wrapper (needs hooks, so lives in own component) ── */
function TestimonialsSlideshow({ testimonials }: { testimonials: Testimonial[] }) {
    const n = testimonials.length; // 3 for telemedicine
    const [slide, setSlide] = useState(0); // 0 → [0,1], 1 → [1,2], 2 → [2,0], …
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    const totalSlides = n; // one slide per story as the "left" card

    const goTo = useCallback((target: number, dir: "next" | "prev" = "next") => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setSlide(((target % totalSlides) + totalSlides) % totalSlides);
            setAnimating(false);
        }, 400);
    }, [animating, totalSlides]);

    const next = useCallback(() => goTo(slide + 1, "next"), [slide, goTo]);
    const prev = useCallback(() => goTo(slide - 1, "prev"), [slide, goTo]);

    /* Auto-advance every 5 s */
    useEffect(() => {
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next]);

    // Which two cards are visible
    const leftIdx = slide;
    const rightIdx = (slide + 1) % n;

    const slideClass = animating
        ? direction === "next"
            ? "opacity-0 translate-x-8"
            : "opacity-0 -translate-x-8"
        : "opacity-100 translate-x-0";

    return (
        <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 border border-sky-200 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wide text-sky-700">Real Stories</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Trusted by our clients
                    </h2>
                </div>

                {/* Slide viewport */}
                <div className="relative max-w-5xl mx-auto">

                    {/* Cards pair */}
                    <div
                        className={`grid gap-8 md:grid-cols-2 transition-all duration-400 ease-in-out ${slideClass}`}
                        style={{ transitionDuration: "400ms" }}
                    >
                        <TestimonialCard testimonial={testimonials[leftIdx]} />
                        <TestimonialCard testimonial={testimonials[rightIdx]} />
                    </div>

                    {/* Prev / Next arrows */}
                    <button
                        onClick={prev}
                        aria-label="Previous testimonials"
                        className="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 group"
                    >
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-sky-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={next}
                        aria-label="Next testimonials"
                        className="absolute -right-5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 group"
                    >
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-sky-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2.5 mt-10">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > slide ? "next" : "prev")}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                i === slide
                                    ? "w-7 h-2.5 bg-sky-500"
                                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-sky-300"
                            }`}
                        />
                    ))}
                </div>

                {/* Mobile swipe hint buttons */}
                <div className="flex justify-center gap-4 mt-6 md:hidden">
                    <button onClick={prev} className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                    </button>
                    <button onClick={next} className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors">
                        Next
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}

/* ─── Single card ─────────────────────────────────────────── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="relative flex flex-col justify-between p-10 glass-card group transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100/40">
            <svg
                className="absolute top-10 left-10 h-10 w-10 text-sky-100 transition-colors duration-500 group-hover:text-sky-200/60"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
            >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <blockquote className="relative z-10 mt-8 mb-10 text-xl font-medium text-slate-800 leading-relaxed italic text-balance">
                &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="relative z-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 p-0.5">
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-slate-600">
                        {testimonial.name.charAt(0)}
                    </div>
                </div>
                <div>
                    <p className="text-base font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm font-medium text-slate-500">{testimonial.title}</p>
                </div>
            </div>
        </div>
    );
}
