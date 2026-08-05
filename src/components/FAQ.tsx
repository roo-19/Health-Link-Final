"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    const faqs = [
        {
            question: "Is Health Link an emergency medical service?",
            answer: "No. Health Link is coordinated for non-emergency medical consultations, daily care support, and holistic wellness. In case of an active medical emergency, please contact 1990 (in Sri Lanka) or your local emergency response service immediately.",
        },
        {
            question: "How quickly can I connect with a doctor?",
            answer: "For our on-demand telemedical consulting, we aim to connect you with a licensed western practitioner within 30 minutes of submitting your request via our encrypted portal.",
        },
        {
            question: "How do digital prescriptions and referrals work?",
            answer: "If the consulting doctor determines a prescription is appropriate, a signed digital prescription will be issued. We can also coordinate referrals to specialized clinical facilities within our partner network.",
        },
        {
            question: "How is my personal health data secured?",
            answer: "All personal information and clinical histories are fully encrypted at rest and in transit using banking-grade security protocols. Only you and your authorized clinical practitioners have access to your files.",
        },
    ];

    return (
        <section className="bg-background py-12 sm:py-16 relative overflow-hidden" id="faq">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Heading */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
                            Support & FAQ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-600 font-light leading-relaxed mb-6 text-sm sm:text-base">
                            Everything you need to know about our services, privacy controls, and clinical care.
                        </p>
                        <Link 
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-primary/95 transition-all duration-300"
                        >
                            Contact our team
                        </Link>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-8 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div key={idx} className="py-4 sm:py-5">
                                    <button
                                        onClick={() => toggle(idx)}
                                        className="w-full flex items-center justify-between text-left group focus:outline-none"
                                    >
                                        <span className="text-lg sm:text-xl font-bold text-primary transition-colors group-hover:text-secondary pr-4">
                                            {faq.question}
                                        </span>
                                        <span className="flex-shrink-0 ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-secondary border border-secondary/10 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                            {isOpen ? (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                </svg>
                                            ) : (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>

                                    {/* Collapsible Answer */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <p className="text-slate-600 leading-relaxed font-light pr-8">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
